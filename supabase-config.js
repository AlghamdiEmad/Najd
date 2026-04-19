// استيراد العميل من مكتبة Supabase
const { createClient } = window.supabase;

// البيانات التي استخرجناها من مشروعك
const supabaseUrl = 'https://qgbuvchbhbtkwcvafhek.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYnV2Y2hiaGJ0a3djdmFmaGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTI0ODksImV4cCI6MjA5MjE4ODQ4OX0.rBc4KTn0c8OhhG2dFD9ZLDHknBhhOllYsxBMzuvWeCY';

// إنشاء الاتصال وتصديره
export const supabase = createClient(supabaseUrl, supabaseKey);
