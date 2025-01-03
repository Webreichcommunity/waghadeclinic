import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Clock, 
  ExternalLink,
  Navigation
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2E5077] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section with Logo and Description */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Waghade Skin Clinic</h2>
          <p className="max-w-2xl mx-auto text-blue-100">
            Your trusted destination for advanced dermatological care, 
            led by Dr. Praful Waghade. We're committed to helping you achieve 
            healthy, radiant skin through personalized treatments and expert care.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Opening Hours
            </h3>
            <div className="space-y-3 text-blue-100">
              <p className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 5:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#doctors" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="#testimonials" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Patient Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-blue-100">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span>Waghade Clinic, 1st Floor Jain Chamber, Akola Bus Stand, Akola - 444001</span>
              </li>
              <li>
                <a href="tel:+919054628440" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5 mr-3" />
                  +91 90546 28440
                </a>
              </li>
              <li>
                <a href="mailto:info@example.com" className="flex items-center text-blue-100 hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5 mr-3" />
                  info@example.com
                </a>
              </li>
            </ul>
          </div>

          {/* Map and Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Find Us</h3>
            {/* Map Preview */}
            <div className="rounded-lg overflow-hidden bg-blue-800/50 p-4 mb-6">
              <a 
                href="https://www.google.com/maps?q=20.735406,77.015071" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-600 transition-colors duration-300 p-4 rounded-lg"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </a>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-blue-800/50 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-blue-800/50 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-blue-800/50 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm mb-4 md:mb-0">
            © 2025 Waghade Skin Clinic. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-blue-100">
            <a href="#privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#sitemap" className="hover:text-white transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
