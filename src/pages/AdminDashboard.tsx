import React, { useState, Suspense } from "react";
import ProductsAdmin from "./ProductsAdmin";
import SkillingsAdmin from "./SkillingsAdmin";
import EventsAdmin from "./EventsAdmin";
import CommunityAdmin from "./CommunityAdmin";
import SubmissionsAdmin from "./SubmissionsAdmin";
import OrdersAdmin from "./OrdersAdmin";
import CommunitySubmissionsAdmin from "./CommunitySubmissionsAdmin";
import { useSearchParams } from 'react-router-dom';

const tabs = [
  { id: "products", label: "Products", icon: "🛍️" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "skillings", label: "Skillings", icon: "🎓" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "community", label: "Community", icon: "👥" },
  { id: "community-submissions", label: "Project Submissions", icon: "🚀" },
  { id: "submissions", label: "Submissions", icon: "📝" },
];

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "community-submissions");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your products, skillings, events, community, and view student submissions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <nav className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`
                  flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap
                  ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="p-0">
            <Suspense fallback={<LoadingSpinner />}>
              {activeTab === "products" && <ProductsAdmin />}
              {activeTab === "orders" && <OrdersAdmin />}
              {activeTab === "skillings" && <SkillingsAdmin />}
              {activeTab === "events" && <EventsAdmin />}
              {activeTab === "community" && <CommunityAdmin />}
              {activeTab === "community-submissions" && <CommunitySubmissionsAdmin />}
              {activeTab === "submissions" && <SubmissionsAdmin />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
