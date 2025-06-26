import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  ClipboardList,
  ChevronDown,
  Search,
  LogOut,
  MessageSquare,
  BarChart2,
  ShieldCheck,
  Calendar,
  HelpCircle,
  Mail,
  ListTodo,
  UserPlus,
  Globe,
  CreditCard,
  FileText,
  PlusCircle,
  Bell,
  Upload,
  Wallet,
  LockIcon,
  User,
  AlignJustify,
  X,
  Link,
} from "lucide-react";

const Sidebar = () => {

  const router = useRouter();
  const quickLinks = {
    sidebar: [
      {
        name: "Dashboard",
        path: "/dashboard/",
        icon: "LayoutDashboard",
      },
      {
        name: "Projects",
        path: "/projects",
        icon: "Briefcase",
        submenu: [
          { name: "My Projects", path: "/projects/my", icon: "ListTodo" },
          { name: "Browse Projects", path: "/projects/browse", icon: "Search" },
          { name: "Post New", path: "/projects/new", icon: "PlusCircle", badge: "New" },
        ],
      },
      {
        name: "Agencies",
        path: "/agencies",
        icon: "Users",
        submenu: [
          { name: "My Agencies", path: "/agencies/my", icon: "Users" },
          { name: "Find Agencies", path: "/agencies/find", icon: "Search" },
        ],
      },
      {
        name: "Proposals",
        path: "/proposals",
        icon: "ClipboardList",
        submenu: [
          { name: "Submitted", path: "/proposals/submitted", icon: "Upload" },
          { name: "Received", path: "/proposals/received", icon: "Bell" },
        ],
      },
      {
        name: "Communication",
        path: "/communication",
        icon: "MessageSquare",
        submenu: [
          { name: "Hiring Board", path: "/communication/hiring-board", icon: "MessageSquare" },
          { name: "Notifications", path: "/communication/notifications", icon: "Bell" },
        ],
      },
      {
        name: "Payments",
        path: "/payments",
        icon: "CreditCard",
        submenu: [
          { name: "Escrow Status", path: "/payments/escrow", icon: "Wallet" },
          { name: "Transaction History", path: "/payments/history", icon: "FileText" },
        ],
      },
      {
        name: "Settings",
        path: "/settings",
        icon: "Settings",
        submenu: [
          { name: "Profile Settings", path: "/settings/profile", icon: "User" },
          { name: "Account Settings", path: "/settings/account", icon: "LockIcon" },
        ],
      },
      {
        name: "Analytics",
        path: "/analytics",
        icon: "BarChart2",
      },
      {
        name: "Support",
        path: "/support",
        icon: "HelpCircle",
      },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");





  const handleLogout = () => {
    alert("Simulating logout. In a real app, this would clear tokens and redirect.");
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSidebarLinks = (quickLinks.sidebar || []).filter((link) =>
    link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (link.submenu &&
      link.submenu.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
  );

  return (
    <div className="flex">
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-indigo-700 p-2 rounded-md shadow"
        >
          {isOpen ? <X size={20} /> : <AlignJustify size={20} />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <div
        className={` text-white w-64 p-4 flex flex-col transform transition-transform duration-300 ease-in-out
      `}
      >
        <div className="flex flex-col h-full space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-6 mt-4">
            <img
              src="https://placehold.co/40x40/4F46E5/FFFFFF?text=NM"
              alt="NoMinnows Logo"
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold text-white">NoMinnows</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 overflow-y-auto space-y-1">
            {filteredSidebarLinks.map((link, idx) => {
              const IconComponent = LucideIcons[link.icon] || Link;

              return (
                <li key={link.name || idx}>
                  <div
                    onClick={() => {
                      if (link.submenu) {
                        toggleSubmenu(idx);
                      } else {
                        router.push(link.path);
                        setIsOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-all
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span>{link.name}</span>
                    </div>
                    {link.submenu && (
                      <ChevronDown
                        className={`transition-transform w-5 h-5 ${
                          openSubmenu === idx ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {link.submenu && openSubmenu === idx && (
                    <ul className="ml-6 mt-2 space-y-1 border-l border-gray-700 pl-4">
                      {link.submenu.map((subLink, subIdx) => {
                        const SubIconComponent =
                          LucideIcons[subLink.icon] || Link;

                        return (
                          <li key={subLink.name || subIdx}>
                            <a
                              href={`#${subLink.path}`}
                              className={`flex items-center px-3 py-2 rounded-md text-sm transition space-x-2
                               `}
                              onClick={() => setIsOpen(false)}
                            >
                              {SubIconComponent && (
                                <SubIconComponent className="w-4 h-4" />
                              )}
                              <span>{subLink.name}</span>
                              {subLink.badge && (
                                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-500 text-white">
                                  {subLink.badge}
                                </span>
                              )}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div className="pt-4 border-t border-gray-700 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-md hover:bg-red-700 transition text-gray-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Map string names to Lucide components
const LucideIcons = {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  ClipboardList,
  ChevronDown,
  Search,
  LogOut,
  MessageSquare,
  BarChart2,
  ShieldCheck,
  Calendar,
  HelpCircle,
  Mail,
  ListTodo,
  UserPlus,
  Globe,
  CreditCard,
  FileText,
  PlusCircle,
  Bell,
  Upload,
  Wallet,
  LockIcon,
  User,
  AlignJustify,
  X,
  Link,
};

export default Sidebar;
