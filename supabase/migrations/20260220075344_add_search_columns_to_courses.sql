/*
  # Add Search and Filter Columns to Courses Table

  1. New Columns
    - `category` (text, course category for filtering)
    - `cohort_start` (text, batch start date)
    - `syllabus` (jsonb, course structure)
    - `exam_pattern` (jsonb, exam stages)
    - `batch_timings` (jsonb, class schedule)
    - `curriculum` (jsonb, month-by-month plan)
    - `has_special_lectures` (boolean, expert lectures flag)

  2. Indexes
    - Full-text search indexes on name, description, overview
    - Category index for filtering
    - Combined search capabilities

  3. Security
    - RLS policies already enabled and configured
*/

DO $$
BEGIN
  -- Add category column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'category'
  ) THEN
    ALTER TABLE courses ADD COLUMN category text DEFAULT 'General';
  END IF;

  -- Add cohort_start column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'cohort_start'
  ) THEN
    ALTER TABLE courses ADD COLUMN cohort_start text DEFAULT '';
  END IF;

  -- Add syllabus column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'syllabus'
  ) THEN
    ALTER TABLE courses ADD COLUMN syllabus jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add exam_pattern column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'exam_pattern'
  ) THEN
    ALTER TABLE courses ADD COLUMN exam_pattern jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add batch_timings column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'batch_timings'
  ) THEN
    ALTER TABLE courses ADD COLUMN batch_timings jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add curriculum column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'curriculum'
  ) THEN
    ALTER TABLE courses ADD COLUMN curriculum jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add has_special_lectures column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'has_special_lectures'
  ) THEN
    ALTER TABLE courses ADD COLUMN has_special_lectures boolean DEFAULT false;
  END IF;
END $$;

-- Create full-text search indexes
CREATE INDEX IF NOT EXISTS idx_courses_name_search ON courses USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_courses_description_search ON courses USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_courses_overview_search ON courses USING gin(to_tsvector('english', overview));
CREATE INDEX IF NOT EXISTS idx_courses_category_filter ON courses(category);
