export const KERNEL_CODE = `
/*
 *  linux/kernel/fork.c
 *
 *  Copyright (C) 1991, 1992  Linus Torvalds
 */

/*
 *  'fork.c' contains the help-routines for the 'fork' system call
 * (see also entry.S and others).
 * Fork is rather simple, once you get the hang of it, but the memory
 * management can be a bitch. See 'mm/memory.c': 'copy_page_range()'
 */

#include <linux/slab.h>
#include <linux/init.h>
#include <linux/unistd.h>
#include <linux/module.h>
#include <linux/vmalloc.h>
#include <linux/completion.h>
#include <linux/personality.h>
#include <linux/mempolicy.h>
#include <linux/sem.h>
#include <linux/file.h>
#include <linux/fdtable.h>
#include <linux/iocontext.h>
#include <linux/key.h>
#include <linux/binfmts.h>
#include <linux/mman.h>
#include <linux/mmu_notifier.h>
#include <linux/fs.h>
#include <linux/cpu.h>
#include <linux/cpuset.h>
#include <linux/cgroup.h>
#include <linux/security.h>
#include <linux/hugetlb.h>
#include <linux/swap.h>
#include <linux/syscalls.h>
#include <linux/jiffies.h>
#include <linux/futex.h>
#include <linux/compat.h>
#include <linux/kthread.h>
#include <linux/task_io_accounting_ops.h>
#include <linux/rcupdate.h>
#include <linux/ptrace.h>
#include <linux/mount.h>
#include <linux/audit.h>
#include <linux/memcontrol.h>
#include <linux/ftrace.h>
#include <linux/proc_fs.h>
#include <linux/profile.h>
#include <linux/rmap.h>
#include <linux/ksm.h>
#include <linux/acct.h>
#include <linux/tsacct_kern.h>
#include <linux/cn_proc.h>
#include <linux/freezer.h>
#include <linux/delayacct.h>
#include <linux/taskstats_kern.h>
#include <linux/random.h>
#include <linux/tty.h>
#include <linux/blkdev.h>
#include <linux/fs_struct.h>
#include <linux/magic.h>
#include <linux/perf_event.h>
#include <linux/posix-timers.h>
#include <linux/user-return-notifier.h>
#include <linux/oom.h>
#include <linux/khugepaged.h>
#include <linux/signalfd.h>

#include <asm/pgtable.h>
#include <asm/pgalloc.h>
#include <asm/uaccess.h>
#include <asm/mmu_context.h>
#include <asm/cacheflush.h>
#include <asm/tlbflush.h>

#include <trace/events/sched.h>

/*
 * Protected counters by write_lock_irq(&tasklist_lock)
 */
unsigned long total_forks;	/* Handle wraparound */
int nr_threads; 		/* The idle threads do not count.. */

int max_threads;		/* tunable limit on nr_threads */

DEFINE_PER_CPU(unsigned long, process_counts) = 0;

__cacheline_aligned DEFINE_RWLOCK(tasklist_lock);  /* outer */

#ifdef CONFIG_PROVE_RCU
int lockdep_tasklist_lock_is_held(void)
{
	return lockdep_is_held(&tasklist_lock);
}
EXPORT_SYMBOL_GPL(lockdep_tasklist_lock_is_held);
#endif /* #ifdef CONFIG_PROVE_RCU */

int nr_processes(void)
{
	int cpu;
	int total = 0;

	for_each_possible_cpu(cpu)
		total += per_cpu(process_counts, cpu);

	return total;
}

#ifndef __HAVE_ARCH_TASK_STRUCT_ALLOCATOR
# define alloc_task_struct_node(node)		\
		kmem_cache_alloc_node(task_struct_cachep, GFP_KERNEL, node)
# define free_task_struct(tsk)			\
		kmem_cache_free(task_struct_cachep, (tsk))
static struct kmem_cache *task_struct_cachep;
#endif

/*
 * Allocate pages if the system is under memory pressure
 */
#ifndef alloc_thread_info_node
# define alloc_thread_info_node(tsk, node)	\
		kmalloc_node(THREAD_SIZE, GFP_KERNEL, node)
# define free_thread_info(ti)			\
		kfree(ti)
#endif

/* SLAB cache for signal_struct structures (tsv: 40 bytes) */
static struct kmem_cache *signal_cachep;

/* SLAB cache for sighand_struct structures (tsv: 1296 bytes) */
static struct kmem_cache *sighand_cachep;

/* SLAB cache for files_struct structures (tsv: 128 bytes) */
static struct kmem_cache *files_cachep;

/* SLAB cache for fs_struct structures (tsv: 128 bytes) */
static struct kmem_cache *fs_cachep;

/* SLAB cache for vm_area_struct structures */
static struct kmem_cache *vm_area_cachep;

/* SLAB cache for mm_struct structures (tsv: 736 bytes) */
static struct kmem_cache *mm_cachep;

static void account_kernel_stack(struct thread_info *ti, int account)
{
	struct zone *zone = page_zone(virt_to_page(ti));

	mod_zone_page_state(zone, NR_KERNEL_STACK, account);
}

void free_task(struct task_struct *tsk)
{
	account_kernel_stack(tsk->stack, -1);
	free_thread_info(tsk->stack);
	rt_mutex_debug_task_free(tsk);
	ftrace_graph_exit_task(tsk);
	put_seccomp_filter(tsk);
	arch_release_task_struct(tsk);
	free_task_struct(tsk);
}
EXPORT_SYMBOL(free_task);

static inline void free_signal_struct(struct signal_struct *sig)
{
	taskstats_tgid_free(sig);
	sched_autogroup_exit(sig);
	kmem_cache_free(signal_cachep, sig);
}

static inline void put_signal_struct(struct signal_struct *sig)
{
	if (atomic_dec_and_test(&sig->sigcnt))
		free_signal_struct(sig);
}

void __put_task_struct(struct task_struct *tsk)
{
	WARN_ON(!tsk->exit_state);
	WARN_ON(atomic_read(&tsk->usage));
	WARN_ON(tsk == current);

	exit_creds(tsk);
	delayacct_tsk_free(tsk);
	put_signal_struct(tsk->signal);

	if (!profile_handoff_task(tsk))
		free_task(tsk);
}
EXPORT_SYMBOL_GPL(__put_task_struct);

void __init fork_init(unsigned long mempages)
{
#ifndef __HAVE_ARCH_TASK_STRUCT_ALLOCATOR
#ifndef ARCH_MIN_TASKALIGN
#define ARCH_MIN_TASKALIGN	L1_CACHE_BYTES
#endif
	/* create a slab on which task_structs can be allocated */
	task_struct_cachep =
		kmem_cache_create("task_struct", sizeof(struct task_struct),
			ARCH_MIN_TASKALIGN, SLAB_PANIC | SLAB_NOTRACK, NULL);
#endif

	/* do the arch specific task caches init */
	arch_task_cache_init();

	/*
	 * The default maximum number of threads is set to a safe
	 * value: the thread structures can take up at most half
	 * of memory.
	 */
	max_threads = mempages / (8 * THREAD_SIZE / PAGE_SIZE);

	/*
	 * we need to allow at least 20 threads to boot a system
	 */
	if (max_threads < 20)
		max_threads = 20;

	init_task.signal->rlim[RLIMIT_NPROC].rlim_cur = max_threads/2;
	init_task.signal->rlim[RLIMIT_NPROC].rlim_max = max_threads/2;
	init_task.signal->rlim[RLIMIT_SIGPENDING] =
		init_task.signal->rlim[RLIMIT_NPROC];
}

int unshare_files(struct files_struct **displaced)
{
	struct files_struct *copy = NULL;
	struct fdtable *fdt;
	int error;

	error = unshare_fd(CLONE_FILES, &copy);

	if (error || !copy) {
		*displaced = NULL;
		return error;
	}
	*displaced = copy;
	return 0;
}
EXPORT_SYMBOL(unshare_files);

int unshare_fs(struct fs_struct **displaced)
{
	struct fs_struct *copy = copy_fs_struct(current->fs);
	if (!copy)
		return -ENOMEM;

	*displaced = current->fs;
	current->fs = copy;
	return 0;
}
EXPORT_SYMBOL(unshare_fs);

static int check_unshare_flags(unsigned long unshare_flags)
{
	if (unshare_flags & ~(CLONE_THREAD|CLONE_FS|CLONE_NEWNS|CLONE_SIGHAND|
				CLONE_VM|CLONE_FILES|CLONE_SYSVSEM|
				CLONE_NEWUTS|CLONE_NEWIPC|CLONE_NEWNET|
				CLONE_NEWPID))
		return -EINVAL;
	/*
	 * Not implemented, but pretend it works if there is nothing to
	 * unshare. Note that unsharing CLONE_THREAD or CLONE_SIGHAND
	 * needs to unshare vm.
	 */
	if (unshare_flags & (CLONE_THREAD | CLONE_SIGHAND | CLONE_VM)) {
		/* FIXME: get_task_mm() handles copying of mm. */
		if (!current->mm)
			return -EINVAL;
	}

	return 0;
}
`;