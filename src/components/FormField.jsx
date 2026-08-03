import { cn } from "../utils/cn.js";

export const FormField = ({wrapperClassName, inputClassName, id, label, type, placeholder, value, onChangeFn}) => {
  return (
    <div className={cn("w-full flex flex-col items-start mb-4", wrapperClassName)}>
      {label && <label htmlFor={id} className="text-sm">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChangeFn(e.target.value)}
        className={cn("border border-gray-300 focus:border-theme focus:outline-none", inputClassName)}
      />
    </div>
  );
};