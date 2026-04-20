async function publishPost() {
    const text = document.getElementById('postText').value;
    const savedName = localStorage.getItem('user_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('user_color') || '#ffffff';

    if (!text.trim()) return alert("اكتب شيئاً!");

    const { error } = await _supabase
        .from('posts')
        .insert([{ content: text, user_name: savedName, user_color: savedColor }]);

    if (error) alert("فشل النشر");
    else window.location.href = 'index.html';
}
