import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { Toast } from "../../components/Toast";
import { UsersList } from "./UsersList";
import { UserDisplay } from "./UserDisplay";
import { NewUserForm } from "./NewUserForm";
import { Button } from "../../components/Button";
import { FaPlus } from "react-icons/fa";

const NEW_USER_FORM_ID = "new-user-form";

export const UsersPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {userId} = useParams();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNewUserValid, setIsNewUserValid] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedUser = users.find(u => u.userId === userId);
  const setSelectedUser = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleUserCreated = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    setShowModal(false);
    setSelectedUser(newUser.userId);
    setToastMessage("User created");
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
      <div className="flex h-full min-h-0 justify-between items-center">
        <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full min-h-0 w-full">
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
        <Modal
          title="Create New User"
          onClose={() => setShowModal(false)}
          submitLabel="Create"
          submitFormId={NEW_USER_FORM_ID}
          submitDisabled={!isNewUserValid}
        >
          <NewUserForm
            formId={NEW_USER_FORM_ID}
            onValidityChange={setIsNewUserValid}
            onCreated={handleUserCreated}
          />
        </Modal>
      }
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