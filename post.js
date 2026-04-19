// ... كود تهيئة Supabase هنا ...

async function createPost() {
    const content = document.getElementById('post-content').value;
    
    // سحب البيانات من localStorage
    const savedName = localStorage.getItem('najd_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('najd_color') || '#007bff';

    if (!content) return alert("اكتب شيئاً أولاً!");

    const { data, error } = await _supabase
        .from('posts')
        .insert([
            { 
                content: content, 
                user_name: savedName, 
                user_color: savedColor 
            }
        ]);

    if (error) {
        console.error(error);
        alert("حدث خطأ أثناء النشر");
    } else {
        window.location.href = 'index.html';
    }
}
