// Import necessary modules
import React, { useState } from 'react';


// Define the ApplicationForm component
const ApplicationForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = '65f324f4f4717204489c8d6f'; 
    const postId = '65f43dcd5543e4c6fcab6995'; 
  
    const formDataWithIds = {
      ...formData,
      userId,
      postId
    };
  
    const formDataToSend = new FormData();
    for (const key in formDataWithIds) {
      formDataToSend.append(key, formDataWithIds[key]);
    }

    console.log(formDataToSend);
  
    try {
      const response = await fetch('/api/application/apply', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Application submitted successfully');
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          resume: null
        });
      } else {
        alert('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };
  

  // Return the JSX for the form
  return (
    <div>
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </main>

    </div>
  );
};

// Export the ApplicationForm component
export default ApplicationForm;
