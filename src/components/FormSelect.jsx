import { useState, useRef, useEffect } from "react";
import { RxChevronDown } from "react-icons/rx";
import { cn } from "../utils/cn.js"; // Or your utility class merger

export const FormSelect = ({ 
  options = [],
  value,
  onChange,
  placeholder,
  wrapperClassName,
  buttonClassName,
  menuClassName,
  optionClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks anywhere outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={cn("relative", wrapperClassName)} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClassName}
      >
        <span className={!value ? "text-gray-400" : ""}>
          {value || placeholder}
        </span>
        <RxChevronDown
          size={16} 
          className={cn("text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} 
        />
      </div>
      {isOpen && (
        <ul className={cn("absolute z-30", menuClassName)}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={cn(optionClassName, value === option && "bg-theme/10 text-theme font-semibold hover:bg-theme/10")}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};