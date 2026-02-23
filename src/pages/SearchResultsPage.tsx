import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock, Users, ArrowRight, Search, ChevronRight } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  slug: string;
  category: string;
  duration: string;
  mode: string;
  batch_size: string;
  description: string;
  has_online_support: boolean;
  has_special_lectures: boolean;
  logo?: string;
  highlights?: string;
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<Course[]>([]);

  const categories = ['RRB', 'SSC', 'Banking', 'State Exams'];

  const calculateRelevance = (course: Course, searchTerm: string): number => {
    const term = searchTerm.toLowerCase();
    const nameLC = course.name.toLowerCase();
    const descLC = course.description.toLowerCase();
    const categoryLC = course.category.toLowerCase();

    let score = 0;

    if (nameLC === term) score += 100;
    if (nameLC.includes(term)) score += 50;

    if (categoryLC === term) score += 80;
    if (categoryLC.includes(term)) score += 40;

    if (descLC.includes(term)) score += 20;

    return score;
  };

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const searchCourses = async () => {
      setLoading(true);
      try {
        const searchTerm = query.toLowerCase();

        const { data, error } = await supabase
          .from('courses')
          .select('*');

        if (error) throw error;

        if (data) {
          const filtered = data
            .map((course: Course) => ({
              ...course,
              relevance: calculateRelevance(course, searchTerm),
            }))
            .filter((course: any) => course.relevance > 0)
            .sort((a: any, b: any) => b.relevance - a.relevance)
            .map(({ relevance, ...course }: any) => course);

          setResults(filtered);

          if (selectedCategory) {
            setFilteredResults(
              filtered.filter((course: Course) => course.category === selectedCategory)
            );
          } else {
            setFilteredResults(filtered);
          }
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    searchCourses();
  }, [query]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredResults(
        results.filter((course: Course) => course.category === selectedCategory)
      );
    } else {
      setFilteredResults(results);
    }
  }, [selectedCategory, results]);

  const displayResults = filteredResults.length > 0 ? filteredResults : results;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-sm text-blue-100">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Search Results</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Search Results</h1>

          {query && (
            <p className="text-lg text-blue-100">
              {displayResults.length} {displayResults.length === 1 ? 'course' : 'courses'} found for "{query}"
            </p>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter by Category</h3>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'bg-primary text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>

                {categories.map((cat) => {
                  const count = results.filter((c) => c.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === cat
                          ? 'bg-primary text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        selectedCategory === cat
                          ? 'bg-white bg-opacity-20'
                          : 'bg-gray-200'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => navigate('/courses')}
                className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                View All Courses
              </button>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {!loading && !query.trim() && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Search Query</h2>
                <p className="text-gray-600 mb-6">Enter a search term to find courses</p>
                <Link
                  to="/courses"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Browse All Courses
                </Link>
              </div>
            )}

            {!loading && query.trim() && displayResults.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any courses matching "{query}"
                </p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {!loading && displayResults.length > 0 && (
              <div className="space-y-6">
                {displayResults.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row">
                      {course.logo && (
                        <div className="md:w-32 h-32 bg-gray-100 flex-shrink-0">
                          <img
                            src={course.logo}
                            alt={course.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-grow p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {course.name}
                              </h3>
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {course.category}
                              </span>
                            </div>
                            <p className="text-gray-600">{course.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.batch_size}</span>
                          </div>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {course.mode}
                          </span>
                          {course.has_online_support && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Online Support
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/courses/${course.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
