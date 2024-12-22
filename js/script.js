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
}); 