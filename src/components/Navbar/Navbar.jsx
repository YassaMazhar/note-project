import { useContext } from "react";
import { NavLink } from "react-router";
import { TokenContext } from "../../Context/Token-Context";
import DarkMode from "../DarkMode/DarkMode";
export default function Navbar() {
  let { token, logOut } = useContext(TokenContext);
  return (
    <div className=" bg-gray-300 dark:bg-black dark:text-white p-4">
      <nav className="container mx-auto py-2 px-5 lg:px-20 ">
        <div className=" flex items-center justify-between">
          <NavLink
            className={({ isActive }) => {
              return `${
                isActive ? "text-violet-500" : ""
              } text-xl font-bold before:w-0 before:h-0.5 before:left-0 before:bottom-0 before:bg-violet-500 before:transition-all before:duration-300 before:absolute relative hover:before:w-full`;
            }}
            to={""}
          >
            Notes
          </NavLink>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-8 text-lg font-semibold ">
              {token == null ? (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-violet-500" : ""
                        }  before:w-0 before:h-0.5 before:left-0 before:bottom-0 before:bg-violet-500 before:transition-all before:duration-300 before:absolute relative hover:before:w-full `;
                      }}
                      to={"/signup"}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `${
                          isActive ? "text-violet-500" : ""
                        } before:w-0 before:h-0.5 before:left-0 before:bottom-0 before:bg-violet-500 before:transition-all before:duration-300 before:absolute relative hover:before:w-full`;
                      }}
                      to={"/signin"}
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    onClick={logOut}
                    className={({ isActive }) => {
                      return `${
                        isActive ? "text-violet-500" : ""
                      } before:w-0 before:h-0.5 before:left-0 before:bottom-0 before:bg-violet-500 before:transition-all before:duration-300 before:absolute relative hover:before:w-full`;
                    }}
                    to={"/signin"}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
            <DarkMode />
          </div>
        </div>
      </nav>
    </div>
  );
}
