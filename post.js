// post.js
async function publishPost() {
    const text = document.getElementById('postText').value.trim();
    if (!text) return alert("اكتب شيئاً أولاً");

    const name = localStorage.getItem('user_name') || 'مستخدم نجد';
    const color = localStorage.getItem('user_color') || '#ffffff';
    
    // حل مشكلة UUID: نرسل كود متوافق مع نظام UUID
    const idForBrowser = crypto.randomUUID();

    try {
        const { error } = await _supabase
            .from('posts')
            .insert([{ 
                content: text, 
                user_name: name, 
                user_color: color, 
                browser_id: idForBrowser 
            }]);

        if (error) throw error;
        
        window.location.href = 'index.html';
    } catch (err) {
        alert("خطأ: " + err.message);
    }
}
