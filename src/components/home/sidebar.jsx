import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContexts";
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSearch,
  SSearchIcon,
  SSidebar,
  SSidebarButton,
} from "../home/styles";
import {
  AiOutlineApartment,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const Sidebar = () => {
  const searchRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { logout } = useAuth();
  // Use useHistory to navigate programmatically

  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      searchRef.current.focus();
    } else {
      // Perform search functionality
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout method from auth context
      useNavigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Failed to logout:", error.message);
    }
  };

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((prevState) => !prevState)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <SLogo>
        <img
          src="https://th.bing.com/th/id/R.790b56a770da212aef107f1b437061e2?rik=gVb9C%2fhDBGEyhA&riu=http%3a%2f%2f2.bp.blogspot.com%2f-CLOpjd6xOTU%2fVV4JKYSfGSI%2fAAAAAAAACic%2fumuO5QMGjWI%2fs1600%2fBMW-logo-vector.png&ehk=P1F1d2KaI9SI6qx590kjRDGbdqZY7lmnZVinXPQKjvs%3d&risl=&pid=ImgRaw&r=0"
          alt="logo"
        />
      </SLogo>
      <SSearch
        onClick={searchClickHandler}
        style={!sidebarOpen ? { width: `fit-content` } : {}}
      >
        <SSearchIcon>
          <AiOutlineSearch />
        </SSearchIcon>
        <input
          ref={searchRef}
          placeholder="Search"
          style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
        />
      </SSearch>
      <SDivider />
      {linksArray.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && (
              <>
                <SLinkLabel>{label}</SLinkLabel>
                {!!notification && (
                  <SLinkNotification>{notification}</SLinkNotification>
                )}
              </>
            )}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label }) => (
        <SLinkContainer key={label}>
          <SLink
            to="/"
            style={!sidebarOpen ? { width: `fit-content` } : {}}
            onClick={label === "Logout" ? handleLogout : undefined}
          >
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
    </SSidebar>
  );
};

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/Home",
    notification: 0,
  },
  {
    label: "Logs",
    icon: <MdOutlineAnalytics />,
    to: "/Header",
    notification: 3,
  },
  {
    label: "Customers",
    icon: <BsPeople />,
    to: "/customers",
    notification: 0,
  },
  {
    label: "Diagrams",
    icon: <AiOutlineApartment />,
    to: "/diagrams",
    notification: 1,
  },
];

const secondaryLinksArray = [
  {
    label: "Settings",
    icon: <AiOutlineSetting />,
  },
  {
    label: "Logout",
    icon: <MdLogout />,
  },
];

export default Sidebar;
