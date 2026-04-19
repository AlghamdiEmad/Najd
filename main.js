// 1. إعداد الاتصال بـ Supabase
const supabaseUrl = 'رابط_مشروعك_هنا';
const supabaseKey = 'مفتاح_API_الخاص_بك';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const postsContainer = document.getElementById('posts-container');

// 2. وظيفة جلب المنشورات وعرضها
async function fetchPosts() {
    // جلب البيانات من جدول posts وترتيبها من الأحدث للأقدم
    const { data: posts, error } = await _supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('خطأ في جلب البيانات:', error);
        return;
    }

    // تنظيف الحاوية قبل العرض
    postsContainer.innerHTML = '';

    // 3. بناء شكل كل منشور
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        
        // هنا نستخدم الاسم واللون المخزنين في قاعدة البيانات لكل مستخدم
        postElement.innerHTML = `
            <div class="post-header">
                <span class="user-name" style="color: ${post.user_color || '#ffffff'}">
                    ${post.user_name || 'مستخدم مجهول'}
                </span>
                <span class="post-date">${new Date(post.created_at).toLocaleDateString('ar-SA')}</span>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 4. تشغيل خاصية الـ Realtime (التحديث اللحظي)
const channel = _supabase
    .channel('public:posts')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        // إذا جاء منشور جديد، أعد تحميل القائمة
        fetchPosts();
    })
    .subscribe();

// تشغيل الدالة عند فتح الصفحة لأول مرة
fetchPosts();
