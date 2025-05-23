import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/authStore";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              <Code2 className="h-7 w-7 text-purple-500" />
              ByteCode
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-slate-300 hover:text-purple-400 transition-colors duration-200 text-lg font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/problems"
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-lg font-medium relative group"
            >
              Problems
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/playlists"
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 text-lg font-medium relative group"
            >
              Playlists
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/sign-in"
              className="px-5 py-2.5 min-w-[100px] text-center border border-purple-600/50 text-purple-300 rounded-xl hover:bg-purple-900/20 hover:border-purple-500/80 transition-all duration-300 text-base font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/auth/sign-up"
              className="relative py-2.5 px-6 min-w-[100px] text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Sign Up</span>
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-200 focus-visible:ring-offset-slate-900 focus-visible:ring-purple-500/50"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-950/90 backdrop-blur-lg border-l border-slate-700/50 w-full sm:max-w-sm"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DialogTitle className="sr-only">Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Navigation menu
                </DialogDescription>
                <div className="flex justify-end p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-200 focus-visible:ring-offset-slate-900 focus-visible:ring-purple-500/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 py-8">
                  <Link
                    to="/"
                    className="text-slate-300 text-3xl font-semibold hover:text-purple-400 transition-colors duration-200 text-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/problems"
                    className="text-slate-300 text-3xl font-semibold hover:text-blue-400 transition-colors duration-200 text-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Problems
                  </Link>
                  <Link
                    to="/playlists"
                    className="text-slate-300 text-3xl font-semibold hover:text-cyan-400 transition-colors duration-200 text-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Playlists
                  </Link>
                  <div className="flex flex-col space-y-4 w-full max-w-xs pt-8 border-t border-slate-700/50">
                    <Link
                      to="/auth/sign-in"
                      className="w-full text-center px-6 py-3 min-w-[140px] border border-purple-600/50 text-purple-300 rounded-xl hover:bg-purple-900/20 hover:border-purple-500/80 transition-all duration-300 text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth/sign-up"
                      className="w-full text-center relative py-3 px-6 min-w-[140px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Sign Up</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
