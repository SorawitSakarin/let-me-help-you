'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

function ipToInt(ip: string) {
  return ip.split('.').reduce((acc, octet) => (acc * 256) + parseInt(octet, 10), 0);
}

function intToIp(int: number) {
  return [
    Math.floor(int / 16777216) % 256,
    Math.floor(int / 65536) % 256,
    Math.floor(int / 256) % 256,
    int % 256
  ].join('.');
}

export default function SubnetCalculatorPage() {
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [prefix, setPrefix] = useState<number>(24);
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    try {
      const ipOctets = ipAddress.split('.');
      if (ipOctets.length !== 4 || ipOctets.some(o => isNaN(Number(o)) || Number(o) < 0 || Number(o) > 255 || o === '')) {
        setError('Invalid IP address');
        return null;
      }
      if (prefix < 0 || prefix > 32) {
        setError('Invalid CIDR prefix');
        return null;
      }

      setError(null);
      const ipOctetsNum = ipOctets.map(Number);

      let maskInt = 4294967295 - (Math.pow(2, 32 - prefix) - 1);
      const maskOctets = [
        Math.floor(maskInt / 16777216) % 256,
        Math.floor(maskInt / 65536) % 256,
        Math.floor(maskInt / 256) % 256,
        maskInt % 256
      ];

      const networkOctets = ipOctetsNum.map((oct, i) => oct & maskOctets[i]);
      const networkAddress = networkOctets.join('.');

      const invertedMaskOctets = maskOctets.map(oct => 255 - oct);
      const broadcastOctets = networkOctets.map((oct, i) => oct | invertedMaskOctets[i]);
      const broadcastAddress = broadcastOctets.join('.');

      const totalHosts = Math.pow(2, 32 - prefix);
      const usableHosts = prefix >= 31 ? 0 : totalHosts - 2;

      const netInt = ipToInt(networkAddress);
      const bcastInt = ipToInt(broadcastAddress);

      const firstHost = prefix >= 31 ? "N/A" : intToIp(netInt + 1);
      const lastHost = prefix >= 31 ? "N/A" : intToIp(bcastInt - 1);

      return {
        maskAddress: maskOctets.join('.'),
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        totalHosts,
        usableHosts
      };
    } catch (e) {
      setError('Calculation error');
      return null;
    }
  }, [ipAddress, prefix]);

  return (
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
      <div className="w-full text-left">
        <Link href="/" className="nes-btn">
          &lt; Back to Home
        </Link>
      </div>

      <div className="nes-container with-title is-centered w-full">
        <h3 className="title">Subnet Calculator</h3>
        <p className="mb-8">Calculate network details from an IP address and CIDR prefix.</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="ip_address">IP Address</label>
            <input
              type="text"
              id="ip_address"
              className={`nes-input ${error === 'Invalid IP address' ? 'is-error' : ''}`}
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="e.g. 192.168.1.1"
            />
          </div>
          <div className="w-32">
            <label htmlFor="prefix">CIDR (/{prefix})</label>
            <input
              type="number"
              id="prefix"
              className={`nes-input ${error === 'Invalid CIDR prefix' ? 'is-error' : ''}`}
              value={prefix}
              onChange={(e) => setPrefix(Number(e.target.value))}
              min="0"
              max="32"
            />
          </div>
        </div>

        {error && <p className="nes-text is-error mb-4">{error}</p>}

        {result && (
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-centered w-full">
              <tbody>
                <tr>
                  <td>Network Address</td>
                  <td>{result.networkAddress}</td>
                </tr>
                <tr>
                  <td>Subnet Mask</td>
                  <td>{result.maskAddress}</td>
                </tr>
                <tr>
                  <td>Broadcast Address</td>
                  <td>{result.broadcastAddress}</td>
                </tr>
                <tr>
                  <td>First Usable Host</td>
                  <td>{result.firstHost}</td>
                </tr>
                <tr>
                  <td>Last Usable Host</td>
                  <td>{result.lastHost}</td>
                </tr>
                <tr>
                  <td>Usable Hosts</td>
                  <td>{result.usableHosts.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Total Hosts</td>
                  <td>{result.totalHosts.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
