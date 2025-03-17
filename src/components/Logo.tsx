import React from 'react';
import { Mountain } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Mountain className="h-8 w-8 text-primary-600" />
        <Mountain className="h-6 w-6 text-primary-400 absolute -right-1 -bottom-1" />
      </div>
      {showText && (
        <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          HimalayaJoy
        </div>
      )}
    </div>
  );
};

export default Logo; 