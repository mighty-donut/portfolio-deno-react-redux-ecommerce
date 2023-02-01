import { useState } from "react";

export function BrandDropdown() {
  const [showBrands, setShowBrands] = useState(false);

  function openBrands() {
    setShowBrands(!showBrands);
  }

  type Brands = {
    id: number;
    title: string;
  };

  const brands: Brands[] = [
    { id: 1, title: "DALI" },
    { id: 2, title: "B&W" },
    { id: 3, title: "Arcam" },
  ];

  return (
    <div className="font-montserrat">
      <div className="relative">
        <button
          className="inline-block font-bold leading-tight rounded text-lg text-white hover:text-gray-400 transition duration-150 ease-in-out flex items-center whitespace-nowrap"
          type="button"
          onClick={openBrands}
        >
          Бренд
          <svg
            className="ml-1 w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        <select
          className="absolute left-0 top-9 w-60 z-50"
          style={{ display: showBrands ? "block" : "none" }}
          id=""
          name=""
          multiple
        >
          {brands.map((brand) => (
            <option key={brand.id}>{brand.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
