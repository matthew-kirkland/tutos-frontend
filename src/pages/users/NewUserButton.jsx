import { FaPlus } from "react-icons/fa6";
import { Button } from "../../components/Button";

export const NewUserButton = ({onClick}) => {
  return (
    <Button
      className="fixed bottom-10 right-10 px-4 py-2 rounded-md shadow-lg cursor-pointer"
      variant="primary"
      onClick={onClick}
    >
      <div className="flex justify-between items-center gap-4">
        <p>New user</p>
        <FaPlus />
      </div>
    </Button>
  );
};