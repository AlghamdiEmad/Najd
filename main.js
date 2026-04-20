// main.js
const postsContainer = document.getElementById('posts-container');

async function fetchPosts() {
    try {
        const { data: posts, error } = await _supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="msg">لا توجد منشورات حتى الآن.</div>';
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
            postsContainer.appendChild(card);
        });
    } catch (err) {
        postsContainer.innerHTML = '<div class="msg" style="color:red;">فشل الاتصال بقاعدة البيانات</div>';
    }
}

fetchPosts();
