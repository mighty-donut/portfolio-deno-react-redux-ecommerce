// tailwind spinner, border-solid, centered

export function Spinner() {
  return (
    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <div className="h-12 w-12 border-8 border-t-transparent border-solid animate-spin rounded-full border-gray-400"></div>
    </div>
  );
}

// non centered, border-double  --  с 2мя полосками 
// <div>
//   <div className="w-12 h-12 border-4 border-t-transparent border-double animate-spin rounded-full border-teal-400"></div>
// </div>