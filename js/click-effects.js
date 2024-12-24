class ClickEffects {
    constructor() {
        this.colors = [
            '#ff7e7e', // 粉红
            '#7ec7ff', // 天蓝
            '#7effae', // 薄荷
            '#ffd77e', // 金黄
            '#7e88ff', // 紫蓝
            '#ff7eb9'  // 粉紫
        ];
        
        this.symbols = ['❤', '♥', '♡', '💕', '💗', '💖'];
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => this.createEffect(e));
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    createEffect(e) {
        // 创建特效元素
        const effect = document.createElement('div');
        const symbol = this.getRandomItem(this.symbols);
        
        // 设置样式
        effect.innerText = symbol;
        effect.style.position = 'fixed';
        effect.style.left = `${e.clientX}px`;
        effect.style.top = `${e.clientY}px`;
        effect.style.color = this.getRandomItem(this.colors);
        effect.style.fontSize = '1.5rem';
        effect.style.userSelect = 'none';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '10000';
        effect.style.transition = 'all 0.5s ease-out';
        effect.style.opacity = '1';
        effect.style.transform = 'translateY(0) scale(1)';
        
        // 添加到页面
        document.body.appendChild(effect);
        
        // 添加动画
        requestAnimationFrame(() => {
            effect.style.transform = `translateY(-100px) scale(1.5)`;
            effect.style.opacity = '0';
        });
        
        // 动画结束后移除元素
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 500);
    }

    // 添加自定义符号
    addSymbol(symbol) {
        this.symbols.push(symbol);
    }

    // 添加自定义颜色
    addColor(color) {
        this.colors.push(color);
    }
}

// 当DOM加载完成后初始化点击特效
document.addEventListener('DOMContentLoaded', () => {
    window.clickEffects = new ClickEffects();
    
    // 可以添加自定义符号和颜色
    // window.clickEffects.addSymbol('🌟');
    // window.clickEffects.addColor('#ff00ff');
}); 