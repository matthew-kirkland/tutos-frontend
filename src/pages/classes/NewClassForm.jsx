import { useEffect, useState } from "react";
import { FormField } from "../../components/FormField";
import { FormSelect } from "../../components/FormSelect";
import { FormStage } from "../../components/FormStage";
import { cn } from "../../utils/cn.js";

const DAY_OPTIONS = [
  {value: "MON", label: "Mon"},
  {value: "TUE", label: "Tue"},
  {value: "WED", label: "Wed"},
  {value: "THU", label: "Thu"},
  {value: "FRI", label: "Fri"},
  {value: "SAT", label: "Sat"},
  {value: "SUN", label: "Sun"}
];
const DAY_ORDER = DAY_OPTIONS.map(d => d.value);
const DAY_LABELS = Object.fromEntries(DAY_OPTIONS.map(d => [d.value, d.label]));

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

  const [selectedDays, setSelectedDays] = useState([]);
  const [dayTimes, setDayTimes] = useState({});

  const [students, setStudents] = useState(null);
  const [tutors, setTutors] = useState(null);

  const orderedSelectedDays = DAY_ORDER.filter(day => selectedDays.includes(day));

  const updateDayTime = (day, field, value) => {
    setDayTimes(prev => ({...prev, [day]: {...prev[day], [field]: value}}));
  };

  const applyToAll = () => {
    const [templateDay, ...rest] = orderedSelectedDays;
    if (!templateDay) return;
    const template = dayTimes[templateDay] ?? {start: "", end: ""};
    setDayTimes(prev => {
      const next = {...prev};
      rest.forEach(day => { next[day] = {...template}; });
      return next;
    });
  };

  const isValid = format === "Scheduled"
    ? Boolean(startDate && recurrence && startTime && endTime)
    : orderedSelectedDays.length > 0 && orderedSelectedDays.every(day => dayTimes[day]?.start && dayTimes[day]?.end);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // submission is wired up once the class-creation endpoints exist
  };

  return (
    <div className="w-[600px]">
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
                  inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
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
                <ToggleGroup options={DAY_OPTIONS} value={selectedDays} onChange={setSelectedDays} multiple />
                {
                  orderedSelectedDays.length > 0 &&
                  <div className="flex flex-col gap-2">
                    {
                      orderedSelectedDays.length > 1 &&
                      <button
                        type="button"
                        onClick={applyToAll}
                        className="self-start text-xs font-medium text-theme hover:underline cursor-pointer"
                      >
                        Apply first day's times to all
                      </button>
                    }
                    {orderedSelectedDays.map(day => (
                      <div key={day} className="flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2">
                        <p className="w-10 text-sm font-medium text-gray-700 shrink-0">{DAY_LABELS[day]}</p>
                        <FormField
                          wrapperClassName="mb-0"
                          inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
                          id={`day-${day}-start`}
                          type="time"
                          value={dayTimes[day]?.start ?? ""}
                          onChangeFn={v => updateDayTime(day, "start", v)}
                        />
                        <span className="text-gray-400 text-sm shrink-0">to</span>
                        <FormField
                          wrapperClassName="mb-0"
                          inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
                          id={`day-${day}-end`}
                          type="time"
                          value={dayTimes[day]?.end ?? ""}
                          onChangeFn={v => updateDayTime(day, "end", v)}
                        />
                      </div>
                    ))}
                  </div>
                }
              </>
          }
        </FormStage>

        <FormStage
          index={4}
          title="Students & tutors"
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
