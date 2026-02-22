'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Link from 'next/link';
import { ArrowLeft, Download, Upload, QrCode } from 'lucide-react';

export default function QRCodePage() {
  const [text, setText] = useState('');
  const [icon, setIcon] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
            setIcon(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
             <QrCode className="w-6 h-6" />
             <h1 className="text-2xl font-bold">QR Code Generator</h1>
          </div>
          <p className="text-indigo-100 mt-2">Create custom QR codes with ease.</p>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="url_field" className="block text-sm font-medium text-gray-700 mb-2">
                Content (URL or Text)
              </label>
              <input
                type="text"
                id="url_field"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Center Icon (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="icon_field"
                      className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input id="icon_field" name="icon_field" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
              {icon && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Icon uploaded successfully
                  </p>
              )}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Tip: Ensure your icon has good contrast and is not too complex for better scanning reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100" ref={qrRef}>
              <QRCodeCanvas
                value={text || "https://example.com"}
                size={256}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={true}
                imageSettings={icon ? {
                  src: icon,
                  x: undefined,
                  y: undefined,
                  height: 48,
                  width: 48,
                  excavate: true,
                } : undefined}
              />
            </div>

            <button
              type="button"
              onClick={downloadQRCode}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full sm:w-auto justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
