import React from "react";
import { Link } from "react-router-dom";
//rsc to get template
//div.px-4.cursor-pointer.md:hidden and hit tab

// md:hidden media query
//https://tailwindcss.com/docs/guides/create-react-app
//https://heroicons.com/
export interface Props {
  className?: string;
}

const NavBar = ({ className }: Props) => {
  return (
    <nav className={className} role="navigation">
      <Link className="self-center" to="/">
        Home
      </Link>
      <Link className="self-center" to="/settings">
        Settings
      </Link>
      <Link className="self-center" to="/about">
        <div className="pr-8 md:block hidden">About</div>
        <div className="px-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
