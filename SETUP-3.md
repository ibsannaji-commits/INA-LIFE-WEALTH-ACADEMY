# Galmee database irratti kuusuu (Supabase, bilisaan jalqabuun ni danda'ama)

1. supabase.com irratti project haaraa banadhu.
2. SQL Editor > New query > `schema.sql` guutuu maxxansi > Run.
3. Project Settings > API irraa **Project URL** fi **anon public key** koppii godhi.
4. `index.html` keessatti `var SB_URL="", SB_KEY="";` jedhu barbaadi, qabxiiwwan lamaan keessatti galchi.
5. index.html hosting kee irratti deebi'ii ol-fe'i, galmaa'insa qorannoo tokko ergi.
6. Galmeewwan Supabase > Table Editor > `enrollments` keessatti ni mul'atu. `status` (new, contacted, paid, active) harkaan jijjiiruu dandeessa.

Ragaa: Table Editor > `certificates` > Insert row. Lakkoofsi ragaa (`cert_id`) addaa ta'uu qaba.

Nageenya:
- `anon public key` marsariitii keessa ta'uun rakkoo hin qabu; RLS dhimmicha eegsisa (marsariitiin galmaa'insa itti dabaluu qofa danda'a, dubbisuu hin danda'u).
- `service_role` key gonkumaa marsariitii keessa hin galchin.
- Lakkoofsi bilbilaa fi maqaan odeeffannoo dhuunfaa dha: Supabase account kee password cimaa fi 2FA waliin eegi.

## Dashboard (admin.html)

1. SQL Editor keessatti `admin.sql` gaggeessi (imeelii admin `ibsannaji@gmail.com` jijjiiruu yoo barbaadde faayila keessatti jijjiiri).
2. Supabase > Authentication > Users > Add user: imeelii kee fi jecha icciitii cimaa uumi (Auto Confirm ON).
3. Authentication > Sign In / Providers keessatti "Allow new users to sign up" ukkaamsi. Admin kee qofa seenuu qaba.
4. `admin.html` keessatti `SB_URL` fi `SB_KEY` (index.html keessa wal-fakkaata) galchi.
5. admin.html hosting irratti ol-fe'i, `/admin.html` irratti imeelii fi jecha icciitii kee galchuun seeni.

Dashboard irraa: galmaa'insa ilaaluu, barbaaduu, haala jijjiiruu (new, contacted, paid, active), WhatsApp tokkoon tuqxuu, CSV buusuu, ergaawwan dubbisuu, ragaa dabaluu fi haquu.

## Sirna Barattootaa (student.html)

1. `student.sql` SQL Editor keessatti gaggeessi (schema.sql fi admin.sql booda).
2. Authentication > Sign In / Providers: **"Confirm email" ON** haa ta'u (barataan imeelii isaa mirkaneessuu qaba; ragaan imeeliidhaan waan kennamuuf kun barbaachisaadha). "Allow new users to sign up" ON ta'uu qaba, kun barattootaaf dha.
   - Eegumsa admin: `admin.sql` imeelii `ibsannaji@gmail.com` qofaaf hayyama; barataan kamiyyuu admin ta'uu hin danda'u.
3. `student.html` keessatti `SB_URL` fi `SB_KEY` galchi (index.html waliin wal-fakkaata). Ol-fe'i.
4. Course fi lesson Table Editor keessatti dabali:
   - `courses`: title, `department` (**guutummaatti**: Mindset & Motivation, Money & Wealth, Love & Life, ykn Digital Marketing & Online Income), description, hours.
   - `lessons`: `course_id` (course irraa), week, position, title, kind (video/pdf/live/text), url (YouTube unlisted, Google Drive, Zoom...).
5. Barataan akka itti fayyadamu:
   1. student.html irratti akkaawuntii uumuu, imeelii mirkaneessuu, seenuu.
   2. "Galmaa'insa koo" keessatti lakkoofsa galmaa'insaa (ENR-...) fi bilbila galchuun hidhachuu.
   3. Ati dashboard keessatti `status` = `paid` ykn `active` gochuun course isaa ni banama.
   4. Course xumurtee yeroo, dashboard keessatti ragaa dabalta, **imeelii barataa** galchita; barataan "Certificate koo" keessatti maxxansuu ni danda'a.

## Lesson course afran galchuu (seed_lessons.sql)

1. `student.sql` booda `seed_lessons.sql` SQL Editor keessatti gaggeessi. Course 9 fi lesson 107 ni dabalamu (curriculum fuula course afran irraa).
2. Lesson tokkoon tokkoon amma barreeffama (`kind = text`) dha: mata-duree fi ibsa gabaabaa qofa qaba. Video/PDF/live dabaluuf Table Editor > `lessons` keessatti sarara sana filadhu, `kind` gara `video`/`pdf`/`live` jijjiiri, `url` (linkii YouTube unlisted, Drive, Zoom) galchi.
3. Barataan course isaa kaffaltii `paid`/`active` booda qofa arga (kutaa isaa wajjin wal-gitu).
