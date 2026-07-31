import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { requestGet } from "../../utils/helpers";
import { BsEnvelopeAt, BsTelephone } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { ClassesList } from "./ClassesList";
import { ClassDisplay } from "./ClassDisplay";

export const ClassesPage = () => {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const {classId} = useParams();
  const [classes, setClasses] = useState([]);

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
    <div className="flex h-full min-h-0 justify-between items-center">
      <div className="grid grid-rows-24 grid-cols-6 grid-flow-col h-full min-h-0 w-full">
        <ClassesList classes={classes} onSelect={setSelectedClass} selectedClassId={classId} />
        <ClassDisplay clazz={selectedClass} />
      </div>
    </div>
  );
};