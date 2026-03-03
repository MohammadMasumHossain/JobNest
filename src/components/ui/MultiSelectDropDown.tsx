// import { ChevronDown } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// type CustomDropDownMenuProps = {
//   options: string[];
//   onChange?: (selected: string[]) => void;
// };

// const MultiSelectDropDown = ({
//   options,
//   onChange,
// }: CustomDropDownMenuProps) => {
//   const [isDropDownVisible, setIsDropDownVisible] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropDownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleOption = (option: string) => {
//     let updatedSelection: string[];

//     if (selectedOptions.includes(option)) {
//       updatedSelection = selectedOptions.filter((item) => item !== option);
//     } else {
//       updatedSelection = [...selectedOptions, option];
//     }

//     setSelectedOptions(updatedSelection);
//     onChange?.(updatedSelection);
//   };

//   return (
//     <div ref={dropdownRef} className="relative mt-1 w-full">
//       <div
//         onClick={() => setIsDropDownVisible((prev) => !prev)}
//         className="w-full px-3 py-2 border border-gray-300 shadow-sm rounded-sm flex justify-between items-center cursor-pointer bg-white"
//       >
//         <div className="truncate">
//           {selectedOptions.length > 0
//             ? selectedOptions.join(", ")
//             : "Select options"}
//         </div>

//         <ChevronDown
//           className={`transition-transform ${
//             isDropDownVisible ? "rotate-180" : ""
//           }`}
//         />
//       </div>

//       {isDropDownVisible && (
//         <div className="absolute z-10 w-full text-white bg-gray-800 border border-gray-300 rounded shadow-md mt-4 max-h-60 overflow-y-auto">
//           {options.map((option) => {
//             const isSelected = selectedOptions.includes(option);

//             return (
//               <div
//                 key={option}
//                 onClick={() => toggleOption(option)}
//                 className={`px-6 py-2 cursor-pointer text-white flex items-center
//                   ${isSelected ? " text-orange-600" : "hover:bg-orange-500"}`}
//               >
//                 <div className="flex space-x-4">
//                   <div>
//                     <input
//                       type="checkbox"
//                       checked={isSelected}
//                       readOnly
//                       className="accent-orange-500"
//                     />
//                   </div>
//                   <div>
//                     <span>{option}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelectDropDown;
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type MultiSelectDropDownProps = {
  options: string[];
  onChange?: (selected: string[]) => void;
  defaultValues?: string[]; // ✅ NEW PROP
};

const MultiSelectDropDown = ({
  options,
  onChange,
  defaultValues = [],
}: MultiSelectDropDownProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultValues); // ✅ use defaultValues

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Update selectedOptions if defaultValues change (autofill)
  useEffect(() => {
    setSelectedOptions(defaultValues);
  }, [defaultValues]);

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
    onChange?.(updatedSelection);
  };

  return (
    <div ref={dropdownRef} className="relative mt-1 w-full">
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

      {isDropDownVisible && (
        <div className="absolute z-10 w-full text-white bg-gray-800 border border-gray-300 rounded shadow-md mt-4 max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-6 py-2 cursor-pointer text-white flex items-center  
                  ${isSelected ? " text-orange-600" : "hover:bg-orange-500"}`}
              >
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="accent-orange-500"
                    />
                  </div>
                  <div>
                    <span>{option}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
