"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const RoleSection = ({
  role,
  title,
  permissions,
  handleToggle
}: {
  role: 'owner' | 'group' | 'public',
  title: string,
  permissions: any,
  handleToggle: (role: 'owner' | 'group' | 'public', perm: 'r' | 'w' | 'x') => void
}) => (
  <div className="nes-container with-title flex-1 bg-white">
    <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>{title}</h3>
    <div className="flex flex-col gap-4 mt-4">
      <label>
        <input
          type="checkbox"
          className="nes-checkbox"
          checked={permissions[role].r}
          onChange={() => handleToggle(role, 'r')}
        />
        <span>Read (4)</span>
      </label>
      <label>
        <input
          type="checkbox"
          className="nes-checkbox"
          checked={permissions[role].w}
          onChange={() => handleToggle(role, 'w')}
        />
        <span>Write (2)</span>
      </label>
      <label>
        <input
          type="checkbox"
          className="nes-checkbox"
          checked={permissions[role].x}
          onChange={() => handleToggle(role, 'x')}
        />
        <span>Execute (1)</span>
      </label>
    </div>
  </div>
);

export default function ChmodCalculator() {
  const [permissions, setPermissions] = useState({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    public: { r: true, w: false, x: true },
  });

  const [copied, setCopied] = useState(false);

  const handleToggle = (role: 'owner' | 'group' | 'public', perm: 'r' | 'w' | 'x') => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }));
  };

  const getNumeric = () => {
    const calc = (role: { r: boolean; w: boolean; x: boolean }) => {
      let val = 0;
      if (role.r) val += 4;
      if (role.w) val += 2;
      if (role.x) val += 1;
      return val;
    };
    return `${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  const getSymbolic = () => {
    const calc = (role: { r: boolean; w: boolean; x: boolean }) => {
      return `${role.r ? 'r' : '-'}${role.w ? 'w' : '-'}${role.x ? 'x' : '-'}`;
    };
    return `-${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(console.error);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Chmod Calculator
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <RoleSection role="owner" title="Owner" permissions={permissions} handleToggle={handleToggle} />
        <RoleSection role="group" title="Group" permissions={permissions} handleToggle={handleToggle} />
        <RoleSection role="public" title="Public" permissions={permissions} handleToggle={handleToggle} />
      </div>

      <div className="nes-container with-title is-rounded bg-white">
         <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Result</h3>
         <div className="flex flex-col gap-4 mt-4">
           <div className="flex flex-col md:flex-row md:items-center gap-4">
             <div className="flex-1">
               <label>Numeric</label>
               <input type="text" className="nes-input bg-gray-50" value={getNumeric()} readOnly />
             </div>
             <div className="flex-1">
               <label>Symbolic</label>
               <input type="text" className="nes-input bg-gray-50" value={getSymbolic()} readOnly />
             </div>
           </div>

           <div className="flex items-end gap-4 mt-4">
             <div className="flex-1">
               <label>Linux Command</label>
               <input type="text" className="nes-input bg-gray-50" value={`chmod ${getNumeric()} <file>`} readOnly />
             </div>
             <button type="button" className={`nes-btn ${copied ? 'is-success' : 'is-primary'}`} onClick={() => handleCopy(`chmod ${getNumeric()} <file>`)}>
                {copied ? 'Copied!' : 'Copy'}
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}
