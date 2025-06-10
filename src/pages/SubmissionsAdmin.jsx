import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SubmissionsAdmin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedBranch, setSelectedBranch] = useState("");
  const { token, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "You must be an admin to view this page",
        variant: "destructive",
      });
      navigate("/admin/login");
      return;
    }
    fetchSubmissions();
  }, [token, isAdmin]);

  const fetchSubmissions = async () => {
    try {
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.get(`${API_URL}/api/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      setSubmissions(response.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load submissions. Please try logging in again.",
        variant: "destructive",
      });
      if (error.response?.status === 403) {
        navigate("/admin/login");
      }
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentSubmissions = submissions.filter(
      (sub) => new Date(sub.createdAt) >= lastWeek
    ).length;

    const branchCounts = submissions.reduce((acc, sub) => {
      acc[sub.branch] = (acc[sub.branch] || 0) + 1;
      return acc;
    }, {});

    const uniqueStudents = new Set(submissions.map(sub => sub.uid)).size;

    return {
      total: submissions.length,
      lastWeekSubmissions: recentSubmissions,
      branchCounts,
      uniqueStudents
    };
  }, [submissions]);

  // Filter submissions based on search and filters
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      // Search term filter
      const searchMatch = 
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (!searchMatch) return false;

      // Branch filter
      if (selectedBranch && submission.branch !== selectedBranch) return false;

      // Date range filter
      if (dateRange.start && new Date(submission.createdAt) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(submission.createdAt) > new Date(dateRange.end)) return false;

      return true;
    });
  }, [submissions, searchTerm, selectedBranch, dateRange]);

  // Get unique branches
  const branches = useMemo(() => {
    return [...new Set(submissions.map(sub => sub.branch))];
  }, [submissions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days: {stats.lastWeekSubmissions}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Branch Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              {Object.entries(stats.branchCounts).map(([branch, count]) => (
                <div key={branch} className="flex justify-between">
                  <span>{branch.toUpperCase()}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <Input
                type="text"
                placeholder="Search by name, ID, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      <div className="text-sm text-gray-500">ID: {submission.uid}</div>
                      <div className="text-sm text-gray-500">Branch: {submission.branch}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{submission.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString()}
                      <div className="text-xs">
                        {new Date(submission.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => window.open(submission.pdfLink, '_blank')}
                      >
                        View PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No submissions found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
