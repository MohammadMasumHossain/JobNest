import { useState, useRef, useEffect, type ReactNode } from "react";

type CustomDropDownMenuProps = {
  options: string[];
  selected?: string;
  onSelect?: (option: string) => void;
  icon?: ReactNode;
  rotateIcon?: boolean;
};

const CustomDropDownMenu = ({
  options,
  selected: selectedProp,
  onSelect,
  icon,
  rotateIcon = true,
}: CustomDropDownMenuProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selected, setSelected] = useState<string>(selectedProp || "");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sync with react-hook-form value
  useEffect(() => {
    if (selectedProp !== undefined) {
      setSelected(selectedProp);
    }
  }, [selectedProp]);

  // Close on outside click
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
    <div ref={dropdownRef} className="relative mt-1 w-full">
      <div
        onClick={() => setIsDropDownVisible((prev) => !prev)}
        className="w-full px-3 py-2 border border-gray-200 shadow-sm rounded-sm flex justify-between cursor-pointer bg-white"
      >
        <div>{selected || "Select Role"}</div>

        {icon && (
          <span
            className={`transition-transform ${
              rotateIcon && isDropDownVisible
                ? "rotate-180"
                : "absolute right-3"
            }`}
          >
            {icon}
          </span>
        )}
      </div>

      {isDropDownVisible && (
        <div className="absolute z-10 w-full bg-gray-800 rounded shadow-xl mt-2">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
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
