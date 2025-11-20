//START - INCLUDES/HEADER.PHP
<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?? 'L33tOS - Feature Stubs'; ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/custom.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-3d">
        <div class="container-fluid">
            <a class="navbar-brand" href="/index.php">
                <i class="fas fa-rocket"></i> L33tOS
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/index.php"><i class="fas fa-home"></i> Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/features_registry.php"><i class="fas fa-cog"></i> Registry</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/tools/generate_feature_stubs.php"><i class="fas fa-tools"></i> Generator</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="container-fluid py-4">
//END - INCLUDES/HEADER.PHP
