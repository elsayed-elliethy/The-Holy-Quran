import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { settingActions } from "../../store";
import "./Nav.css";
const Nav = () => {
  const dispatch = useDispatch();
  const handleToggleSettings = () => {
    dispatch(settingActions.showSetting());
  };
  return (
    <nav className="navbar navbar-light bg-light position-fixed w-100">
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand">
          Home
        </NavLink>

        <div onClick={handleToggleSettings}>
          <a className="navbar-brand">Settings</a>{" "}
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.32 7.582a4.044 4.044 0 1 0 4.044 4.043 4.056 4.056 0 0 0-4.043-4.043Zm8.73 4.043c-.002.378-.03.755-.082 1.13l2.46 1.926a.586.586 0 0 1 .134.747l-2.328 4.02a.588.588 0 0 1-.715.248l-2.894-1.162a8.923 8.923 0 0 1-1.962 1.146l-.433 3.072a.603.603 0 0 1-.581.498H9.993a.607.607 0 0 1-.582-.482l-.433-3.072a8.556 8.556 0 0 1-1.962-1.147l-2.893 1.163a.589.589 0 0 1-.715-.249L1.08 15.445a.586.586 0 0 1 .133-.748l2.46-1.926a8.823 8.823 0 0 1-.082-1.146c.002-.378.03-.755.083-1.13L1.213 8.57a.586.586 0 0 1-.133-.747l2.328-4.02a.588.588 0 0 1 .715-.248l2.893 1.162A8.924 8.924 0 0 1 8.978 3.57L9.411.498A.603.603 0 0 1 9.993 0h4.656a.607.607 0 0 1 .582.482l.432 3.072A8.557 8.557 0 0 1 17.628 4.7l2.89-1.163a.588.588 0 0 1 .716.249l2.328 4.019a.586.586 0 0 1-.133.747l-2.461 1.927c.052.38.08.762.083 1.145Z"></path>
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
