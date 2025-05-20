import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

function Navbar() {
  const navigationLinks = [
    {
      name: "Home",
      path: "/",
    },
  ];

  return (
    <header className="flex justify-between items-center p-4">
      <div id="logo">
        <h1>Logo</h1>
      </div>
      <nav>
        <ul>
          {navigationLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Button>
          <Link to="/auth/sign-in">Login</Link>
        </Button>
        <Button>
          <Link to="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
