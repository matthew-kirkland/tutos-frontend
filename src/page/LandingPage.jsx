import { useNavigate } from "react-router-dom";
import { Button } from "../component/buttons/Button";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = (dest) => {
    navigate(dest);
  }
  return (
    <div className="flex h-full justify-between items-center">
      <div className="w-1/2 h-full">
        <div className="h-full w-full flex justify-center items-center border-r border-dashed bg-gray-200">Placeholder for image</div>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <h1 className="text-theme text-4xl font-semibold tracking-wide pb-16">Welcome</h1>
        <Button variant="primary" size="xl" text="Staff Login" onClick={() => handleNavigate("/login/staff")} />
          <br />
        <Button variant="primary" size="xl" text="Student/Parent Login" onClick={() => handleNavigate("/login")} />
      </div>
    </div>
  );
}