import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarContentGroup } from "./NavbarContentGroup";
import { Button } from "../buttons/Button";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const {token, roles, login, logout} = useContext(AuthContext);
  const adminRender = ["MASTER", "ADMIN"];
  const teacherRender = ["MASTER", "TEACHER"];
  const learnerRender = ["MASTER", "LEARNER"]

  const [showCentreDropdown, setShowCentreDropdown] = useState(false);
  const toggleCentreDropdown = () => setShowCentreDropdown(prev => !prev);
  const [showHRDropdown, setShowHRDropdown] = useState(false);
  const toggleHRDropdown = () => setShowHRDropdown(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/")
  };

  return (
    <div className="h-[64px] fixed top-0 right-0 left-0 flex justify-between px-4 bg-theme">
      <NavbarContentGroup>
        <img src={logo} alt="Logo" />
      </NavbarContentGroup>
      <NavbarContentGroup>
        {
          (token !== "") &&
          <Button
            className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-sm text-white underline underline-offset-2"
            isLink={true}
            href={"/dashboard"}
          >
            Home
          </Button>
        }
        {
          roles.split(" ").some(r => adminRender.includes(r)) &&
          <Button
            className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-sm text-white underline underline-offset-2"
            onClick={toggleCentreDropdown}
          >
            Centre
          </Button>
        }
        {
          roles.split(" ").some(r => adminRender.includes(r)) &&
          <Button
            className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-sm text-white underline underline-offset-2"
            onClick={toggleHRDropdown}
          >
            HR
          </Button>
        }
      </NavbarContentGroup>
      <NavbarContentGroup>
        {
          (token !== "") &&
          <Button
            className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-sm"
            variant="secondary"
            onClick={handleLogout}
            disabled={false}
          >
            Logout
          </Button>
        }
      </NavbarContentGroup>
    </div>
  );
};