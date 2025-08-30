"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCreditCard, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "../components/Card";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: "2023-09-15"
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type: string) => {
    setUserData(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type]
      }
    }));
  };

  const handleSecurityChange = (setting) => {
    if (setting === "twoFactorEnabled") {
      setUserData(prev => ({
        ...prev,
        securitySettings: {
          ...prev.securitySettings,
          twoFactorEnabled: !prev.securitySettings.twoFactorEnabled
        }
      }));
    }
  };

  const saveChanges = () => {
    // In a real app, this would call an API to update the user profile
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <div className="flex flex-col items-center pb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <FaUser className="text-4xl text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md mb-2 ${activeTab === "personal" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Information
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md mb-2 ${activeTab === "notifications" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => setActiveTab("notifications")}
                >
                  Notification Preferences
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md mb-2 ${activeTab === "security" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  Security Settings
                </button>
              </div>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {activeTab === "personal" && "Personal Information"}
                  {activeTab === "notifications" && "Notification Preferences"}
                  {activeTab === "security" && "Security Settings"}
                </h2>
                
                {activeTab === "personal" && (
                  <button 
                    className={`btn-${isEditing ? "primary" : "secondary"}`}
                    onClick={() => isEditing ? saveChanges() : setIsEditing(true)}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                )}
              </div>
              
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Preferences Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive updates, alerts, and reports via email
                      </p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={userData.notificationPreferences.email}
                        onChange={() => handleNotificationChange("email")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive alerts directly on your device
                      </p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={userData.notificationPreferences.push}
                        onChange={() => handleNotificationChange("push")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive text messages for critical alerts
                      </p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={userData.notificationPreferences.sms}
                        onChange={() => handleNotificationChange("sms")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              )}
              
              {/* Security Settings Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={userData.securitySettings.twoFactorEnabled}
                        onChange={() => handleSecurityChange("twoFactorEnabled")}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium mb-2">Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Last changed: {userData.securitySettings.lastPasswordChange}
                    </p>
                    <button className="btn-secondary flex items-center">
                      <FaLock className="mr-2" /> Change Password
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium mb-2">Connected Accounts</h3>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center">
                        <FaCreditCard className="text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium">Bank Account</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ••••4567
                          </p>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium mb-4">Security Recommendations</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaShieldAlt className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            We recommend enabling two-factor authentication to increase your account security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

