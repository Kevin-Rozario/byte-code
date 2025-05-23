import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Code2, Menu, X, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const signout = useAuthStore((state) => state.signout);

  const handleSignOut = async () => {
    try {
      await signout();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const navLinks = [
    { to: "/", label: "Home", hoverColor: "hover:text-purple-400" },
    { to: "/problems", label: "Problems", hoverColor: "hover:text-blue-400" },
    { to: "/playlists", label: "Playlists", hoverColor: "hover:text-cyan-400" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-700/30 shadow-2xl shadow-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-blue-300 hover:to-cyan-300 transition-all duration-300 group"
            >
              <div className="relative">
                <Code2 className="h-8 w-8 text-purple-500 group-hover:text-purple-400 transition-colors duration-300 drop-shadow-lg" />
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              ByteCode
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-slate-300 ${link.hoverColor} transition-all duration-300 text-lg font-medium relative group px-2 py-1`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border-2 border-transparent hover:border-purple-500/50 transition-all duration-300 group p-0"
                  >
                    <Avatar className="h-9 w-9 ring-2 ring-slate-600 group-hover:ring-purple-500/50 transition-all duration-300">
                      <AvatarImage
                        src={user?.avatar}
                        alt={user?.userName || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold text-sm">
                        {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-950/20"
                  align="end"
                  sideOffset={5}
                  avoidCollisions={true}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuLabel className="font-normal text-slate-200">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {user?.userName || "User"}
                      </p>
                      <p className="text-xs leading-none text-slate-400">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700/50" />
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700/50" />
                  <DropdownMenuItem
                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors duration-200 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth/sign-in"
                className="px-6 py-2.5 min-w-[110px] text-center border border-purple-600/50 text-purple-300 rounded-xl hover:bg-purple-900/20 hover:border-purple-500/80 hover:text-purple-200 transition-all duration-300 text-base font-medium backdrop-blur-sm"
              >
                Sign In
              </Link>
              <Link
                to="/auth/sign-up"
                className="relative py-2.5 px-6 min-w-[110px] text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Sign Up</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all duration-200 focus-visible:ring-offset-slate-950 focus-visible:ring-purple-500/50 border border-transparent hover:border-slate-700/50"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-950/95 backdrop-blur-xl border-l border-slate-700/50 w-full sm:max-w-sm shadow-2xl shadow-purple-950/20"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Mobile navigation menu with links and authentication options
                </DialogDescription>

                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <div className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    <Code2 className="h-6 w-6 text-purple-500" />
                    ByteCode
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex flex-col space-y-6 p-6">
                  {/* Navigation Links */}
                  <div className="space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block text-slate-300 ${link.hoverColor} transition-colors duration-200 text-2xl font-semibold py-2 px-4 rounded-lg hover:bg-slate-800/30`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Auth Section */}
                  <div className="pt-6 border-t border-slate-700/50">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-slate-800/30 rounded-lg">
                          <Avatar className="h-10 w-10 ring-2 ring-purple-500/50">
                            <AvatarImage
                              src={user?.avatar}
                              alt={user?.userName || "User"}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold">
                              {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-white font-medium">
                              {user?.userName || "User"}
                            </span>
                            <span className="text-slate-400 text-sm">
                              {user?.email || "user@example.com"}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-200"
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-200"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors duration-200"
                            onClick={() => {
                              handleSignOut();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/auth/sign-in"
                          className="block w-full text-center px-6 py-3 border border-purple-600/50 text-purple-300 rounded-xl hover:bg-purple-900/20 hover:border-purple-500/80 hover:text-purple-200 transition-all duration-300 text-lg font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/auth/sign-up"
                          className="block w-full text-center relative py-3 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative z-10">Sign Up</span>
                        </Link>
                      </div>
                    )}
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
