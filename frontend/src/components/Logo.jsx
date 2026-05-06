import React from 'react';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="url(#sunGradient)" stroke="#FFD700" strokeWidth="2"/>
        <g fill="#FFD700">
          <circle cx="20" cy="8" r="2"/>
          <circle cx="32" cy="12" r="2"/>
          <circle cx="32" cy="28" r="2"/>
          <circle cx="20" cy="32" r="2"/>
          <circle cx="8" cy="28" r="2"/>
          <circle cx="8" cy="12" r="2"/>
          <circle cx="14" cy="14" r="1.5"/>
          <circle cx="26" cy="14" r="1.5"/>
          <circle cx="26" cy="26" r="1.5"/>
          <circle cx="14" cy="26" r="1.5"/>
        </g>
        <defs>
          <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#FFA500"/>
          </radialGradient>
        </defs>
      </svg>
      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Sunshine Aura AI
      </span>
    </div>
  );
};

export default Logo;