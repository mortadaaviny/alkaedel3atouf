# حكايا — Arabic storytelling platform

A cinematic, RTL Arabic website for illustrated video stories, with a private
dashboard to manage every story, video, image and line of text — no code edits.

- **Public site**: landing hero → story library → in-page cinematic YouTube player.
- **Dashboard** (`/admin`): add / edit / delete / reorder / publish stories, change
  YouTube links, upload images, edit all site text and the hero image.
- **Stack**: React 18 · TypeScript · Tailwind CSS · Framer Motion · Supabase
  (Auth, Postgres with Row Level Security, Storage).

It runs immediately in **demo mode** (data saved in your browser) and switches to
Supabase automatically once two environment variables are set.

---

## 1. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev          # http://localhost:5173
```

Without Supabase keys the site runs in demo mode. Dashboard: `/admin`
Demo login: `admin@hakaya.demo` / `hakaya2026`

## 2. Connect Supabase (≈10 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query** → paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   This creates the `stories` and `site_settings` tables, the `admins` list,
   Row Level Security, the `reorder_stories` function, and the public `media`
   bucket for images.
3. *(Optional)* run [`supabase/seed-demo.sql`](supabase/seed-demo.sql) to start with the six demo stories.
4. **Authentication → Users → Add user**: create your admin account (email + password).
5. Back in the SQL Editor, make that account an admin:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict do nothing;
   ```
6. **Authentication → Sign In / Providers → Email**: turn off *Allow new users to sign up*.
   (Only accounts you create can log in; only accounts in `admins` can change anything.)
7. **Project Settings → API**: copy the *Project URL* and the *anon public* key into a
   new `.env` file (see [`.env.example`](.env.example)):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
8. Restart `npm run dev`. The demo banner disappears from the dashboard, and
   everything you change is saved in Supabase and shown to every visitor.

### Security model

| Who | Can do |
| --- | --- |
| Visitors (anon) | Read **published** stories and site settings. Nothing else. |
| Signed-in, not in `admins` | Same as visitors. Writes are rejected by RLS. |
| Admins | Read drafts; create / edit / delete / reorder stories; edit settings; upload & delete images. |

The anon key is safe to ship in the browser — every write is checked in the
database by Row Level Security, not in the frontend.

## 3. Deploy

```bash
npm run build        # → dist/
```

- **Vercel**: import the repo, framework *Vite*, add the two env vars. `vercel.json` handles routing.
- **Netlify**: build `npm run build`, publish `dist`, add the env vars. `public/_redirects` handles routing.
- **Any static host without rewrites**: add `VITE_ROUTER=hash` to the env so URLs use `#/`.

## 4. Project structure

```
src/
  components/
    public/   Hero, StoryGrid, StoryCard, StoryPlayer, VideoStage, SiteHeader
    admin/    AdminLayout, StoryTable, StoryForm, ImageField, YouTubePreview, ui (buttons, dialogs, toasts)
    ui/       Img (fade-in, srcset), BrandMark, icons
  pages/      Home, Stories, NotFound, admin/{AdminLogin, AdminDashboard, AdminStories, AdminStoryEdit, AdminSettings}
  lib/        backend (demo + supabase), store, youtube, hooks, utils, errors
  data/       default site text + demo stories
supabase/     schema.sql, seed-demo.sql
public/images optimized demo illustrations (WebP, several sizes)
```

### Notes

- **YouTube links**: paste any common format — `youtube.com/watch?v=…`, `youtu.be/…`,
  `youtube.com/embed/…`, `/shorts/…`, `/live/…` or a bare 11-character id.
- **Autoplay**: the card click is the user gesture, so the player starts immediately.
  If a browser still refuses, a play button appears; if the YouTube API can't load,
  a plain embed is used. Videos whose owners disable embedding show a clear message.
- **Images** are resized in the browser before upload (WebP, ≤ 1920px; hero ≤ 2560px).
- **Performance**: the dashboard is a separate bundle; the YouTube API loads only when
  a story is opened; images are lazy-loaded with responsive `srcset`.
- **Accessibility**: keyboard navigation, focus trapping in dialogs, `Esc` to close,
  visible focus, `prefers-reduced-motion` respected.
- Demo videos are open films by Blender Studio and others, used only as placeholders.

---

## دليل لوحة التحكم (للاستخدام اليومي)

**الدخول:** افتح `/admin` في الموقع وسجّل الدخول ببريدك وكلمة المرور.

**إضافة حكاية:** «إضافة حكاية» ← اكتب العنوان ← الصق رابط الفيديو من يوتيوب (من زر «مشاركة») ← ارفع صورة البطاقة (أو اضغط «استخدام صورة الفيديو») ← «إضافة الحكاية».

**تغيير فيديو حكاية:** «الحكايات» ← «تعديل» ← الصق الرابط الجديد في «رابط يوتيوب» ← جرّبه في «تجربة الفيديو» ← «حفظ التعديلات».

**النشر والإخفاء:** مفتاح «منشورة / مسودة» في قائمة الحكايات. المسودة لا تظهر للزوار.

**الترتيب:** اسحب الحكاية من المقبض ⠿ أو استخدم السهمين. يُحفظ الترتيب تلقائيًا.

**المعاينة:** زر العين يعرض الحكاية كما سيراها الزوار تمامًا.

**نصوص الموقع وصورة الواجهة:** «الإعدادات» ← عدّل ← «حفظ الإعدادات». حرّك «نقطة التركيز على الهاتف» ليبقى أهمّ جزء من الصورة ظاهرًا على الجوال.
