async function publishPost() {
    const textElement = document.getElementById('postText');
    const text = textElement.value;
    
    // سحب الهوية من الإعدادات
    const savedName = localStorage.getItem('user_name') || 'مستخدم مجهول';
    const savedColor = localStorage.getItem('user_color') || '#ffffff';

    if (!text.trim()) {
        alert("اكتب شيئاً قبل النشر!");
        return;
    }

    // إرسال البيانات (تأكدنا من مطابقة أسماء الأعمدة لجدولك)
    const { data, error } = await _supabase
        .from('posts')
        .insert([
            { 
                content: text, 
                user_name: savedName, 
                user_color: savedColor,
                browser_id: "web_user" // أضفنا هذا العمود ليقبل الجدول البيانات
            }
        ]);

    if (error) {
        console.error("تفاصيل الخطأ:", error);
        alert("فشل النشر: " + error.message);
    } else {
        console.log("تم النشر بنجاح!");
        window.location.href = 'index.html'; // يرجعك للرئيسية عشان تشوف المنشور
    }
}