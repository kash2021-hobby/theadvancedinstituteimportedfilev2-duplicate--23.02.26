/*
  # Create Leads and Forms Tables for Government Exam Academy

  ## New Tables
  
  ### 1. `leads`
  Stores all lead form submissions from the website
    - `id` (uuid, primary key) - Unique identifier for each lead
    - `full_name` (text, required) - Full name of the prospective student
    - `phone` (text, required) - Phone number (Indian format)
    - `email` (text, optional) - Email address
    - `exam_interest` (text, required) - Which exam they're interested in
    - `message` (text, optional) - Additional message from the lead
    - `source_page` (text, required) - Which page/form they submitted from
    - `created_at` (timestamptz) - Timestamp of submission
  
  ### 2. `demo_bookings`
  Stores demo class booking requests
    - `id` (uuid, primary key) - Unique identifier
    - `full_name` (text, required) - Student name
    - `phone` (text, required) - Phone number
    - `email` (text, optional) - Email address
    - `exam_interest` (text, required) - Exam interested in
    - `preferred_date` (date, optional) - Preferred demo date
    - `preferred_time` (text, optional) - Preferred time slot
    - `created_at` (timestamptz) - Timestamp of booking
    - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
  
  ### 3. `course_enrollments`
  Stores course enrollment inquiries
    - `id` (uuid, primary key) - Unique identifier
    - `full_name` (text, required) - Student name
    - `phone` (text, required) - Phone number
    - `email` (text, optional) - Email address
    - `course_name` (text, required) - Name of the course
    - `batch_preference` (text, optional) - Preferred batch timing
    - `created_at` (timestamptz) - Timestamp of enrollment
    - `status` (text) - Enrollment status (inquiry, contacted, enrolled, rejected)

  ## Security
    - Enable Row Level Security (RLS) on all tables
    - Add policies for public insert access (for lead forms)
    - Restrict read/update/delete to authenticated admin users only

  ## Notes
    - All tables use UUID for primary keys
    - Timestamps are automatically set to current time
    - Phone numbers are stored as text to preserve formatting
    - Status fields use text to allow flexible status management
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  exam_interest text NOT NULL,
  message text,
  source_page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create demo_bookings table
CREATE TABLE IF NOT EXISTS demo_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  exam_interest text NOT NULL,
  preferred_date date,
  preferred_time text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  course_name text NOT NULL,
  batch_preference text,
  status text DEFAULT 'inquiry',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
CREATE POLICY "Anyone can submit leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for demo_bookings table
CREATE POLICY "Anyone can submit demo bookings"
  ON demo_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view demo bookings"
  ON demo_bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update demo bookings"
  ON demo_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for course_enrollments table
CREATE POLICY "Anyone can submit course enrollments"
  ON course_enrollments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view course enrollments"
  ON course_enrollments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update course enrollments"
  ON course_enrollments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_exam_interest ON leads(exam_interest);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_status ON demo_bookings(status);
CREATE INDEX IF NOT EXISTS idx_demo_bookings_created_at ON demo_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_status ON course_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_name ON course_enrollments(course_name);