import React from 'react';

function Container({ children }) {
  return (
    <div className="w-full px-4 py-5 bg-slate-50">
      {children}
    </div>
  );
}

export default Container;
