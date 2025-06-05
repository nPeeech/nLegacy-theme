// Access Counter JavaScript
class AccessCounter {
    constructor() {
        this.counterElement = document.getElementById('counter-display');
        this.wrapperElement = document.getElementById('counter-wrapper');
        this.apiUrl = '/api/count';
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1 second

        this.init();
    }

    init() {
        if (!this.counterElement || !this.wrapperElement) {
            console.warn('Access counter elements not found');
            return;
        }

        this.fetchCount();
    }

    async fetchCount(retryCount = 0) {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const count = parseInt(data.count || data.value || data, 10);

            if (isNaN(count)) {
                throw new Error('Invalid count value received');
            }

            this.displayCount(count);

        } catch (error) {
            console.error('Failed to fetch access count:', error);

            if (retryCount < this.maxRetries) {
                console.log(`Retrying in ${this.retryDelay}ms... (${retryCount + 1}/${this.maxRetries})`);
                setTimeout(() => {
                    this.fetchCount(retryCount + 1);
                }, this.retryDelay);
            } else {
                this.displayCount("error");
            }
        }
    }

    displayCount(count) {
        // Format count to 8 digits with leading zeros
        const formattedCount = count.toString().padStart(8, '!');
        this.counterElement.textContent = formattedCount;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're in production and counter elements exist
    if (document.getElementById('counter-display')) {
        new AccessCounter();
    }
});
