"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface DeviceInfo {
  userAgent: string;
  language: string;
  platform: string;
  vendor: string;
  cookieEnabled: boolean;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  devicePixelRatio: number;
  timeZone: string;
  connectionType?: string;
}

export default function CheckDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let connectionType = "Unknown";
    // @ts-expect-error - NetworkInformation API is not fully typed yet
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.effectiveType) {
      connectionType = connection.effectiveType;
    }

    setDeviceInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor || "N/A",
      cookieEnabled: navigator.cookieEnabled,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      colorDepth: window.screen.colorDepth,
      devicePixelRatio: window.devicePixelRatio,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connectionType,
    });
  }, []);

  const handleCopy = () => {
    if (!deviceInfo) return;
    const jsonString = JSON.stringify(deviceInfo, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy", err);
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center gap-3">
          <i className="nes-icon star is-medium"></i>
          Device Info
        </h2>
        <Link href="/" className="nes-btn">Back</Link>
      </div>

      <div className="nes-container with-title is-rounded bg-white">
        <h3 className="title text-sm bg-white" style={{ marginBottom: 0 }}>Device & Browser Details</h3>

        {!deviceInfo ? (
          <p className="mt-4">Loading device info...</p>
        ) : (
          <>
            <div className="nes-table-responsive mt-4">
               <table className="nes-table is-bordered is-centered w-full">
                 <tbody>
                   <tr>
                     <td className="font-bold">User Agent</td>
                     <td className="break-all">{deviceInfo.userAgent}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Language</td>
                     <td>{deviceInfo.language}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Platform</td>
                     <td>{deviceInfo.platform}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Vendor</td>
                     <td>{deviceInfo.vendor}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Cookie Enabled</td>
                     <td>{deviceInfo.cookieEnabled ? "Yes" : "No"}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Screen Resolution</td>
                     <td>{deviceInfo.screenWidth} x {deviceInfo.screenHeight}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Color Depth</td>
                     <td>{deviceInfo.colorDepth}-bit</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Device Pixel Ratio</td>
                     <td>{deviceInfo.devicePixelRatio}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Time Zone</td>
                     <td>{deviceInfo.timeZone}</td>
                   </tr>
                   <tr>
                     <td className="font-bold">Connection (est.)</td>
                     <td>{deviceInfo.connectionType}</td>
                   </tr>
                 </tbody>
               </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCopy}
                disabled={!deviceInfo}
                className={`nes-btn ${copied ? "is-success" : "is-primary"} ${!deviceInfo ? "is-disabled" : ""}`}
              >
                {copied ? "Copied!" : "Copy as JSON"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
