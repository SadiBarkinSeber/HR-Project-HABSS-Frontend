// import node module libraries
import { useState } from "react";

// import sub components
import NavbarVertical from "./navbars/NavbarVertical";
import NavbarTop from "./navbars/NavbarTop";
import { Row, Col } from "react-bootstrap";
import Footer from "./navbars/Footer";

const DefaultDashboardLayout = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
          routeType={props.routeType}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            routeType={props.routeType}
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        <div className="main-context">{props.children}</div>
        <div className="footer"></div>
        <Footer />
      </div>
    </div>
  );
};
export default DefaultDashboardLayout;
