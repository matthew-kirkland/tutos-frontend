import { BsCardText, BsTag } from "react-icons/bs";

export const ClassDisplay = ({clazz}) => {
  return (
    <>
      <div className="row-span-1 col-span-5 border-b border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md truncate min-w-0">{clazz ? clazz.title : ""}</p>
        </div>
      </div>
      <div className="row-span-23 col-span-5 h-full w-full overflow-auto">
        {
          clazz &&
          <div className="max-w-xl mx-auto px-8 py-8">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900 break-words min-w-0">{clazz.title}</h1>
              <span className="flex items-center gap-1 shrink-0 text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">
                <BsTag />
                type
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-600 mt-4">
              <BsCardText className="text-gray-400 mt-0.5" />
              <p>{clazz.description}</p>
            </div>
          </div>
        }
      </div>
    </>
  );
};