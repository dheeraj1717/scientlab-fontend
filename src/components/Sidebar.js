import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar() {
  const [activeItem, setActiveItem] = useState({ label: 'Summary' });

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const user = useSelector((state) => state.auth.user);


  const sidebarItems = [
    { id: 1, label: 'Summary', icon: faChartBar, nav: '/dashboard', role: "all" },
    { id: 2, label: 'Device Metrics', icon: faChartLine, nav: '/device', role: "admin" },
    { id: 3, label: 'Environment Metrics', icon: faChartLine, nav: '/environment', role: "admin" }
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map(item => {
        if (item.role === "all" || item.role === user.role) {
          return <Link
            key={item.id}
            to={item.nav}
            className={`sidebar-item ${activeItem.label === item.label ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <FontAwesomeIcon icon={item.icon} />&nbsp;
            {item.label}
          </Link>
        }
        return ""
      })}
    </div>
  );
}

export default Sidebar;