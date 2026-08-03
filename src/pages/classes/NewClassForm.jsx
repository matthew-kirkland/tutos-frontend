import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { FormField } from "../../components/FormField";
import { FormSelect } from "../../components/FormSelect";
import { FormStage } from "../../components/FormStage";
import { Button } from "../../components/Button";
import { cn } from "../../utils/cn.js";

const TIME_INPUT_CLASS = "h-[35px] w-full rounded-md border border-gray-300 focus:border-theme p-2 text-sm";

const formatSessionDate = (dateStr) =>
  new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });

const ToggleGroup = ({options, value, onChange, multiple = false}) => {
  const isSelected = (optValue) => multiple ? value.includes(optValue) : value === optValue;
  const handleClick = (optValue) => {
    if (!multiple) {
      onChange(optValue);
      return;
    }
    onChange(isSelected(optValue) ? value.filter(v => v !== optValue) : [...value, optValue]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          type="button"
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          className={cn(
            "px-3 py-2 rounded-md border text-sm font-medium cursor-pointer transition-colors",
            isSelected(opt.value)
              ? "border-theme bg-theme-transparent text-theme"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export const NewClassForm = ({formId, onValidityChange}) => {
  const [classType, setClassType] = useState("Group");
  const [format, setFormat] = useState("Scheduled");

  const [startDate, setStartDate] = useState("");
  const [recurrence, setRecurrence] = useState("WEEKLY");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [sessions, setSessions] = useState([]);
  const [newSessionDate, setNewSessionDate] = useState("");
  const [applyStart, setApplyStart] = useState("");
  const [applyEnd, setApplyEnd] = useState("");

  const [students, setStudents] = useState(null);
  const [tutors, setTutors] = useState(null);

  const addSessionDate = () => {
    if (!newSessionDate || sessions.some(s => s.date === newSessionDate)) return;
    setSessions(prev => [...prev, {date: newSessionDate, start: "", end: ""}].sort((a, b) => a.date.localeCompare(b.date)));
    setNewSessionDate("");
  };

  const removeSessionDate = (date) => {
    setSessions(prev => prev.filter(s => s.date !== date));
  };

  const updateSessionTime = (date, field, value) => {
    setSessions(prev => prev.map(s => s.date === date ? {...s, [field]: value} : s));
  };

  const applyToAll = () => {
    setSessions(prev => prev.map(s => ({...s, start: applyStart, end: applyEnd})));
  };

  const isValid = format === "Scheduled"
    ? Boolean(startDate && recurrence && startTime && endTime)
    : sessions.length > 0 && sessions.every(s => s.start && s.end);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // submission is wired up once the class-creation endpoints exist
  };

  return (
    <div className="w-[800px]">
      <form id={formId} className="w-full flex flex-col" onSubmit={handleSubmit}>
        <FormStage
          index={1}
          title="Class type"
          description="Is this a group class or a private one-on-one class?"
          isLast={false}
        >
          <ToggleGroup
            options={[{value: "Group", label: "Group"}, {value: "Private", label: "Private"}]}
            value={classType}
            onChange={setClassType}
          />
        </FormStage>

        <FormStage
          index={2}
          title="Format"
          description="Does this run on an ongoing schedule, or just for a short term?"
          isLast={false}
        >
          <ToggleGroup
            options={[{value: "Scheduled", label: "Scheduled"}, {value: "Short-term", label: "Short-term"}]}
            value={format}
            onChange={setFormat}
          />
        </FormStage>

        <FormStage
          index={3}
          title="Timing"
          description={
            format === "Scheduled"
              ? "Set the recurring schedule for this class."
              : "Choose the days this class runs, and the times for each."
          }
          isLast={false}
        >
          {
            format === "Scheduled"
            ?
              <>
                <FormField
                  wrapperClassName="mb-0"
                  inputClassName="h-[35px] w-full rounded-md p-2 text-sm mt-1"
                  id="startDate"
                  label="Starting date"
                  type="date"
                  value={startDate}
                  onChangeFn={setStartDate}
                />
                <div className="w-full flex flex-col gap-1">
                  <p className="text-sm">Recurrence</p>
                  <ToggleGroup
                    options={[
                      {value: "WEEKLY", label: "Weekly"},
                      {value: "FORTNIGHTLY", label: "Fortnightly"},
                      {value: "MONTHLY", label: "Monthly"}
                    ]}
                    value={recurrence}
                    onChange={setRecurrence}
                  />
                </div>
                <div className="w-full flex gap-3">
                  <FormField
                    wrapperClassName="mb-0"
                    inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
                    id="startTime"
                    label="Start time"
                    type="time"
                    value={startTime}
                    onChangeFn={setStartTime}
                  />
                  <FormField
                    wrapperClassName="mb-0"
                    inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
                    id="endTime"
                    label="End time"
                    type="time"
                    value={endTime}
                    onChangeFn={setEndTime}
                  />
                </div>
              </>
            :
              <>
                <div className="w-full flex items-end gap-3">
                  <FormField
                    wrapperClassName="mb-0 flex-1"
                    inputClassName="h-[35px] w-full rounded-md p-2 text-sm mt-1"
                    id="newSessionDate"
                    label="Add a day"
                    type="date"
                    value={newSessionDate}
                    onChangeFn={setNewSessionDate}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-[35px] px-4 rounded-md text-sm cursor-pointer shrink-0"
                    onClick={addSessionDate}
                    disabled={!newSessionDate}
                  >
                    Add day
                  </Button>
                </div>

                {
                  sessions.length > 0 &&
                  <div className="w-full border border-gray-200 rounded-md overflow-hidden">
                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 border-b border-gray-200">
                      <p className="flex-1 min-w-0 text-xs font-semibold text-gray-500 uppercase tracking-wide">Apply to all</p>
                      <input
                        type="time"
                        className={cn(TIME_INPUT_CLASS, "w-28 shrink-0")}
                        value={applyStart}
                        onChange={e => setApplyStart(e.target.value)}
                      />
                      <span className="text-gray-400 text-sm shrink-0">to</span>
                      <input
                        type="time"
                        className={cn(TIME_INPUT_CLASS, "w-28 shrink-0")}
                        value={applyEnd}
                        onChange={e => setApplyEnd(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="shrink-0 text-xs px-3 py-1.5 rounded-md cursor-pointer"
                        onClick={applyToAll}
                        disabled={!applyStart || !applyEnd}
                      >
                        Apply
                      </Button>
                      <span className="w-[18px] shrink-0" />
                    </div>
                    <div className="flex flex-col divide-y divide-gray-100">
                      {sessions.map(s => (
                        <div key={s.date} className="flex items-center gap-3 px-3 py-2">
                          <p className="flex-1 min-w-0 text-sm text-gray-700 truncate">{formatSessionDate(s.date)}</p>
                          <input
                            type="time"
                            className={cn(TIME_INPUT_CLASS, "w-28 shrink-0")}
                            value={s.start}
                            onChange={e => updateSessionTime(s.date, "start", e.target.value)}
                          />
                          <span className="text-gray-400 text-sm shrink-0">to</span>
                          <input
                            type="time"
                            className={cn(TIME_INPUT_CLASS, "w-28 shrink-0")}
                            value={s.end}
                            onChange={e => updateSessionTime(s.date, "end", e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => removeSessionDate(s.date)}
                            className="shrink-0 text-gray-400 hover:text-red-500 cursor-pointer"
                            aria-label={`Remove ${formatSessionDate(s.date)}`}
                          >
                            <BsX size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </>
          }
        </FormStage>

        <FormStage
          index={4}
          title="Students & tutors (optional)"
          description="Optional for now — you can always add people to the class later."
          isLast={true}
        >
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">{classType === "Private" ? "Student" : "Students"}</p>
            <FormSelect
              options={[]}
              value={students}
              onChange={setStudents}
              placeholder={classType === "Private" ? "Select a student" : "Select students"}
              wrapperClassName="w-full"
              buttonClassName="w-full h-[38px] bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50"
              menuClassName="w-full bg-white border border-gray-200 rounded-md max-h-60 overflow-auto p-1"
              optionClassName="px-3 py-2 text-sm rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
            />
            <p className="text-xs text-gray-400">
              {classType === "Private" ? "Private classes can only have one student." : "Group classes can have any number of students."}
            </p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">Tutors</p>
            <FormSelect
              options={[]}
              value={tutors}
              onChange={setTutors}
              placeholder="Select tutors"
              wrapperClassName="w-full"
              buttonClassName="w-full h-[38px] bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50"
              menuClassName="w-full bg-white border border-gray-200 rounded-md max-h-60 overflow-auto p-1"
              optionClassName="px-3 py-2 text-sm rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
            />
          </div>
        </FormStage>
      </form>
    </div>
  );
};
