// makeTrap - Drag & Drop Website Builder for aceOS
// Create websites with visual modules and publish to the aceOS network

const makeTrap = {
    currentContent: '',
    savedPages: [],
    currentSite: {
        title: 'Untitled Site',
        modules: [],
        styles: {}
    },
    publishedSites: [],
    draggedModule: null,

    // Launch makeTrap editor
    launch() {
        const content = this.createBuilderUI();
        
        const window = WindowManager.createWindow({
            title: 'Make+Trap Website Builder',
            icon: '✏️',
            app: 'makeTrap',
            width: 1400,
            height: 900,
            content: content
        });

        this.loadSavedPages();
        this.loadPublishedSites();
        this.setupBuilderEvents(window);
    },

    // Create builder UI with drag and drop
    createBuilderUI() {
        const container = document.createElement('div');
        container.className = 'maketrap-builder';
        container.innerHTML = `
            <style>
                .maketrap-builder { display: flex; flex-direction: column; height: 100%; background: var(--background-dark); }
                .builder-toolbar { display: flex; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); align-items: center; }
                .builder-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem; }
                .builder-btn:hover { background: var(--background-dark); border-color: var(--primary-color); }
                .go-live-btn { background: linear-gradient(135deg, #00ff9d, #00cc7d); color: #0a0a0f; font-weight: bold; margin-left: auto; }
                .go-live-btn:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 255, 157, 0.5); }
                .builder-content { display: flex; flex: 1; overflow: hidden; }
                
                .modules-panel { width: 280px; background: var(--background-medium); border-right: 1px solid rgba(0, 255, 157, 0.2); overflow-y: auto; }
                .modules-category { padding: 1rem; }
                .category-title { color: var(--primary-color); font-weight: bold; margin-bottom: 0.75rem; font-size: 0.9rem; text-transform: uppercase; }
                .module-item { background: var(--background-light); padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; border: 1px solid rgba(0, 255, 157, 0.2); cursor: grab; transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem; }
                .module-item:hover { border-color: var(--primary-color); transform: translateX(5px); }
                .module-item:active { cursor: grabbing; }
                .module-icon { font-size: 1.2rem; }
                .module-info { flex: 1; }
                .module-name { font-size: 0.85rem; font-weight: bold; color: white; }
                .module-desc { font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.2rem; }
                
                .canvas-panel { flex: 1; display: flex; flex-direction: column; }
                .canvas-toolbar { padding: 0.5rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); display: flex; gap: 0.5rem; align-items: center; }
                .canvas-input { background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.4rem 0.8rem; border-radius: 4px; flex: 1; max-width: 300px; }
                .canvas-container { flex: 1; overflow: auto; padding: 2rem; background: #f5f5f5; }
                .canvas-dropzone { min-height: 600px; background: white; border: 2px dashed #ddd; border-radius: 8px; position: relative; }
                .canvas-dropzone.drag-over { border-color: var(--primary-color); background: rgba(0, 255, 157, 0.05); }
                .canvas-empty { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; pointer-events: none; }
                
                .placed-module { position: relative; margin: 1rem; padding: 1rem; border: 2px solid transparent; border-radius: 4px; background: white; cursor: move; transition: all 0.3s; }
                .placed-module:hover { border-color: var(--primary-color); box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2); }
                .placed-module.selected { border-color: var(--primary-color); box-shadow: 0 4px 12px rgba(0, 255, 157, 0.3); }
                .module-controls { position: absolute; top: -12px; right: -12px; display: none; }
                .placed-module:hover .module-controls { display: flex; gap: 0.25rem; }
                .control-btn { background: var(--background-dark); border: 1px solid var(--primary-color); color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }
                .control-btn:hover { background: var(--primary-color); color: #0a0a0f; }
                
                .properties-panel { width: 280px; background: var(--background-medium); border-left: 1px solid rgba(0, 255, 157, 0.2); overflow-y: auto; padding: 1rem; }
                .property-group { margin-bottom: 1.5rem; }
                .property-label { color: var(--primary-color); font-size: 0.85rem; font-weight: bold; margin-bottom: 0.5rem; }
                .property-input { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; }
                .property-textarea { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; min-height: 80px; font-family: inherit; }
                .property-select { width: 100%; background: var(--background-dark); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem; border-radius: 4px; }
                .color-swatch { width: 100%; height: 40px; border: 1px solid rgba(0, 255, 157, 0.2); border-radius: 4px; cursor: pointer; }
            </style>
            
            <div class="builder-toolbar">
                <button class="builder-btn" id="new-site-btn">📄 New Site</button>
                <button class="builder-btn" id="save-site-btn">💾 Save Draft</button>
                <button class="builder-btn" id="load-site-btn">📂 Load Draft</button>
                <button class="builder-btn" id="preview-btn">👁️ Preview</button>
                <button class="builder-btn go-live-btn" id="go-live-btn">🚀 GO LIVE</button>
            </div>
            
            <div class="builder-content">
                <!-- Modules Library -->
                <div class="modules-panel" id="modules-panel">
                    <div class="modules-category">
                        <div class="category-title">📐 Layout & Design</div>
                        ${this.renderModuleItems('layout')}
                    </div>
                    <div class="modules-category">
                        <div class="category-title">📝 Content</div>
                        ${this.renderModuleItems('content')}
                    </div>
                    <div class="modules-category">
                        <div class="category-title">📥 Input & Forms</div>
                        ${this.renderModuleItems('forms')}
                    </div>
                    <div class="modules-category">
                        <div class="category-title">🛍️ E-Commerce</div>
                        ${this.renderModuleItems('ecommerce')}
                    </div>
                    <div class="modules-category">
                        <div class="category-title">💬 Social & Communication</div>
                        ${this.renderModuleItems('social')}
                    </div>
                    <div class="modules-category">
                        <div class="category-title">🎨 Media</div>
                        ${this.renderModuleItems('media')}
                    </div>
                </div>
                
                <!-- Canvas -->
                <div class="canvas-panel">
                    <div class="canvas-toolbar">
                        <label style="color: var(--text-secondary); font-size: 0.85rem;">Site Title:</label>
                        <input type="text" class="canvas-input" id="site-title-input" placeholder="Enter site title..." value="Untitled Site">
                    </div>
                    <div class="canvas-container">
                        <div class="canvas-dropzone" id="canvas-dropzone">
                            <div class="canvas-empty">
                                <h3>Drag modules here to build your site</h3>
                                <p>Choose from 30+ pre-built modules</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Properties Panel -->
                <div class="properties-panel" id="properties-panel">
                    <div class="property-group">
                        <div class="property-label">Module Properties</div>
                        <p style="color: var(--text-secondary); font-size: 0.85rem;">Select a module to edit its properties</p>
                    </div>
                </div>
            </div>
        `;

        return container;
    },

    // Module library - 30+ pre-built modules
    getModuleLibrary() {
        return {
            layout: [
                { id: 'hero', icon: '🎯', name: 'Hero Section', desc: 'Large banner with title & CTA' },
                { id: 'container', icon: '📦', name: 'Container', desc: 'Flexible content container' },
                { id: 'columns', icon: '▦', name: '2-Column Layout', desc: 'Two column grid layout' },
                { id: 'grid', icon: '⊞', name: 'Grid Layout', desc: 'Multi-item grid display' },
                { id: 'spacer', icon: '⬍', name: 'Spacer', desc: 'Add vertical spacing' }
            ],
            content: [
                { id: 'heading', icon: '📰', name: 'Heading', desc: 'Title text (H1-H6)' },
                { id: 'paragraph', icon: '📄', name: 'Paragraph', desc: 'Body text content' },
                { id: 'button', icon: '🔘', name: 'Button', desc: 'Call-to-action button' },
                { id: 'image', icon: '🖼️', name: 'Image', desc: 'Single image display' },
                { id: 'video', icon: '🎬', name: 'Video', desc: 'Embedded video player' }
            ],
            forms: [
                { id: 'contact-form', icon: '✉️', name: 'Contact Form', desc: 'Email contact form' },
                { id: 'input-field', icon: '✏️', name: 'Input Field', desc: 'Text input field' },
                { id: 'textarea', icon: '📝', name: 'Text Area', desc: 'Multi-line text input' },
                { id: 'select', icon: '📋', name: 'Dropdown', desc: 'Selection dropdown' },
                { id: 'checkbox', icon: '☑️', name: 'Checkbox', desc: 'Checkbox input' },
                { id: 'database-field', icon: '🗄️', name: 'Database Field', desc: 'Connect to database' }
            ],
            ecommerce: [
                { id: 'product-card', icon: '🏷️', name: 'Product Card', desc: 'Single product display' },
                { id: 'product-grid', icon: '🛍️', name: 'Product Grid', desc: 'Multiple products' },
                { id: 'cart-button', icon: '🛒', name: 'Add to Cart', desc: 'Shopping cart button' },
                { id: 'checkout', icon: '💳', name: 'Checkout Form', desc: 'Payment checkout' },
                { id: 'pricing-table', icon: '💰', name: 'Pricing Table', desc: 'Price comparison' }
            ],
            social: [
                { id: 'blog-post', icon: '📰', name: 'Blog Post', desc: 'Article layout' },
                { id: 'blog-list', icon: '📚', name: 'Blog List', desc: 'List of blog posts' },
                { id: 'comment-section', icon: '💬', name: 'Comments', desc: 'User comments' },
                { id: 'review-module', icon: '⭐', name: 'Reviews', desc: 'Star ratings & reviews' },
                { id: 'chat-widget', icon: '💭', name: 'Live Chat', desc: 'Instant messaging' },
                { id: 'social-share', icon: '📤', name: 'Social Share', desc: 'Share buttons' },
                { id: 'social-feed', icon: '📱', name: 'Social Feed', desc: 'Social media feed' }
            ],
            media: [
                { id: 'gallery', icon: '🖼️', name: 'Image Gallery', desc: 'Photo gallery grid' },
                { id: 'slider', icon: '🎠', name: 'Image Slider', desc: 'Carousel slideshow' },
                { id: 'video-embed', icon: '▶️', name: 'Video Embed', desc: 'Embedded video' },
                { id: 'audio-player', icon: '🎵', name: 'Audio Player', desc: 'Music player' },
                { id: 'map', icon: '🗺️', name: 'Map', desc: 'Location map' }
            ]
        };
    },

    // Render module items for a category
    renderModuleItems(category) {
        const modules = this.getModuleLibrary()[category] || [];
        return modules.map(module => `
            <div class="module-item" draggable="true" data-module-id="${module.id}" data-category="${category}">
                <div class="module-icon">${module.icon}</div>
                <div class="module-info">
                    <div class="module-name">${module.name}</div>
                    <div class="module-desc">${module.desc}</div>
                </div>
            </div>
        `).join('');
    },

    // Setup builder event handlers
    setupBuilderEvents(window) {
        const dropzone = window.element.querySelector('#canvas-dropzone');
        const modulesPanel = window.element.querySelector('#modules-panel');
        const propertiesPanel = window.element.querySelector('#properties-panel');
        const siteTitleInput = window.element.querySelector('#site-title-input');

        // Toolbar buttons
        const newSiteBtn = window.element.querySelector('#new-site-btn');
        const saveSiteBtn = window.element.querySelector('#save-site-btn');
        const loadSiteBtn = window.element.querySelector('#load-site-btn');
        const previewBtn = window.element.querySelector('#preview-btn');
        const goLiveBtn = window.element.querySelector('#go-live-btn');

        // Site title change
        siteTitleInput.addEventListener('input', () => {
            this.currentSite.title = siteTitleInput.value;
        });

        // Toolbar button handlers
        newSiteBtn.addEventListener('click', () => this.newSite(window));
        saveSiteBtn.addEventListener('click', () => this.saveSite(window));
        loadSiteBtn.addEventListener('click', () => this.loadSite(window));
        previewBtn.addEventListener('click', () => this.previewSite(window));
        goLiveBtn.addEventListener('click', () => this.goLive(window));

        // Drag and drop for modules
        const moduleItems = modulesPanel.querySelectorAll('.module-item');
        moduleItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                const moduleId = e.target.dataset.moduleId;
                const category = e.target.dataset.category;
                this.draggedModule = { id: moduleId, category: category };
                e.dataTransfer.effectAllowed = 'copy';
            });
        });

        // Drop zone events
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('drag-over');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            
            if (this.draggedModule) {
                this.addModuleToCanvas(this.draggedModule, window);
                this.draggedModule = null;
            }
        });

        // Initialize empty canvas
        this.updateCanvasDisplay(window);
    },

    // Add module to canvas
    addModuleToCanvas(moduleData, window) {
        const moduleId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const module = {
            id: moduleId,
            type: moduleData.id,
            category: moduleData.category,
            properties: this.getDefaultModuleProperties(moduleData.id)
        };

        this.currentSite.modules.push(module);
        this.updateCanvasDisplay(window);
        Desktop.showNotification('Module Added', `${moduleData.id} module added to canvas`);
    },

    // Get default properties for a module type
    getDefaultModuleProperties(moduleType) {
        const defaults = {
            hero: { title: 'Welcome to Our Site', subtitle: 'Your tagline here', buttonText: 'Get Started', bgColor: '#667eea' },
            heading: { text: 'Heading Text', level: 'h2', color: '#333' },
            paragraph: { text: 'Your paragraph text goes here...', fontSize: '16px' },
            button: { text: 'Click Me', link: '#', bgColor: '#00ff9d', textColor: '#000' },
            image: { src: 'https://via.placeholder.com/800x400', alt: 'Image', width: '100%' },
            'contact-form': { title: 'Contact Us', fields: ['Name', 'Email', 'Message'], buttonText: 'Send' },
            'product-card': { name: 'Product Name', price: '$99.99', image: 'https://via.placeholder.com/300', description: 'Product description' },
            'blog-post': { title: 'Blog Post Title', author: 'Author Name', date: new Date().toLocaleDateString(), content: 'Post content...' },
            'review-module': { rating: 5, reviews: [] },
            'chat-widget': { title: 'Live Chat', position: 'bottom-right' },
            container: { padding: '20px', bgColor: '#fff' },
            columns: { column1: 'Column 1 content', column2: 'Column 2 content' },
            spacer: { height: '40px' }
        };
        return defaults[moduleType] || { text: 'Module content' };
    },

    // Update canvas display
    updateCanvasDisplay(window) {
        const dropzone = window ? window.element.querySelector('#canvas-dropzone') : document.querySelector('#canvas-dropzone');
        if (!dropzone) return;
        const emptyState = dropzone.querySelector('.canvas-empty');

        if (this.currentSite.modules.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        // Clear current content except empty state
        Array.from(dropzone.children).forEach(child => {
            if (!child.classList.contains('canvas-empty')) {
                child.remove();
            }
        });

        // Render modules
        this.currentSite.modules.forEach(module => {
            const moduleElement = this.renderModule(module);
            dropzone.appendChild(moduleElement);
        });
    },

    // Render a module element
    renderModule(module) {
        const div = document.createElement('div');
        div.className = 'placed-module';
        div.dataset.moduleId = module.id;
        
        const html = this.getModuleHTML(module);
        div.innerHTML = `
            ${html}
            <div class="module-controls">
                <button class="control-btn" onclick="makeTrap.editModule('${module.id}')" title="Edit">✏️</button>
                <button class="control-btn" onclick="makeTrap.deleteModule('${module.id}')" title="Delete">🗑️</button>
            </div>
        `;

        div.addEventListener('click', () => this.selectModule(module.id));
        return div;
    },

    // Get HTML for a module based on its type
    getModuleHTML(module) {
        const p = module.properties;
        
        const templates = {
            hero: `<div style="background: ${p.bgColor}; color: white; text-align: center; padding: 80px 20px; border-radius: 8px;">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">${p.title}</h1>
                <p style="font-size: 1.25rem; margin-bottom: 2rem;">${p.subtitle}</p>
                <button style="background: white; color: ${p.bgColor}; border: none; padding: 1rem 2rem; font-size: 1rem; border-radius: 50px; cursor: pointer;">${p.buttonText}</button>
            </div>`,
            heading: `<${p.level} style="color: ${p.color};">${p.text}</${p.level}>`,
            paragraph: `<p style="font-size: ${p.fontSize}; line-height: 1.6;">${p.text}</p>`,
            button: `<button style="background: ${p.bgColor}; color: ${p.textColor}; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 1rem;">${p.text}</button>`,
            image: `<img src="${p.src}" alt="${p.alt}" style="width: ${p.width}; height: auto; border-radius: 8px;">`,
            'contact-form': `<div style="background: #f5f5f5; padding: 2rem; border-radius: 8px;">
                <h3>${p.title}</h3>
                ${(p.fields && Array.isArray(p.fields) ? p.fields : ['Name', 'Email', 'Message']).map(field => `<div style="margin-bottom: 1rem;"><label>${field}:</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"></div>`).join('')}
                <button style="background: #00ff9d; color: #000; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">${p.buttonText}</button>
            </div>`,
            'product-card': `<div style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; background: white;">
                <img src="${p.image}" style="width: 100%; border-radius: 4px; margin-bottom: 1rem;">
                <h3>${p.name}</h3>
                <p style="font-size: 1.5rem; color: #00ff9d; font-weight: bold;">${p.price}</p>
                <p style="color: #666;">${p.description}</p>
                <button style="background: #00ff9d; color: #000; border: none; padding: 0.75rem 1.5rem; width: 100%; border-radius: 4px; cursor: pointer;">Add to Cart</button>
            </div>`,
            'blog-post': `<article style="background: white; padding: 2rem; border-radius: 8px; border: 1px solid #ddd;">
                <h2>${p.title}</h2>
                <p style="color: #666; font-size: 0.9rem;">By ${p.author} | ${p.date}</p>
                <p style="margin-top: 1rem; line-height: 1.6;">${p.content}</p>
            </article>`,
            'review-module': `<div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px;">
                <h3>Customer Reviews</h3>
                <div style="color: #ffd700; font-size: 1.5rem;">${'★'.repeat(p.rating || 5)}${'☆'.repeat(5-(p.rating || 5))}</div>
                <p style="color: #666; margin-top: 0.5rem;">Based on ${(p.reviews && Array.isArray(p.reviews) ? p.reviews.length : 0)} reviews</p>
            </div>`,
            'chat-widget': `<div style="background: #00ff9d; color: #000; padding: 1rem; border-radius: 8px; text-align: center;">
                <h4>${p.title}</h4>
                <p style="font-size: 0.9rem;">💬 Chat with us!</p>
            </div>`,
            container: `<div style="padding: ${p.padding}; background: ${p.bgColor}; border: 1px solid #ddd; border-radius: 8px;">
                <p style="color: #999; text-align: center;">Container - Drop content here</p>
            </div>`,
            columns: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div style="padding: 1rem; background: #f5f5f5; border-radius: 8px;">${p.column1}</div>
                <div style="padding: 1rem; background: #f5f5f5; border-radius: 8px;">${p.column2}</div>
            </div>`,
            spacer: `<div style="height: ${p.height};"></div>`
        };

        return templates[module.type] || `<div style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">Module: ${module.type}</div>`;
    },

    // Select a module
    selectModule(moduleId) {
        const module = this.currentSite.modules.find(m => m.id === moduleId);
        if (!module) return;

        // Update UI to show selected state
        document.querySelectorAll('.placed-module').forEach(el => {
            el.classList.remove('selected');
        });
        const moduleEl = document.querySelector(`[data-module-id="${moduleId}"]`);
        if (moduleEl) moduleEl.classList.add('selected');

        // Show properties panel
        this.showModuleProperties(module);
    },

    // Show module properties in properties panel
    showModuleProperties(module) {
        const propertiesPanel = document.querySelector('#properties-panel');
        if (!propertiesPanel) return;

        const props = module.properties;
        let html = `<div class="property-group">
            <div class="property-label">Module: ${module.type}</div>
        </div>`;

        // Generate property inputs based on module type
        Object.keys(props).forEach(key => {
            const value = props[key];
            const inputType = typeof value === 'number' ? 'number' : 'text';
            
            html += `<div class="property-group">
                <div class="property-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</div>
                <input type="${inputType}" class="property-input" data-module-id="${module.id}" data-prop-key="${key}" value="${value}">
            </div>`;
        });

        propertiesPanel.innerHTML = html;

        // Add event listeners for property changes
        propertiesPanel.querySelectorAll('.property-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const moduleId = e.target.dataset.moduleId;
                const propKey = e.target.dataset.propKey;
                const module = this.currentSite.modules.find(m => m.id === moduleId);
                if (module) {
                    module.properties[propKey] = e.target.value;
                    this.updateCanvasDisplay(null);
                }
            });
        });
    },

    // Edit module
    editModule(moduleId) {
        this.selectModule(moduleId);
    },

    // Delete module
    deleteModule(moduleId) {
        if (confirm('Delete this module?')) {
            this.currentSite.modules = this.currentSite.modules.filter(m => m.id !== moduleId);
            this.updateCanvasDisplay(null);
            Desktop.showNotification('Module Deleted', 'Module removed from canvas');
        }
    },

    // New site
    newSite(window) {
        if (this.currentSite.modules.length > 0) {
            if (!confirm('Clear current site and start new?')) return;
        }
        this.currentSite = {
            title: 'Untitled Site',
            modules: [],
            styles: {}
        };
        window.element.querySelector('#site-title-input').value = 'Untitled Site';
        this.updateCanvasDisplay(window);
        Desktop.showNotification('New Site', 'Started a new site');
    },

    // Save site as draft
    saveSite(window) {
        const site = {
            id: Date.now(),
            ...this.currentSite,
            savedAt: new Date().toISOString()
        };

        this.savedPages.push(site);
        this.savePagesToStorage();
        Desktop.showNotification('Site Saved', `"${site.title}" saved as draft`);
    },

    // Load site from drafts
    loadSite(window) {
        if (this.savedPages.length === 0) {
            Desktop.showNotification('No Drafts', 'You have no saved drafts');
            return;
        }

        const draftList = this.savedPages.map((p, i) => `${i + 1}. ${p.title}`).join('\n');
        const choice = prompt(`Select a draft:\n${draftList}`);
        
        if (choice) {
            const index = parseInt(choice) - 1;
            if (this.savedPages[index]) {
                this.currentSite = { ...this.savedPages[index] };
                window.element.querySelector('#site-title-input').value = this.currentSite.title;
                this.updateCanvasDisplay(window);
                Desktop.showNotification('Draft Loaded', `Loaded "${this.currentSite.title}"`);
            }
        }
    },

    // Preview site
    previewSite(window) {
        const html = this.generateSiteHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Open in new window for preview
        const preview = WindowManager.createWindow({
            title: `Preview: ${this.currentSite.title}`,
            icon: '👁️',
            app: 'preview',
            width: 1000,
            height: 700,
            content: `<iframe src="${url}" style="width: 100%; height: 100%; border: none; background: white;"></iframe>`
        });
    },

    // Generate complete HTML for site
    generateSiteHTML() {
        const modulesHTML = this.currentSite.modules.map(m => this.getModuleHTML(m)).join('\n');
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.currentSite.title}</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
        }
        .site-container { 
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            min-height: 100vh;
        }
        .placed-module { margin-bottom: 2rem; }
    </style>
