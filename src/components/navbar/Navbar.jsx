import { PrimaryButton } from "../buttons/PrimaryButton";
import { NavbarContentGroup } from "./NavbarContentGroup";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import { SecondaryButton } from "../buttons/SecondaryButton";

export const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 left-0 flex justify-between px-4 bg-theme" id={styles.navbarMain}>
      <NavbarContentGroup>
        <img src={logo} alt="Logo" />
      </NavbarContentGroup>
      <NavbarContentGroup>
        <PrimaryButton text="Login" />
        <SecondaryButton text="Register" />
      </NavbarContentGroup>
    </div>
  )
}