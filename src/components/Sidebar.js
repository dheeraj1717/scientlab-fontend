import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  PiChartLineUpBold,
} from "react-icons/fa";
import { faChartLine, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SciSidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", to: "/" },
    {
      icon: <FontAwesomeIcon icon={faChartLine} />,
      label: "Device Metrics",
      to: "/device-metrics",
    },
    {
      icon: <FontAwesomeIcon icon={faChartBar} />,
      label: "Devices",
      to: "/device",
    },
    {
      icon: <FontAwesomeIcon icon={faChartBar} />,
      label: "Environment",
      to: "/environment",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
      className="shadow-md"
    >
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                Scient Labs
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <div className={`px-3 pt-3 ${collapsed ? "hidden" : "block"}`}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-gray-200 p-2 rounded w-full text-black placeholder:text-black"
        />
      </div>
      <Menu iconShape="circle" className="">
        {filteredMenuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon}>
            {item.label}
            <Link to={item.to} />
          </MenuItem>
        ))}

        {/* Search bar */}

        {/* Other menu items */}
      </Menu>
    </ProSidebar>
  );
};

export default SciSidebar;
