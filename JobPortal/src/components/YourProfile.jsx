import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    DateofBirth: '',
    PhoneNumber: '',
    Gender: '',
    interest: '',
  });
  const [cv, setCv] = useState(null); // Store the file
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCv(file);
    } else {
      alert('Please upload a valid image file.');
      setCv(null); // Reset if not an image
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.DateofBirth) newErrors.DateofBirth = 'Date of Birth is required.';
    if (!formData.PhoneNumber) newErrors.PhoneNumber = 'Phone Number is required.';
    else if (!/^\d+$/.test(formData.PhoneNumber)) newErrors.PhoneNumber = 'Phone Number must be numeric.';
    if (!formData.Gender) newErrors.Gender = 'Gender is required.';
    if (!formData.interest) newErrors.interest = 'Interest is required.';
    if (!cv) newErrors.cv = 'CV upload is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (cv) {
      data.append('image', cv); // Append the image file as 'image'
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:3001/userDetails', {
        method: 'POST',
        body: data,
      });

      setLoading(false); // Stop loading

      if (response.status === 200) {
        alert('Profile uploaded successfully!');
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.error('Error uploading profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-xl font-bold text-center">Profile Form</h2>

        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Date of Birth Field */}
        <div className="space-y-2">
          <label className="block text-sm">Date of Birth</label>
          <input
            type="date"
            name="DateofBirth"
            value={formData.DateofBirth}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.DateofBirth ? 'border-red-500' : ''}`}
          />
          {errors.DateofBirth && <p className="text-red-500 text-sm">{errors.DateofBirth}</p>}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <label className="block text-sm">Phone Number</label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.PhoneNumber ? 'border-red-500' : ''}`}
          />
          {errors.PhoneNumber && <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>}
        </div>

        {/* Gender Field */}
        <div className="space-y-2">
          <label className="block text-sm">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === 'Male'}
                onChange={handleChange}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === 'Female'}
                onChange={handleChange}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.Gender && <p className="text-red-500 text-sm">{errors.Gender}</p>}
        </div>

        {/* Interest Field */}
        <div className="space-y-2">
          <label className="block text-sm">Interest</label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.interest ? 'border-red-500' : ''}`}
          >
            <option value="">Select Interest</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Database">Database</option>
            <option value="fullstack">Fullstack</option>
          </select>
          {errors.interest && <p className="text-red-500 text-sm">{errors.interest}</p>}
        </div>

        {/* CV Upload Field */}
        <div className="space-y-2">
          <label className="block text-sm">Upload CV (Image Only)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className={`w-full p-2 border rounded ${errors.cv ? 'border-red-500' : ''}`}
          />
          {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading} // Disable the button while submitting
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;