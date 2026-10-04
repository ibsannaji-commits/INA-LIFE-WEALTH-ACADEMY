const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function registerStudent({name, phone, email, courseSlug, tier}) {
  const tempPassword = crypto.randomUUID() + "Aa1!";
  const { data: auth, error: authError } = await supabaseClient.auth.signUp({ email, password: tempPassword });
  if (authError) throw authError;
  const userId = auth.user.id;
  const { error: profileError } = await supabaseClient.from('profiles').upsert({ id: userId, full_name: name, phone, role: 'student' });
  if (profileError) throw profileError;
  const { data: course, error: courseError } = await supabaseClient.from('courses').select('id').eq('slug', courseSlug).single();
  if (courseError) throw courseError;
  const { data: enrollment, error: enrollmentError } = await supabaseClient.from('enrollments').insert({ student_id: userId, course_id: course.id, membership_tier: tier, status: 'pending' }).select().single();
  if (enrollmentError) throw enrollmentError;
  return enrollment;
}

async function verifyCertificate(certificateId) {
  const { data, error } = await supabaseClient.from('certificates').select('certificate_id, completion_date, duration_hours, status, courses(title), profiles(full_name)').eq('certificate_id', certificateId).eq('status', 'issued').maybeSingle();
  if (error) throw error;
  if (!data) return { valid: false };
  return { valid: true, certificateId: data.certificate_id, student: data.profiles.full_name, course: data.courses.title, completionDate: data.completion_date, durationHours: data.duration_hours };
}
