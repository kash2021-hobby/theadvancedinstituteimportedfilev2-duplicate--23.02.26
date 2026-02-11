import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/image.png"
                alt="The Advanced Learning Academy"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Where learning meets employment. Expert coaching for SSC, Banking, Railway and more government exams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm hover:text-white transition-colors">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-sm hover:text-white transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses/rrb-ntpc" className="text-sm hover:text-white transition-colors">
                  RRB NTPC
                </Link>
              </li>
              <li>
                <Link to="/courses/ssc-cgl" className="text-sm hover:text-white transition-colors">
                  SSC CGL
                </Link>
              </li>
              <li>
                <Link to="/courses/ssc-chsl" className="text-sm hover:text-white transition-colors">
                  SSC CHSL
                </Link>
              </li>
              <li>
                <Link to="/courses/banking" className="text-sm hover:text-white transition-colors">
                  Banking Exams
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  GS Road, Near Ganeshguri, Guwahati, Assam 781006
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919999999999" className="text-sm hover:text-white transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@advancedlearningacademy.com" className="text-sm hover:text-white transition-colors">
                  info@advancedlearningacademy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} The Advanced Learning Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
