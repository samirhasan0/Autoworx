import React from "react";

export default function Popup({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-10 bg-black bg-opacity-70">
      <div className="fixed border z-20 bg-white rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
