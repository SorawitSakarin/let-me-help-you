/**
 * Daily PR Reviewer and Git Pipeline Runner
 * Automatically reviews and merges pull requests targeting the 'dev' branch.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../dev.log');
const REPO_OWNER = 'SorawitSakarin';
const REPO_NAME = 'let-me-help-you';

// Helper to write logs
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Run a shell command and return stdout
function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    log(`ERROR executing command: ${command}`);
    log(error.stderr || error.message);
    throw error;
  }
}

// Check if a command exists
function commandExists(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const targetPrNumber = process.argv.find(arg => arg.startsWith('--pr='))?.split('=')[1];

  log('==================================================');
  log(`Starting Automated PR Review & Git Pipeline (DryRun: ${isDryRun})`);
  log('==================================================');

  // Verify we are in a clean git working directory
  const status = runCommand('git status --porcelain');
  if (status) {
    log('WARNING: Git working directory is not clean. Stashing changes.');
    runCommand('git stash');
  }

  try {
    // 1. Fetch latest changes from remote
    log('Fetching all remote changes...');
    runCommand('git fetch origin');

    // 2. Query open pull requests targeting 'dev' branch
    log(`Querying open PRs for ${REPO_OWNER}/${REPO_NAME}...`);
    const pullsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open`;
    let response;
    
    try {
      const curlCmd = `curl -s -H "Accept: application/vnd.github.v3+json" "${pullsUrl}"`;
      const output = runCommand(curlCmd);
      response = JSON.parse(output);
    } catch (e) {
      log(`Failed to fetch pull requests via API: ${e.message}`);
      return;
    }

    if (!Array.isArray(response)) {
      log('Invalid response received from GitHub API.');
      return;
    }

    // Filter PRs targeting 'dev'
    let prs = response.filter(pr => pr.base.ref === 'dev');
    if (targetPrNumber) {
      prs = prs.filter(pr => pr.number === parseInt(targetPrNumber, 10));
    }

    log(`Found ${prs.length} open pull requests targeting the 'dev' branch.`);

    if (prs.length === 0) {
      log('No open pull requests to process today.');
      return;
    }

    for (const pr of prs) {
      log(`--------------------------------------------------`);
      log(`Processing PR #${pr.number}: "${pr.title}"`);
      log(`Base Branch: ${pr.base.ref} | Head Branch: ${pr.head.ref}`);
      log(`--------------------------------------------------`);

      if (isDryRun) {
        log(`[DryRun] Skipping checkout and verification steps for PR #${pr.number}`);
        continue;
      }

      // Fetch the specific PR branch if it is not present
      log(`Fetching head branch: ${pr.head.ref}`);
      runCommand(`git fetch origin refs/pull/${pr.number}/head:refs/remotes/origin/pr/${pr.number}`);

      // Checkout the PR branch
      log(`Checking out branch for PR #${pr.number}...`);
      runCommand(`git checkout -B pr-${pr.number} origin/pr/${pr.number}`);

      // Run code quality/testing checks
      log('Running quality controls...');
      try {
        log('Running: npm run test');
        runCommand('npm run test');
        log('Test verification: PASSED');

        log('Running: npm run build');
        runCommand('npm run build');
        log('Build verification: PASSED');
      } catch (err) {
        log(`CRITICAL: Quality verification FAILED on PR #${pr.number}. Manual intervention required.`);
        continue;
      }

      // If checks pass, merge PR branch into dev locally
      log('Quality controls passed! Merging PR branch into local dev branch...');
      runCommand('git checkout dev');
      runCommand('git pull origin dev');
      runCommand(`git merge pr-${pr.number} --no-edit`);

      // Verify the merged dev branch is fully functional
      log('Verifying merged dev branch...');
      try {
        runCommand('npm run test');
        runCommand('npm run build');
      } catch (err) {
        log('CRITICAL: Verification failed after merge into dev branch. Rolling back merge.');
        runCommand('git reset --hard origin/dev');
        continue;
      }

      // Push dev branch to remote
      log('Pushing updated dev branch to remote...');
      runCommand('git push origin dev');
      log(`PR #${pr.number} successfully reviewed, verified, and merged into dev!`);
    }

    // Sync dev with main if there were merges
    if (!isDryRun && prs.length > 0) {
      log('Synchronizing dev branch with main...');
      runCommand('git checkout main');
      runCommand('git pull origin main');
      runCommand('git merge dev --no-edit');

      log('Verifying main branch...');
      try {
        runCommand('npm run test');
        runCommand('npm run build');
        log('Pushing main branch to remote...');
        runCommand('git push origin main');
        log('Main branch synchronized successfully!');
      } catch (err) {
        log('CRITICAL: Verification on main branch failed. Resetting main branch.');
        runCommand('git reset --hard origin/main');
      }

      // Return to dev branch
      runCommand('git checkout dev');
    }

  } catch (error) {
    log(`FATAL ERROR during pipeline execution: ${error.message}`);
  } finally {
    // Return to dev branch and clean up stash if needed
    try {
      runCommand('git checkout dev');
      const stashList = runCommand('git stash list');
      if (stashList) {
        log('Restoring stashed changes...');
        runCommand('git stash pop');
      }
    } catch {}
    log('Pipeline execution finished.');
  }
}

main();
