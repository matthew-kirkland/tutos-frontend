export const UserDisplay = ({user}) => {
  return (
    <>
      <div className="row-span-1 col-span-5 border-b border-gray-300">
        <div className="h-full px-3 mx-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">{selectedUser ? selectedUser.nameFirst + " " + selectedUser.nameLast : ""}</p>
        </div>
      </div>
      <div className="row-span-23 col-span-5 flex h-full w-full justify-center items-center">
        main area
      </div>
    </>
  );
};