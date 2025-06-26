import React, { useEffect, useRef, useState } from "react";

import {
  LogOut,
  User,
  Settings,
  CreditCard,
  Bell,
  ChevronDown,
} from "lucide-react";

import { fetchUserProfile } from "../../utils/api";

const DropdownItem = ({ icon, label, path }) => {
  return (
    <a
      href={path || "#"}
      className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
    </a>
  );
};

const Header = ({ title = "Dashboard" }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [roleId, setRoleId] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New proposal received for 'Project Alpha'." },
    { id: 2, message: "Milestone payment approved." },
    { id: 3, message: "You have an unread message." },
  ]);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = parseInt(localStorage.getItem("role_id"));
    const fetchDataAndSet = async () => {
      const user = await fetchUserProfile(token);
      setUserData(user);
    };

    fetchDataAndSet();
    setToken(token);
    setRoleId(roleId);
  }, []);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simplified handleLogout for dummy data
  const handleLogout = () => {
    alert(
      "Simulating logout. In a real app, this would clear tokens and redirect."
    );
    setShowDropdown(false);
  };

  // Determine displayName based on dummy userData
  const displayName = userData?.user_name;

  const email = userData?.email;
  const firstLetter = displayName?.charAt(0)?.toUpperCase();

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">{title}</div>

      <div className="flex items-center gap-6 cursor-pointer">
        {/* 🔔 Notification */}
        <div className="relative" ref={notifRef}>
          <div
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </div>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl z-50 p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Notifications
              </h4>
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No notifications</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="py-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {/* Changed <Link> to <a> */}
                      <a
                        href={`/notification/${notif.id}`}
                        className="block w-full"
                      >
                        {notif.message}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <div className="text-xs text-blue-600 mt-2 cursor-pointer hover:underline">
                {/* Changed <Link> to <a> */}
                <a href="/notifications">View all</a>
              </div>
            </div>
          )}
        </div>

        {/* 👤 User Dropdown */}
        <div
          className="flex items-center gap-3"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className="text-right hidden sm:block">
            <h4 className="font-semibold text-gray-800">
              {userData?.role_name} || {displayName}
            </h4>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
            {firstLetter}
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {showDropdown && (
            <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl z-50 p-4">
              {userData.is_superuser ? (
                // Only Logout button for super user
                <div className="pt-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </span>
                    <span className="text-xs text-gray-400">⌘ Q</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
                      {firstLetter}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 text-sm">
                    <div className="space-y-1 pb-3">
                      <DropdownItem
                        icon={<User className="w-4 h-4" />}
                        label="View Profile"
                        path="/profile-page"
                      />
                      <DropdownItem
                        icon={<Settings className="w-4 h-4" />}
                        label="Settings"
                        path="/settings"
                      />
                    </div>

                    <div className="space-y-1 py-3">
                      <DropdownItem
                        icon={<CreditCard className="w-4 h-4" />}
                        label="Home"
                        path="/dashboard"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" /> Logout
                        </span>
                        <span className="text-xs text-gray-400">⌘ Q</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
