import { Code, Github } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <header className="sticky font-sans text-xl px-10 bg-white border-gray-200 shadow-sm">
      <div className="w-full h-full p-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 flex items-center gap-2"
        >
          <Code className="h-6 w-6 text-emerald-600" />
          <span>Mini Vault</span>
        </Link>
        <nav className="hidden md:flex text-lg font-sans font-semi-bold items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="#projects"
            className="text-gray-700 hover:text-emerald-600 transition-colors"
          >
            Projects
          </Link>
          <Link
            to="#about"
            className="text-gray-700 hover:text-emerald-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="https://github.com/williammgyasii/Mini-React-Vault"
            className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
