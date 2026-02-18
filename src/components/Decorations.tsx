"use client";
import React from 'react';

export default function Decorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Cloud 1 - Higher, Slower */}
      <div
        className="pixel-cloud animate-slide-across opacity-80"
        style={{
          top: '10%',
          animationDuration: '45s',
          animationDelay: '0s'
        }}
      ></div>

      {/* Cloud 2 - Lower, Faster */}
      <div
        className="pixel-cloud animate-slide-across opacity-60 scale-75"
        style={{
          top: '25%',
          animationDuration: '35s',
          animationDelay: '-15s'
        }}
      ></div>

      {/* Floating Coin - Bottom Right */}
      <div
        className="absolute bottom-12 right-8 md:right-20 animate-float"
        style={{ animationDelay: '1s' }}
      >
        <i className="nes-icon coin is-medium animate-spin-slow"></i>
      </div>

      {/* Floating Star - Top Right */}
      <div
        className="absolute top-12 right-12 md:right-32 animate-float"
        style={{ animationDelay: '2.5s' }}
      >
         <i className="nes-icon star is-small animate-pulse"></i>
      </div>

       {/* Floating Heart - Left Side */}
       <div
        className="absolute top-1/2 left-4 md:left-12 animate-float"
        style={{ animationDelay: '0.5s' }}
      >
         <i className="nes-icon heart is-small animate-bounce"></i>
      </div>
    </div>
  );
}
