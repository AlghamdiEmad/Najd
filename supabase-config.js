// استيراد العميل من مكتبة Supabase التي سنستدعيها في الـ HTML
const { createClient } = window.supabase;

// استبدل الروابط أدناه ببيانات مشروعك من (Settings > API)
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';

// إنشاء اتصال وتصديره ليكون جاهزاً للاستخدام في الملفات الأخرى
export const supabase = createClient(supabaseUrl, supabaseKey);

