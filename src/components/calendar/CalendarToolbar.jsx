import { useEffect, useRef, useState } from "react";
import { Button } from "../buttons/Button";

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
        <Button
          className="ml-1 px-3 py-1 text-sm rounded-sm border border-gray-300 cursor-pointer"
          variant="transparent"
          onClick={() => getApi()?.today()}
        >
          Today
        </Button>
        <Button
          className="px-2 py-1 rounded hover:secondary-hover text-gray-600 text-xl leading-none cursor-pointer"
          variant="transparent"
          onClick={() => getApi()?.prev()}
        >
          ‹
        </Button>
        <Button
          className="px-2 py-1 rounded hover:secondary-hover text-gray-600 text-xl leading-none cursor-pointer"
          variant="transparent"
          onClick={() => getApi()?.next()}
        >
          ›
        </Button>
      </div>
      <div className="relative" ref={pickerRef}>
        <Button
          className="text-2xl font-bold text-gray-800 hover:text-theme transition-colors cursor-pointer"
          onClick={() => {
            setPickerYear(viewDate.getFullYear());
            setShowPicker(p => !p);
          }}
        >
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </Button>
        {
          showPicker &&
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-52">
            <div className="flex items-center justify-between mb-2 px-1">
              <Button
                onClick={() => setPickerYear(y => y - 1)}
                className="px-2 py-1 rounded hover:secondary-hover text-gray-600 cursor-pointer"
                variant="transparent"
              >
                ‹
              </Button>
              <span className="font-semibold text-gray-800">{pickerYear}</span>
              <Button
                onClick={() => setPickerYear(y => y + 1)}
                className="px-2 py-1 rounded hover:secondary-hover text-gray-600 cursor-pointer"
                variant="transparent"
              >
                ›
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {MONTHS.map((m, i) => (
                <Button
                  key={m}
                  onClick={() => {
                    getApi()?.gotoDate(new Date(pickerYear, i, 1));
                    setShowPicker(false);
                  }}
                  className={`py-1.5 text-sm rounded transition-colors cursor-pointer ${
                    pickerYear === viewDate.getFullYear() && i === viewDate.getMonth()
                      ? "bg-theme text-white"
                      : "hover:secondary-hover text-gray-700"
                  }`}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="flex rounded-sm border border-gray-300 overflow-hidden text-sm">
        {VIEWS.map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => getApi()?.changeView(key)}
            className={`px-3 py-1 transition-colors cursor-pointer min-w-16 ${
              activeView === key
                ? "bg-theme text-white"
                : "bg-white text-black hover:bg-[#F3F4F6]"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
