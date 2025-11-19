//START - ADMIN/FEATURES_REGISTRY.PHP
<?php
require_once __DIR__ . '/../config.php';
$pageTitle = 'Features Registry';
include __DIR__ . '/../includes/header.php';

// Load feature toggles
$toggles = loadFeatureToggles();

// Scan features directory
$featuresDir = __DIR__ . '/../features';
$featureFiles = glob($featuresDir . '/feature_*.php');
sort($featureFiles);

// Organize by category
$categories = [
    'Core System' => ['range' => [1, 25], 'icon' => 'fa-server', 'color' => 'primary'],
    'webTrap Browser' => ['range' => [26, 50], 'icon' => 'fa-globe', 'color' => 'success'],
    'Marketplace Hosting' => ['range' => [51, 75], 'icon' => 'fa-store', 'color' => 'info'],
    'Make+Trap Website Builder' => ['range' => [76, 100], 'icon' => 'fa-paint-brush', 'color' => 'warning'],
    'chatTrap' => ['range' => [101, 125], 'icon' => 'fa-comments', 'color' => 'danger'],
    'mailTrap' => ['range' => [126, 150], 'icon' => 'fa-envelope', 'color' => 'secondary'],
    'BankTrap' => ['range' => [151, 175], 'icon' => 'fa-piggy-bank', 'color' => 'primary'],
    'crapTrap' => ['range' => [176, 200], 'icon' => 'fa-tools', 'color' => 'dark']
];
?>

<!-- Header -->
<div class="row mb-4">
    <div class="col-12">
        <div class="card card-3d bg-gradient-dark text-white">
            <div class="card-body">
                <h1 class="display-5 fw-bold">
                    <i class="fas fa-list me-3"></i>Feature Registry
                </h1>
                <p class="lead mb-0">
                    Manage and toggle features across all categories
                </p>
            </div>
        </div>
    </div>
</div>

<!-- Statistics -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card card-3d">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-file-code me-2"></i>Total Features
                </h5>
                <div class="display-4 text-primary fw-bold"><?php echo count($featureFiles); ?></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card card-3d">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-check-circle me-2"></i>Enabled
                </h5>
                <div class="display-4 text-success fw-bold">
                    <?php echo count(array_filter($toggles)); ?>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card card-3d">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-times-circle me-2"></i>Disabled
                </h5>
                <div class="display-4 text-danger fw-bold">
                    <?php echo count($featureFiles) - count(array_filter($toggles)); ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Bulk Actions -->
<div class="row mb-4">
    <div class="col-12">
        <div class="card card-3d">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-bolt me-2"></i>Bulk Actions
                </h5>
                <button class="btn btn-success btn-3d" onclick="bulkToggle(true)">
                    <i class="fas fa-check-double me-2"></i>Enable All
                </button>
                <button class="btn btn-danger btn-3d" onclick="bulkToggle(false)">
                    <i class="fas fa-ban me-2"></i>Disable All
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Features by Category -->
<?php foreach ($categories as $categoryName => $categoryInfo): ?>
    <?php
    $rangeStart = $categoryInfo['range'][0];
    $rangeEnd = $categoryInfo['range'][1];
    $categoryFeatures = [];
    
    foreach ($featureFiles as $file) {
        if (preg_match('/feature_(\d+)\.php$/', basename($file), $matches)) {
            $num = (int)$matches[1];
            if ($num >= $rangeStart && $num <= $rangeEnd) {
                $categoryFeatures[] = ['file' => $file, 'num' => $num];
            }
        }
    }
    
    if (empty($categoryFeatures)) continue;
    ?>
    
    <div class="row mb-4">
        <div class="col-12">
            <div class="card card-3d">
                <div class="card-header bg-<?php echo $categoryInfo['color']; ?> text-white">
                    <h5 class="mb-0">
                        <i class="fas <?php echo $categoryInfo['icon']; ?> me-2"></i>
                        <?php echo $categoryName; ?>
                        <span class="badge bg-light text-dark float-end">
                            <?php echo count($categoryFeatures); ?> features
                        </span>
                    </h5>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <?php foreach ($categoryFeatures as $feature): ?>
                            <?php
                            $num = $feature['num'];
                            $numPadded = str_pad($num, 4, '0', STR_PAD_LEFT);
                            $featureId = "feature_{$numPadded}";
                            $isEnabled = isset($toggles[$featureId]) && $toggles[$featureId];
                            ?>
                            <div class="col-md-3 col-sm-6">
                                <div class="card feature-card h-100">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-start mb-2">
                                            <h6 class="mb-0">Feature <?php echo $numPadded; ?></h6>
                                            <div class="form-check form-switch">
                                                <input 
                                                    class="form-check-input feature-toggle" 
                                                    type="checkbox" 
                                                    id="toggle_<?php echo $featureId; ?>"
                                                    data-feature-id="<?php echo $featureId; ?>"
                                                    <?php echo $isEnabled ? 'checked' : ''; ?>
                                                    onchange="toggleFeature('<?php echo $featureId; ?>', this.checked)">
                                            </div>
                                        </div>
                                        <div class="text-muted small mb-2">
                                            <?php echo $categoryName; ?>
                                        </div>
                                        <a href="/features/feature_<?php echo $numPadded; ?>.php" 
                                           class="btn btn-sm btn-outline-primary w-100">
                                            <i class="fas fa-eye me-1"></i>View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endforeach; ?>

<!-- Back Button -->
<div class="row">
    <div class="col-12">
        <a href="/index.php" class="btn btn-primary btn-3d">
            <i class="fas fa-arrow-left me-2"></i>Back to Dashboard
        </a>
    </div>
</div>

<script>
// Toggle individual feature
function toggleFeature(featureId, enabled) {
    fetch('/admin/toggle_feature.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feature_id: featureId,
            enabled: enabled
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success feedback
            const toggle = document.getElementById('toggle_' + featureId);
            if (toggle) {
                toggle.parentElement.classList.add('success-flash');
                setTimeout(() => {
                    toggle.parentElement.classList.remove('success-flash');
                }, 500);
            }
        } else {
            alert('Failed to toggle feature: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to toggle feature');
    });
}

// Bulk toggle all features
function bulkToggle(enabled) {
    const toggles = document.querySelectorAll('.feature-toggle');
    const promises = [];
    
    toggles.forEach(toggle => {
        const featureId = toggle.dataset.featureId;
        toggle.checked = enabled;
        
        promises.push(
            fetch('/admin/toggle_feature.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    feature_id: featureId,
                    enabled: enabled
                })
            })
        );
    });
    
    Promise.all(promises)
        .then(() => {
            alert('All features ' + (enabled ? 'enabled' : 'disabled'));
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Some features failed to toggle');
        });
}
</script>

<?php include __DIR__ . '/../includes/footer.php'; ?>
//END - ADMIN/FEATURES_REGISTRY.PHP
