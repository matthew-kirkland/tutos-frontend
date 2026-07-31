import { cn } from "../utils/cn.js";

export const FormStage = ({index, title, description, isLast, children}) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-theme text-white text-xs font-semibold shrink-0">
        {index}
      </div>
      {!isLast && <div className="w-px flex-1 bg-gray-200 mt-2" />}
    </div>
    <div className={cn("flex-1 min-w-0", !isLast && "pb-6")}>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-xs text-gray-400 mt-0.5 mb-3">{description}</p>}
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  </div>
);
