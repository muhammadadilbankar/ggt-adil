import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, SignOutButton } from "@clerk/clerk-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Skilling", path: "/skilling" },
    { name: "Meditation", path: "/meditation" },
    { name: "Events", path: "/events" },
    { name: "Community", path: "/community" },
    { name: "MDM Submit Project", path: "/submission" },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm relative z-50">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary hover:text-primary-dark"
        >
          <img 
            src="/ysrlogo.png" 
            alt="YSR Logo" 
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center - Nav Links (absolutely centered) */}
      <div className="hidden md:flex space-x-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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

      {/* Right - Auth Actions */}
      <div className="hidden md:flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <span className="text-sm text-gray-700">{user?.firstName}</span>
            <SignOutButton signOutCallback={() => navigate("/")}>
              <Button variant="ghost" className="text-red-500 hover:text-red-600">
                Logout
              </Button>
            </SignOutButton>
          </>
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
        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg absolute left-4 right-4 p-4">
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
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <img
                      src={user?.imageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <span className="text-sm text-gray-700">{user?.firstName}</span>
                  </div>
                  <SignOutButton signOutCallback={() => navigate("/")}>
                    <button className="text-left w-full text-red-500 hover:text-red-600 py-2">
                      Logout
                    </button>
                  </SignOutButton>
                </>
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
