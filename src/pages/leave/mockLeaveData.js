export const MOCK_TUTORS = ["Karen Tutor", "Ethan Sanchez", "Terry Perkins", "Priya Natarajan", "Miles Obi"];

export const MOCK_LEAVE_REQUESTS = [
  {
    leaveId: "leave-1",
    tutorName: "Karen Tutor",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    status: "PENDING",
    reason: "Family emergency overseas",
    sessions: [
      {classSessionId: "s1", classTitle: "Year 8 English", date: "2026-08-10", startTime: "16:00", endTime: "17:00", replacementTutor: null, notes: ""},
      {classSessionId: "s2", classTitle: "Year 8 English", date: "2026-08-12", startTime: "16:00", endTime: "17:00", replacementTutor: null, notes: ""},
      {classSessionId: "s3", classTitle: "Year 8 English", date: "2026-08-14", startTime: "16:00", endTime: "17:00", replacementTutor: null, notes: ""}
    ]
  },
  {
    leaveId: "leave-2",
    tutorName: "Terry Perkins",
    startDate: "2026-08-05",
    endDate: "2026-08-07",
    status: "APPROVED",
    reason: "Medical appointment",
    sessions: [
      {classSessionId: "s4", classTitle: "Year 10 Maths", date: "2026-08-05", startTime: "17:00", endTime: "18:00", replacementTutor: "Ethan Sanchez", notes: "Covered chapter 4 exercises, all students on track."},
      {classSessionId: "s5", classTitle: "Year 10 Maths", date: "2026-08-07", startTime: "17:00", endTime: "18:00", replacementTutor: "Ethan Sanchez", notes: ""}
    ]
  },
  {
    leaveId: "leave-3",
    tutorName: "Ethan Sanchez",
    startDate: "2026-08-20",
    endDate: "2026-08-21",
    status: "REJECTED",
    reason: "Personal leave",
    sessions: [
      {classSessionId: "s6", classTitle: "Year 12 Chemistry", date: "2026-08-20", startTime: "15:00", endTime: "16:00", replacementTutor: null, notes: ""}
    ]
  },
  {
    leaveId: "leave-4",
    tutorName: "Karen Tutor",
    startDate: "2026-07-20",
    endDate: "2026-07-22",
    status: "COMPLETED",
    reason: "Annual leave",
    sessions: [
      {classSessionId: "s7", classTitle: "Year 8 English", date: "2026-07-20", startTime: "16:00", endTime: "17:00", replacementTutor: "Terry Perkins", notes: "Reviewed essay structure, homework set for next week."},
      {classSessionId: "s8", classTitle: "Year 8 English", date: "2026-07-22", startTime: "16:00", endTime: "17:00", replacementTutor: "Terry Perkins", notes: "Practice test completed, results emailed to parents."}
    ]
  }
];
