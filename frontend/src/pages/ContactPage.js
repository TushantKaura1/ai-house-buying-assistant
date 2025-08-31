import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Let's discuss your real estate needs or collaborate on exciting projects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-2xl font-bold">TK</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tushant Kaura</h3>
                  <p className="text-gray-600">AI House Buying Assistant Developer</p>
                  <p className="text-sm text-gray-500">Full-Stack Web Developer & AI Enthusiast</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">📞</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href="tel:+14377993699" className="text-blue-600 hover:text-blue-700">
                      (437) 799-3699
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:tushantkaura@gmail.com" className="text-green-600 hover:text-green-700">
                      tushantkaura@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-lg">💼</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">LinkedIn</p>
                    <a href="https://linkedin.com/in/tushantkaura/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                      linkedin.com/in/tushantkaura/
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-lg">🐙</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">GitHub</p>
                    <a href="https://github.com/TushantKaura1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700">
                      github.com/TushantKaura1
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Role */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Role</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Web Developer Intern</h4>
                  <p className="text-blue-600">Futura Holding Group, Halifax, NS</p>
                  <p className="text-sm text-gray-600">April 2025 – Present</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Lead Research Mentor</h4>
                  <p className="text-green-600">CISE-Atlantic, Halifax, NS</p>
                  <p className="text-sm text-gray-600">April 2025 – Present</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Bachelor of Applied Computer Science</h4>
                <p className="text-purple-600">Dalhousie University, Halifax, NS</p>
                <p className="text-sm text-gray-600">September 2024 – April 2028</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Me a Message</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="real-estate-inquiry">Real Estate Inquiry</option>
                    <option value="ai-house-assistant">AI House Assistant Questions</option>
                    <option value="collaboration">Project Collaboration</option>
                    <option value="web-development">Web Development Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your inquiry or project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a demo form. In a production environment, this would be connected to a backend service to actually send emails.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+14377993699"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl mr-3">📞</span>
                    <span className="text-gray-700">Call me directly</span>
                  </a>
                  <a
                    href="mailto:tushantkaura@gmail.com"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl mr-3">✉️</span>
                    <span className="text-gray-700">Send me an email</span>
                  </a>
                  <Link
                    to="/about"
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl mr-3">👨‍💻</span>
                    <span className="text-gray-700">Learn more about me</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're looking for your dream home or want to collaborate on exciting projects, I'm here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Try AI House Assistant
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://linkedin.com/in/tushantkaura/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-lg"
            >
              Connect on LinkedIn
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
