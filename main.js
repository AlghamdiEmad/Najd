// main.js
const dynamicPostsContainer = document.getElementById('dynamic-posts');

// دالة لجلب المنشورات عند تحميل الصفحة لأول مرة
async function fetchPosts() {
    try {
        const { data: posts, error } = await _supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        dynamicPostsContainer.innerHTML = '';

        if (posts.length === 0) {
            dynamicPostsContainer.innerHTML = '<div class="msg">لا توجد منشورات حتى الآن.</div>';
            return;
        }

        posts.forEach(post => {
            renderPost(post);
        });
    } catch (err) {
        console.error(err);
        dynamicPostsContainer.innerHTML = '<div class="msg" style="color:red;">فشل الاتصال بقاعدة البيانات</div>';
    }
}

// دالة مسؤولة عن رسم كرت المنشور (استخرجناها لتسهيل إعادة الاستخدام)
function renderPost(post, prepend = false) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <div class="post-header">
            <span class="user-name" style="color: ${post.user_color || '#fff'}">${post.user_name || 'مجهول'}</span>
            <span class="post-date">${new Date(post.created_at).toLocaleTimeString('ar-SA')}</span>
        </div>
        <div class="post-content">${post.content}</div>
    `;
    
    if (prepend) {
        dynamicPostsContainer.prepend(card); // إضافة المنشور الجديد في الأعلى فوراً
    } else {
        dynamicPostsContainer.appendChild(card);
    }
}

// الميزة الجديدة: الاشتراك في التحديثات المباشرة (Realtime)
function subscribePosts() {
    _supabase
        .channel('public:posts')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
            // أول ما يوصل منشور جديد، نرسمه فوراً في أعلى القائمة
            renderPost(payload.new, true);
        })
        .subscribe();
}

// تشغيل الدوال
fetchPosts();
subscribePosts();
