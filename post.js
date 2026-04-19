import { supabase } from './supabase-config.js';

const postInput = document.getElementById('post-content');
const charCount = document.getElementById('char-count');
const sendBtn = document.getElementById('send-btn');

// تحديث عداد الحروف
postInput.addEventListener('input', () => {
    const remaining = 60 - postInput.value.length;
    charCount.textContent = `${remaining} حرف متبقي`;
    charCount.style.color = remaining <= 10 ? '#ff4d4d' : 'var(--text-muted)';
});

// دالة الإرسال
sendBtn.addEventListener('click', async () => {
    const content = postInput.value.trim();
    
    if (!content) return alert("اكتب شيئاً أولاً!");

    // جلب بيانات المستخدم من LocalStorage (سنقوم ببرمجتها في صفحة الإعدادات لاحقاً)
    // الآن سنضع قيم افتراضية مؤقتة
    const userName = localStorage.getItem('najd_name') || 'مستخدم نجد';
    const userColor = localStorage.getItem('najd_color') || '#d4af37';
    let browserId = localStorage.getItem('najd_browser_id');

    // إذا لم يكن لديه بصمة، نصنع له واحدة
    if (!browserId) {
        browserId = crypto.randomUUID();
        localStorage.setItem('najd_browser_id', browserId);
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "...جاري النشر";

    const { error } = await supabase
        .from('posts')
        .insert([
            { 
                content: content, 
                user_name: userName, 
                user_color: userColor, 
                browser_id: browserId 
            }
        ]);

    if (error) {
        alert("حدث خطأ أثناء النشر: " + error.message);
        sendBtn.disabled = false;
        sendBtn.textContent = "نشر";
    } else {
        // العودة للرئيسية لرؤية المنشور
        window.location.href = 'index.html';
    }
});

