import React from 'react';

// Main App component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      {/* Tailwind CSS CDN script - added directly in HTML for React immersive */}
      {/* This script is typically in the public/index.html or equivalent for a full React setup. */}
      {/* For this self-contained immersive, we assume it's loaded. */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}

      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-700 rounded-lg p-2">
            NoMinnows
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 rounded-md p-2">How it Works</a>
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 rounded-md p-2">Find Agencies</a>
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 rounded-md p-2">Post Project</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <a href="/auth/login" className="text-gray-600 hover:text-indigo-700 transition-colors duration-200 rounded-md p-2">Log In</a>
            <a href="/auth/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-24 md:py-32 relative overflow-hidden rounded-b-3xl">
        {/* Abstract background shapes for visual interest */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="30" r="15" fill="currentColor" className="text-indigo-400 opacity-70" />
            <rect x="70" y="60" width="25" height="25" rx="8" fill="currentColor" className="text-purple-400 opacity-70" />
            <polygon points="50,10 65,40 35,40" fill="currentColor" className="text-indigo-300 opacity-70" />
            <path d="M 0 0 C 15 20, 30 0, 50 20 C 70 40, 85 20, 100 40 L 100 0 L 0 0 Z" fill="currentColor" className="text-purple-300 opacity-70" />
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg">
            NoMinnows: Your Gateway to Elite Software Agencies
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Connect with vetted, legally established agencies for high-value software development projects. Say goodbye to low-quality bids and endless noise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="bg-white text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Post a Project (For Companies)
            </a>
            <a
              href="#"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
            >
              Find Projects (For Agencies)
            </a>
          </div>
        </div>
      </section>

      {/* Why NoMinnows Section (Value Propositions) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose NoMinnows?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value Prop 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
              <div className="text-5xl text-indigo-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vetted Agencies, Serious Companies</h3>
              <p className="text-gray-600">
                Connect exclusively with legally established, high-performing agencies. No freelancers, no noise, just quality.
              </p>
            </div>

            {/* Value Prop 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
              <div className="text-5xl text-purple-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><path d="M2 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1 2 2h8a2 2 0 0 1 2-2v-3a2 2 0 0 1 2-2h2"/><path d="M20 2h2v2"/><path d="M22 16v2"/><path d="M22 22h-2"/><path d="M2 10h2v2"/><path d="M2 2v2"/><path d="M4 2h2"/><path d="M8 2h2"/><path d="M16 2h2"/><path d="M20 8h2"/><path d="M18 20h2"/><path d="M6 20H4"/><path d="M2 18v2"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Efficiency</h3>
              <p className="text-gray-600">
                Streamline onboarding, project drafting, and agency matching with intelligent AI assistance.
              </p>
            </div>

            {/* Value Prop 3 */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
              <div className="text-5xl text-red-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-piggy-bank"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-6.8 0-10 0V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2.5c.7 0 1.3-.3 1.7-.8M2 17v-3s.8-1 2-1 4 2 4 2V17c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-1.5c0-.5.4-.5.8-.5H18c.6 0 1.2.3 1.6.8L22 17V7h-3"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Commission Model</h3>
              <p className="text-gray-600">
                Enjoy zero-commission direct deals or opt for 15% escrow-backed projects with integrated PM.
              </p>
            </div>

            {/* Value Prop 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
              <div className="text-5xl text-blue-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Value Projects Only</h3>
              <p className="text-gray-600">
                Focus on impactful software development projects with a minimum value of $5,000, ensuring serious engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          {/* For Companies */}
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-8 text-center">
              For Companies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-indigo-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-4">1</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Post Your Project</h4>
                <p className="text-gray-600">
                  Detail your software requirements with AI assistance. Minimum project value: $5,000.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-purple-600 mb-4">2</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Review Vetted Proposals</h4>
                <p className="text-gray-600">
                  Receive up to 5 serious applications from pre-vetted agencies.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-pink-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-pink-600 mb-4">3</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Hire & Collaborate</h4>
                <p className="text-gray-600">
                  Choose direct deals (0% commission) or use escrow with Kanban-style project management.
                </p>
              </div>
            </div>
          </div>

          {/* For Agencies */}
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-purple-700 mb-8 text-center">
              For Agencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-purple-600 mb-4">1</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Create Your Agency Profile</h4>
                <p className="text-gray-600">
                  Generate a draft profile from LinkedIn/website, then refine for admin review and approval.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-indigo-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-indigo-600 mb-4">2</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Discover High-Value Projects</h4>
                <p className="text-gray-600">
                  Browse exclusive listings for software development projects, filtered by your expertise.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Submit Winning Proposals</h4>
                <p className="text-gray-600">
                  Leverage AI for proposal drafting assistance and streamline negotiations to secure deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-tr from-indigo-700 to-purple-800 text-white text-center rounded-t-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Ready to Elevate Your Project Success?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto">
            Join NoMinnows today and experience a premium marketplace designed for serious software development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="bg-white text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Post Your Project Now
            </a>
            <a
              href="#"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
            >
              Join NoMinnows as an Agency
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold text-white mb-2">NoMinnows</div>
            <p className="text-sm">&copy; {new Date().getFullYear()} NoMinnows. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
