import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import LeadForm from '../components/LeadForm';

export default function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-50">
              Get in touch with us for admissions, course details, or any queries
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
                    <p className="text-gray-600">
                      GS Road, Near Ganeshguri,<br />
                      Guwahati, Assam 781006
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+919999999999" className="text-gray-600 hover:text-primary">
                      +91 99999 99999
                    </a>
                    <br />
                    <a href="tel:+918888888888" className="text-gray-600 hover:text-primary">
                      +91 88888 88888
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@advancedlearningacademy.com" className="text-gray-600 hover:text-primary">
                      info@advancedlearningacademy.com
                    </a>
                    <br />
                    <a href="mailto:admissions@advancedlearningacademy.com" className="text-gray-600 hover:text-primary">
                      admissions@advancedlearningacademy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 8:00 AM - 6:00 PM<br />
                      Sunday: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-lg transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-lg transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-lg transition-colors"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form and our team will get back to you within 24 hours
                </p>
                <LeadForm
                  sourcePage="contact"
                  showMessage={true}
                  buttonText="Send Message"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.7346384568977!2d91.7499!3d26.1445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA4JzQwLjIiTiA5McKwNDUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Advanced Learning Academy Location"
              ></iframe>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">How to Reach Us</h3>
            <p className="text-gray-600">
              Our center is located on GS Road near Ganeshguri, easily accessible by public transport. The nearest landmarks are Ganeshguri Police Station and Dispur Last Gate. You can take city buses or auto-rickshaws from any part of Guwahati.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Visit Us for a Free Demo Class
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience our teaching methodology firsthand. Book your free demo class today and start your preparation journey with us.
          </p>
          <button className="bg-secondary text-white px-10 py-4 rounded-lg font-semibold hover:bg-secondary-dark transition-colors text-lg">
            Book Free Demo Class
          </button>
        </div>
      </section>
    </div>
  );
}
