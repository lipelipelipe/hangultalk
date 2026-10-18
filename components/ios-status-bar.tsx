'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const IOSStatusBar: React.FC = () => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-11 px-6 flex items-center justify-between text-xs font-semibold select-none pt-1">
      {/* Time */}
      <span className="tracking-tight text-slate-800 dark:text-slate-100">{time}</span>

      {/* Dynamic Island / Notch accent subtle */}
      <div className="w-24 h-4 bg-slate-900/10 dark:bg-white/10 rounded-full mx-auto hidden sm:block" />

      {/* Network / Wifi / Battery */}
      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
        {/* Cellular bars */}
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1 bg-current rounded-xs" />
          <span className="w-0.5 h-1.5 bg-current rounded-xs" />
          <span className="w-0.5 h-2 bg-current rounded-xs" />
          <span className="w-0.5 h-2.5 bg-current rounded-xs" />
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
