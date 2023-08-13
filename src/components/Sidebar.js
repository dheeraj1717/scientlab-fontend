import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  faUser,
  faBars,
  faChartBar,
  faTable,
  faChartLine,
  faX
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Sidebars() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      className="h-screen top-[60px] bg-[#fff]"
    >
       
    
       <div className="flex justify-between align-items-center px-2 py-[15px] bg-[#282c34] text-white">
  {collapsed && (
    <div className="flex justify-center align-items-center w-full ">
      <FontAwesomeIcon className="cursor-pointer py-2"
        icon={faBars}
        onClick={() => setCollapsed(!collapsed)}
      />
    </div>
  )}
  {!collapsed && (
    <>
      <p className="text-[20px] my-auto font-semibold">User Admin</p>
      <FontAwesomeIcon  className="cursor-pointer"
        icon={faX}
        onClick={() => setCollapsed(!collapsed)}
      />
    </>
  )}
</div>


  
      <Menu className="text-[15px]">
      {/* <MenuItem
  onClick={() => setCollapsed(!collapsed)}
  icon={
    collapsed ? (
      <div onClick={() => setCollapsed(!collapsed)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    ) : null
  }
>
 
</MenuItem> */}

        {/* Summary */}
        <MenuItem icon={<FontAwesomeIcon icon={faChartBar} />}>
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Summary
          </Link>
        </MenuItem>

        {/* Device Matrix */}
        <MenuItem icon={<FontAwesomeIcon icon={faChartLine} />}>
          <Link to="/device">Device Matrix</Link>
        </MenuItem>

        {/* Device Stats */}
        <MenuItem icon={<FontAwesomeIcon icon={faTable} />}>
          <Link to="/device-stats">Device Stats</Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default Sidebars;
