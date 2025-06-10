import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Input } from "@/components/ui/input";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Submission {
  _id: string;
  name: string;
  uid: string;
  branch: string;
  title: string;
  pdfLink: string;
  submittedAt: string;
}

const SubmissionsAdmin: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setError(null);
      const response = await axios.get('/api/submissions');
      setSubmissions(response.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch submissions';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = React.useMemo(() => {
    const byBranch: Record<string, number> = {};
    const byMonth: Record<string, number> = {};
    
    submissions.forEach((submission) => {
      // Count by branch
      byBranch[submission.branch] = (byBranch[submission.branch] || 0) + 1;
      
      // Count by month
      const month = format(new Date(submission.submittedAt), 'MMM yyyy');
      byMonth[month] = (byMonth[month] || 0) + 1;
    });

    return {
      total: submissions.length,
      byBranch,
      byMonth
    };
  }, [submissions]);

  const branchChartData = {
    labels: Object.keys(stats.byBranch),
    datasets: [
      {
        label: 'Submissions by Branch',
        data: Object.values(stats.byBranch),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyChartData = {
    labels: Object.keys(stats.byMonth),
    datasets: [
      {
        label: 'Monthly Submissions',
        data: Object.values(stats.byMonth),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchSubmissions}
            className="mt-2 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Student Submissions</h1>
      <p className="text-gray-600 mb-6">View and manage student project submissions</p>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribution by Branch</h3>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            {Object.keys(stats.byBranch).length > 0 ? (
              <Pie 
                data={branchChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12
                      }
                    }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            {Object.keys(stats.byMonth).length > 0 ? (
              <Bar
                data={monthlyChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <Input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Submission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      <div className="text-sm text-gray-500">ID: {submission.uid}</div>
                      <div className="text-sm text-gray-500">Branch: {submission.branch}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{submission.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(submission.submittedAt), 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(submission.submittedAt), 'h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => window.open(submission.pdfLink, '_blank')}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View PDF
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No submissions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsAdmin; 