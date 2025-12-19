import React from "react";
import { Link } from "react-router-dom";
import { Flame, MapPin, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 xl:py-16 px-4 xl:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 xl:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <div className="text-base font-bold">Holy Ghost Power</div>
                <div className="text-xs text-white/80">Anointed Church International</div>
              </div>
            </div>
            <p className="text-white/80 text-sm max-sm:text-xs">
              A vibrant, spirit-filled community devoted to the teachings of Jesus Christ and the power of the Holy Spirit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 max-sm:text-base">Quick Links</h3>
            <div className="space-y-2 text-sm max-sm:text-xs">
              <Link to="/about" className="block text-white/80 hover:text-accent transition-colors">
                About Us
              </Link>
              <Link to="/service-times" className="block text-white/80 hover:text-accent transition-colors">
                Service Times
              </Link>
              <Link to="/ministries" className="block text-white/80 hover:text-accent transition-colors">
                Ministries
              </Link>
              <Link to="/events" className="block text-white/80 hover:text-accent transition-colors">
                Events
              </Link>
              <Link to="/sermons" className="block text-white/80 hover:text-accent transition-colors">
                Sermons
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 max-sm:text-base">Contact Us</h3>
            <div className="space-y-3 text-sm max-sm:text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  123 Spirit Avenue<br />
                  Faith City, FC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white/80">(555) 777-8888</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white/80">info@hgpaci.org</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 max-sm:text-base">Service Times</h3>
            <div className="space-y-3 text-sm max-sm:text-xs text-white/80">
              <div>
                <div className="font-semibold text-white">Sunday Service</div>
                <div>10:00 AM - 12:30 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Wednesday Prayer</div>
                <div>7:00 PM - 9:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-white">Friday Deliverance</div>
                <div>8:00 PM - 10:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/80 text-sm max-sm:text-xs">
            {currentYear} Holy Ghost Power Anointed Church International
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;