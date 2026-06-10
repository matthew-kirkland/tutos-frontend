import { useEffect, useRef, useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const VIEWS = [
  { key: "dayGridMonth", label: "Month" },
  { key: "timeGridWeek", label: "Week" },
  { key: "timeGridDay", label: "Day" },
];

export const CalendarToolbar = ({ calendarRef, viewDate, activeView }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(viewDate.getFullYear());
  const pickerRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const getApi = () => calendarRef.current?.getApi();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-1">
        <button
          onClick={() => getApi()?.prev()}
          className="px-2 py-1 rounded hover:bg-gray-100 text-gray-600 text-xl leading-none"
        >
          ‹
        </button>
        <button
          onClick={() => getApi()?.next()}
          className="px-2 py-1 rounded hover:bg-gray-100 text-gray-600 text-xl leading-none"
        >
          ›
        </button>
        <button
          onClick={() => getApi()?.today()}
          className="ml-1 px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 text-gray-700"
        >
          Today
        </button>
      </div>
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => {
            setPickerYear(viewDate.getFullYear());
            setShowPicker(p => !p);
          }}
          className="text-2xl font-bold text-gray-800 hover:text-theme transition-colors"
        >
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </button>
        {
          showPicker &&
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-52">
            <div className="flex items-center justify-between mb-2 px-1">
              <button
                onClick={() => setPickerYear(y => y - 1)}
                className="px-2 py-1 rounded hover:bg-gray-100 text-gray-600"
              >
                ‹
              </button>
              <span className="font-semibold text-gray-800">{pickerYear}</span>
              <button
                onClick={() => setPickerYear(y => y + 1)}
                className="px-2 py-1 rounded hover:bg-gray-100 text-gray-600"
              >
                ›
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => {
                    getApi()?.gotoDate(new Date(pickerYear, i, 1));
                    setShowPicker(false);
                  }}
                  className={`py-1.5 text-sm rounded transition-colors ${
                    pickerYear === viewDate.getFullYear() && i === viewDate.getMonth()
                      ? "bg-theme text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="flex rounded border border-gray-300 overflow-hidden text-sm">
        {VIEWS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => getApi()?.changeView(key)}
            className={`px-3 py-1 transition-colors ${
              activeView === key
                ? "bg-theme text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
