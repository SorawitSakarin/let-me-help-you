'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

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
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
        <div className="nes-container with-title is-centered w-full">
            <h2 className="title">Generate QR Code</h2>

            <div className="nes-field is-inline flex flex-col md:flex-row gap-4 mb-4">
                <label htmlFor="url_field" className="whitespace-nowrap md:w-32 pt-2">Content</label>
                <input
                    type="text"
                    id="url_field"
                    className="nes-input w-full"
                    placeholder="Enter URL or text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="nes-field is-inline flex flex-col md:flex-row gap-4 mb-8">
                <label htmlFor="icon_field" className="whitespace-nowrap md:w-32 pt-2">Icon</label>
                <div className="nes-file w-full">
                    <input type="file" id="icon_field" accept="image/*" onChange={handleImageUpload} />
                    {/* Hack to show filename if needed, but nes.css usually handles file input display via JS or custom structure */}
                </div>
            </div>

            {/* Spy Theme QR: Green on Black */}
            <div className="flex flex-col items-center bg-black p-4 border-4 border-green-500 inline-block" ref={qrRef}>
                 <QRCodeCanvas
                    value={text || "https://example.com"}
                    size={256}
                    bgColor={"#000000"}
                    fgColor={"#00ff00"}
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

            <div className="mt-8">
                <button type="button" className="nes-btn is-success" onClick={downloadQRCode}>
                    <i className="nes-icon save"></i> Download
                </button>
            </div>
        </div>

        <div className="nes-container is-dark w-full">
          <p>Tip: Ensure your icon has good contrast and is not too complex for better scanning.</p>
        </div>
    </div>
  );
}
