import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const centreRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (centreRef.current && !centreRef.current.contains(e.target)) {
        setShowCentreDropdown(false);
      }
    };
    if (showCentreDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCentreDropdown]);

  const hrRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hrRef.current && !hrRef.current.contains(e.target)) {
        setShowHRDropdown(false);
      }
    };
    if (showHRDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showHRDropdown]);

  const handleLogout = () => {
    logout();
    navigate("/")
  };

  return (
    <div className="h-[64px] fixed top-0 right-0 left-0 z-50 flex justify-between px-4 bg-theme">
      <NavbarContentGroup>
        <img src={logo} alt="Logo" />
      </NavbarContentGroup>
      <NavbarContentGroup>
        {
          (token !== "") &&
          <Button
            className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-md text-white underline underline-offset-2"
            isLink={true}
            href={"/dashboard"}
          >
            Home
          </Button>
        }
        {
          roles.split(" ").some(r => adminRender.includes(r)) &&
          <div className="relative" ref={centreRef}>
            <Button
              className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-md text-white underline underline-offset-2"
              onClick={toggleCentreDropdown}
            >
              Centre
            </Button>
            {
              showCentreDropdown &&
              <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-md flex flex-col min-w-32 z-50 overflow-hidden">
                <Button
                  className="px-4 py-2 text-md"
                  variant="transparent"
                  onClick={toggleCentreDropdown}
                  isLink={true}
                  href="/users"
                >
                  Users
                </Button>
                <Button
                  className="px-4 py-2 text-md"
                  variant="transparent"
                  onClick={toggleCentreDropdown}
                  isLink={true}
                  href="/classes"
                >
                  Classes
                </Button>
                <Button
                  className="px-4 py-2 text-md"
                  variant="transparent"
                  onClick={toggleCentreDropdown}
                  isLink={true}
                  href="/calendar"
                >
                  Calendar
                </Button>
              </div>
            }
          </div>
        }
        {
          roles.split(" ").some(r => adminRender.includes(r)) &&
          <div className="relative" ref={hrRef}>
            <Button
              className="flex justify-center items-center rounded-md cursor-pointer min-w-24 py-2 px-2 text-md text-white underline underline-offset-2"
              onClick={toggleHRDropdown}
            >
              HR
            </Button>
            {
              showHRDropdown &&
              <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-md flex flex-col min-w-32 z-50 overflow-hidden">
                <Button
                  className="px-4 py-2 text-md"
                  variant="transparent"
                  onClick={toggleHRDropdown}
                  isLink={true}
                  href="/leave-management"
                >
                  Tutor Leave
                </Button>
              </div>
            }
          </div>
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