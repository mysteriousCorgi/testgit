class RuntimeCounter {
    constructor(startTime) {
        this.startTime = new Date(startTime);
        this.runtimeElement = document.getElementById('runtime');
        this.lastUpdate = 0;
        this.init();
    }

    init() {
        // 使用requestAnimationFrame优化更新
        this.update();
    }

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    calculateRuntime() {
        const now = new Date();
        const diff = now - this.startTime;

        // 计算时间差
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return {
            days: this.formatNumber(days),
            hours: this.formatNumber(hours),
            minutes: this.formatNumber(minutes),
            seconds: this.formatNumber(seconds)
        };
    }

    update() {
        const now = performance.now();
        // 限制更新频率为每秒一次
        if (now - this.lastUpdate >= 1000) {
            const time = this.calculateRuntime();
            this.runtimeElement.innerHTML = `
                <div>${time.days} 天</div>
                <div>${time.hours}:${time.minutes}:${time.seconds}</div>
            `;
            this.lastUpdate = now;
        }

        requestAnimationFrame(() => this.update());
    }
}

// 当DOM加载完成后初始化运行时间计数器
document.addEventListener('DOMContentLoaded', () => {
    window.runtimeCounter = new RuntimeCounter('2024-10-01T00:00:00');
}); 