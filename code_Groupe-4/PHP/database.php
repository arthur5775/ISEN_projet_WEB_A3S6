<?php

  require_once('constants.php');


  function dbConnect(){
    $dsn ='pgsql:dbname='.DB_NAME.';host='.DB_SERVER.';port='.DB_PORT;
    try{
        $dbco = new PDO($dsn,DB_USER,DB_PASSWORD);
    }catch(PDOExeption $e){
        $dbco=FALSE;
    }
    return $dbco;
}

  function db_add_arbre($dbco, $fk_nomtech, $haut_tot, $haut_tronc, $tronc_diam, $remarquable, $latitude, $longitude,
      $clc_secteur, $fk_arb_etat, $fk_stadedev, $fk_port, $fk_pied){
          try{
            
            $output=null;
            $retval=null;
          $text = 'python3 ../IA/F1F4use.py '.$haut_tot.' '. $tronc_diam. ' ../IA/centroides.csv';
            echo($text);
            exec($text, $output, $retval);
            $cluster = $output[0];
            
            //$haut_tot $tronc_diam

            $request = 'INSERT INTO arbres(fk_nomtech, haut_tot, haut_tronc, tronc_diam, remarquable, latitude, longitude,
              clc_secteur,fk_arb_etat, fk_stadedev, fk_port, fk_pied, cluster)
              VALUES(:fk_nomtech, :haut_tot, :haut_tronc, :tronc_diam, :remarquable, :latitude, :longitude, :clc_secteur,
              :fk_arb_etat, :fk_stadedev, :fk_port, :fk_pied, :cluster)';
            
            $statement = $dbco->prepare($request);
            
            $statement->bindParam(':fk_nomtech',$fk_nomtech);

            $statement->bindParam(':haut_tot',$haut_tot);

            $statement->bindParam(':haut_tronc',$haut_tronc);
            
            $statement->bindParam(':tronc_diam',$tronc_diam);
            
            $statement->bindParam(':remarquable',$remarquable);
            
            $statement->bindParam(':latitude',$latitude);
            
            $statement->bindParam(':longitude',$longitude);
            
            $statement->bindParam(':clc_secteur',$clc_secteur);
            
            $statement->bindParam(':fk_arb_etat',$fk_arb_etat);
            
            $statement->bindParam(':fk_stadedev',$fk_stadedev);
            
            $statement->bindParam(':fk_port',$fk_port);
            
            $statement->bindParam(':fk_pied',$fk_pied);

            $statement->bindParam(':cluster',$cluster);
            
            $statement->execute();
          }
          catch (PDOException $exception)
          {
            error_log('Request error: '.$exception->db_add_arbre());
            return false;
          }
          return true;
  }

  function dbGetarbre($dbco){
    try {
      $statement = $dbco->query('SELECT * FROM arbres');
      $arbre = $statement -> fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $exception)
    {
      error_log('Request error: '.$exception->dbGetarbre());
      return false;
    }
    return $arbre;
    
  }

?>