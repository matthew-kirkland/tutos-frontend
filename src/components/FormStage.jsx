import { BsCheck, BsX } from "react-icons/bs";
import { cn } from "../utils/cn.js";

const CIRCLE_STATE_CLASSES = {
  done: "bg-theme text-white",
  current: "bg-theme text-white",
  upcoming: "bg-gray-100 text-gray-400",
  rejected: "bg-red-500 text-white"
};

export const FormStage = ({index, title, description, isLast, children, orientation = "vertical", state = "current"}) => {
  const circle = (
    <div className={cn(
      "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold shrink-0",
      CIRCLE_STATE_CLASSES[state]
    )}>
      {state === "done" && <BsCheck size={16} />}
      {state === "rejected" && <BsX size={16} />}
      {(state === "current" || state === "upcoming") && index}
    </div>
  );
  const lineClassName = state === "done" ? "bg-theme" : "bg-gray-200";

  if (orientation === "horizontal") {
    return (
      <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
        <div className="relative w-full h-7 flex items-center justify-center">
          {!isLast && <div className={cn("absolute left-[calc(50%+22px)] top-1/2 w-[calc(100%-44px)] h-px -translate-y-1/2", lineClassName)} />}
          <div className="relative z-10">{circle}</div>
        </div>
        <div className="text-center px-1">
          <p className={cn("text-xs font-medium leading-tight", state === "upcoming" ? "text-gray-400" : "text-gray-700")}>
            {title}
          </p>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {circle}
        {!isLast && <div className={cn("w-px flex-1 my-2", lineClassName)} />}
      </div>
      <div className={cn("flex-1 min-w-0", !isLast && "pb-6")}>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-xs text-gray-400 mt-0.5 mb-3">{description}</p>}
        {children && <div className="flex flex-col gap-3">{children}</div>}
      </div>
    </div>
  );
};
