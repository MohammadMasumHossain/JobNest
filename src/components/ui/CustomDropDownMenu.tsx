import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type CustomDropDownMenuProps = {
  options: string[];
};

const CustomDropDownMenu = ({ options }: CustomDropDownMenuProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selected, setSelected] = useState<string>("Select Dropdown");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative mt-7 w-full">
      <div
        onClick={() => setIsDropDownVisible((prev) => !prev)}
        className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm flex justify-between cursor-pointer"
      >
        <div>{selected}</div>
        <ChevronDown
          className={`transition-transform ${
            isDropDownVisible ? "rotate-180" : ""
          }`}
        />
      </div>

      {isDropDownVisible && (
        <div className="absolute z-10 w-full bg-neutral-700 rounded shadow-xl mt-4">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsDropDownVisible(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-neutral-600 text-neutral-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDownMenu;
