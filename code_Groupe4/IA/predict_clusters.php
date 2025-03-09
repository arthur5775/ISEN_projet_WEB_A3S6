<?php
// Inclusion du fichier des constantes
include('../PHP/constant.php');

// Connexion à la base de données PostgreSQL
$dsn = "pgsql:host=" . DB_SERVER . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";user=" . DB_USER . ";password=" . DB_PASSWORD;

try {
    $pdo = new PDO($dsn);
    if ($pdo) {
        //echo "Connected to the " . DB_NAME . " database successfully!<br>";
    }
} catch (PDOException $e) {
    echo $e->getMessage();
    exit;
}


// Vérifie si les paramètres haut_tot et tronc_diam sont présents dans la requête POST
if (isset($_POST['haut_tot']) && isset($_POST['tronc_diam'])) {
    // Récupère les valeurs des paramètres
    $haut_tot = floatval($_POST['haut_tot']);
    $tronc_diam = floatval($_POST['tronc_diam']);

    // Chemin vers le script Python
    $python_script = '/var/www/html/projet/IA/F1F4use.py';

    // Exécute le script Python avec les paramètres et récupère la sortie
    $command = "/var/www/html/projet/sklearn-env/bin/python {$python_script} {$haut_tot} {$tronc_diam} 2>&1";
    $output = shell_exec($command);

    // Affiche le résultat (le cluster prédit)
    echo trim($output); // Trim pour enlever les espaces éventuels autour de la sortie
} else {
    echo "Erreur : paramètres manquants.";
}

?>