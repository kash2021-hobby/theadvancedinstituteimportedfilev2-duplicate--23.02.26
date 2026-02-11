import { Award, TrendingUp, Star, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState('all');

  const results = [
    {
      name: 'Rahul Sharma',
      exam: 'SSC CGL',
      year: '2023',
      rank: 'All India Rank 156',
      testimonial: 'The faculty at The Advanced Learning Academy helped me understand complex concepts with ease. The mock tests were exactly like the real exam.'
    },
    {
      name: 'Priya Borthakur',
      exam: 'RRB NTPC',
      year: '2023',
      rank: 'Selected',
      testimonial: 'I joined the academy 6 months before my exam. The study material and regular tests helped me track my progress and improve consistently.'
    },
    {
      name: 'Amit Das',
      exam: 'Banking PO',
      year: '2023',
      rank: 'SBI PO Selected',
      testimonial: 'The banking awareness classes were outstanding. The faculty kept us updated with current affairs and banking sector knowledge.'
    },
    {
      name: 'Neha Devi',
      exam: 'SSC CHSL',
      year: '2022',
      rank: 'All India Rank 89',
      testimonial: 'Small batch size meant I got personal attention. The teachers were always available for doubt clearing sessions.'
    },
    {
      name: 'Vikash Kumar',
      exam: 'RRB NTPC',
      year: '2022',
      rank: 'Selected',
      testimonial: 'The study material was comprehensive and covered every topic. Mock tests with detailed solutions were very helpful.'
    },
    {
      name: 'Anjali Gogoi',
      exam: 'SSC CGL',
      year: '2022',
      rank: 'Selected',
      testimonial: 'Excellent coaching with focus on fundamentals. The reasoning and quant classes were particularly helpful for me.'
    },
    {
      name: 'Ranjit Singh',
      exam: 'Banking Clerk',
      year: '2023',
      rank: 'IBPS Clerk Selected',
      testimonial: 'The regular test series helped me improve my speed and accuracy. The faculty provided excellent guidance throughout.'
    },
    {
      name: 'Puja Saikia',
      exam: 'SSC CGL',
      year: '2023',
      rank: 'All India Rank 201',
      testimonial: 'Great coaching institute with experienced faculty. The English language classes helped me improve my weak areas significantly.'
    }
  ];

  const stats = [
    { label: 'Total Selections', value: '1000+', icon: Trophy },
    { label: 'Success Rate', value: '85%', icon: TrendingUp },
    { label: 'Average Improvement', value: '40%', icon: Star },
    { label: 'Top Ranks', value: '50+', icon: Award }
  ];

  const filteredResults = selectedExam === 'all'
    ? results
    : results.filter(result => result.exam.toLowerCase().includes(selectedExam.toLowerCase()));

  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Success Stories</h1>
            <p className="text-xl text-blue-50">
              Celebrating the achievements of our students who cracked various government exams
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Toppers</h2>
              <p className="text-gray-600">Filter by exam to see specific results</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedExam('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedExam === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Exams
              </button>
              <button
                onClick={() => setSelectedExam('ssc')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedExam === 'ssc'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                SSC
              </button>
              <button
                onClick={() => setSelectedExam('rrb')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedExam === 'rrb'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                RRB
              </button>
              <button
                onClick={() => setSelectedExam('banking')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedExam === 'banking'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Banking
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.map((result, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-32 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center relative">
                  <Award className="w-16 h-16 text-white opacity-20 absolute" />
                  <div className="relative">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{result.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary font-semibold">{result.exam}</span>
                    <span className="text-sm text-gray-500">{result.year}</span>
                  </div>
                  <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full inline-block text-sm font-medium mb-4">
                    {result.rank}
                  </div>
                  <p className="text-gray-600 text-sm italic">"{result.testimonial}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Be the Next Success Story
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our proven programs and achieve your government job dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Explore Courses
            </a>
            <a
              href="/contact"
              className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
            >
              Book Free Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
