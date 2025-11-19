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
                <div class="form-group">
                    <label class="form-label">Product Photo</label>
                    <input type="file" class="form-input" id="listing-photo" accept="image/*" style="padding: 0.25rem;" />
                    <div id="photo-preview" style="margin-top: 0.5rem; display: none;">
                        <img id="preview-img" style="max-width: 200px; border-radius: 4px; border: 1px solid rgba(0, 255, 157, 0.2);" />
                    </div>
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

        // Setup photo preview
        const photoInput = content.querySelector('#listing-photo');
        const photoPreview = content.querySelector('#photo-preview');
        const previewImg = content.querySelector('#preview-img');
        
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    photoPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
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
                photo: previewImg.src || null,
                created: new Date().toISOString(),
                views: 0,
                sales: 0,
                rating: 0,
                reviews: [],
                hostedOnThisDevice: true
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
                    <span>⭐ ${listing.rating.toFixed(1)} (${(listing.reviews || []).length} reviews)</span>
                </div>
                <button class="marketplace-btn" style="width: 100%; margin-top: 0.5rem;" onclick="marketPlace.viewListingDetails('${listing.id}')">View Details</button>
                <button class="marketplace-btn" style="width: 100%; margin-top: 0.5rem;" onclick="marketPlace.editListing('${listing.id}')">Edit</button>
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
        const settings = AceStorage.load('marketPlace_settings') || {
            enableSharing: true,
            expirationTime: '30days',
            multiNode: false,
            encryption: 'standard',
            passwordProtected: false,
            instantMessaging: false,
            pgpEncryption: false
        };

        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .management-panel { padding: 2rem; }
                .settings-section { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; }
                .settings-title { color: var(--primary-color); font-size: 1.2rem; margin-bottom: 1rem; font-weight: bold; }
                .setting-item { margin-bottom: 1rem; }
                .setting-label { color: var(--text-secondary); display: block; margin-bottom: 0.5rem; }
                .setting-input { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; width: 100%; }
                .setting-checkbox { margin-right: 0.5rem; }
                .save-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 1rem; }
            </style>
            <div class="management-panel">
                <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">⚙️ Marketplace Management & Settings</h2>
                
                <div class="settings-section">
                    <div class="settings-title">🔧 Configuration</div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <input type="checkbox" class="setting-checkbox" id="enable-sharing" ${settings.enableSharing ? 'checked' : ''}>
                            Enable Content Sharing
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">Listing Expiration Time</label>
                        <select class="setting-input" id="expiration-time">
                            <option value="7days" ${settings.expirationTime === '7days' ? 'selected' : ''}>7 Days</option>
                            <option value="30days" ${settings.expirationTime === '30days' ? 'selected' : ''}>30 Days</option>
                            <option value="90days" ${settings.expirationTime === '90days' ? 'selected' : ''}>90 Days</option>
                            <option value="1year" ${settings.expirationTime === '1year' ? 'selected' : ''}>1 Year</option>
                            <option value="never" ${settings.expirationTime === 'never' ? 'selected' : ''}>Never Expire</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <input type="checkbox" class="setting-checkbox" id="multi-node" ${settings.multiNode ? 'checked' : ''}>
                            Multi-Node Server Hosting
                        </label>
                    </div>
                </div>

                <div class="settings-section">
                    <div class="settings-title">🔒 Security</div>
                    <div class="setting-item">
                        <label class="setting-label">Encryption Level</label>
                        <select class="setting-input" id="encryption-level">
                            <option value="standard" ${settings.encryption === 'standard' ? 'selected' : ''}>Standard Encryption</option>
                            <option value="enhanced" ${settings.encryption === 'enhanced' ? 'selected' : ''}>Enhanced Encryption</option>
                            <option value="maximum" ${settings.encryption === 'maximum' ? 'selected' : ''}>Maximum Encryption</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <input type="checkbox" class="setting-checkbox" id="password-auth" ${settings.passwordProtected ? 'checked' : ''}>
                            Password Authentication Required
                        </label>
                    </div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <input type="checkbox" class="setting-checkbox" id="pgp-encryption" ${settings.pgpEncryption ? 'checked' : ''}>
                            Enable PGP Encryption for Messages
                        </label>
                    </div>
                </div>

                <div class="settings-section">
                    <div class="settings-title">💬 Communication</div>
                    <div class="setting-item">
                        <label class="setting-label">
                            <input type="checkbox" class="setting-checkbox" id="instant-messaging" ${settings.instantMessaging ? 'checked' : ''}>
                            Enable Instant Messaging with Buyers
                        </label>
                    </div>
                </div>

                <button class="save-btn" id="save-settings-btn">💾 Save Settings</button>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Marketplace Management',
            icon: '⚙️',
            app: 'management',
            width: 700,
            height: 700,
            content: content
        });

        const saveBtn = content.querySelector('#save-settings-btn');
        saveBtn.addEventListener('click', () => {
            const newSettings = {
                enableSharing: content.querySelector('#enable-sharing').checked,
                expirationTime: content.querySelector('#expiration-time').value,
                multiNode: content.querySelector('#multi-node').checked,
                encryption: content.querySelector('#encryption-level').value,
                passwordProtected: content.querySelector('#password-auth').checked,
                instantMessaging: content.querySelector('#instant-messaging').checked,
                pgpEncryption: content.querySelector('#pgp-encryption').checked
            };
            
            AceStorage.save('marketPlace_settings', newSettings);
            Desktop.showNotification('Settings Saved', 'Marketplace settings have been updated successfully');
            WindowManager.closeWindow(window);
        });
    },

    // View listing details with reviews
    viewListingDetails(listingId) {
        const listing = this.listings.find(l => l.id === listingId);
        if (!listing) return;

        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .listing-details { padding: 2rem; }
                .review-card { background: var(--background-medium); border: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; }
                .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
                .add-review-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 1rem; }
            </style>
            <div class="listing-details">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${listing.icon}</div>
                    <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${listing.title}</h2>
                    <div style="color: var(--text-secondary);">${listing.category}</div>
                    <div style="color: var(--secondary-color); font-size: 2rem; font-weight: bold; margin: 1rem 0;">$${listing.price.toFixed(2)}</div>
                </div>
                
                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2); margin-bottom: 2rem;">
                    <h3 style="color: var(--secondary-color); margin-bottom: 0.5rem;">Description</h3>
                    <p style="color: var(--text-secondary); line-height: 1.6;">${listing.description}</p>
                </div>

                <div style="background: var(--background-light); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(0, 255, 157, 0.2);">
                    <h3 style="color: var(--secondary-color); margin-bottom: 1rem;">Reviews (${(listing.reviews || []).length})</h3>
                    <div id="reviews-container"></div>
                    <button class="add-review-btn" id="add-review-btn">✍️ Add Review</button>
                </div>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: listing.title,
            icon: '📦',
            app: 'listing-details',
            width: 700,
            height: 700,
            content: content
        });

        // Render reviews
        const reviewsContainer = content.querySelector('#reviews-container');
        this.renderReviews(listing, reviewsContainer);

        // Add review button
        const addReviewBtn = content.querySelector('#add-review-btn');
        addReviewBtn.addEventListener('click', () => {
            this.showAddReviewForm(listing, window);
        });
    },

    // Render reviews
    renderReviews(listing, container) {
        const reviews = listing.reviews || [];
        if (reviews.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 1rem;">No reviews yet. Be the first to review!</p>';
            return;
        }

        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <strong style="color: var(--primary-color);">${review.author || 'Anonymous'}</strong>
                    <span style="color: var(--secondary-color);">⭐ ${review.rating}/5</span>
                </div>
                <p style="color: var(--text-secondary); margin: 0;">${review.comment}</p>
                <div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">${new Date(review.date).toLocaleDateString()}</div>
            </div>
        `).join('');
    },

    // Show add review form
    showAddReviewForm(listing, parentWindow) {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .review-form { padding: 2rem; }
                .rating-selector { display: flex; gap: 0.5rem; margin: 1rem 0; }
                .star-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 1.5rem; }
                .star-btn.selected { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); }
                .form-input { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .form-textarea { width: 100%; min-height: 100px; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .submit-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 1rem; }
            </style>
            <div class="review-form">
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Add Review</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Share your experience with ${listing.title}</p>
                
                <label style="color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">Your Name (Optional)</label>
                <input type="text" class="form-input" id="reviewer-name" placeholder="Anonymous" style="margin-bottom: 1rem;" />
                
                <label style="color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">Rating</label>
                <div class="rating-selector" id="rating-selector">
                    <button class="star-btn" data-rating="1">⭐</button>
                    <button class="star-btn" data-rating="2">⭐</button>
                    <button class="star-btn" data-rating="3">⭐</button>
                    <button class="star-btn" data-rating="4">⭐</button>
                    <button class="star-btn" data-rating="5">⭐</button>
                </div>
                
                <label style="color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">Review</label>
                <textarea class="form-textarea" id="review-comment" placeholder="Share your thoughts about this product..."></textarea>
                
                <button class="submit-btn" id="submit-review-btn">Submit Review</button>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Add Review',
            icon: '✍️',
            app: 'add-review',
            width: 500,
            height: 500,
            content: content
        });

        let selectedRating = 5;
        const ratingButtons = content.querySelectorAll('.star-btn');
        ratingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                selectedRating = parseInt(btn.dataset.rating);
                ratingButtons.forEach(b => {
                    if (parseInt(b.dataset.rating) <= selectedRating) {
                        b.classList.add('selected');
                    } else {
                        b.classList.remove('selected');
                    }
                });
            });
        });
        
        // Select 5 stars by default
        ratingButtons.forEach(b => b.classList.add('selected'));

        const submitBtn = content.querySelector('#submit-review-btn');
        submitBtn.addEventListener('click', () => {
            const review = {
                author: content.querySelector('#reviewer-name').value || 'Anonymous',
                rating: selectedRating,
                comment: content.querySelector('#review-comment').value,
                date: new Date().toISOString()
            };

            if (review.comment.trim()) {
                if (!listing.reviews) listing.reviews = [];
                listing.reviews.push(review);
                
                // Update average rating
                const avgRating = listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length;
                listing.rating = avgRating;
                
                this.saveListings();
                Desktop.showNotification('Review Added', 'Thank you for your feedback!');
                WindowManager.closeWindow(window);
                
                // Refresh parent window
                const reviewsContainer = parentWindow.element.querySelector('#reviews-container');
                if (reviewsContainer) {
                    this.renderReviews(listing, reviewsContainer);
                }
            } else {
                Desktop.showNotification('Error', 'Please write a review comment');
            }
        });
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
