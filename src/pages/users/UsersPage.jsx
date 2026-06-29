import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { UsersList } from "./UsersList";
import { UserDisplay } from "./UserDisplay";
import { NewUserForm } from "./NewUserForm";
import { Button } from "../../components/Button";
import { FaPlus } from "react-icons/fa";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userId} = useParams();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    <>
      <div className="flex h-full justify-between items-center">
        <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full w-full">
          <UsersList users={users} onSelect={setSelectedUser} selectedUserId={userId} />
          <UserDisplay user={selectedUser} />
          <Button
            className="fixed bottom-10 right-10 px-4 py-2 rounded-md shadow-lg cursor-pointer"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <div className="flex justify-between items-center gap-4">
              <p>New user</p>
              <FaPlus />
            </div>
          </Button>
        </div>
      </div>
      {
        showModal &&
        <Modal title="Create New User" onClose={() => setShowModal(false)}>
          <NewUserForm />
        </Modal>
      }
    </>
  );
};