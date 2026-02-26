import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Wifi, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Course {
  name: string;
  duration: string;
  cohortStart: string;
  slug: string;
  category: string;
  logo?: string;
  backgroundImage?: string;
  hasOnlineSupport?: boolean;
  hasSpecialLectures?: boolean;
}

const courses: Course[] = [
  {
    name: 'Railway NTPC',
    duration: '6 Months',
    cohortStart: '1st March 2026',
    slug: 'rrb-ntpc',
    category: 'RRB',
    logo: 'https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: '/images/hero/railwayntpc.webp',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  },
  {
    name: 'SSC CGL',
    duration: '6 + 3 Months',
    cohortStart: '15th March 2026',
    slug: 'ssc-cgl',
    category: 'SSC',
    logo: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: 'https://images.pexels.com/photos/7944080/pexels-photo-7944080.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  },
  {
    name: 'SSC CHSL',
    duration: '6 Months',
    cohortStart: '15th March 2026',
    slug: 'ssc-chsl',
    category: 'SSC',
    logo: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  },
  {
    name: 'Bank PO',
    duration: '6-8 Months',
    cohortStart: '5th March 2026',
    slug: 'sbi-po-ibps-po',
    category: 'Banking',
    logo: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  },
  {
    name: 'Bank Clerk',
    duration: '6 Months',
    cohortStart: '10th March 2026',
    slug: 'sbi-clerk-ibps-clerk',
    category: 'Banking',
    logo: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  },
  {
    name: 'ADRE (Assam Direct Recruitment)',
    duration: '6 Months',
    cohortStart: '20th March 2026',
    slug: 'adre',
    category: 'State Exams',
    logo: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=200',
    backgroundImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    hasOnlineSupport: true,
    hasSpecialLectures: true
  }
];

const categories = ['RRB', 'SSC', 'Banking', 'State Exams'];

export default function TabbedCourseSection() {
  const [selectedCategory, setSelectedCategory] = useState('Most Popular');
  const [isCarouselExpanded, setIsCarouselExpanded] = useState(true);
  const coursesAnimation = useScrollAnimation({ direction: 'up', delay: 100 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const selectedCategoryRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isTransitioningRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);

  const filteredCourses = selectedCategory === 'Most Popular'
    ? courses
    : courses.filter((course) => course.category === selectedCategory);

  const allCategories = ['Most Popular', ...categories];
  const selectedIndex = allCategories.indexOf(selectedCategory);
  const categoriesBeforeSelected = allCategories.slice(0, selectedIndex);
  const categoriesAfterSelected = allCategories.slice(selectedIndex + 1);

  // Create infinite loop array: [lastCourse, ...allCourses, firstCourse]
  const carouselCourses = filteredCourses.length > 0
    ? [filteredCourses[filteredCourses.length - 1], ...filteredCourses, filteredCourses[0]]
    : [];

  // Initialize carousel position on category change
  useEffect(() => {
    if (carouselRef.current && filteredCourses.length > 0) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * 1, // Start at index 1 (first real course)
        behavior: 'auto'
      });
      setCurrentSlide(1);
    }
  }, [selectedCategory, filteredCourses.length]);

  // Handle scroll events to sync currentSlide state and implement infinite loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || filteredCourses.length <= 1) return;

    const handleScroll = () => {
      if (isTransitioningRef.current) return;

      const slideWidth = carousel.offsetWidth;
      const scrollLeft = carousel.scrollLeft;
      const index = Math.round(scrollLeft / slideWidth);

      if (index !== currentSlide) {
        setCurrentSlide(index);
      }

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to detect when scrolling has stopped
      scrollTimeoutRef.current = setTimeout(() => {
        // Only reset position if user is not currently interacting
        if (isUserInteractingRef.current) return;

        const currentIndex = Math.round(carousel.scrollLeft / slideWidth);

        // If at the duplicate last slide (index 0), jump to real last slide
        if (currentIndex === 0) {
          isTransitioningRef.current = true;
          carousel.scrollTo({
            left: slideWidth * (carouselCourses.length - 2),
            behavior: 'auto'
          });
          setCurrentSlide(carouselCourses.length - 2);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 50);
        }
        // If at the duplicate first slide (last index), jump to real first slide
        else if (currentIndex === carouselCourses.length - 1) {
          isTransitioningRef.current = true;
          carousel.scrollTo({
            left: slideWidth * 1,
            behavior: 'auto'
          });
          setCurrentSlide(1);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 50);
        }
      }, 150); // Wait 150ms after scroll stops
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSlide, carouselCourses.length, filteredCourses.length]);

  const scrollToSlide = (index: number, smooth = true) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setCurrentSlide(index);
    }
  };

  const handleNext = () => {
    if (carouselRef.current && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      const nextIndex = currentSlide + 1;
      scrollToSlide(nextIndex);

      // If we're moving to the duplicated first slide, reset to actual first slide
      if (nextIndex === carouselCourses.length - 1) {
        setTimeout(() => {
          isTransitioningRef.current = false;
          scrollToSlide(1, false);
        }, 300);
      } else {
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 300);
      }
    }
  };

  const handlePrev = () => {
    if (carouselRef.current && !isTransitioningRef.current) {
      isTransitioningRef.current = true;
      const prevIndex = currentSlide - 1;

      // If we're at the first real course, go to the duplicated last course
      if (prevIndex === 0) {
        scrollToSlide(0);
        setTimeout(() => {
          isTransitioningRef.current = false;
          scrollToSlide(carouselCourses.length - 2, false);
        }, 300);
      } else {
        scrollToSlide(prevIndex);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 300);
      }
    }
  };

  // Touch event handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    isUserInteractingRef.current = true;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    isUserInteractingRef.current = false;

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Don't use handleNext/handlePrev for touch swipes
    // Let the native scroll behavior with snap points handle it
    // The infinite loop will be handled by the scroll event listener
  };

  // Mouse event handlers for desktop drag support
  const onMouseDown = () => {
    isUserInteractingRef.current = true;
  };

  const onMouseUp = () => {
    isUserInteractingRef.current = false;
  };

  const onMouseLeave = () => {
    isUserInteractingRef.current = false;
  };

  // Scroll to ensure the entire carousel (including "View Program" button) is visible
  const scrollCategoryIntoView = () => {
    if (selectedCategoryRef.current) {
      // Longer delay to let the carousel fully expand
      setTimeout(() => {
        if (selectedCategoryRef.current) {
          const element = selectedCategoryRef.current;
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const absoluteElementBottom = absoluteElementTop + elementRect.height;
          const viewportHeight = window.innerHeight;
          const currentScrollTop = window.pageYOffset;
          const viewportBottom = currentScrollTop + viewportHeight;

          // Check if the bottom of the carousel is visible
          const bottomPadding = 100; // Extra padding at bottom
          const topPadding = 80; // Padding at top

          if (absoluteElementBottom + bottomPadding > viewportBottom) {
            // Bottom is cut off, scroll to show the entire element
            const targetScrollPosition = absoluteElementBottom + bottomPadding - viewportHeight;

            window.scrollTo({
              top: Math.max(0, targetScrollPosition),
              behavior: 'smooth'
            });
          } else if (absoluteElementTop < currentScrollTop + topPadding) {
            // Top is cut off, scroll to show from top
            window.scrollTo({
              top: Math.max(0, absoluteElementTop - topPadding),
              behavior: 'smooth'
            });
          }
        }
      }, 300); // Increased delay to ensure carousel is fully rendered
    }
  };

  // Handle category selection on mobile
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlide(1);
    setIsCarouselExpanded(true);
    scrollCategoryIntoView();
  };

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#EEF6FF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={coursesAnimation.ref} style={coursesAnimation.style} className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Government Exam Programs
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive coaching programs designed for success
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Buttons - Vertical on Desktop, Horizontal on Mobile */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Desktop: Vertical Stack */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden p-2">
              <button
                onClick={() => setSelectedCategory('Most Popular')}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all font-satoshi font-normal text-base leading-[26px] ${
                  selectedCategory === 'Most Popular'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#004BB8] hover:text-white'
                }`}
              >
                Most Popular
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all font-satoshi font-normal text-base leading-[26px] ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-[#004BB8] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Mobile: Interleaved Layout */}
            <div className="lg:hidden space-y-6">
              {/* Categories Before Selected */}
              {categoriesBeforeSelected.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-2">
                  {categoriesBeforeSelected.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left px-6 py-4 rounded-xl transition-all font-satoshi font-normal text-base leading-[26px] text-gray-700 hover:bg-[#004BB8] hover:text-white"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Selected Category + Carousel */}
              <div ref={selectedCategoryRef} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-2">
                  <button
                    onClick={() => setIsCarouselExpanded(!isCarouselExpanded)}
                    className="w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all font-satoshi font-normal text-base leading-[26px] bg-white text-blue-600 border-2 border-blue-600 shadow-md"
                  >
                    <span>{selectedCategory}</span>
                    {isCarouselExpanded ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                </div>

                {/* Mobile Carousel View */}
                {isCarouselExpanded && (
                <div className="relative">
                  <div
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
                    style={{ scrollSnapType: 'x mandatory' }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                  >
                    {carouselCourses.map((course, index) => (
                      <div
                        key={`${course.slug}-${index}`}
                        className="flex-shrink-0 w-full snap-center"
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative">
                          <div
                            className="bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-visible"
                            style={{
                              width: '272px',
                              height: '300px',
                              backgroundImage: course.backgroundImage ? `url('${course.backgroundImage}')` : undefined,
                              backgroundSize: 'contain',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                            }}
                          >
                            <>
                              <div className="absolute inset-0 bg-black/0"></div>
                            </>
                          </div>

                          <div className="p-6">
                            <div className="space-y-4 mb-6">
                              {(course.hasOnlineSupport || course.hasSpecialLectures) && (
                                <div className="flex flex-wrap gap-2">
                                  {course.hasOnlineSupport && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded-full shadow-md">
                                      <Wifi className="w-3.5 h-3.5" />
                                      <span>Online + Offline Classes</span>
                                    </div>
                                  )}
                                  {course.hasSpecialLectures && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
                                      <GraduationCap className="w-3.5 h-3.5" />
                                      <span>Expert Lectures</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center text-gray-700">
                                <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                                <span className="text-sm font-medium">
                                  Duration: {course.duration}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-700">
                                <Calendar className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                                <span className="text-sm font-medium">
                                  Cohort Starts: {course.cohortStart}
                                </span>
                              </div>
                            </div>

                            <Link
                              to={`/courses/${course.slug}`}
                              className="block w-full text-center bg-blue-600 hover:bg-[#004BB8] text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                              View Program
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows for Mobile */}
                  {filteredCourses.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        aria-label="Previous course"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        aria-label="Next course"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      </button>
                    </>
                  )}

                  {/* Dots Indicator for Mobile */}
                  {filteredCourses.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {filteredCourses.map((_, index) => {
                        // Map current slide to actual course index (accounting for duplicate at start)
                        const actualIndex = currentSlide === 0
                          ? filteredCourses.length - 1
                          : currentSlide === carouselCourses.length - 1
                          ? 0
                          : currentSlide - 1;

                        const isActive = index === actualIndex;
                        return (
                          <button
                            key={index}
                            onClick={() => scrollToSlide(index + 1)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              isActive ? 'bg-blue-600 w-6' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                )}
              </div>

              {/* Categories After Selected */}
              {categoriesAfterSelected.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-2">
                  {categoriesAfterSelected.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left px-6 py-4 rounded-xl transition-all font-satoshi font-normal text-base leading-[26px] text-gray-700 hover:bg-[#004BB8] hover:text-white"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block flex-1">
            {/* Desktop Grid View */}
            <div className="md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl">
              {filteredCourses.map((course) => (
                <div
                  key={course.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 relative"
                >
                  <div
                    className="bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-visible"
                    style={{
                      width: '272px',
                      height: '300px',
                      backgroundImage: course.backgroundImage ? `url('${course.backgroundImage}')` : undefined,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <>
                      <div className="absolute inset-0 bg-black/0"></div>
                    </>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {(course.hasOnlineSupport || course.hasSpecialLectures) && (
                        <div className="flex flex-wrap gap-2">
                          {course.hasOnlineSupport && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded-full shadow-md">
                              <Wifi className="w-3.5 h-3.5" />
                              <span>Online + Offline Classes</span>
                            </div>
                          )}
                          {course.hasSpecialLectures && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
                              <GraduationCap className="w-3.5 h-3.5" />
                              <span>Expert Lectures</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          Duration: {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          Cohort Starts: {course.cohortStart}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/courses/${course.slug}`}
                      className="block w-full text-center bg-blue-600 hover:bg-[#004BB8] text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      View Program
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No courses available in this category yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-[#004BB8] transition-colors"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
