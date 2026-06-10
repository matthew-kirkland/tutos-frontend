import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";

const STATUS_STYLES = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const fmt = (iso, opts) => new Date(iso).toLocaleString([], opts);

export const CalendarPage = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [popover, setPopover] = useState(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const classes = await requestGet("/classes", token);
        const sessionsByClass = await Promise.all(
          classes.map(cls =>
            requestGet(`/classes/${cls.classId}/sessions`, token)
              .then(sessions =>
                sessions.map(session => ({
                  id: session.classSessionId,
                  title: cls.title,
                  start: session.startTime,
                  end: session.endTime,
                  extendedProps: { description: cls.description, status: session.status, notes: session.notes },
                }))
              )
          )
        );
        setEvents(sessionsByClass.flat());
      } catch (err) {
        console.error("Failed to load sessions:", err);
      }
    };

    fetchSessions();
  }, [token]);

  const handleEventClick = useCallback(({ event, el }) => {
    const rect = el.getBoundingClientRect();
    setPopover(prev => {
      if (prev?.eventId === event.id) return null;
      return {
        eventId: event.id,
        title: event.title,
        desc: event.extendedProps.description,
        start: event.startStr,
        end: event.endStr,
        status: event.extendedProps.status,
        notes: event.extendedProps.notes,
        top: rect.bottom + 6,
        left: Math.min(rect.left, window.innerWidth - 272),
      };
    });
  }, []);

  // Close when clicking outside the popover (but not on an event — eventClick handles that)
  useEffect(() => {
    const onMouseDown = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        !e.target.closest(".fc-event")
      ) {
        setPopover(null);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div className="flex h-full justify-between items-center">
      <div className="w-3/4 h-full p-8">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          firstDay={1}
          height="100%"
          expandRows={true}
          eventClick={handleEventClick}
        />
      </div>

      {popover && (
        <div
          ref={popoverRef}
          style={{ top: popover.top, left: popover.left }}
          className="fixed z-50 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-4 text-sm"
        >
          <p className="font-semibold text-gray-900 text-black mb-1">{popover.title}</p>
          <p className="text-gray-500 mb-1">
            {fmt(popover.start, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <span>{fmt(popover.start, { hour: "2-digit", minute: "2-digit" })}</span>
            <span className="text-gray-400">→</span>
            <span>{popover.end ? fmt(popover.end, { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
          </div>
          <p className="text-black mb-3 pt-2 border-t border-t-gray-300">{popover.desc}</p>
          {popover.status && (
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[popover.status] ?? "bg-gray-100 text-gray-600"}`}>
              {popover.status.charAt(0) + popover.status.slice(1).toLowerCase()}
            </span>
          )}
          {popover.notes && (
            <p className="mt-2 text-gray-600 border-t border-gray-100 pt-2 whitespace-pre-wrap">
              {popover.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
