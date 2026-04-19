import { supabase } from './supabase-config.js';

const postsContainer = document.getElementById('posts-container');

// 1. دالة لجلب المنشورات من قاعدة البيانات
async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
    } else {
        renderPosts(data);
    }
}

// 2. دالة لرسم المنشورات في الصفحة بتنسيق فخم
function renderPosts(posts) {
    if (!postsContainer) return;
    
    postsContainer.innerHTML = ''; // تفريغ الحاوية قبل الرسم

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                <div style="width: 45px; height: 45px; background: ${post.user_color || '#d4af37'}; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1);"></div>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 800; font-size: 1rem;">${post.user_name || 'مستخدم مجهول'}</span>
                    <small style="color: var(--text-muted); font-size: 0.7rem;">
                        ${new Date(post.created_at).toLocaleString('ar-SA', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                    </small>
                </div>
            </div>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #efefef;">${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 3. الاشتراك في التحديثات اللحظية (Realtime)
// لكي يظهر المنشور الجديد عند الجميع فوراً بدون تحديث الصفحة
supabase
    .channel('public:posts')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        console.log('تمت إضافة منشور جديد!', payload);
        fetchPosts(); // إعادة جلب القائمة لتشمل المنشور الجديد
    })
    .subscribe();

// تشغيل الجلب لأول مرة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fetchPosts);

