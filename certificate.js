const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) return { statusCode: 400, body: JSON.stringify({ valid: false, error: 'Certificate ID required' }) };
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('certificates').select('certificate_id, completion_date, duration_hours, status, courses(title), profiles(full_name)').eq('certificate_id', id).eq('status', 'issued').maybeSingle();
  if (error || !data) return { statusCode: 404, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ valid: false }) };
  return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ valid: true, certificateId: data.certificate_id, student: data.profiles.full_name, course: data.courses.title, completionDate: data.completion_date, durationHours: data.duration_hours }) };
};
