import { forwardRef } from "react";

const STATUS_STYLES = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const fmt = (iso, opts) => new Date(iso).toLocaleString([], opts);

export const SessionPopover = forwardRef(({ popover }, ref) => (
  <div
    ref={ref}
    style={{ top: popover.top, left: popover.left }}
    className="fixed z-50 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-4 text-sm"
  >
    <p className="font-semibold text-black mb-1 truncate">{popover.title}</p>
    <p className="text-gray-500 mb-1">
      {fmt(popover.start, { weekday: "long", month: "long", day: "numeric" })}
    </p>
    <div className="flex items-center gap-2 text-gray-700 mb-3">
      <span>{fmt(popover.start, { hour: "2-digit", minute: "2-digit" })}</span>
      <span className="text-gray-400">→</span>
      <span>{popover.end ? fmt(popover.end, { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
    </div>
    {
      popover.desc &&
      <p className="text-black mb-3 pt-2 border-t border-gray-200 line-clamp-3">{popover.desc}</p>
    }
    {
      popover.status &&
      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[popover.status] ?? "bg-gray-100 text-gray-600"}`}>
        {popover.status.charAt(0) + popover.status.slice(1).toLowerCase()}
      </span>
    }
    {
      popover.notes &&
      <p className="mt-2 text-gray-600 border-t border-gray-100 pt-2 whitespace-pre-wrap">
        {popover.notes}
      </p>
    }
  </div>
));

SessionPopover.displayName = "SessionPopover";
