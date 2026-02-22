import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type CustomDropDownMenuProps = {
  options: string[];
  onChange?: (selected: string[]) => void; // optional for form integration
};

const MultiSelectDropDown = ({
  options,
  onChange,
}: CustomDropDownMenuProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
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

  const toggleOption = (option: string) => {
    let updatedSelection: string[];

    if (selectedOptions.includes(option)) {
      updatedSelection = selectedOptions.filter((item) => item !== option);
    } else {
      updatedSelection = [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelection);
    onChange?.(updatedSelection); // send to parent if needed
  };

  return (
    <div ref={dropdownRef} className="relative mt-1 w-full">
      {/* Trigger */}
      <div
        onClick={() => setIsDropDownVisible((prev) => !prev)}
        className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm flex justify-between items-center cursor-pointer bg-white"
      >
        <div className="truncate">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select options"}
        </div>

        <ChevronDown
          className={`transition-transform ${
            isDropDownVisible ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {isDropDownVisible && (
        <div className="absolute z-10 w-full text-white bg-neutral-700 border border-gray-300 rounded shadow-md mt-2 max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-6 py-2 cursor-pointer text-white flex items-center justify-between
                  ${isSelected ? " text-orange-600" : "hover:text-black hover:bg-orange-100"}`}
              >
                <span>{option}</span>

                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="accent-orange-500"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
