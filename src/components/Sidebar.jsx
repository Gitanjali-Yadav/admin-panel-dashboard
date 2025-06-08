// Sidebar.jsx - Sidebar navigation component for the dashboard

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiAwsamplify } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

// Sidebar component displays navigation links and handles responsive behavior
const Sidebar = () => {
  // Get theme and menu state from context
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  // Close sidebar on small screens
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // CSS classes for active and normal links
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    // Sidebar container
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {/* Logo and close button */}
      <div className="flex justify-between items-center">
        <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <SiAwsamplify /> <span>Admin Panel</span>
        </Link>
        <button
          type="button"
          onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          style={{ color: currentColor }}
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
        >
          <MdOutlineCancel />
        </button>
      </div>
      {/* Navigation links */}
      <div className="mt-10">
        {links.map((item) => (
          <div key={item.title}>
            <p className="text-gray-400 m-3 mt-4 uppercase">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                to={`/${link.name}`}
                key={link.name}
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.icon}
                <span className="capitalize ">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
