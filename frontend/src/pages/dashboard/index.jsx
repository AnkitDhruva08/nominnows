
"use client"; 

import React, { useState, useEffect } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  FolderGit,
  Handshake,
  Wallet,
  Star,
  PlusCircle,
  Search,
  ListTodo,
  MessageSquare,
  Upload,
  Bot,
  Contact,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import {fetchUserProfile} from  "../../utils/api";

const App = () => {
  const [userRole, setUserRole] = useState("Company");
  const [token, setToken] = useState(null);
  const [roleId, setRoleId] = useState(null);




  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = parseInt(localStorage.getItem("role_id"));
  
    console.log("roleId ==<<<>>", roleId);
    console.log("token ==<<>>", token);
  
    const fetchDataAndSet = async () => {
    const userData = await fetchUserProfile(token);
    };
  
    fetchDataAndSet(); 
  
    setToken(token);
    setRoleId(roleId);
  }, []);


  const dummyStats = {
    activeProjects: userRole === "Company" ? 7 : 4,
    pendingProposals: userRole === "Company" ? 3 : 5,
    fundsInEscrow: 25000,
    performanceScore: 4.8,
  };

  const dummyProjects = [
    {
      id: "proj001",
      name: "E-commerce Platform Redesign",
      status: "Negotiating",
      value: 18000,
      client: "Acme Corp",
      agency: "WebSolutions Pro",
      lastActivity: "2 hours ago",
    },
    // Add more dummy projects...
  ];

  const dummyActivityFeed = [
    {
      id: "act001",
      description: "New message on 'E-commerce Platform Redesign'.",
      time: "20 min ago",
    },
    {
      id: "act002",
      description: "Proposal for 'Mobile App' shortlisted.",
      time: "1 hour ago",
    },
  ];

  const formatCurrency = (amount) =>
    `$${amount.toLocaleString("en-US")}`;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 p-6 shadow-md hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Header />

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <StatCard title="Active Projects" value={dummyStats.activeProjects} Icon={FolderGit} color="text-indigo-600" />
          <StatCard
            title={
              userRole === "Company" ? "Proposals Received" : "Proposals Submitted"
            }
            value={dummyStats.pendingProposals}
            Icon={Handshake}
            color="text-emerald-600"
          />
          <StatCard
            title="Funds in Escrow"
            value={formatCurrency(dummyStats.fundsInEscrow)}
            Icon={Wallet}
            color="text-purple-600"
          />
          <StatCard
            title="Performance Score"
            value={`${dummyStats.performanceScore} / 5.0`}
            Icon={Star}
            color="text-orange-600"
          />
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userRole === "Company" && (
                <ActionButton label="Post New Project" icon={PlusCircle} />
              )}
              {userRole === "Agency" && (
                <ActionButton label="Browse Projects" icon={Search} />
              )}
              <ActionButton label="View All Projects" icon={ListTodo} />
              <ActionButton label="Messages & Hiring Board" icon={MessageSquare} />
              {userRole === "Agency" && (
                <ActionButton label="Manage Proposals" icon={Upload} />
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">AI Assistance</h3>
            <div className="space-y-3">
              {userRole === "Company" && (
                <AiButton label="Draft Project with AI" icon={Bot} />
              )}
              {userRole === "Agency" && (
                <AiButton label="Generate Agency Profile" icon={Contact} />
              )}
              <AiButton label="AI Proposal Assistant" icon={Lightbulb} />
            </div>
          </div>
        </section>

        {/* Activity Feed & Projects */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {dummyActivityFeed.map((activity) => (
                <li key={activity.id} className="text-sm">
                  <p>{activity.description}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Projects</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr>
                    <th className="py-2">Name</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th>{userRole === "Company" ? "Agency" : "Client"}</th>
                    <th>Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyProjects.map((project) => (
                    <tr key={project.id} className="border-t hover:bg-gray-50">
                      <td className="py-2">{project.name}</td>
                      <td>{project.status}</td>
                      <td>{formatCurrency(project.value)}</td>
                      <td>{userRole === "Company" ? project.agency : project.client}</td>
                      <td>{project.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

// Reusable components
const StatCard = ({ title, value, Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

const ActionButton = ({ label, icon: Icon }) => (
  <button className="flex items-center space-x-2 bg-indigo-600 text-white py-3 px-4 rounded-xl shadow hover:bg-indigo-700 transition">
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const AiButton = ({ label, icon: Icon }) => (
  <button className="w-full flex items-center space-x-2 bg-gray-100 py-2 px-3 rounded hover:bg-gray-200">
    <Icon className="w-4 h-4 text-gray-600" />
    <span>{label}</span>
  </button>
);
