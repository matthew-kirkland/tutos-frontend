export const STATUS_META = {
  PENDING: {label: "Pending", badgeClassName: "bg-amber-100 text-amber-700", accentClassName: "border-l-amber-400"},
  APPROVED: {label: "Approved", badgeClassName: "bg-emerald-100 text-emerald-700", accentClassName: "border-l-emerald-400"},
  REJECTED: {label: "Rejected", badgeClassName: "bg-red-100 text-red-700", accentClassName: "border-l-red-400"},
  COMPLETED: {label: "Completed", badgeClassName: "bg-gray-200 text-gray-600", accentClassName: "border-l-gray-300"}
};

export const STATUS_PRIORITY = {PENDING: 0, APPROVED: 1, COMPLETED: 2, REJECTED: 3};

export const areNotesComplete = (sessions) => sessions.every(s => s.notes?.trim());

export const getSteps = (request) => {
  if (request.status === "REJECTED") {
    return [
      {label: "Requested", state: "done"},
      {label: "Rejected", state: "rejected"}
    ];
  }
  if (request.status === "PENDING") {
    return [
      {label: "Requested", state: "done"},
      {label: "Approved & tutors assigned", state: "current"},
      {label: "Notes added", state: "upcoming"},
      {label: "Completed", state: "upcoming"}
    ];
  }
  const notesComplete = areNotesComplete(request.sessions);
  return [
    {label: "Requested", state: "done"},
    {label: "Approved & tutors assigned", state: "done"},
    {label: "Notes added", state: notesComplete ? "done" : "current"},
    {label: "Completed", state: request.status === "COMPLETED" ? "done" : "upcoming"}
  ];
};

const dateOnly = (dateStr) => new Date(`${dateStr}T00:00:00`);

export const formatDateShort = (dateStr) =>
  dateOnly(dateStr).toLocaleDateString(undefined, {day: "numeric", month: "short"});

export const formatDateRange = (startDate, endDate) => {
  if (startDate === endDate) {
    return dateOnly(startDate).toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
  }
  const end = dateOnly(endDate).toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
  return `${formatDateShort(startDate)} – ${end}`;
};

export const formatSessionDate = (dateStr) =>
  dateOnly(dateStr).toLocaleDateString(undefined, {weekday: "short", day: "numeric", month: "short"});
