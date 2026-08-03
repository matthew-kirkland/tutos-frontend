import { useState } from "react";
import { BsCalendarRange, BsPeople } from "react-icons/bs";
import { FormSelect } from "../../components/FormSelect";
import { Button } from "../../components/Button";
import { FormStage } from "../../components/FormStage";
import { MOCK_TUTORS } from "./mockLeaveData";
import { STATUS_META, formatDateRange, formatSessionDate, getSteps } from "./leaveUtils.js";
import { cn } from "../../utils/cn.js";

export const LeaveRequestDisplay = ({request, onUpdate, onNotify}) => {
  const [replacements, setReplacements] = useState(
    () => Object.fromEntries((request?.sessions ?? []).map(s => [s.classSessionId, s.replacementTutor]))
  );
  const [notes, setNotes] = useState(
    () => Object.fromEntries((request?.sessions ?? []).map(s => [s.classSessionId, s.notes]))
  );

  if (!request) {
    return (
      <>
        <div className="row-span-1 col-span-5 border-b border-gray-300" />
        <div className="row-span-23 col-span-5 h-full w-full" />
      </>
    );
  }

  const meta = STATUS_META[request.status];
  const steps = getSteps(request);
  const canApprove = request.sessions.every(s => replacements[s.classSessionId]);

  const handleReject = () => {
    onUpdate(request.leaveId, {status: "REJECTED"});
    onNotify?.("Leave request rejected");
  };

  const handleApprove = () => {
    const sessions = request.sessions.map(s => ({...s, replacementTutor: replacements[s.classSessionId]}));
    onUpdate(request.leaveId, {status: "APPROVED", sessions});
    onNotify?.("Leave approved and tutors assigned");
  };

  const handleSaveNotes = () => {
    const sessions = request.sessions.map(s => ({...s, notes: notes[s.classSessionId] ?? ""}));
    onUpdate(request.leaveId, {sessions});
    onNotify?.("Notes saved");
  };

  return (
    <>
      <div className="row-span-1 col-span-5 border-b border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md truncate min-w-0">{request.tutorName}'s leave</p>
        </div>
      </div>
      <div className="row-span-23 col-span-5 h-full w-full overflow-auto">
        <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-8">
          <div>
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-200">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-gray-900 break-words">{request.tutorName}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <BsCalendarRange className="text-gray-400 shrink-0" />
                  <p>{formatDateRange(request.startDate, request.endDate)}</p>
                </div>
              </div>
              <span className={cn("shrink-0 text-xs font-medium px-2 py-1 rounded", meta.badgeClassName)}>
                {meta.label}
              </span>
            </div>
            {
              request.reason &&
              <p className="text-sm text-gray-600 mt-4">{request.reason}</p>
            }
          </div>

          <div className="rounded-lg px-6 py-5 bg-gray-100">
            <div className="flex items-start w-full">
              {steps.map((step, i) => (
                <FormStage
                  key={step.label}
                  orientation="horizontal"
                  index={i + 1}
                  title={step.label}
                  state={step.state}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          </div>

          {
            request.status === "REJECTED"
            ?
              <p className="text-sm text-gray-500">
                This leave request was rejected. No classes were reassigned and nothing has changed.
              </p>
            :
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <BsPeople className="text-gray-400" />
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Affected sessions ({request.sessions.length})
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  {request.sessions.map(s => (
                    <div key={s.classSessionId} className="border border-gray-200 rounded-md px-4 py-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{s.classTitle}</p>
                          <p className="text-xs text-gray-500">{formatSessionDate(s.date)} · {s.startTime}–{s.endTime}</p>
                        </div>
                        {
                          request.status === "PENDING"
                          ?
                            <FormSelect
                              options={MOCK_TUTORS.filter(t => t !== request.tutorName)}
                              value={replacements[s.classSessionId]}
                              onChange={(t) => setReplacements(prev => ({...prev, [s.classSessionId]: t}))}
                              placeholder="Select replacement"
                              wrapperClassName="w-52 shrink-0"
                              buttonClassName="w-full h-[35px] bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50"
                              menuClassName="w-full bg-white border border-gray-200 rounded-md max-h-48 overflow-auto p-1"
                              optionClassName="px-3 py-2 text-sm rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
                            />
                          :
                            <span className="shrink-0 text-xs font-medium bg-theme-transparent text-theme px-2 py-1 rounded">
                              Covered by {s.replacementTutor}
                            </span>
                        }
                      </div>
                      {
                        request.status !== "PENDING" &&
                        <textarea
                          className="w-full rounded-md border border-gray-300 focus:border-theme focus:outline-none p-2 text-sm resize-none"
                          rows={2}
                          placeholder="Notes for the replacement tutor..."
                          value={notes[s.classSessionId] ?? ""}
                          onChange={e => setNotes(prev => ({...prev, [s.classSessionId]: e.target.value}))}
                        />
                      }
                    </div>
                  ))}
                </div>
              </div>
          }

          {
            request.status === "PENDING" &&
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                className="px-4 py-2 text-sm rounded-md cursor-pointer"
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="primary"
                className="px-4 py-2 text-sm rounded-md cursor-pointer"
                disabled={!canApprove}
                onClick={handleApprove}
              >
                Approve
              </Button>
            </div>
          }
          {
            request.status === "APPROVED" &&
            <div className="flex justify-end">
              <Button
                type="button"
                variant="primary"
                className="px-4 py-2 text-sm rounded-md cursor-pointer"
                onClick={handleSaveNotes}
              >
                Save notes
              </Button>
            </div>
          }
          {
            request.status === "COMPLETED" &&
            <p className="text-sm text-gray-500">
              All sessions have passed and notes are complete. This request will be automatically removed.
            </p>
          }
        </div>
      </div>
    </>
  );
};