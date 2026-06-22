export const ClassDisplay = ({clazz}) => {
  return (
    <>
      <div className="row-span-1 col-span-5 border-b border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">{clazz ? clazz.title : ""}</p>
        </div>
      </div>
      <div className="row-span-23 col-span-5 flex h-full w-full justify-center items-center">
        <div>
          {clazz ? clazz.title : ""}
        </div>
        <div>
          {clazz ? clazz.description : ""}
        </div>
      </div>
    </>
  );
};