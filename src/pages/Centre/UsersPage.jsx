import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await requestGet("/users", token);
      setUsers(users);
    };
    fetchUsers();
  }, [token])
  return (
    <div className="flex h-full justify-between items-center">
      <div className="flex h-full w-1/4 flex-col border-r border-r-black overflow-auto">
        {users.map(u => (
          <div className="flex flex-col justify-start items-start border w-full min-h-1/6">
            <p>{u.nameFirst} {u.nameLast}</p>
            <p>{u.email}</p>
            <p>{u.phone}</p>
          </div>
        ))}
      </div>
      <div className="flex h-full w-full justify-center items-center">
        main area
      </div>
    </div>
  );
};