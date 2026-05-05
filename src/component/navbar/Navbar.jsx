import { Button } from "../buttons/Button";
import { NavbarContentGroup } from "./NavbarContentGroup";
import logo from "../../assets/logo.svg";

export const Navbar = () => {
  return (
    <div className="h-[64px] fixed top-0 right-0 left-0 flex justify-between px-4 bg-theme">
      <NavbarContentGroup>
        <img src={logo} alt="Logo" />
      </NavbarContentGroup>
      <NavbarContentGroup>
        <p className="text-white">placeholder</p>
      </NavbarContentGroup>
    </div>
  )
}