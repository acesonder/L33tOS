// MediaHub - Media Streaming and Content Management for aceOS

const mediaHub = {
    mediaItems: [],
    playlists: [],
    currentPlaying: null,

    // Launch MediaHub app
    launch() {
        const content = this.createMediaUI();
        
        const window = WindowManager.createWindow({
            title: 'MediaHub - Media Center',
            icon: '🎬',
            app: 'mediaHub',
            width: 1000,
            height: 700,
            content: content
        });

        this.loadMedia();
        this.setupMediaEvents(window);
    },

    // Create media UI
    createMediaUI() {
        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                .mediahub { display: flex; height: 100%; background: var(--background-dark); }
                .media-sidebar { width: 250px; background: var(--background-medium); border-right: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; }
                .media-main { flex: 1; display: flex; flex-direction: column; }
                .media-header { padding: 1rem; background: var(--background-medium); border-bottom: 1px solid rgba(0, 255, 157, 0.2); }
                .media-content { flex: 1; overflow: auto; padding: 2rem; }
                .media-player { background: var(--background-medium); border-top: 1px solid rgba(0, 255, 157, 0.2); padding: 1rem; }
                .nav-item { padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; cursor: pointer; transition: all 0.3s; color: var(--text-secondary); }
                .nav-item:hover { background: var(--background-light); color: var(--primary-color); }
                .nav-item.active { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: var(--background-dark); }
                .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
                .media-card { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.3s; }
                .media-card:hover { transform: scale(1.05); border-color: var(--primary-color); }
                .media-thumbnail { width: 100%; height: 150px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
                .media-info { padding: 1rem; }
                .media-title { color: var(--primary-color); font-weight: bold; margin-bottom: 0.5rem; }
                .upload-btn { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none; color: var(--background-dark); padding: 0.75rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
                .player-controls { display: flex; gap: 1rem; align-items: center; justify-content: center; }
                .control-btn { background: var(--background-light); border: 1px solid rgba(0, 255, 157, 0.2); color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 1.2rem; }
            </style>
            <div class="mediahub">
                <div class="media-sidebar">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">📁 Library</h3>
                    <div class="nav-item active" data-view="all">🎬 All Media</div>
                    <div class="nav-item" data-view="videos">🎥 Videos</div>
                    <div class="nav-item" data-view="audio">🎵 Audio</div>
                    <div class="nav-item" data-view="images">🖼️ Images</div>
                    <div class="nav-item" data-view="playlists">📋 Playlists</div>
                    <button class="upload-btn" id="upload-media-btn" style="margin-top: 2rem;">➕ Add Media</button>
                </div>
                <div class="media-main">
                    <div class="media-header">
                        <h2 style="color: var(--primary-color); margin: 0;">🎬 Media Library</h2>
                    </div>
                    <div class="media-content">
                        <div class="media-grid" id="media-grid"></div>
                    </div>
                    <div class="media-player">
                        <div style="color: var(--text-secondary); text-align: center; margin-bottom: 0.5rem;" id="now-playing">No media playing</div>
                        <div class="player-controls">
                            <button class="control-btn" id="prev-btn">⏮️</button>
                            <button class="control-btn" id="play-btn">▶️</button>
                            <button class="control-btn" id="next-btn">⏭️</button>
                            <button class="control-btn" id="shuffle-btn">🔀</button>
                            <button class="control-btn" id="repeat-btn">🔁</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return container;
    },

    // Setup event handlers
    setupMediaEvents(window) {
        const uploadBtn = window.element.querySelector('#upload-media-btn');
        const navItems = window.element.querySelectorAll('.nav-item');
        const playBtn = window.element.querySelector('#play-btn');

        uploadBtn.addEventListener('click', () => {
            this.showUploadDialog();
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.filterMedia(item.dataset.view, window);
            });
        });

        playBtn.addEventListener('click', () => {
            if (this.currentPlaying) {
                Desktop.showNotification('MediaHub', 'Playing: ' + this.currentPlaying.title);
            } else {
                Desktop.showNotification('MediaHub', 'No media selected');
            }
        });

        this.refreshMediaGrid(window);
    },

    // Show upload dialog
    showUploadDialog() {
        const content = document.createElement('div');
        content.innerHTML = `
            <style>
                .upload-dialog { padding: 2rem; text-align: center; }
                .upload-area { border: 2px dashed rgba(0, 255, 157, 0.3); border-radius: 8px; padding: 3rem; cursor: pointer; transition: all 0.3s; }
                .upload-area:hover { border-color: var(--primary-color); background: rgba(0, 255, 157, 0.05); }
            </style>
            <div class="upload-dialog">
                <div class="upload-area" id="upload-area">
                    <h2 style="color: var(--primary-color);">📁 Upload Media Files</h2>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">Click or drag files here</p>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Supports: MP4, MP3, JPG, PNG, GIF</p>
                </div>
            </div>
        `;

        const window = WindowManager.createWindow({
            title: 'Upload Media',
            icon: '📤',
            app: 'upload-media',
            width: 500,
            height: 400,
            content: content
        });

        const uploadArea = content.querySelector('#upload-area');
        uploadArea.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'video/*,audio/*,image/*';
            input.onchange = (e) => {
                this.handleMediaUpload(e.target.files);
                WindowManager.closeWindow(window);
            };
            input.click();
        });
    },

    // Handle media upload
    handleMediaUpload(files) {
        Array.from(files).forEach(file => {
            const mediaItem = {
                id: 'media_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                title: file.name,
                type: file.type.split('/')[0],
                size: file.size,
                created: new Date().toISOString(),
                plays: 0
            };

            this.mediaItems.push(mediaItem);
            this.saveMedia();
        });

        Desktop.showNotification('MediaHub', `${files.length} file(s) added to library`);
        
        // Refresh main window
        const mainWindow = WindowManager.windows.find(w => w.app === 'mediaHub');
        if (mainWindow) {
            this.refreshMediaGrid(mainWindow);
        }
    },

    // Refresh media grid
    refreshMediaGrid(window) {
        const grid = window.element.querySelector('#media-grid');
        if (!grid) return;

        grid.innerHTML = '';

        // Sample media items
        const sampleMedia = [
            { id: 1, title: 'Welcome Video', type: 'video', icon: '🎥', plays: 45 },
            { id: 2, title: 'Background Music', type: 'audio', icon: '🎵', plays: 128 },
            { id: 3, title: 'Banner Image', type: 'image', icon: '🖼️', plays: 89 },
            { id: 4, title: 'Tutorial Series', type: 'video', icon: '🎬', plays: 234 },
        ];

        const allMedia = [...sampleMedia, ...this.mediaItems];

        allMedia.forEach(media => {
            const card = document.createElement('div');
            card.className = 'media-card';
            card.innerHTML = `
                <div class="media-thumbnail">${media.icon || '📄'}</div>
                <div class="media-info">
                    <div class="media-title">${media.title}</div>
                    <div style="color: var(--text-secondary); font-size: 0.85rem;">▶️ ${media.plays} plays</div>
                </div>
            `;
            card.addEventListener('click', () => {
                this.playMedia(media, window);
            });
            grid.appendChild(card);
        });
    },

    // Play media
    playMedia(media, window) {
        this.currentPlaying = media;
        const nowPlaying = window.element.querySelector('#now-playing');
        if (nowPlaying) {
            nowPlaying.textContent = `Now Playing: ${media.title}`;
            nowPlaying.style.color = 'var(--primary-color)';
        }
        media.plays++;
        this.saveMedia();
    },

    // Filter media
    filterMedia(view, window) {
        Desktop.showNotification('MediaHub', `Showing: ${view}`);
        this.refreshMediaGrid(window);
    },

    // Load media from storage
    loadMedia() {
        const saved = AceStorage.load('mediaHub_items');
        if (saved) {
            this.mediaItems = saved;
        }
    },

    // Save media to storage
    saveMedia() {
        AceStorage.save('mediaHub_items', this.mediaItems);
    }
};

window.mediaHub = mediaHub;
