import { Fragment } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { cn } from "../../utils/cn.js";

export const Stepper = ({steps}) => (
  <div className="flex items-start w-full">
    {steps.map((step, i) => (
      <Fragment key={step.label}>
        <div className="flex flex-col items-center gap-1.5 w-28 shrink-0">
          <div className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
            step.state === "done" && "bg-theme text-white",
            step.state === "current" && "bg-white border-2 border-theme text-theme",
            step.state === "upcoming" && "bg-gray-100 text-gray-400",
            step.state === "rejected" && "bg-red-500 text-white"
          )}>
            {step.state === "done" && <BsCheck size={16} />}
            {step.state === "rejected" && <BsX size={16} />}
            {(step.state === "current" || step.state === "upcoming") && i + 1}
          </div>
          <p className={cn(
            "text-xs text-center leading-tight",
            step.state === "upcoming" ? "text-gray-400" : "text-gray-700 font-medium"
          )}>
            {step.label}
          </p>
        </div>
        {
          i < steps.length - 1 &&
          <div className={cn("h-px flex-1 mt-3.5", step.state === "done" ? "bg-theme" : "bg-gray-200")} />
        }
      </Fragment>
    ))}
  </div>
);
