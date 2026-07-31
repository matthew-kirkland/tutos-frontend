import { Button } from "./Button";

export const Modal = ({title, onClose, submitLabel, submitFormId, submitDisabled, children}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col max-h-[calc(100dvh-8rem)]">
        <h2 className="text-xl font-semibold pb-4 shrink-0">{title}</h2>
        <div className="min-h-0 overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-end items-center flex-row gap-2 pt-4 shrink-0">
          <Button
            className="px-4 py-2 text-sm rounded-md cursor-pointer"
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          {
            submitLabel &&
            <Button
              className="px-4 py-2 text-sm rounded-md cursor-pointer"
              type="submit"
              form={submitFormId}
              variant="primary"
              disabled={submitDisabled}
            >
              {submitLabel}
            </Button>
          }
        </div>
      </div>
    </div>
  );
};