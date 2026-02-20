import { MessageCircle, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import CallbackModal from './CallbackModal';

export default function StickyContactBar() {
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 200) {
        setIsVisible(true);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 1500);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-2 py-1.5">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowCallbackModal(true)}
              className="flex items-center justify-center gap-1 bg-[#0066FF] text-white px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0052CC] transition-all"
            >
              <div className="bg-white rounded-full p-1">
                <Phone className="w-3 h-3 text-[#0066FF]" />
              </div>
              <span className="hidden sm:inline">Submit The Details</span>
              <span className="sm:hidden">Details</span>
            </button>

            <a
              href="https://wa.me/916002346625"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-[#0066FF] text-white px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0052CC] transition-all"
            >
              <div className="bg-white rounded-full p-1">
                <MessageCircle className="w-3 h-3 text-[#0066FF]" />
              </div>
              <span>Live Chat</span>
            </a>
          </div>
        </div>
      </div>

      <CallbackModal
        isOpen={showCallbackModal}
        onClose={() => setShowCallbackModal(false)}
      />
    </>
  );
}
