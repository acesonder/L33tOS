//START - INDEX.PHP
<?php
require_once __DIR__ . '/config.php';
$pageTitle = 'L33tOS Dashboard';
include __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<div class="row mb-4">
    <div class="col-12">
        <div class="card card-3d bg-gradient-primary text-white">
            <div class="card-body p-5">
                <h1 class="display-4 fw-bold mb-3">
                    <i class="fas fa-rocket me-3"></i>Welcome to L33tOS Feature Manager
                </h1>
                <p class="lead mb-4">
                    A powerful PHP-based feature management system with 200 feature stubs,
                    dynamic toggles, and a beautiful Bootstrap 5 interface.
                </p>
                <div class="d-flex gap-3 flex-wrap">
                    <a href="/tools/generate_feature_stubs.php" class="btn btn-light btn-lg btn-3d">
                        <i class="fas fa-play-circle me-2"></i>Run Generator
                    </a>
                    <a href="/admin/features_registry.php" class="btn btn-outline-light btn-lg btn-3d">
                        <i class="fas fa-list me-2"></i>View Features
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Status Cards -->
<div class="row g-4 mb-4">
    <!-- Database Status -->
    <div class="col-md-4">
        <div class="card card-3d h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-database me-2"></i>Database Status
                </h5>
                <?php if ($DB_AVAILABLE): ?>
                    <div class="alert alert-success mb-0">
                        <i class="fas fa-check-circle me-2"></i>Connected
                        <div class="small mt-1">
                            Host: <?php echo htmlspecialchars(DB_HOST); ?><br>
                            Database: <?php echo htmlspecialchars(DB_NAME); ?>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="alert alert-warning mb-0">
                        <i class="fas fa-exclamation-triangle me-2"></i>Not Connected
                        <div class="small mt-1">
                            Using file-based storage as fallback
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    
    <!-- Features Count -->
    <div class="col-md-4">
        <div class="card card-3d h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-code-branch me-2"></i>Feature Stubs
                </h5>
                <?php
                $featureFiles = glob(__DIR__ . '/features/feature_*.php');
                $featureCount = count($featureFiles);
                ?>
                <div class="display-4 text-primary fw-bold"><?php echo $featureCount; ?></div>
                <div class="text-muted">
                    <?php if ($featureCount < 200): ?>
                        <i class="fas fa-info-circle me-1"></i>Run generator to create all 200 features
                    <?php else: ?>
                        <i class="fas fa-check-circle me-1"></i>All features generated
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Toggle Status -->
    <div class="col-md-4">
        <div class="card card-3d h-100">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-toggle-on me-2"></i>Active Toggles
                </h5>
                <?php
                $toggles = loadFeatureToggles();
                $enabledCount = count(array_filter($toggles));
                ?>
                <div class="display-4 text-success fw-bold"><?php echo $enabledCount; ?></div>
                <div class="text-muted">
                    <i class="fas fa-info-circle me-1"></i>Features currently enabled
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Quick Actions -->
<div class="row g-4 mb-4">
    <div class="col-12">
        <div class="card card-3d">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">
                    <i class="fas fa-bolt me-2"></i>Quick Actions
                </h5>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <a href="/tools/generate_feature_stubs.php" class="btn btn-primary btn-3d w-100">
                            <i class="fas fa-cog fa-2x d-block mb-2"></i>
                            Generate Features
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="/admin/features_registry.php" class="btn btn-success btn-3d w-100">
                            <i class="fas fa-list fa-2x d-block mb-2"></i>
                            Feature Registry
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="/features/feature_0001.php" class="btn btn-info btn-3d w-100">
                            <i class="fas fa-file-code fa-2x d-block mb-2"></i>
                            View Sample
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="/db/init_schema.sql" class="btn btn-secondary btn-3d w-100" target="_blank">
                            <i class="fas fa-database fa-2x d-block mb-2"></i>
                            Database Schema
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Feature Categories Preview -->
<div class="row">
    <div class="col-12">
        <div class="card card-3d">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">
                    <i class="fas fa-layer-group me-2"></i>Feature Categories (8 Categories)
                </h5>
            </div>
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-server fa-2x text-primary mb-2"></i>
                            <h6>Core System</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-globe fa-2x text-success mb-2"></i>
                            <h6>webTrap Browser</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-store fa-2x text-info mb-2"></i>
                            <h6>Marketplace Hosting</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-paint-brush fa-2x text-warning mb-2"></i>
                            <h6>Make+Trap Builder</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-comments fa-2x text-danger mb-2"></i>
                            <h6>chatTrap</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-envelope fa-2x text-secondary mb-2"></i>
                            <h6>mailTrap</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-piggy-bank fa-2x text-primary mb-2"></i>
                            <h6>BankTrap</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="feature-category">
                            <i class="fas fa-tools fa-2x text-dark mb-2"></i>
                            <h6>crapTrap</h6>
                            <p class="small text-muted mb-0">25 features</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Security Warning -->
<div class="row mt-4">
    <div class="col-12">
        <div class="alert alert-warning card-3d">
            <h5 class="alert-heading">
                <i class="fas fa-exclamation-triangle me-2"></i>Security Warning
            </h5>
            <p class="mb-0">
                This system is using <strong>insecure default database credentials</strong> 
                (root with blank password). This is acceptable for local development only.
                <br><br>
                <strong>For production:</strong> Create a <code>.env</code> file based on 
                <code>.env.example</code> and configure secure database credentials.
            </p>
        </div>
    </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
//END - INDEX.PHP
