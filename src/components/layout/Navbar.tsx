
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Skilling", path: "/skilling" },
    { name: "Meditation", path: "/meditation" },
    { name: "Events", path: "/events" },
    { name: "Community", path: "/community" },
    { name: "Submit Project", path: "/submission" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">EC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">ElectronNexus</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAdmin ? (
            <>
              <Link to="/admin">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-gray-700"
              >
                Logout
              </Button>
            </>
          ) : user ? (
            <Button
              variant="ghost"
              onClick={logout}
              className="text-gray-700"
            >
              Logout
            </Button>
          ) : (
            <Link to="/admin-login">
              <Button variant="ghost" className="text-gray-700">
                <User className="h-5 w-5 mr-2" />
                Admin Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg absolute left-4 right-4 p-4 z-50">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2 pt-2">
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    className="text-primary hover:text-primary-dark transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-primary transition-colors py-2 block w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-primary transition-colors py-2 block w-full text-left"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin-login"
                  className="text-gray-700 hover:text-primary transition-colors py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
