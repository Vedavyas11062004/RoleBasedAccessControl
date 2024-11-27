import React, { useEffect, useState } from "react";
import { FiUsers, FiKey, FiShield, FiUserCheck } from "react-icons/fi";
import { api } from "../services/api";
import { User, Role } from "../types";
import { useNavigate } from "react-router-dom";

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  path: string;
}

interface UserRole {
  name: string;
  userCount: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [usersPerRole, setUsersPerRole] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersData, rolesData] = await Promise.all([
          api.getUsers(),
          api.getRoles(),
        ]);

        setUsers(usersData);
        setRoles(rolesData);

        const userRoleCounts = rolesData.map((role) => ({
          name: role.name,
          userCount: usersData.filter((user) => user.role === role.name).length,
        }));

        setUsersPerRole(userRoleCounts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats: StatItem[] = [
    {
      label: "Total Users",
      value: users.length,
      icon: <FiUsers className="w-7 h-7" />,
      color: "bg-blue-500",
      path: "/users",
    },
    {
      label: "Total Roles",
      value: roles.length,
      icon: <FiKey className="w-7 h-7" />,
      color: "bg-blue-500",
      path: "/roles",
    },
    {
      label: "Total Permissions",
      value: roles.reduce(
        (acc, role) => acc + (role.permissions?.length || 0),
        0,
      ),
      icon: <FiShield className="w-7 h-7" />,
      color: "bg-blue-500",
      path: "/roles",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-4 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 flex items-center">
          <span className="bg-blue-500 w-2 h-8 mr-3 rounded-full"></span>
          Dashboard 
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(stat.path)}
            >
              <div className={`h-2 ${stat.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
