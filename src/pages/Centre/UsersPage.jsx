import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { BsEnvelopeAt, BsTelephone } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userId} = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await requestGet("/users", token);
      setUsers(users);
    };
    fetchUsers();
  }, [token]);
  return (
    <div className="flex h-full justify-between items-center">
      <div className="flex h-full w-1/4 flex-col border-r border-r-gray-300 overflow-auto">
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
      <div className="flex h-full w-full justify-center items-center">
        main area
      </div>
    </div>
  );
};