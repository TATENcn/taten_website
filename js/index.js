document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.icon');
    const text = themeToggle.querySelector('.text');

    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        icon.textContent = '☀️';
        text.textContent = '浅色模式';
    }

    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        // 添加旋转动画
        themeToggle.classList.add('rotating');
        
        setTimeout(() => {
            body.classList.toggle('dark');
            
            if (body.classList.contains('dark')) {
                icon.textContent = '☀️';
                text.textContent = '浅色模式';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.textContent = '🌙';
                text.textContent = '深色模式';
                localStorage.setItem('theme', 'light');
            }
            
            themeToggle.classList.remove('rotating');
        }, 150);
    });

    // 添加平滑滚动和动画效果
    // ...原有的动画和滚动代码...
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.member-card, .project-card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});