import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart2,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  FileX,
  Plus,
  Clock,
  TrendingUp,
  Activity,
  Shield,
} from "lucide-react";
import IncidentCard from "../components/IncidentCard";
import { getIncidents } from "../services/api";
import { Incident } from "../types";

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await getIncidents();
        setIncidents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents. Please try again later.');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Calculate statistics
  const totalIncidents = incidents.length;
  const highSeverityCount = incidents.filter(i => i.severity === 'High').length;
  const mediumSeverityCount = incidents.filter(i => i.severity === 'Medium').length;
  const lowSeverityCount = incidents.filter(i => i.severity === 'Low').length;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading incidents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-error-500" />
            <h2 className="text-lg font-semibold">Error</h2>
          </div>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-error-100 text-error-700 rounded-lg hover:bg-error-200 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Incident Dashboard</h1>
              <p className="mt-2 text-gray-600 text-lg">
                Monitor and manage all reported incidents
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 mr-2" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{totalIncidents}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{highSeverityCount}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium Severity</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{mediumSeverityCount}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Severity</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{lowSeverityCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Incidents List */}
        {incidents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No incidents found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                There are no incidents reported yet. Create your first incident to get started.
              </p>
              <Link
                to="/incidents/new"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 hover:shadow-lg"
              >
                <Plus className="h-6 w-6 mr-2" />
                Create First Incident
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <IncidentCard incident={incident} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
