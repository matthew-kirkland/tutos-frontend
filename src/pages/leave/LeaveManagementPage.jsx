import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../components/Toast";
import { LeaveRequestsList } from "./LeaveRequestsList";
import { LeaveRequestDisplay } from "./LeaveRequestDisplay";
import { MOCK_LEAVE_REQUESTS } from "./mockLeaveData";

export const LeaveManagementPage = () => {
  const navigate = useNavigate();
  const {leaveId} = useParams();
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedRequest = requests.find(r => r.leaveId === leaveId) ?? requests[0];
  const setSelectedLeaveId = (id) => {
    navigate(`/leave-management/${id}`);
  };

  const updateRequest = (leaveId, updates) => {
    setRequests(prev => prev.map(r => r.leaveId === leaveId ? {...r, ...updates} : r));
  };

  return (
    <>
      <div className="flex h-full min-h-0 justify-between items-center">
        <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full min-h-0 w-full">
          <LeaveRequestsList
            requests={requests}
            onSelect={setSelectedLeaveId}
            selectedLeaveId={selectedRequest?.leaveId}
          />
          <LeaveRequestDisplay
            key={selectedRequest?.leaveId}
            request={selectedRequest}
            onUpdate={updateRequest}
            onNotify={setToastMessage}
          />
        </div>
      </div>
      {
        toastMessage &&
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          className="min-w-48 top-20 right-4 bg-green-600 text-white text-sm px-4 py-2 transition-transform duration-300 ease-out"
        />
      }
    </>
  );
};