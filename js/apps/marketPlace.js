// MarketPlace - Marketplace Hosting Service for aceOS
// Host and manage your own marketplace

const marketPlace = {
    listings: [],
    categories: ['Digital Products', 'Services', 'Templates', 'Tools', 'Art & Design', 'Other'],
    
    // Launch MarketPlace app
    launch() {
        const content = this.createMarketPlaceUI();
        
        const window = WindowManager.createWindow({
            title: 'MarketPlace - Hosting Service',
            icon: '🏪',
            app: 'marketPlace',
            width: 1000,
            height: 700,
            content: content
        });

        this.loadListings();
        this.setupMarketPlaceEvents(window);
    },

    // Create marketplace UI
    createMarketPlaceUI() {
        const container = document.createElement('div');
        container.className = 'marketplace-app';
        container.innerHTML = `
            <style>
                .marketplace-app { display: flex; flex-direction: column; height: 100%; background: var(--background-dark); }
                .marketplace-toolbar { display: flex; gap: 0.5rem; padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); align-items: center; }
                .marketplace-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }
                .marketplace-content { flex: 1; overflow: auto; padding: 2rem; }
                .listing-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
                .listing-card { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; border-radius: 8px; transition: all 0.3s; }
                .listing-card:hover { transform: translateY(-5px); border-color: var(--primary-color); box-shadow: 0 5px 20px rgba(0, 255, 157, 0.2); }
                .listing-image { width: 100%; height: 150px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem; }
                .listing-title { color: var(--primary-color); font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem; }
                .listing-price { color: var(--secondary-color); font-size: 1.5rem; font-weight: bold; margin: 0.5rem 0; }
                .listing-stats { display: flex; gap: 1rem; color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem; }
                .form-group { margin-bottom: 1rem; }
                .form-label { color: var(--text-secondary); display: block; margin-bottom: 0.5rem; }
                .form-input { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .form-textarea { width: 100%; min-height: 100px; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
            </style>
            <div class="marketplace-toolbar">
                <h2 style="color: var(--primary-color); margin: 0;">🏪 My Marketplace</h2>
                <button class="marketplace-btn" id="create-listing-btn" style="margin-left: auto;">+ Create Listing</button>
                <button class="marketplace-btn" id="manage-btn">⚙️ Manage</button>
                <button class="marketplace-btn" id="analytics-btn">📊 Analytics</button>
            </div>
            <div class="marketplace-content">
                <div id="listings-view">
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Active Listings</h3>
                    <div class="listing-grid" id="listings-grid"></div>
                </div>
            </div>
        `;
        return container;
    },

    // Setup event handlers
    setupMarketPlaceEvents(window) {
        const createListingBtn = window.element.querySelector('#create-listing-btn');
        const manageBtn = window.element.querySelector('#manage-btn');
        const analyticsBtn = window.element.querySelector('#analytics-btn');

        createListingBtn.addEventListener('click', () => {
            this.showCreateListingForm();
        });

        manageBtn.addEventListener('click', () => {
            this.showManagementPanel(window);
        });

        analyticsBtn.addEventListener('click', () => {
            this.showAnalytics(window);
        });

        this.refreshListingsGrid(window);
    },

    // Show create listing form
    showCreateListingForm() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .create-form { padding: 2rem; }
                .form-group { margin-bottom: 1rem; }
                .form-label { color: var(--text-secondary); display: block; margin-bottom: 0.5rem; }
                .form-input { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .form-textarea { width: 100%; min-height: 100px; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .submit-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
            </style>
            <div class="create-form">
                <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">Create New Listing</h2>
                <div class="form-group">
                    <label class="form-label">Title *</label>
                    <input type="text" class="form-input" id="listing-title" placeholder="Enter product/service title" />
                </div>
                <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select class="form-input" id="listing-category">
                        ${this.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Price *</label>
                    <input type="number" class="form-input" id="listing-price" placeholder="0.00" step="0.01" />
                </div>
                <div class="form-group">
                    <label class="form-label">Description *</label>
                    <textarea class="form-textarea" id="listing-description" placeholder="Describe your product or service..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Icon</label>
                    <select class="form-input" id="listing-icon">
                        <option value="📦">📦 Package</option>
                        <option value="⚡">⚡ Service</option>
                        <option value="🎨">🎨 Design</option>
                        <option value="🔧">🔧 Tool</option>
                        <option value="📝">📝 Document</option>
                        <option value="💎">💎 Premium</option>
                        <option value="🚀">🚀 Launch</option>
                        <option value="🎯">🎯 Target</option>
                    </select>
                </div>
                <button class="submit-btn" id="submit-listing-btn">Publish Listing</button>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Create Listing',
            icon: '✏️',
            app: 'create-listing',
            width: 600,
            height: 700,
            content: content
        });

        const submitBtn = content.querySelector('#submit-listing-btn');
        submitBtn.addEventListener('click', () => {
            const listing = {
                id: 'listing_' + Date.now(),
                title: content.querySelector('#listing-title').value,
                category: content.querySelector('#listing-category').value,
                price: parseFloat(content.querySelector('#listing-price').value),
                description: content.querySelector('#listing-description').value,
                icon: content.querySelector('#listing-icon').value,
                created: new Date().toISOString(),
                views: 0,
                sales: 0,
                rating: 0,
                reviews: 0
            };

            if (listing.title && listing.price >= 0 && listing.description) {
                this.listings.push(listing);
                this.saveListings();
                Desktop.showNotification('MarketPlace', 'Listing published successfully!');
                WindowManager.closeWindow(window);
                
                // Refresh the main window
                const mainWindow = WindowManager.windows.find(w => w.app === 'marketPlace');
                if (mainWindow) {
                    this.refreshListingsGrid(mainWindow);
                }
            } else {
                Desktop.showNotification('Error', 'Please fill in all required fields');
            }
        });
    },

    // Refresh listings grid
    refreshListingsGrid(window) {
        const grid = window.element.querySelector('#listings-grid');
        if (!grid) return;

        grid.innerHTML = '';
        
        if (this.listings.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3 style="color: var(--text-secondary);">No listings yet</h3>
                    <p style="color: var(--text-secondary);">Create your first listing to get started!</p>
                </div>
            `;
            return;
        }

        this.listings.forEach(listing => {
            const card = document.createElement('div');
            card.className = 'listing-card';
            card.innerHTML = `
                <div class="listing-image">${listing.icon}</div>
                <div class="listing-title">${listing.title}</div>
                <div style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.5rem;">${listing.category}</div>
                <div class="listing-price">$${listing.price.toFixed(2)}</div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">${listing.description.substring(0, 100)}${listing.description.length > 100 ? '...' : ''}</p>
                <div class="listing-stats">
                    <span>👁️ ${listing.views}</span>
                    <span>💰 ${listing.sales} sales</span>
                    <span>⭐ ${listing.rating.toFixed(1)}</span>
                </div>
                <button class="marketplace-btn" style="width: 100%; margin-top: 1rem;" onclick="marketPlace.editListing('${listing.id}')">Edit</button>
            `;
            grid.appendChild(card);
        });
    },

    // Show analytics
    showAnalytics(parentWindow) {
        const totalListings = this.listings.length;
        const totalViews = this.listings.reduce((sum, l) => sum + l.views, 0);
        const totalSales = this.listings.reduce((sum, l) => sum + l.sales, 0);
        const totalRevenue = this.listings.reduce((sum, l) => sum + (l.sales * l.price), 0);

        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .analytics { padding: 2rem; }
                .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                .stat-card { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; border-radius: 8px; text-align: center; }
                .stat-value { color: var(--primary-color); font-size: 2.5rem; font-weight: bold; }
                .stat-label { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem; }
            </style>
            <div class="analytics">
                <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">📊 Analytics Dashboard</h2>
                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-value">${totalListings}</div>
                        <div class="stat-label">Active Listings</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${totalViews}</div>
                        <div class="stat-label">Total Views</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${totalSales}</div>
                        <div class="stat-label">Total Sales</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">$${totalRevenue.toFixed(2)}</div>
                        <div class="stat-label">Total Revenue</div>
                    </div>
                </div>
                <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Top Performing Listings</h3>
                <div id="top-listings"></div>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Analytics Dashboard',
            icon: '📊',
            app: 'analytics',
            width: 800,
            height: 600,
            content: content
        });

        const topListings = content.querySelector('#top-listings');
        const sorted = [...this.listings].sort((a, b) => b.sales - a.sales).slice(0, 5);
        
        sorted.forEach(listing => {
            const item = document.createElement('div');
            item.style.cssText = 'background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;';
            item.innerHTML = `
                <div>
                    <strong style="color: var(--primary-color);">${listing.icon} ${listing.title}</strong>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">💰 ${listing.sales} sales • $${(listing.sales * listing.price).toFixed(2)} revenue</div>
                </div>
                <div style="color: var(--secondary-color); font-weight: bold; font-size: 1.2rem;">$${listing.price.toFixed(2)}</div>
            `;
            topListings.appendChild(item);
        });
    },

    // Management panel
    showManagementPanel(parentWindow) {
        Desktop.showNotification('MarketPlace', 'Management panel - Coming soon!');
    },

    // Edit listing
    editListing(listingId) {
        Desktop.showNotification('MarketPlace', 'Edit listing - Coming soon!');
    },

    // Load listings from storage
    loadListings() {
        const saved = AceStorage.load('marketPlace_listings');
        if (saved) {
            this.listings = saved;
        }
    },

    // Save listings to storage
    saveListings() {
        AceStorage.save('marketPlace_listings', this.listings);
    }
};

window.marketPlace = marketPlace;
