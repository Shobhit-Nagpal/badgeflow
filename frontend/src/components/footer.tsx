import { Link } from "@tanstack/react-router";
import { Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; 2024 BadgeFlow, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="/about"
            className="text-sm leading-6 text-gray-400 hover:text-gray-300"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm leading-6 text-gray-400 hover:text-gray-300"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-sm leading-6 text-gray-400 hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm leading-6 text-gray-400 hover:text-gray-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
