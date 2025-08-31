import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Tushant Kaura
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            AI House Buying Assistant Developer & Full-Stack Web Developer
          </p>
          <p className="text-lg text-blue-200 mt-4">
            Bridging cutting-edge AI technology with user-centered design to revolutionize real estate search
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-4xl font-bold">TK</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meet the Developer
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            I'm Tushant Kaura, a passionate Computer Science student at Dalhousie University with expertise in 
            AI, web development, and user experience design. This AI House Buying Assistant represents my vision 
            of combining artificial intelligence with intuitive design to solve real-world problems.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">📞</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <a href="tel:+14377993699" className="text-blue-600 hover:text-blue-700">
                (437) 799-3699
              </a>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">✉️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <a href="mailto:tushantkaura@gmail.com" className="text-green-600 hover:text-green-700">
                tushantkaura@gmail.com
              </a>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">💼</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">LinkedIn</h4>
              <a href="https://linkedin.com/in/tushantkaura/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                tushantkaura
              </a>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-600 text-xl">🐙</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">GitHub</h4>
              <a href="https://github.com/TushantKaura1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700">
                TushantKaura1
              </a>
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Education */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🎓</span>
              </span>
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Bachelor of Applied Computer Science</h4>
                <p className="text-blue-600 font-medium">Dalhousie University, Halifax, NS</p>
                <p className="text-gray-600">September 2024 – April 2028</p>
                <p className="text-sm text-gray-500 mt-2">
                  Focus on AI, web development, and user experience design
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">High School Diploma</h4>
                <p className="text-green-600 font-medium">Woodlawn High School, Dartmouth, NS</p>
                <p className="text-gray-600">September 2023 – July 2024</p>
              </div>
            </div>
          </div>

          {/* Current Experience */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">💼</span>
              </span>
              Current Experience
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Web Developer Intern</h4>
                <p className="text-blue-600 font-medium">Futura Holding Group, Halifax, NS</p>
                <p className="text-gray-600">April 2025 – Present</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Develops responsive web applications using React, HTML, CSS, and JavaScript</li>
                  <li>• Implements interactive UI components and optimizes frontend performance</li>
                  <li>• Collaborates on full-stack development, integrating REST APIs and backend services</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">Lead Research Mentor — STEM Inclusion</h4>
                <p className="text-purple-600 font-medium">CISE-Atlantic, Halifax, NS</p>
                <p className="text-gray-600">April 2025 – Present</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Mentors students from diverse backgrounds in conducting physics-based research</li>
                  <li>• Develops interactive web tools and educational resources using React</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Research Experience */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-600 text-lg">🔬</span>
            </span>
            Research Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-purple-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Undergraduate Research and Development Assistant</h4>
              <p className="text-purple-600 font-medium">Vertex Labs, Dalhousie University</p>
              <p className="text-gray-600 text-sm">November 2024 – Present</p>
              <p className="text-sm text-gray-600 mt-2">
                Researching VR and HCI, focusing on cognitive processes and user perception in 3D environments. 
                Developing intuitive, performance-enhancing interfaces.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Research Assistant and Software Developer</h4>
              <p className="text-blue-600 font-medium">Persuasive Computing Lab, Dalhousie University</p>
              <p className="text-gray-600 text-sm">January 2025 – Present</p>
              <p className="text-sm text-gray-600 mt-2">
                Specializes in designing persuasive and behavior change systems using user-centered approaches. 
                Develops interactive technologies to empower underserved populations.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Programming Languages</h4>
              <div className="space-y-2">
                {['Java', 'Python', 'C/C++', 'SQL (Postgres)', 'JavaScript', 'HTML/CSS', 'R'].map((lang, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{lang}</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Frameworks & Tools</h4>
              <div className="space-y-2">
                {['React', 'Node.js', 'WordPress', 'FastAPI'].map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{tool}</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Libraries & APIs</h4>
              <div className="space-y-2">
                {['Mediapipe', 'pandas', 'NumPy', 'Matplotlib', 'CV2'].map((lib, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{lib}</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-10 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🏆</span>
                <h4 className="font-semibold text-gray-900">Entrance Scholarship 2024</h4>
              </div>
              <p className="text-blue-600 font-medium">Dalhousie University</p>
              <p className="text-gray-600 text-sm">Awarded $25,000 for Academic and Extracurricular Excellence</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🎮</span>
                <h4 className="font-semibold text-gray-900">Most Innovative Award 2024</h4>
              </div>
              <p className="text-purple-600 font-medium">Global Game Jam</p>
              <p className="text-gray-600 text-sm">Recognized for Creativity and Technical Excellence</p>
            </div>
          </div>
        </div>

        {/* AI House Assistant Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">About This Project</h3>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The AI House Buying Assistant represents the culmination of my passion for AI, web development, 
              and user experience design. This project demonstrates how artificial intelligence can be leveraged 
              to solve real-world problems in the real estate industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 text-xl">🤖</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Search</h4>
                <p className="text-sm text-gray-600">
                  Natural language processing to understand user preferences and find perfect matches
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Modern Web Tech</h4>
                <p className="text-sm text-gray-600">
                  Built with React, TailwindCSS, and modern web development best practices
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">User-Centered Design</h4>
                <p className="text-sm text-gray-600">
                  Focus on intuitive user experience and accessible design principles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Find Your Dream Home?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Experience the future of real estate search with AI-powered intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Searching
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-lg"
            >
              Contact Me
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
