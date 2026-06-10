import { useState, useContext } from "react";
import { FormField } from "../components/form/FormField";
import { Button } from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { requestPost } from "../utils/helpers.js";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {token, login, logout} = useContext(AuthContext);
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
      login(data.jwt);
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
          <Button
            className="flex justify-center ites-center rounded-md cursor-pointer w-full py-2 px-4 text-sm"
            type="submit"
            variant="primary"
            onClick={() => {}}
            disabled={disabled}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};