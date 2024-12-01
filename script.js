// 获取文章列表容器
const postsContainer = document.getElementById('posts-list');

// 文章列表配置
const posts = [
    {
        date: '20240101',
        title: 'ChatGPT使用技巧',
        path: 'posts/20240101-ChatGPT使用技巧.md'
    }
];

// 获取文章列表
async function fetchPosts() {
    try {
        // 显示文章列表
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = '<p>暂时无法加载文章列表，请稍后再试。</p>';
    }
}

// 显示文章列表
function displayPosts(posts) {
    posts.forEach(async post => {
        try {
            // 获取文章内容
            const response = await fetch(post.path);
            const content = await response.text();
            
            // 创建文章预览
            const postElement = document.createElement('article');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <h2><a href="#" class="post-title">${post.title}</a></h2>
                <div class="post-date">${formatDate(post.date)}</div>
                <div class="post-preview">${marked(content.slice(0, 200))}...</div>
            `;
            
            // 添加点击事件
            postElement.querySelector('.post-title').addEventListener('click', (e) => {
                e.preventDefault();
                displayFullPost(content, post.title, post.date);
            });
            
            postsContainer.appendChild(postElement);
        } catch (error) {
            console.error('Error loading post:', error);
        }
    });
}

// 显示完整文章
function displayFullPost(content, title, date) {
    postsContainer.innerHTML = `
        <article class="full-post">
            <h1>${title}</h1>
            <div class="post-date">${formatDate(date)}</div>
            <div class="post-content">${marked(content)}</div>
            <button onclick="loadPostsList()" class="back-button">返回文章列表</button>
        </article>
    `;
}

// 格式化日期
function formatDate(dateStr) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}年${month}月${day}日`;
}

// 加载文章列表
function loadPostsList() {
    postsContainer.innerHTML = '';
    fetchPosts();
}

// 页面加载时获取文章列表
document.addEventListener('DOMContentLoaded', fetchPosts);
