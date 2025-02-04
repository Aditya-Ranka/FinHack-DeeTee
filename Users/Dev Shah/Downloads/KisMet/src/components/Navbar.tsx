import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">ConnectHub</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Community
            </Link>
            <Link to="/dating" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Dating
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/community"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/dating"
              className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Dating
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}