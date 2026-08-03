import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { ClassesList } from "./ClassesList";
import { ClassDisplay } from "./ClassDisplay";
import { NewClassForm } from "./NewClassForm";
import { Button } from "../../components/Button";
import { FaPlus } from "react-icons/fa";

const NEW_CLASS_FORM_ID = "new-class-form";

export const ClassesPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {classId} = useParams();
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isNewClassValid, setIsNewClassValid] = useState(false);

  const selectedClass = classes.find(c => c.classId === classId);
  const setSelectedClass = (classId) => {
    navigate(`/classes/${classId}`);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await requestGet("/classes", token);
      setClasses(classes);
    };
    fetchClasses();
  }, [token]);

  return (
    <>
      <div className="flex h-full min-h-0 justify-between items-center">
        <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full min-h-0 w-full">
          <ClassesList classes={classes} onSelect={setSelectedClass} selectedClassId={classId} />
          <ClassDisplay clazz={selectedClass} />
          <Button
            className="fixed bottom-10 right-10 px-4 py-2 rounded-md shadow-lg cursor-pointer"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <div className="flex justify-between items-center gap-4">
              <p>New class</p>
              <FaPlus />
            </div>
          </Button>
        </div>
      </div>
      {
        showModal &&
        <Modal
          title="Create New Class"
          onClose={() => setShowModal(false)}
          submitLabel="Create"
          submitFormId={NEW_CLASS_FORM_ID}
          submitDisabled={!isNewClassValid}
        >
          <NewClassForm
            formId={NEW_CLASS_FORM_ID}
            onValidityChange={setIsNewClassValid}
          />
        </Modal>
      }
    </>
  );
};