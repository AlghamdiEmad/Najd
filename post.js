async function publishPost() {
    const textElement = document.getElementById('postText');
    const text = textElement.value;
    
    const savedName = localStorage.getItem('user_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('user_color') || '#ffffff';

    if (!text.trim()) {
        alert("اكتب شيئاً أولاً!");
        return;
    }

    // توليد UUID عشوائي عشان يقبله عمود browser_id
    const randomUUID = crypto.randomUUID();

    try {
        const { error } = await _supabase
            .from('posts')
            .insert([
                { 
                    content: text, 
                    user_name: savedName, 
                    user_color: savedColor,
                    browser_id: randomUUID // هنا التعديل المهم
                }
            ]);

        if (error) {
            console.error("خطأ سوبابيس:", error);
            alert("حدث خطأ في النشر: " + error.message);
        } else {
            alert("تم النشر بنجاح! 🚀");
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("خطأ غير متوقع:", err);
    }
}
