import { BsFilterRight } from "react-icons/bs";

export const ClassesList = ({classes, onSelect, selectedClassId}) => {
  return (
    <>
      <div className="row-span-1 col-span-1 border-b border-r border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">Classes</p>
          <BsFilterRight className="cursor-pointer" title="Filter" />
        </div>
      </div>
      <div className="row-span-23 col-span-1 flex h-full flex-col border-r border-r-gray-300 py-2 overflow-auto">
        {classes.map(c => (
          <div
            key={c.classId}
            onClick={() => onSelect(c.classId)}
            className={`flex flex-col gap-1 px-3 py-2 mx-2 rounded-md ${c.classId === selectedClassId ? "bg-theme-transparent" : "hover:bg-gray-100"} cursor-pointer`}
          >
            <div className="flex flex-row items-center gap-2 justify-between">
              <p className="font-medium text-lg text-gray-900">{c.title}</p>
              <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">group</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-500">
              <p>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};