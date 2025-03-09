<?php
// Récupérer les données soumises via POST
$method = $_POST['method'];
$haut_tot = $_POST['haut_tot'];
$haut_tronc = $_POST['haut_tronc'];
$tronc_diam = $_POST['tronc_diam'];
$fk_stadedev = $_POST['fk_stadedev'];

// Commande pour exécuter le script Python avec les arguments
$command = escapeshellcmd("/var/www/html/projet/sklearn-env/bin/python3 /var/www/html/projet/IA/F2F4use.py $method $haut_tot $haut_tronc $tronc_diam $fk_stadedev");

// Exécution de la commande et récupération de la sortie
$output = shell_exec($command);

// Afficher le résultat de la prédiction
echo "<h2>Résultat de la prédiction</h2>";
echo "<p>$output</p>";
?>