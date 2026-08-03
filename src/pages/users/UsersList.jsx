import { BsEnvelopeAt, BsFilterRight, BsTelephone } from "react-icons/bs";
import { LIST_CARD_HEIGHT } from "../../utils/listCard.js";

export const UsersList = ({users, onSelect, selectedUserId}) => {
  return (
    <>
      <div className="row-span-1 col-span-1 border-b border-r border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">Users</p>
          <BsFilterRight className="cursor-pointer" title="Filter" />
        </div>
      </div>
      <div className="row-span-23 col-span-1 flex h-full flex-col border-r border-r-gray-300 py-2 overflow-auto">
        {users.map(u => (
          <div
            key={u.userId}
            onClick={() => onSelect(u.userId)}
            className={`flex flex-col justify-center gap-1 ${LIST_CARD_HEIGHT} shrink-0 px-3 py-2 mx-2 rounded-md ${u.userId === selectedUserId ? "bg-theme-transparent" : "hover:bg-gray-100"} cursor-pointer`}
          >
            <div className="flex flex-row items-center gap-2 justify-between">
              <p className="font-medium text-lg text-gray-900 truncate min-w-0">{u.nameFirst} {u.nameLast}</p>
              <span className="shrink-0 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">role</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-500 min-w-0">
              <BsEnvelopeAt className="shrink-0" />
              <p className="truncate min-w-0">{u.email}</p>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-gray-500 min-w-0">
              <BsTelephone className="shrink-0" />
              <p className="truncate min-w-0">{u.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};