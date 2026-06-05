import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarContentGroup } from "./NavbarContentGroup";
import { Button } from "../buttons/Button";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const {token, login, logout} = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/")
  }
  return (
    <div className="h-[64px] fixed top-0 right-0 left-0 flex justify-between px-4 bg-theme">
      <NavbarContentGroup>
        <img src={logo} alt="Logo" />
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
  )
}