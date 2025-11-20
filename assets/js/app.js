// L33tOS Feature Stubs - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('L33tOS Feature Stubs Platform loaded');
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Feature toggle handling
    const toggleSwitches = document.querySelectorAll('.feature-toggle');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const featureId = this.dataset.featureId;
            const enabled = this.checked;
            
            // Send AJAX request to update toggle
            updateFeatureToggle(featureId, enabled);
        });
    });
    
    // Add click animations to cards
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger on button clicks
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                return;
            }
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});

// Update feature toggle via AJAX
function updateFeatureToggle(featureId, enabled) {
    const data = {
        feature_id: featureId,
        enabled: enabled ? 1 : 0
    };
    
    fetch('/admin/features_registry.php?action=toggle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Feature toggle updated successfully', 'success');
        } else {
            showNotification('Failed to update toggle: ' + (data.message || 'Unknown error'), 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Network error occurred', 'danger');
    });
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Create toast element
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Initialize and show toast
    if (typeof bootstrap !== 'undefined') {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove after hiding
        toast.addEventListener('hidden.bs.toast', function() {
            toast.remove();
        });
    }
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Feature demo modal
function showFeatureDemo(featureId, featureTitle) {
    const modalHtml = `
        <div class="modal fade" id="featureDemoModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-play-circle"></i> ${featureTitle} - Demo
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="feature-demo">
                            <h5>Feature #${featureId} Demo</h5>
                            <p>This is a placeholder demo for <strong>${featureTitle}</strong>.</p>
                            <p>Implement the actual functionality here when developing this feature.</p>
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle"></i> 
                                This is a stub. No actual functionality has been implemented yet.
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="alert('Feature not implemented yet')">
                            <i class="fas fa-code"></i> View Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('featureDemoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    if (typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(document.getElementById('featureDemoModal'));
        modal.show();
        
        // Clean up after modal is hidden
        document.getElementById('featureDemoModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