</head>
<body>
    <div class="site-container">
        ${modulesHTML}
    </div>
    <script>
        // Make buttons and links work in preview
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Button clicked: ' + btn.textContent);
            });
        });
    </script>
</body>
</html>`;
    },

    // GO LIVE - Publish site to aceOS network
    goLive(window) {
        if (this.currentSite.modules.length === 0) {
            Desktop.showNotification('Cannot Publish', 'Your site is empty. Add some modules first!');
            return;
        }

        if (!this.currentSite.title || this.currentSite.title === 'Untitled Site') {
            const title = prompt('Enter a title for your site:');
            if (!title) return;
            this.currentSite.title = title;
            window.element.querySelector('#site-title-input').value = title;
        }

        const confirmPublish = confirm(`Publish "${this.currentSite.title}" to the aceOS network?\n\nYour site will be available to all users in the webTrap browser directory.`);
        
        if (confirmPublish) {
            const publishedSite = {
                id: 'site_' + Date.now(),
                title: this.currentSite.title,
                url: `aceos://sites/${Date.now()}`,
                html: this.generateSiteHTML(),
                author: 'Anonymous',
                publishedAt: new Date().toISOString(),
                views: 0
            };

            this.publishedSites.push(publishedSite);
            this.savePublishedSites();
            
            Desktop.showNotification('Site Published! 🚀', `"${publishedSite.title}" is now live on the aceOS network!`, 5000);
            
            // Offer to open in webTrap
            setTimeout(() => {
                if (confirm('Site is now live! Open in webTrap browser?')) {
                    webTrap.launch();
                }
            }, 1000);
        }
    },

    // Storage methods
    loadSavedPages() {
        this.savedPages = AceStorage.load('makeTrap_drafts') || [];
    },

    savePagesToStorage() {
        AceStorage.save('makeTrap_drafts', this.savedPages);
    },

    loadPublishedSites() {
        this.publishedSites = AceStorage.load('makeTrap_published') || [];
    },

    savePublishedSites() {
        AceStorage.save('makeTrap_published', this.publishedSites);
    },

    // Get all published sites (for webTrap integration)
    getPublishedSites() {
        return this.publishedSites;
    }
};

// Export for use in other modules
window.makeTrap = makeTrap;
