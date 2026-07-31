import { BsCalendar3, BsEnvelopeAt, BsPersonBadge, BsTelephone } from "react-icons/bs";

export const UserDisplay = ({user}) => {
  return (
    <>
      <div className="row-span-1 col-span-5 border-b border-gray-300">
        <div className="h-full px-5 py-2 flex justify-between items-center">
          <p className="font-light text-gray-700 text-md">{user ? user.nameFirst + " " + user.nameLast : ""}</p>
        </div>
      </div>
      <div className="row-span-23 col-span-5 h-full w-full overflow-auto">
        {
          user &&
          <div className="max-w-xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">{user.nameFirst} {user.nameLast}</h1>
              <span className="flex items-center gap-1 text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">
                <BsPersonBadge />
                role
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
              <BsCalendar3 className="text-gray-400" />
              <p>{user.dob}</p>
            </div>

            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-8 mb-2">Contact details</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <BsEnvelopeAt className="text-gray-400" />
                <p>{user.email}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <BsTelephone className="text-gray-400" />
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};