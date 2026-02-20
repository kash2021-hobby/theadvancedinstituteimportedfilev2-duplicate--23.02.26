/*
  # Update all batch timings to start after 10 AM

  1. Changes Made
    - Updated RRB NTPC: Changed 6:00 AM to 10:00 AM, kept 6:00 PM, changed 9:00 AM to 10:00 AM
    - Updated SSC CGL: Changed 8:00 AM to 10:00 AM, kept 5:00 PM, kept 10:00 AM weekend
    - Updated SSC CHSL: Changed 7:00 AM to 10:00 AM, kept 5:00 PM, kept 3:00 PM weekend
    - Updated SBI PO & IBPS PO: Changed 6:00 AM to 10:00 AM, kept 6:00 PM, changed 9:00 AM to 10:00 AM
    - Updated SBI Clerk & IBPS Clerk: Changed 6:00 AM to 10:00 AM, kept 6:00 PM, changed 9:00 AM to 10:00 AM
    - Updated ADRE: Changed 6:00 AM to 10:00 AM, kept 6:00 PM, changed 9:00 AM to 10:00 AM

  2. Rationale
    - All morning batch timings now start at 10:00 AM or later
    - Evening and weekend batches remain unchanged
    - Provides more flexibility for student schedules
*/

UPDATE courses SET batch_timings = '[
  {"day": "Monday, Wednesday, Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Monday, Wednesday, Friday", "time": "6:00 PM - 8:00 PM"},
  {"day": "Tuesday, Thursday, Saturday", "time": "10:00 AM - 12:00 PM"}
]'::jsonb WHERE name = 'RRB NTPC';

UPDATE courses SET batch_timings = '[
  {"day": "Monday to Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Monday to Friday", "time": "5:00 PM - 7:00 PM"},
  {"day": "Weekend Batch (Sat-Sun)", "time": "10:00 AM - 2:00 PM"}
]'::jsonb WHERE name = 'SSC CGL';

UPDATE courses SET batch_timings = '[
  {"day": "Monday, Wednesday, Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Tuesday, Thursday, Saturday", "time": "5:00 PM - 7:00 PM"},
  {"day": "Weekend Batch (Sat-Sun)", "time": "3:00 PM - 6:00 PM"}
]'::jsonb WHERE name = 'SSC CHSL';

UPDATE courses SET batch_timings = '[
  {"day": "Monday to Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Monday to Friday", "time": "6:00 PM - 8:00 PM"},
  {"day": "Weekend Batch (Sat-Sun)", "time": "10:00 AM - 1:00 PM"}
]'::jsonb WHERE name = 'SBI PO & IBPS PO';

UPDATE courses SET batch_timings = '[
  {"day": "Monday to Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Monday to Friday", "time": "6:00 PM - 8:00 PM"},
  {"day": "Weekend Batch (Sat-Sun)", "time": "10:00 AM - 1:00 PM"}
]'::jsonb WHERE name = 'SBI Clerk & IBPS Clerk';

UPDATE courses SET batch_timings = '[
  {"day": "Monday to Friday", "time": "10:00 AM - 12:00 PM"},
  {"day": "Monday to Friday", "time": "6:00 PM - 8:00 PM"},
  {"day": "Weekend Batch (Sat-Sun)", "time": "10:00 AM - 1:00 PM"}
]'::jsonb WHERE name = 'ADRE (Assam Direct Recruitment Examination)';
