import axios from '../lib/axios';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [jobData, setJobData] = useState([]); // State to store job details
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  // Fetch job data from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.post("http://localhost:3001/search");
        if (!response.status === 200) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.data;
        setJobData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="bg-blue-200 w-full py-4 shadow-md">
        <div className="flex items-center justify-between px-8">
          <div className="flex-1 flex justify-center space-x-8">
            <Link to="/your-profile" className="font-semibold hover:underline">
              Profile
            </Link>
            <Link to="/view-portal" className="font-semibold hover:underline">
              VIEW PORTAL
            </Link>
            <Link to="/uploadjob" className="font-semibold hover:underline">
              Upload Job
            </Link>
            <Link to="/about" className="font-semibold hover:underline">
              About
            </Link>
            <Link to="/search" className="font-semibold hover:underline">
              Search
            </Link>
          </div>

          <button
            onClick={() => setShowLogoutDialog(true)}
            className="font-semibold text-red-500 hover:underline"
          >
            LOG OUT
          </button>
        </div>
      </div>

      <div className="flex flex-1 h-full">
        <div className="flex flex-col items-center justify-center w-1/3 bg-gray-300 p-8">
          <img
            src="/public/images/logo.jpg.jpg"
            alt="Job Placement Logo"
            className="w-72 h-auto mb-6"
          />
          <p className="text-gray-700 font-medium text-center text-2xl">
            EXPLORE BETTER OPPORTUNITIES WITH{" "}
            <span className="font-bold">JOB PLACEMENT</span>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-2/3 p-8">
          {/* Render fetched job data */}
          <div className="grid grid-cols-2 gap-12 w-4/5">
            {jobData.length > 0 ? (
              jobData.map((job) => (
                <div
                  key={job.id}
                  className="h-auto border p-8 rounded-lg shadow-md bg-gray-200 flex flex-col"
                >
                  <h3 className="font-bold text-xl mb-2">{job.Jobname}</h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Category:</span>{" "}
                    {job.category}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Experience:</span>{" "}
                    {job.experience}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Contact Us:</span>{" "}
                    {job.email}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-600">
                No job data available.
              </div>
            )}
          </div>
        </div>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 font-semibold text-lg">Do you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
