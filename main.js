const postsContainer = document.getElementById('posts-container');

async function fetchPosts() {
    const { data: posts, error } = await _supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return console.error('Error:', error);

    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="user-name" style="color: ${post.user_color || '#fff'}">${post.user_name || 'مجهول'}</span>
                <span class="post-date">${new Date(post.created_at).toLocaleTimeString('ar-SA')}</span>
            </div>
            <div class="post-content">${post.content}</div>
        `;
        postsContainer.appendChild(postElement);
    });
}

_supabase.channel('public:posts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => fetchPosts()).subscribe();
fetchPosts();
