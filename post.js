const supabaseUrl = 'https://qgbuvchbhbtkwcvafhek.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYnV2Y2hiaGJ0a3djdmFmaGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTI0ODksImV4cCI6MjA5MjE4ODQ4OX0.rBc4KTn0c8OhhG2dFD9ZLDHknBhhOllYsxBMzuvWeCY';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function publishPost() {
    const text = document.getElementById('postText').value;
    const savedName = localStorage.getItem('user_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('user_color') || '#ffffff';

    if (!text.trim()) {
        alert("اكتب شيئاً أولاً!");
        return;
    }

    const { error } = await _supabase
        .from('posts')
        .insert([{ 
            content: text, 
            user_name: savedName, 
            user_color: savedColor 
        }]);

    if (error) {
        alert("فشل النشر");
    } else {
        window.location.href = 'index.html';
    }
}
