import React, { useState } from 'react';
import axios from "../lib/axios";

const UploadJob = () => {
  const [formData, setFormData] = useState({
    category: '',
    email: '',
    location: '',
    Jobname: '', // Corrected Jobname field
    description: '', // Corrected description field
    experience: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Jobname validation
    if (formData.Jobname.trim().length < 2) {
      newErrors.Jobname = 'Job name must be at least 2 characters long';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Experience validation
    const experienceRegex = /^(\d+(\.\d+)?)\+?\s*(years?|yrs?)$/i;
    if (!experienceRegex.test(formData.experience)) {
      newErrors.experience = 'Please enter experience in format like "3 years" or "2.5 years"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/jobUpload", formData);

      if (response.status === 200) {
        alert('Job uploaded successfully!');
        // Reset form after successful submission
        setFormData({
          category: '',
          email: '',
          location: '',
          Jobname: '',
          description: '',
          experience: '',
        });
        setErrors({});
      } else {
        throw new Error('Failed to upload job');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert(error.response?.data?.message || 'An error occurred while submitting the form.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Job Upload Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Jobname Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Name:</label>
            <input
              type="text"
              name="Jobname"
              value={formData.Jobname}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.Jobname ? 'border-red-500' : ''}`}
            />
            {errors.Jobname && <p className="text-red-500 text-xs mt-1">{errors.Jobname}</p>}
          </div>

          {/* Other Fields (Email, Category, Location, etc.) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Database">Database</option>
              <option value="Fullstack">Fullstack</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="e.g., 3 years"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.experience ? 'border-red-500' : ''}`}
            />
            {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Upload Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadJob;
