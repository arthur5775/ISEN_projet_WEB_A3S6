<?php

  require_once('database.php');

  // Enable all warnings and errors.
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  // Database connection.
  $dbco = dbConnect();
  if (!$dbco){
    header('HTTP/1.1 503 Service Unavailable');
    exit;
  }

   $request = @$_GET['request'];
   if ($request == 'arbres'){
    if ($_SERVER['REQUEST_METHOD'] == 'GET'){
      $data = dbGetarbre($dbco, intval($_GET['channel_id']));
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
      $data = db_add_arbre($dbco, $_POST['fk_nomtech'], $_POST['haut_tot'], $_POST['haut_tronc'], $_POST['tronc_diam'],
      $_POST['remarquable'], $_POST['latitude'], $_POST['longitude'], $_POST['clc_secteur'], $_POST['fk_arb_etat'],
      $_POST['fk_stadedev'], $_POST['fk_port'], $_POST['fk_pied']);
    }
  }
  // Send response to the client.
  if (isset($data)){
    switch (@$_GET['type'])
    {
      case 'html':
        header('Content-Type: text/html; charset=utf-8');
        echo '<h1><u>DonnÃ©es au format HTML</u></h1><hr>';
        echo '<table border="1">';
        foreach (array_keys($data[0]) as $key)
          echo '<th>'.$key.'</th>';
        foreach ($data as $line)
        {
          echo '<tr>';
          foreach (array_values($line) as $value)
            echo '<td>'.$value.'</td>';
          echo '</tr>';
        }
        echo '</table>';
        break;
      case 'csv':
        header('Content-Type: text/plain; charset=utf-8');
        echo implode(',', array_keys($data[0])).PHP_EOL;
        foreach ($data as $line)
          echo implode(',', array_values($line)).PHP_EOL;
        break;
      default:
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-control: no-store, no-cache, must-revalidate');
        header('Pragma: no-cache');
        header('HTTP/1.1 200 OK');
        echo json_encode($data);
    }
  }
  else
    header('HTTP/1.1 400 Bad Request');
  exit;
?>