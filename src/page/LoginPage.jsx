import { useState } from "react";
import { FormField } from "../component/form/FormField";
import { PrimaryButton } from "../component/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { requestPost } from "../helpers";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disabled = email.length <= 0 || password.length <= 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: email,
      password: password
    };

    try {
      const data = await requestPost("/auth/login", body);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex h-full justify-center items-center">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <h1 className="text-theme text-4xl font-medium tracking-wide pb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder=""
            value={email}
            onChangeFn={setEmail}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder=""
            value={password}
            onChangeFn={setPassword}
          />
          <PrimaryButton
            type="submit"
            size="fill"
            text="Login"
            onClick={() => {}}
            disabled={disabled}
          />
        </form>
      </div>
    </div>
  );
};