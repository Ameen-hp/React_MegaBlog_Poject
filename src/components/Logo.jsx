import React from 'react';

function Logo({ width = '100px', className = '' }) {
  // We need to ensure the container is square for a perfect circle
  // We'll use the width prop for both width and height for simplicity
  const sizeStyle = { width, height: width }; 

  return (
    <div 
      style={sizeStyle} 
      className={`
        flex items-center justify-center p-1 sm:p-2 
        bg-white rounded-full overflow-hidden shadow-md 
        ${className}
      `}
    >
      <img 
        src="/images/megablog.png" 
        alt="MegaBlog Logo" 
        className="h-full w-full object-cover rounded-full" // Use object-cover for circular images
      />
    </div>
  );
}

export default Logo;