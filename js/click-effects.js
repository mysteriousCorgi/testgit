class ClickEffects {
    constructor(options = {}) {
        // 配置项
        this.config = {
            maxElements: options.maxElements || 20,      // 最大同时显示数量
            gravity: options.gravity || 0.5,            // 重力效果
            friction: options.friction || 0.95,         // 摩擦力
            initialVelocity: options.initialVelocity || { min: 8, max: 12 }, // 初始速度范围
            rotationSpeed: options.rotationSpeed || { min: -10, max: 10 },   // 旋转速度范围
            specialKeys: options.specialKeys || ['Shift', 'Control', 'Alt']  // 特殊按键
        };

        // 基础符号和颜色
        this.themes = {
            default: {
                symbols: ['❤', '♥', '♡', '💕', '💗', '💖'],
                colors: ['#ff7e7e', '#7ec7ff', '#7effae', '#ffd77e', '#7e88ff', '#ff7eb9']
            },
            festival: {
                symbols: ['🎉', '🎊', '✨', '🌟', '⭐', '🎈'],
                colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#9370DB', '#32CD32']
            },
            tech: {
                symbols: ['⚡', '💻', '🚀', '💡', '⚙️', '🔮'],
                colors: ['#00ff00', '#0099ff', '#ff3366', '#9933ff', '#ffcc00', '#00ffcc']
            }
        };

        this.activeTheme = 'default';
        this.elements = new Set();  // 使用Set存储活动的元素
        this.isSpecialMode = false;
        this.audioContext = null;
        this.init();
    }

    init() {
        // 初始化事件监听
        document.addEventListener('click', (e) => this.handleClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // 初始化音频上下文
        this.initAudio();
    }

    initAudio() {
        // 延迟初始化AudioContext，直到第一次点击
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    playSound(frequency = 440) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    handleKeyDown(e) {
        if (this.config.specialKeys.includes(e.key)) {
            this.isSpecialMode = true;
            this.switchTheme('festival');
        }
    }

    handleKeyUp(e) {
        if (this.config.specialKeys.includes(e.key)) {
            this.isSpecialMode = false;
            this.switchTheme('default');
        }
    }

    handleClick(e) {
        // 限制最大同时显示数量
        if (this.elements.size >= this.config.maxElements) {
            const firstElement = this.elements.values().next().value;
            if (firstElement) {
                document.body.removeChild(firstElement);
                this.elements.delete(firstElement);
            }
        }

        // 创建多个效果
        const count = this.isSpecialMode ? 5 : 1;
        for (let i = 0; i < count; i++) {
            this.createEffect(e);
        }

        // 播放音效
        this.playSound(440 + Math.random() * 440);
    }

    createEffect(e) {
        const effect = document.createElement('div');
        const theme = this.themes[this.activeTheme];
        const symbol = this.getRandomItem(theme.symbols);
        
        // 初始化物理属性
        const velocity = {
            x: (Math.random() - 0.5) * (this.config.initialVelocity.max - this.config.initialVelocity.min) + this.config.initialVelocity.min,
            y: -this.config.initialVelocity.max
        };
        const rotation = (Math.random() * (this.config.rotationSpeed.max - this.config.rotationSpeed.min)) + this.config.rotationSpeed.min;
        
        // 设置样式
        effect.innerText = symbol;
        effect.style.position = 'fixed';
        effect.style.left = `${e.clientX}px`;
        effect.style.top = `${e.clientY}px`;
        effect.style.color = this.getRandomItem(theme.colors);
        effect.style.fontSize = '1.5rem';
        effect.style.userSelect = 'none';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '10000';
        effect.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        
        // 添加到页面
        document.body.appendChild(effect);
        this.elements.add(effect);

        // 动画帧
        let frame = 0;
        const animate = () => {
            frame++;
            
            // 更新位置
            velocity.y += this.config.gravity;
            velocity.x *= this.config.friction;
            velocity.y *= this.config.friction;

            const currentX = parseFloat(effect.style.left);
            const currentY = parseFloat(effect.style.top);
            
            effect.style.left = `${currentX + velocity.x}px`;
            effect.style.top = `${currentY + velocity.y}px`;
            effect.style.transform = `translate(-50%, -50%) rotate(${rotation * frame}deg)`;
            effect.style.opacity = Math.max(0, 1 - frame / 100);

            // 检查是否需要继续动画
            if (frame < 100 && effect.style.opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(effect);
                this.elements.delete(effect);
            }
        };

        requestAnimationFrame(animate);
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    switchTheme(themeName) {
        if (this.themes[themeName]) {
            this.activeTheme = themeName;
        }
    }

    // 添加新主题
    addTheme(name, symbols, colors) {
        this.themes[name] = { symbols, colors };
    }

    // 修改配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
}

// 当DOM加载完成后初始化点击特效
document.addEventListener('DOMContentLoaded', () => {
    window.clickEffects = new ClickEffects({
        maxElements: 30,
        gravity: 0.3,
        friction: 0.98,
        initialVelocity: { min: 5, max: 15 },
        rotationSpeed: { min: -15, max: 15 }
    });

    // 添加自定义主题示例
    window.clickEffects.addTheme(
        'emoji',
        ['😊', '😍', '🥰', '😘', '💫', '✨'],
        ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FFB6C1']
    );
}); 