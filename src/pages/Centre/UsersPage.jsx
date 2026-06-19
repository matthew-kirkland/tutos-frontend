import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { BsEnvelopeAt, BsFilterRight, BsTelephone } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userId} = useParams();
  const [users, setUsers] = useState([]);
  const selectedUser = users.find(u => u.userId === userId);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await requestGet("/users", token);
      setUsers(users);
    };
    fetchUsers();
  }, [token]);
  return (
    <div className="flex h-full justify-between items-center">
      <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full w-full">
        <div className="row-span-1 col-span-1 border-b border-r border-gray-300">
          <div className="h-full px-3 mx-2 flex justify-between items-center">
            <p className="font-light text-gray-700 text-md">Users</p>
            <BsFilterRight className="cursor-pointer" title="Filter" />
          </div>
        </div>
        <div className="row-span-23 col-span-1 flex h-full flex-col border-r border-r-gray-300 py-2 overflow-auto">
          {users.map(u => (
            <div
              key={u.userId}
              onClick={() => navigate(`/users/${u.userId}`)}
              className={`flex flex-col gap-1 px-3 py-2 mx-2 rounded-md ${u.userId === userId ? "bg-theme-transparent" : "hover:bg-gray-100"} cursor-pointer`}
            >
              <div className="flex flex-row items-center gap-2 justify-between">
                <p className="font-medium text-lg text-gray-900">{u.nameFirst} {u.nameLast}</p>
                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">role</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-sm text-gray-500">
                <BsEnvelopeAt />
                <p>{u.email}</p>
              </div>
              <div className="flex flex-row items-center gap-2 text-sm text-gray-500">
                <BsTelephone />
                <p>{u.phone}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row-span-1 col-span-5 border-b border-gray-300">
          <div className="h-full px-3 mx-2 flex justify-between items-center">
            <p className="font-light text-gray-700 text-md">{selectedUser ? selectedUser.nameFirst + " " + selectedUser.nameLast : ""}</p>
          </div>
        </div>
        <div className="row-span-23 col-span-5 flex h-full w-full justify-center items-center">
          main area
        </div>
      </div>
    </div>
  );
};