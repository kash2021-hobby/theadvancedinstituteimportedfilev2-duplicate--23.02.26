import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

interface LeadFormProps {
  sourcePage: string;
  showMessage?: boolean;
  buttonText?: string;
  buttonClass?: string;
}

export default function LeadForm({
  sourcePage,
  showMessage = false,
  buttonText = 'Submit',
  buttonClass = 'w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    examInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.from('leads').insert({
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        exam_interest: formData.examInterest,
        message: formData.message || null,
        source_page: sourcePage,
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        examInterest: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const examOptions = [
    'RRB NTPC',
    'SSC CGL',
    'SSC CHSL',
    'Banking Exams',
    'Other',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Full Name *"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <input
          type="tel"
          placeholder="Phone Number *"
          required
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email (Optional)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <select
          required
          value={formData.examInterest}
          onChange={(e) => setFormData({ ...formData, examInterest: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option value="">Select Exam Interest *</option>
          {examOptions.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {showMessage && (
        <div>
          <textarea
            placeholder="Message (Optional)"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClass}
      >
        {isSubmitting ? 'Submitting...' : buttonText}
      </button>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm">
          Thank you! We'll contact you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg text-sm">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
