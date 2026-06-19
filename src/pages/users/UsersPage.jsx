import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { UsersList } from "./UsersList";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userId} = useParams();
  const [users, setUsers] = useState([]);

  const selectedUser = users.find(u => u.userId === userId);
  const setSelectedUser = (userId) => {
    navigate(`/users/${userId}`);
  };

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
        <UsersList users={users} onSelect={setSelectedUser} selectedUserId={userId} />
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