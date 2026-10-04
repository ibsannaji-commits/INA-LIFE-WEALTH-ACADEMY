const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const body = JSON.parse(event.body || '{}');
    const { name, phone, email, courseSlug, tier } = body;
    if (!name || !phone || !email || !courseSlug || !tier) return { statusCode: 400, body: JSON.stringify({ error: 'Required fields missing' }) };
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: course, error: courseError } = await supabase.from('courses').select('id').eq('slug', courseSlug).eq('active', true).single();
    if (courseError) throw courseError;
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({ email, email_confirm: false, user_metadata: { full_name: name, phone } });
    if (userError && !userError.message.toLowerCase().includes('already')) throw userError;
    const userId = userData?.user?.id;
    if (!userId) return { statusCode: 409, body: JSON.stringify({ error: 'User exists; use login or password reset flow' }) };
    const { error: profileError } = await supabase.from('profiles').insert({ id: userId, full_name: name, phone, role: 'student' });
    if (profileError) throw profileError;
    const { data: enrollment, error: enrollmentError } = await supabase.from('enrollments').insert({ student_id: userId, course_id: course.id, membership_tier: tier, status: 'pending' }).select().single();
    if (enrollmentError) throw enrollmentError;
    return { statusCode: 201, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ok: true, enrollmentId: enrollment.id, status: enrollment.status }) };
  } catch (error) {
    return { statusCode: 500, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'Enrollment failed' }) };
  }
};
