import { BsFilterRight } from "react-icons/bs";
import { LIST_CARD_HEIGHT } from "../../utils/listCard.js";
import { STATUS_META, STATUS_PRIORITY, formatDateRange } from "./leaveUtils.js";
import { cn } from "../../utils/cn.js";

export const LeaveRequestsList = ({requests, onSelect, selectedLeaveId}) => {
  const sorted = [...requests].sort((a, b) => {
    const byStatus = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    return byStatus !== 0 ? byStatus : a.startDate.localeCompare(b.startDate);
  });

  return (
    <>
      <div className="row-span-1 col-span-1 border-b border-r border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">Leave</p>
          <BsFilterRight className="cursor-pointer" title="Filter" />
        </div>
      </div>
      <div className="row-span-23 col-span-1 flex h-full flex-col border-r border-r-gray-300 py-2 overflow-auto">
        {sorted.map(r => {
          const meta = STATUS_META[r.status];
          return (
            <div
              key={r.leaveId}
              onClick={() => onSelect(r.leaveId)}
              className={cn(
                "flex flex-col justify-center gap-1 border-l-4 px-3 mx-2 rounded-md cursor-pointer",
                LIST_CARD_HEIGHT,
                "shrink-0",
                meta.accentClassName,
                r.leaveId === selectedLeaveId ? "bg-theme-transparent" : "hover:bg-gray-100"
              )}
            >
              <div className="flex flex-row items-center gap-2 justify-between">
                <p className="font-medium text-lg text-gray-900 truncate min-w-0">{r.tutorName}</p>
                <span className={cn("shrink-0 text-xs font-medium px-1.5 py-0.5 rounded", meta.badgeClassName)}>
                  {meta.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate min-w-0">{formatDateRange(r.startDate, r.endDate)}</p>
              <p className="text-xs text-gray-400 truncate min-w-0">
                {r.sessions.length} session{r.sessions.length === 1 ? "" : "s"} affected
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
