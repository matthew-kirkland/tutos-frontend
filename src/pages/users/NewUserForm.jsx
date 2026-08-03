import { useContext, useEffect, useState } from "react"
import { FormField } from "../../components/FormField";
import { requestPost } from "../../utils/helpers";
import { AuthContext } from "../../context/AuthContext";
import { FormSelect } from "../../components/FormSelect";
import { FormStage } from "../../components/FormStage";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

export const NewUserForm = ({formId, onValidityChange, onCreated}) => {
  const {token} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [dob, setDob] = useState("");
  const [userType, setUserType] = useState("Student");
  const showExtraFields = (userType === "Master" || userType === "Student");
  const [school, setSchool] = useState("");
  const [schoolYear, setSchoolYear] = useState("");

  const isValid = Boolean(
    email && password && phone && nameFirst && nameLast && dob
    && (!showExtraFields || (school && schoolYear))
  );

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

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
      const data = await requestPost(`/auth/register/${userType.toLowerCase()}`, body, token);
      onCreated?.(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-[800px]">
      <form id={formId} className="w-full flex flex-col" onSubmit={handleSubmit}>
        <FormStage
          index={1}
          title="User type"
          description="What kind of account is this?"
          isLast={false}
        >
          <FormSelect
            options={["Student", "Parent", "Tutor", "Admin", "Master"]}
            value={userType}
            onChange={setUserType}
            placeholder="Select user type"
            wrapperClassName="w-full"
            buttonClassName="w-full h-[38px] bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50"
            menuClassName="w-full bg-white border border-gray-200 rounded-md max-h-60 overflow-auto p-1"
            optionClassName="px-3 py-2 text-sm rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
          />
        </FormStage>

        <FormStage
          index={2}
          title="Basic details"
          description="Who is this account for, and how will they sign in?"
          isLast={!showExtraFields}
        >
          <div className="w-full flex gap-3">
            <FormField
              wrapperClassName="mb-0"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="nameFirst"
              label="First Name"
              type="text"
              placeholder="First Name"
              value={nameFirst}
              onChangeFn={setNameFirst}
            />
            <FormField
              wrapperClassName="mb-0"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="nameLast"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              value={nameLast}
              onChangeFn={setNameLast}
            />
          </div>
          <FormField
            wrapperClassName="mb-0"
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChangeFn={setEmail}
          />
          <FormField
            wrapperClassName="mb-0"
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChangeFn={setPassword}
          />
          <div className="w-full flex flex-col items-start">
            <p className="text-sm mb-1">Phone Number</p>
            <PhoneInput
              international={true}
              countryCallingCodeEditable={false}
              limitMaxLength={true}
              defaultCountry="AU"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <FormField
            wrapperClassName="mb-0"
            inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
            id="dob"
            label="Date of Birth"
            type="date"
            placeholder=""
            value={dob}
            onChangeFn={setDob}
          />
        </FormStage>

        {
          showExtraFields &&
          <FormStage
            index={3}
            title="School details"
            description="Only needed for students and masters."
            isLast={true}
          >
            <FormField
              wrapperClassName="mb-0"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="school"
              label="School"
              type="text"
              placeholder="School"
              value={school}
              onChangeFn={setSchool}
            />
            <FormField
              wrapperClassName="mb-0"
              inputClassName="h-[35px] w-full rounded-md p-2 text-sm"
              id="schoolYear"
              label="School Year"
              type="number"
              placeholder="School Year"
              value={schoolYear}
              onChangeFn={setSchoolYear}
            />
          </FormStage>
        }
      </form>
    </div>
  );
};
