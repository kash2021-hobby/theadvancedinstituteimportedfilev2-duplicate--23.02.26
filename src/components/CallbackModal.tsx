import { X } from 'lucide-react';
import LeadForm from './LeadForm';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  sourcePage?: string;
}

export function CallbackModal({
  isOpen,
  onClose,
  title = 'Submit The Details',
  message = 'Fill out the form below and our team will contact you within 24 hours',
  sourcePage = 'sticky-bar-callback'
}: CallbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100 animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          <LeadForm
            sourcePage={sourcePage}
            buttonText="Submit Request"
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default CallbackModal;
