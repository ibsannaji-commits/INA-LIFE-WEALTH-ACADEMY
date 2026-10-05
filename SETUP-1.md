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
