import { useContext, useState } from "react"
import { FormField } from "../../components/FormField";
import { requestPost } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button";

export const NewUserForm = () => {
  const {token} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [dob, setDob] = useState("");
  
  const [userType, setUserType] = useState("master");
  const showExtraFields = (userType === "master" || userType === "student");
  const [school, setSchool] = useState("");
  const [schoolYear, setSchoolYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
      phone: phone,
      nameFirst: nameFirst,
      nameLast: nameLast,
      dob: dob
    };
    if (showExtraFields) {
      body.school = school;
      body.schoolYear = schoolYear;
    }

    try {
      const data = await requestPost(`/auth/register/${userType}`, body, token);
      // do something when the new user is created:
      // - update the users list
      // - set the UserDisplay to show the new user
      // - green popup saying ok
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[1000px] flex justify-center items-center">
      <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="w-full pb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide py-4">User Type</h3>
          <div className="flex justify-between items-center">
            <p>Choose user type</p>
            <select className="w-1/2">
              <option>Student</option>
              <option>Parent</option>
              <option>Tutor</option>
              <option>Admin</option>
              <option>Master</option>
            </select>
          </div>
        </div>
        <div className="w-full pb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide py-4">User Details</h3>
          <div className="flex justify-between items-center gap-4">
            <FormField
              wrapperClassName="col-span-2"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="nameFirst"
              type="text"
              placeholder="First Name"
              value={nameFirst}
              onChangeFn={setNameFirst}
            />
            <FormField
              wrapperClassName="col-span-2"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="nameLast"
              type="text"
              placeholder="Last Name"
              value={nameLast}
              onChangeFn={setNameLast}
            />
          </div>
          <FormField
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChangeFn={setEmail}
          />
          <FormField
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeFn={setPassword}
          />
          <div className="flex justify-between items-center gap-4">
            <select>
              <option>+61</option>
              <option>+1</option>
              <option>+44</option>
            </select>
            <FormField
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChangeFn={setPhone}
            />
          </div>
          <FormField
            wrapperClassName="col-span-3"
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="dob"
            label="Date of Birth"
            type="date"
            placeholder=""
            value={dob}
            onChangeFn={setDob}
          />
        </div>
        {
          showExtraFields &&
          <div className="w-full">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide py-4">School details</h3>
            <FormField
              wrapperClassName="col-span-3"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="school"
              label="School"
              type="text"
              placeholder="School"
              value={school}
              onChangeFn={setSchool}
            />
            <FormField
              wrapperClassName="col-span-3"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="schoolYear"
              label="School Year"
              type="number"
              placeholder="School Year"
              value={schoolYear}
              onChangeFn={setSchoolYear}
            />
          </div>
        }
        <Button
          className="px-4 py-2 rounded-md text-sm cursor-pointer"
          type="submit"
          variant="primary"
        >
          Create
        </Button>
      </form>
    </div>
  );
};