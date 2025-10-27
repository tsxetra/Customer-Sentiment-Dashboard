
import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
}

export const LoaderIcon: React.FC<IconProps> = ({ size = 6, className }) => (
    <svg className={`animate-spin h-${size} w-${size} text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const ServerCrashIcon: React.FC<IconProps> = ({ size = 8, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size*4} height={size*4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-red-400 ${className}`}>
        <path d="M6 20h12"/><path d="M12 15v5"/><path d="M12 3c-1.5 0-2.8.5-4 1.4-1.1.9-2.2 2.1-3 3.6-1.4 2.5-2 5.3-2 8v2h20v-2c0-2.7-.6-5.5-2-8- .8-1.5-1.9-2.7-3-3.6-1.2-.9-2.5-1.4-4-1.4Z"/><path d="M8.5 12.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z"/><path d="M16.5 12.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z"/><path d="m15 8-4 4"/><path d="m11 8 4 4"/>
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ size = 6, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size*4} height={size*4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 6, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size*4} height={size*4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
);

export const BotIcon: React.FC<IconProps> = ({ size = 6, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size*4} height={size*4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ size = 6, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size*4} height={size*4} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h0A2.5 2.5 0 0 1 7 4.5v0A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0A2.5 2.5 0 0 1 14.5 7h0A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 14.5 2Z"/><path d="M12 12a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 7h0a2.5 2.5 0 0 0-2.5 2.5v0A2.5 2.5 0 0 0 12 12Z"/><path d="M4.5 7A2.5 2.5 0 0 0 7 9.5v0A2.5 2.5 0 0 0 4.5 12h0A2.5 2.5 0 0 0 2 9.5v0A2.5 2.5 0 0 0 4.5 7Z"/><path d="M19.5 7a2.5 2.5 0 0 0 2.5 2.5v0a2.5 2.5 0 0 0-2.5 2.5h0a2.5 2.5 0 0 0-2.5-2.5v0a2.5 2.5 0 0 0 2.5-2.5Z"/><path d="M9.5 12A2.5 2.5 0 0 1 12 14.5v0A2.5 2.5 0 0 1 9.5 17h0A2.5 2.5 0 0 1 7 14.5v0A2.5 2.5 0 0 1 9.5 12Z"/><path d="M14.5 12a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5h0a2.5 2.5 0 0 1-2.5-2.5v0a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M12 22a2.5 2.5 0 0 0 2.5-2.5v0a2.5 2.5 0 0 0-2.5-2.5h0a2.5 2.5 0 0 0-2.5 2.5v0A2.5 2.5 0 0 0 12 22Z"/>
    </svg>
);
