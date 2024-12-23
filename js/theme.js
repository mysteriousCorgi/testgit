// 主题管理类
class ThemeManager {
    constructor() {
        // 初始化主题设置
        this.theme = localStorage.getItem('theme') || 'light';
        this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 获取DOM元素
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('i');
        
        // 初始化
        this.init();
    }

    init() {
        // 设置初始主题
        this.applyTheme(this.theme);
        
        // 添加切换按钮事件监听
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // 监听系统主题变化
        this.systemThemeQuery.addEventListener('change', (e) => {
            if (localStorage.getItem('theme') === null) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });

        // 更新按钮图标
        this.updateToggleIcon();
    }

    // 切换主题
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        
        // 添加切换动画
        this.animateThemeSwitch();
    }

    // 应用主题
    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--primary-color', '#64ffda');
            root.style.setProperty('--secondary-color', '#7f5af0');
            root.style.setProperty('--card-bg', 'rgba(26, 26, 46, 0.95)');
            root.style.setProperty('--card-text', '#e2e2e2');
            root.style.setProperty('--nav-bg', 'rgba(26, 26, 46, 0.95)');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        } else {
            root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
            root.style.setProperty('--text-color', '#2c3e50');
            root.style.setProperty('--primary-color', '#4a90e2');
            root.style.setProperty('--secondary-color', '#f39c12');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
            root.style.setProperty('--card-text', '#666666');
            root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        }

        this.updateToggleIcon();
        document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
        document.body.classList.add(theme);
    }

    // 更新主题切换按钮图标
    updateToggleIcon() {
        this.themeIcon.className = this.theme === 'light' 
            ? 'fas fa-moon' 
            : 'fas fa-sun';
    }

    // 主题切换动画
    animateThemeSwitch() {
        // 添加过渡动画类
        document.body.classList.add('theme-transition');
        
        // 旋转图标
        this.themeIcon.style.transform = 'rotate(360deg)';
        
        // 动画结束后清理
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
            this.themeIcon.style.transform = '';
        }, 1000);
    }
}

// 当DOM加载完成后初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
}); 