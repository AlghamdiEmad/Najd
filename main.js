// main.js
// تم التعديل ليمسك حاوية المنشورات الديناميكية فقط
const dynamicPostsContainer = document.getElementById('dynamic-posts');

async function fetchPosts() {
    try {
        const { data: posts, error } = await _supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // نمسح فقط علامة "جاري التحميل" داخل الحاوية الديناميكية
        dynamicPostsContainer.innerHTML = '';

        if (posts.length === 0) {
            dynamicPostsContainer.innerHTML = '<div class="msg">لا توجد منشورات حتى الآن.</div>';
            return;
        }

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `
                <div class="post-header">
                    <span class="user-name" style="color: ${post.user_color || '#fff'}">${post.user_name || 'مجهول'}</span>
                    <span class="post-date">${new Date(post.created_at).toLocaleTimeString('ar-SA')}</span>
                </div>
                <div class="post-content">${post.content}</div>
            `;
            dynamicPostsContainer.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        dynamicPostsContainer.innerHTML = '<div class="msg" style="color:red;">فشل الاتصال بقاعدة البيانات</div>';
    }
}

fetchPosts();
