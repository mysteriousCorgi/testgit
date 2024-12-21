// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 获取元素
    const title = document.querySelector('h1');
    const paragraph = document.querySelector('p');
    const container = document.querySelector('.container');
    
    // 更新时间的函数
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN');
        paragraph.textContent = `现在是: ${timeString}`;
    }
    
    // 获取问候语
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return '早上好！';
        } else if (hour < 18) {
            return '下午好！';
        } else {
            return '晚上好！';
        }
    }
    
    // 设置初始问候语
    title.textContent = getGreeting();
    
    // 每秒更新时间
    updateTime();
    setInterval(updateTime, 1000);
    
    // 添加点击效果
    container.addEventListener('click', () => {
        container.style.backgroundColor = getRandomColor();
        setTimeout(() => {
            container.style.backgroundColor = 'white';
        }, 500);
    });
});

// 生成随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
} 