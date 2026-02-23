import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import LeadForm from '../components/LeadForm';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get('form') === 'demo') {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-xl text-blue-50">
              Get in touch with us for admissions, course details, or any queries
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="order-2 lg:order-1 w-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">Get In Touch</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Our Address</h3>
                    <p className="text-gray-600 text-sm sm:text-base break-words">
                      House no. 15/B, MC Road, Chenikuthi,<br />
                      Opp. St. Mary's HS School, Guwahati<br />
                      781003, Assam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Phone</h3>
                    <a href="tel:+916002346625" className="text-gray-600 hover:text-[#004BB8] transition-colors text-sm sm:text-base block break-words">
                      +91 6002346625
                    </a>
                    <a href="tel:+918888888888" className="text-gray-600 hover:text-[#004BB8] transition-colors text-sm sm:text-base block break-words mt-1">
                      +91 88888 88888
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h3>
                    <a href="mailto:theadvancedlearning26@gmail.com" className="text-gray-600 hover:text-[#004BB8] transition-colors text-sm sm:text-base block break-all">
                      theadvancedlearning26@gmail.com
                    </a>
                    <a href="mailto:admissions@advancedlearningacademy.com" className="text-gray-600 hover:text-[#004BB8] transition-colors text-sm sm:text-base block break-all mt-1">
                      admissions@advancedlearningacademy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Working Hours</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 8:00 AM - 6:00 PM<br />
                      Sunday: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Follow Us</h3>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <a
                    href="#"
                    className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-[#004BB8] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-[#004BB8] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-[#004BB8] hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 w-full" ref={formRef}>
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">Send Us a Message</h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base text-center lg:text-left">
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

      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg w-full">
            <div className="h-64 sm:h-96 bg-gray-200 flex items-center justify-center w-full">
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
          <div className="mt-6 bg-white rounded-xl p-4 sm:p-6 shadow-sm w-full">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">How to Reach Us</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Our center is located on MC Road in Chenikuthi, opposite St. Mary's HS School, easily accessible by public transport. You can take city buses or auto-rickshaws from any part of Guwahati.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Visit Us for a Free Demo Class
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Experience our teaching methodology firsthand. Book your free demo class today and start your preparation journey with us.
          </p>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#0066FF] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#004BB8] transition-colors text-base sm:text-lg shadow-lg"
          >
            Book Free Demo Class
          </button>
        </div>
      </section>
    </div>
  );
}
