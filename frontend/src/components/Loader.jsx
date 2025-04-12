import React from "react";

const Loader = () => {
  return (
    /* From Uiverse.io by TamaniPhiri */
    <div className="h-[50vh] flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
        <svg
          className="h-8 w-8 text-primary-600 animate-ping"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M22 12h-4l-3 9L9 3l-3 9H2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
