// MarketBrowser - Browse and Discover Marketplace Items for aceOS

const marketBrowser = {
    // Launch MarketBrowser app
    launch() {
        const content = this.createBrowserUI();
        
        const window = WindowManager.createWindow({
            title: 'MarketBrowser - Discover Items',
            icon: '🛒',
            app: 'marketBrowser',
            width: 1100,
            height: 750,
            content: content
        });

        this.setupBrowserEvents(window);
        this.loadMarketplace(window);
    },

    // Create browser UI
    createBrowserUI() {
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .market-browser { display: flex; flex-direction: column; height: 100%; background: var(--background-dark); }
                .browser-header { padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .search-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
                .search-input { flex: 1; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.75rem; border-radius: 4px; }
                .search-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
                .category-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
                .filter-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem; }
                .filter-btn.active { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: var(--background-dark); }
                .browser-content { flex: 1; overflow: auto; padding: 2rem; }
                .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
                .item-card { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
                .item-card:hover { transform: translateY(-5px); border-color: var(--primary-color); box-shadow: 0 5px 20px rgba(0, 255, 157, 0.3); }
                .item-icon { font-size: 3rem; text-align: center; margin-bottom: 1rem; }
                .item-title { color: var(--primary-color); font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; }
                .item-price { color: var(--secondary-color); font-size: 1.3rem; font-weight: bold; margin: 0.5rem 0; }
            </style>
            <div class="market-browser">
                <div class="browser-header">
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">🛒 Marketplace Browser</h2>
                    <div class="search-bar">
                        <input type="text" class="search-input" id="search-input" placeholder="Search products and services..." />
                        <button class="search-btn" id="search-btn">🔍 Search</button>
                    </div>
                    <div class="category-filters" id="category-filters">
                        <button class="filter-btn active" data-category="all">All</button>
                        <button class="filter-btn" data-category="digital">Digital Products</button>
                        <button class="filter-btn" data-category="services">Services</button>
                        <button class="filter-btn" data-category="templates">Templates</button>
                        <button class="filter-btn" data-category="tools">Tools</button>
                        <button class="filter-btn" data-category="art">Art & Design</button>
                    </div>
                </div>
                <div class="browser-content">
                    <div class="item-grid" id="items-grid"></div>
                </div>
            </div>
        `;
        return container;
    },

    // Setup event handlers
    setupBrowserEvents(window) {
        const searchBtn = window.element.querySelector('#search-btn');
        const searchInput = window.element.querySelector('#search-input');
        const filterBtns = window.element.querySelectorAll('.filter-btn');

        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value, window);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value, window);
            }
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterByCategory(btn.dataset.category, window);
            });
        });
    },

    // Load marketplace items
    loadMarketplace(window) {
        const grid = window.element.querySelector('#items-grid');
        
        // Sample marketplace items
        const sampleItems = [
            { id: 1, icon: '📦', title: 'Starter Template Pack', price: 29.99, category: 'templates', rating: 4.8, sales: 156 },
            { id: 2, icon: '⚡', title: 'Performance Optimization Service', price: 49.99, category: 'services', rating: 4.9, sales: 89 },
            { id: 3, icon: '🎨', title: 'UI Component Library', price: 39.99, category: 'digital', rating: 4.7, sales: 234 },
            { id: 4, icon: '🔧', title: 'Development Tools Bundle', price: 59.99, category: 'tools', rating: 4.6, sales: 123 },
            { id: 5, icon: '📝', title: 'Documentation Templates', price: 19.99, category: 'templates', rating: 4.8, sales: 178 },
            { id: 6, icon: '💎', title: 'Premium Icon Set', price: 24.99, category: 'art', rating: 4.9, sales: 267 },
            { id: 7, icon: '🚀', title: 'Launch Checklist Pro', price: 14.99, category: 'digital', rating: 4.5, sales: 345 },
            { id: 8, icon: '🎯', title: 'Marketing Analytics Tool', price: 79.99, category: 'tools', rating: 4.7, sales: 98 },
        ];

        // Load from marketPlace if available
        if (window.marketPlace && window.marketPlace.listings) {
            sampleItems.push(...marketPlace.listings);
        }

        this.displayItems(sampleItems, grid);
    },

    // Display items in grid
    displayItems(items, grid) {
        grid.innerHTML = '';
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-title">${item.title}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
                    ⭐ ${item.rating ? item.rating.toFixed(1) : '4.5'} • 💰 ${item.sales || 0} sales
                </div>
                <button class="search-btn" style="width: 100%; margin-top: 1rem;" onclick="marketBrowser.viewItem(${item.id})">View Details</button>
            `;
            grid.appendChild(card);
        });
    },

    // Perform search
    performSearch(query, window) {
        Desktop.showNotification('Search', `Searching for: ${query}`);
        // In a real implementation, this would filter items
    },

    // Filter by category
    filterByCategory(category, window) {
        Desktop.showNotification('Filter', `Showing: ${category}`);
        // In a real implementation, this would filter items
    },

    // View item details
    viewItem(itemId) {
        Desktop.showNotification('MarketBrowser', 'Item details - Coming soon!');
    }
};

window.marketBrowser = marketBrowser;
