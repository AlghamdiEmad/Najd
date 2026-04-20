const supabaseUrl = 'https://qgbuvchbhbtkwcvafhek.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnYnV2Y2hiaGJ0a3djdmFmaGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTI0ODksImV4cCI6MjA5MjE4ODQ4OX0.rBc4KTn0c8OhhG2dFD9ZLDHknBhhOllYsxBMzuvWeCY';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const postsContainer = document.getElementById('posts-container');

async function fetchPosts() {
    const { data: posts, error } = await _supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('خطأ في جلب البيانات:', error);
        return;
    }

    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="user-name" style="color: ${post.user_color || '#ffffff'}">
                    ${post.user_name || 'مستخدم مجهول'}
                </span>
                <span class="post-date">${new Date(post.created_at).toLocaleTimeString('ar-SA')}</span>
            </div>
            <div class="post-content">${post.content}</div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// التحديث اللحظي
_supabase
    .channel('public:posts')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => fetchPosts())
    .subscribe();

fetchPosts();
