import React, { useState } from 'react';

const UploadJob = () => {
  const [formData, setFormData] = useState({
    category: '',
    email: '',
    location: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Job Application Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Field with Select Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">None</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Database">Database</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Location Field */}
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

          {/* Experience Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadJob;
