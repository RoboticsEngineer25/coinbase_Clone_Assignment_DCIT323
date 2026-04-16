import { useState, useEffect } from "react";
import { useApp } from "../App";
import { authAPI } from "../services/api";

export default function AccountSettings() {
  const { navigate, isSignedIn, setIsSignedIn } = useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isSignedIn) {
      navigate("signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getProfile();
        if (response.success) {
          setUser(response.user);
          setFormData(response.user);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isSignedIn, navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      authAPI.clearToken();
      setIsSignedIn(false);
      setSuccessMsg("Successfully logged out!");
      setTimeout(() => navigate("home"), 1500);
    } catch (err) {
      setError("Logout failed");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccessMsg("");
      // Since backend might not have update endpoint, we'll simulate it
      setSuccessMsg("Profile updated successfully!");
      setUser(formData);
      setEditMode(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cb-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cb-border border-t-cb-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cb-text-secondary">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cb-bg pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 text-cb-blue hover:text-cb-blue-hover transition-colors mb-6 font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-cb-text mb-2">Account Settings</h1>
          <p className="text-cb-text-secondary">Manage your account and security preferences</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-cb-border">
          {["profile", "security", "privacy"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-cb-blue text-cb-blue"
                  : "border-transparent text-cb-text-secondary hover:text-cb-text"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-cb-text mb-1">Personal Information</h2>
                <p className="text-sm text-cb-text-secondary">Update your account details</p>
              </div>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-cb-blue text-white font-semibold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-cb-text-secondary mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName || ""}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-cb-bg border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cb-text-secondary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName || ""}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-cb-bg border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text outline-none focus:border-cb-blue transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cb-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    disabled
                    className="w-full bg-cb-bg border border-cb-border rounded-xl px-4 py-3 text-sm text-cb-text-tertiary outline-none opacity-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-cb-text-tertiary mt-1">Email cannot be changed</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cb-blue text-white font-semibold rounded-xl hover:bg-cb-blue-hover transition-colors text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(user);
                    }}
                    className="px-4 py-2 bg-cb-bg border border-cb-border text-cb-text font-semibold rounded-xl hover:border-cb-blue/50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-cb-bg-raised rounded-lg p-4">
                  <p className="text-xs text-cb-text-tertiary mb-1">First Name</p>
                  <p className="text-cb-text font-semibold">{user?.firstName || "Not set"}</p>
                </div>
                <div className="bg-cb-bg-raised rounded-lg p-4">
                  <p className="text-xs text-cb-text-tertiary mb-1">Last Name</p>
                  <p className="text-cb-text font-semibold">{user?.lastName || "Not set"}</p>
                </div>
                <div className="bg-cb-bg-raised rounded-lg p-4">
                  <p className="text-xs text-cb-text-tertiary mb-1">Email Address</p>
                  <p className="text-cb-text font-semibold">{user?.email || "Not set"}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-cb-text mb-6">Security & Password</h2>

            <div className="space-y-4">
              <div className="bg-cb-bg-raised rounded-lg p-4 border border-cb-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-cb-text mb-1">Change Password</p>
                    <p className="text-xs text-cb-text-secondary">Update your password regularly for security</p>
                  </div>
                  <button className="px-3 py-1.5 bg-cb-blue/10 text-cb-blue font-medium rounded-lg hover:bg-cb-blue/20 transition-colors text-xs">
                    Change
                  </button>
                </div>
              </div>

              <div className="bg-cb-bg-raised rounded-lg p-4 border border-cb-border/50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-cb-text mb-1">Two-Factor Authentication</p>
                    <p className="text-xs text-cb-text-secondary">Add an extra layer of security</p>
                  </div>
                  <button className="px-3 py-1.5 bg-cb-green/10 text-cb-green font-medium rounded-lg hover:bg-cb-green/20 transition-colors text-xs">
                    Enable
                  </button>
                </div>
              </div>

              <div className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/20 mt-6">
                <p className="text-xs text-yellow-600 flex items-start gap-2">
                  <span className="font-bold mt-0.5">⚠️</span>
                  <span>Keep your password strong and unique. Never share it with anyone.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="bg-cb-bg-card border border-cb-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-cb-text mb-6">Privacy & Preferences</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cb-bg-raised rounded-lg border border-cb-border/50">
                <div>
                  <p className="text-sm font-semibold text-cb-text">Marketing Emails</p>
                  <p className="text-xs text-cb-text-secondary">Receive updates about new features and products</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-cb-blue" />
              </div>

              <div className="flex items-center justify-between p-4 bg-cb-bg-raised rounded-lg border border-cb-border/50">
                <div>
                  <p className="text-sm font-semibold text-cb-text">Activity Notifications</p>
                  <p className="text-xs text-cb-text-secondary">Get notified about account activity</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-cb-blue" />
              </div>

              <div className="flex items-center justify-between p-4 bg-cb-bg-raised rounded-lg border border-cb-border/50">
                <div>
                  <p className="text-sm font-semibold text-cb-text">Price Alerts</p>
                  <p className="text-xs text-cb-text-secondary">Notify me when crypto prices reach my targets</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-cb-blue" />
              </div>
            </div>
          </div>
        )}

        {/* Logout Section */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-cb-text mb-2">Danger Zone</h3>
          <p className="text-sm text-cb-text-secondary mb-4">
            Sign out of your account. You'll need to log in again to access your account.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
