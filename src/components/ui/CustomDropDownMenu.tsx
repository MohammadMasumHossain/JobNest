import { useState, useRef, useEffect, type ReactNode } from "react";

type CustomDropDownMenuProps = {
  options: string[];
  selected?: string;
  onSelect?: (option: string) => void;
  icon?: ReactNode;
};

const CustomDropDownMenu = ({
  options,
  selected: selectedProp,
  onSelect,
  icon,
}: CustomDropDownMenuProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selected, setSelected] = useState<string>(selectedProp || options[0]);

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

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsDropDownVisible(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="relative border-gray-20 mt-1 w-full">
      <div
        onClick={() => setIsDropDownVisible((prev) => !prev)}
        className="w-full px-3 py-3 border  border-gray-200  shadow-md rounded-md flex justify-between cursor-pointer"
      >
        <div>{selected}</div>

        {icon && (
          <span
            className={`transition-transform ${
              isDropDownVisible ? "rotate-180" : " absolute right-3"
            }`}
          >
            {icon}
          </span>
        )}
      </div>

      {isDropDownVisible && (
        <div className="absolute z-10 w-full bg-gray-800  rounded shadow-xl mt-4">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                handleSelect(option);
              }}
              className="px-6 py-2 cursor-pointer hover:bg-orange-500 text-white"
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
