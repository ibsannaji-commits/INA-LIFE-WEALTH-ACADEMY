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
