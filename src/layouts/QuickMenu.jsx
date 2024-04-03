import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Dropdown,
  ListGroup,
  Modal,
  Button,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useProfilePicture } from "../components/ProfilePictureContext";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useMounted from "../hooks/useMounted";
import { useAuth } from "../components/TokenContext";
import { useEmp } from "../components/EmployeeContext";
import { useMng } from "../components/ManagerContext";
import { useSiteMng } from "../components/AdminContext";

const QuickMenu = (props) => {
  const hasMounted = useMounted();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control logout modal visibility
  const { token, setAuthToken } = useAuth();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const QuickMenuDesktop = () => {
    const { setProfilePictureData, profilePictureData } = useProfilePicture();
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control logout modal visibility
    const { empData } = useEmp();
    const { mngData } = useMng();
    const { siteMngData } = useSiteMng();
    const { userRole } = useAuth(); // userRole değerini al
    const roleOfUser = localStorage.getItem("roleOfUser");

    

    

    useEffect(() => {
      // Retrieve profile picture data from local storage
      const storedProfilePictureData = localStorage.getItem("profilePictureData");
      if (storedProfilePictureData) {
        setProfilePictureData(JSON.parse(storedProfilePictureData));
      }
    }, [profilePictureData]);

    const handleLogout = () => {
      setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
      setAuthToken(null); // Çıkış yapmak için token'i null yap
      localStorage.removeItem("token");
      localStorage.removeItem("profilePictureData");
      setShowLogoutModal(false); // Modalı gizle
    };

    // Kullanıcı rolüne göre uygun verileri görüntüle
    const renderUserData = () => {
      if (roleOfUser === "employee") {
        return (
          <>
            {empData && (
              <h5 className="mb-1">
                {`${empData.firstName || ""} ${empData.secondName || ""} ${empData.firstSurname || ""
                  }`}
              </h5>
            )}
          </>
        );
      } else if (roleOfUser === "manager") {
        return (
          <>
            {mngData && (
              <h5 className="mb-1">
                {`${mngData.firstName || ""} ${mngData.secondName || ""} ${mngData.firstSurname || ""
                  }`}
              </h5>
            )}
          </>
        );
      } else {
        return (
          <>
            {siteMngData && (
              <h5 className="mb-1">
                {`${siteMngData.firstName || ""} ${siteMngData.secondName || ""
                  } ${siteMngData.firstSurname || ""}`}
              </h5>
            )}
          </>
        );
      }
    };

    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={profilePictureData}
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
            show
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-3 ">
                {renderUserData()} {/* Kullanıcı verilerini görüntüle */}
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i>{" "}
              <Link to={props.routeType[2].children[1].link}>
                Profil Detayı
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i>{" "}
              <Link to={props.routeType[2].children[2].link}>
                Profili Güncelle
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              {" "}
              {/* Logout function is called on click */}
              <i className="fe fe-power me-2"></i>
              Çıkış Yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Logout Confirmation Modal */}
        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Çıkış Yap</Modal.Title>
          </Modal.Header>
          <Modal.Body>Çıkış yapmak istediğinizden emin misiniz?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              İptal
            </Button>
            <Button
              variant="primary"
              style={{ backgroundColor: "dodgerblue", border: "none" }}
              className="custom-button"
              onClick={handleLogoutConfirm} // Evet'e basıldığında çıkış yapma işlevini çağır
            >
              <Link
                to="/"
                style={{ textDecoration: "none", color: "white" }}
                className="link-text"
              >
                Çıkış Yap
              </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </ListGroup>
    );
  };

  /*
  const QuickMenuMobile = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src="/Images/avatar/avatar-1.jpg"
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1"> John E. Grainger</h5>
                <Link to="#" className="text-inherit fs-6">
                  View my profile
                </Link>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-activity me-2"></i> Activity Log
            </Dropdown.Item>
            <Dropdown.Item className="text-primary">
              <i className="fe fe-star me-2"></i> Go Pro
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i> Account Settings
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };
  */

  return <Fragment>{hasMounted && <QuickMenuDesktop />}</Fragment>;
};

export default QuickMenu;
