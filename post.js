async function publishPost() {
    const textElement = document.getElementById('postText');
    const text = textElement.value;
    
    // جلب البيانات من التخزين المحلي (الإعدادات)
    const savedName = localStorage.getItem('user_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('user_color') || '#ffffff';

    if (!text.trim()) {
        alert("اكتب شيئاً أولاً!");
        return;
    }

    try {
        // محاولة إرسال البيانات
        const { error } = await _supabase
            .from('posts')
            .insert([
                { 
                    content: text, 
                    user_name: savedName, 
                    user_color: savedColor,
                    browser_id: "web_client" 
                }
            ]);

        if (error) {
            console.error("Supabase Error:", error);
            alert("حدث خطأ في النشر: " + error.message);
        } else {
            // إشعار النجاح
            alert("تم النشر بنجاح! 🚀");
            
            // العودة للصفحة الرئيسية فوراً
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Unexpected Error:", err);
        alert("تعذر الاتصال بالخادم، حاول مرة أخرى.");
    }
}
