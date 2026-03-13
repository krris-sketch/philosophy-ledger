import React from 'react';

const GradualBlur = ({ isDark }) => {
  // We use 8 layers but calculate their strength exponentially for a seamless look
  const layers = [1, 2, 4, 8, 16, 24, 32, 64]; 
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[35vh] pointer-events-none z-[90] overflow-hidden">
      {layers.map((blur, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            // This mask ensures each layer only affects a specific slice of the screen
            maskImage: `linear-gradient(to top, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,0) ${((i + 1) / layers.length) * 100}%)`,
            WebkitMaskImage: `linear-gradient(to top, 
              rgba(0,0,0,1) 0%, 
              rgba(0,0,0,0) ${((i + 1) / layers.length) * 100}%)`,
            zIndex: layers.length - i
          }}
        />
      ))}
      {/* Final dark overlay to make the Dock pop */}
      <div className={`absolute inset-0 bg-gradient-to-t from-current to-transparent opacity-20 ${
        isDark ? 'text-black' : 'text-emerald-100'
      }`} />
    </div>
  );
};

export default GradualBlur;