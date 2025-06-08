// Navbar.jsx - Navigation bar component for the dashboard

import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown, MdOutlineCancel, MdNotifications, MdOutlineChat, MdOutlinePublic, MdOutlineSearch } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpeg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { chatData, notificationData, userProfileData } from '../data/dummy';
import { Button } from '.';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

// Navbar component displays the top navigation bar with search, notifications, chat, and user profile
const Navbar = () => {
  // Get context values for UI state and theme
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {/* Search bar */}
      <div className="flex">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Notification, chat, and user profile buttons */}
      <div className="flex items-center gap-5 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
        <TooltipComponent content="Notifications" position="BottomCenter">
          <div
            className="relative"
            onClick={() => handleClick('notification')}
          >
            <MdNotifications className="text-2xl cursor-pointer dark:text-gray-200 text-gray-400" />
            <span className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1" style={{ background: currentColor }} />
          </div>
        </TooltipComponent>
        <TooltipComponent content="Chat" position="BottomCenter">
          <div
            className="relative"
            onClick={() => handleClick('chat')}
          >
            <MdOutlineChat className="text-2xl cursor-pointer dark:text-gray-200 text-gray-400" />
            <span className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1" style={{ background: currentColor }} />
          </div>
        </TooltipComponent>
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="relative"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full h-8 w-8"
              src={userProfileData[0].image}
              alt="user-profile"
            />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
