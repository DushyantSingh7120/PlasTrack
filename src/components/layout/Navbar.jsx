import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold font-heading text-foreground">
              PlastiTrack
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium">
              Features
            </a>
            <a href="#calculator" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium">
              Calculator
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium">
              Impact
            </a>
            <a href="#certifications" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium">
              Certifications
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors cursor-pointer">
              Log in
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm py-2.5 px-5">
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground cursor-pointer">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
