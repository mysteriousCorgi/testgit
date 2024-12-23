document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    const greetingElement = document.getElementById('greeting');
    const timeDisplay = document.getElementById('time');
    const themeToggle = document.getElementById('theme-toggle');
    const skillButton = document.getElementById('skill-button');
    const cards = document.querySelectorAll('.card');

    // 更新时间的函数
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN');
        timeDisplay.textContent = timeString;
    }

    // 获取问候语
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 6) {
            return '夜深了，注意休息！';
        } else if (hour < 12) {
            return '早上好！';
        } else if (hour < 14) {
            return '中午好！';
        } else if (hour < 18) {
            return '下午好！';
        } else if (hour < 22) {
            return '晚上好！';
        } else {
            return '夜深了，注意休息！';
        }
    }

    // 随机颜色生成
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 65%)`;
    }

    // 初始化
    updateTime();
    greetingElement.textContent = getGreeting();
    setInterval(updateTime, 1000);

    // 主题切换按钮
    themeToggle.addEventListener('click', () => {
        document.documentElement.style.setProperty('--primary-color', getRandomColor());
        document.documentElement.style.setProperty('--secondary-color', getRandomColor());
    });

    // 技能按钮点击效果
    skillButton.addEventListener('click', () => {
        skillButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            skillButton.style.transform = 'scale(1)';
        }, 200);
    });

    // 为所有卡片添加悬停效果
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height / 2) / 20}deg)
                rotateY(${-(x - rect.width / 2) / 20}deg)
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // 添加页面滚动效果
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 添加表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 这里添加表单提交逻辑
            alert('消息已发送！（示例）');
            contactForm.reset();
        });
    }

    // 添加技能进度条动画
    const progressBars = document.querySelectorAll('.progress-bar');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('style').match(/width: (\d+)%/)[1];
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    progressBars.forEach(bar => observer.observe(bar));

    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加导航栏高亮
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}); 