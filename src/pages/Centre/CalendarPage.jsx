import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { CalendarToolbar } from "../../components/calendar/CalendarToolbar";
import { SessionPopover } from "../../components/calendar/SessionPopover";

export const CalendarPage = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [popover, setPopover] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [activeView, setActiveView] = useState("dayGridMonth");

  const calendarRef = useRef(null);
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
        console.log("Failed to load sessions:", err);
      }
    };
    fetchSessions();
  }, [token]);

  const handleDatesSet = useCallback(({ view }) => {
    setViewDate(view.currentStart);
    setActiveView(view.type);
  }, []);

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
      <div className="w-3/4 h-full p-8 flex flex-col">
        <CalendarToolbar
          calendarRef={calendarRef}
          viewDate={viewDate}
          activeView={activeView}
        />
        <div className="flex-1 min-h-0">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            firstDay={1}
            height="100%"
            expandRows={true}
            headerToolbar={false}
            datesSet={handleDatesSet}
            eventClick={handleEventClick}
          />
        </div>
      </div>

      {popover && <SessionPopover ref={popoverRef} popover={popover} />}
    </div>
  );
};
