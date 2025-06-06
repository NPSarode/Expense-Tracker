import { useState } from 'react';
import { Menu, X, BarChart2, PlusCircle, List, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Add Expense', href: '/dashboard/add', icon: PlusCircle },
  { name: 'Transactions', href: '/dashboard/transactions', icon: List },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.href
                        ? 'border-b-2 border-blue-500 text-gray-900'
                        : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <div className="flex items-center">
                <div className="mr-4 text-sm text-gray-500">{user?.email}</div>
                <button
                  type="button"
                  className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                </button>
                <button
                  type="button"
                  className="ml-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-2 pl-3 pr-4 text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="mr-4 h-4 w-4" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <div className="flex items-center">
                  <LogOut className="mr-4 h-4 w-4" />
                  Sign Out
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};