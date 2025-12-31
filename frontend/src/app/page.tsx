'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (token && isAuthenticated()) {
      // Token exists, go to dashboard
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Todo App</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Organize Your Life with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Todo App</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          A beautiful, intuitive task management application that helps you stay organized and productive.
          Get started today with our simple and powerful todo management system.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your tasks efficiently and stay on top of your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">Task Management</h3>
            <p className="text-gray-300">
              Create, organize, and track your tasks with ease. Set priorities, add descriptions, and manage your to-dos efficiently.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Authentication</h3>
            <p className="text-gray-300">
              Sign in with email/password or use secure OAuth with Google and GitHub. Your data is always protected.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-2">Responsive Design</h3>
            <p className="text-gray-300">
              Access your tasks from any device. Our app works seamlessly on desktop, tablet, and mobile devices.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Modern & Premium Footer */}
      <footer className="relative mt-auto bg-gradient-to-b from-indigo-950/70 via-black/60 to-black border-t border-white/10 pt-16 pb-12">
        {/* Very subtle overlay pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12)_0%,transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12)_0%,transparent_40%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand & Tagline */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Todo<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">App</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Make every day more organized.
                Simple. Beautiful. Yours.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-5">
                Product
              </h4>
              <ul className="space-y-3 text-sm">
                {['Features', 'Pricing', 'Templates', 'Integrations', 'Changelog'].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-5">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Social */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-5">
                  Legal
                </h4>
                <ul className="space-y-3 text-sm">
                  {['Terms', 'Privacy', 'Security', 'Cookies'].map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Icons - very minimal */}
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin', 'discord'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    className="text-gray-500 hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/5"
                    aria-label={platform}
                  >
                    <span className="text-xl">{platform[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom copyright line */}
          <div className="mt-16 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Todo App — All rights reserved
            </p>
            <p className="mt-2 text-gray-600">
              Made with focus & a bit of obsession for clean design
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}