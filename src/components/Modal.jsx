import { Button } from "./Button";

export const Modal = ({title, onSuccess, onClose, children}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-semibold pb-4">{title}</h2>
        {children}
        <div className="flex justify-end items-center flex-row">
          <Button
            className="px-4 py-2 text-sm rounded-md cursor-pointer"
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};