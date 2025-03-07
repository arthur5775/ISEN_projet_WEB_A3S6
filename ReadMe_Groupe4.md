# ReadMe

## Participants
Groupe 4
- Arthur GROSSMANN--LE MAUGUEN
- Enzo GUILLARD
- Lucas BERCEGEAY

## Installation
extension VScode utilisée : Remote - SSH 
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh

IP du serveur : 10.30.51.124  
mot de passe du serveur SSH : Arluzo291525

Pour se connecter à la machine virtuelle en utilisant le terminal, il suffit de taper :
ssh isen@10.30.51.124 

Machine virtuelle :
Pour créer l'environnement virtuel python dans la machine virtuelle, nous tapons ceci dans le terminal:

python3 -m venv sklearn-env  
source sklearn-env/bin/activate   
pip3 install -U scikit-learn

Si venv n'est pas importé, il faut alors l'importer avec la commande suivante:   
sudo apt install python3-venv

Ensuite, nous telechargeons toutes les librairies python nécessairtes avec les commandes suivantes:  

pip install numpy  
pip install pandas  
pip install skicit-learn  
pip install pickle5  

## Architecture

```
CSS
|__ style.css
Data
|__ arbres.session.sql
|__ Data_Arbre.csv
HTML
|__ index.html
|__ add_tree.html
|__ view_tree.html
IA
|__ models
|__ __RandomForest_modem.pkl
|__ __scaler2.pkl
|__ KNeighbors_model.pkl
|__ DecisionTree_model.pkl
|__ RandomForest_model.pkl
|__ scaler.pkl
|__ encoder.pkl
|__ centroids.csv
|__ F1F4use.py
|__ F2F4use.py
|__ F3F4use.py
|__ predict_age.php
|__ predict_deracinement.php
|__ predict_age.html
|__ predict_deracinement.html
images
|__ arbre.jpg
|__ image-equipe-projet.jpg
|__ image-projet1.jpg
|__ image-projet2.jpg
|__ image-projet3.jpg
|__ ISEN.jpg
|__ linkedin.jpg
|__ stq.jpg
```

## Utilisation/ Requêtes Ajax
Ajoute un arbre et ses caractéristiques dans la base de données  

POST', '../PHP/ajout.php?request=arbres', get_arbres, 'species=' + species + '&total_height=' +
total_height +'&trunk_height=' + trunk_height + '&trunk_diameter=' +trunk_diameter + '&remarkable=' +
'&latitude=' +latitude +'&latitude=' + latitude + '&longitude=' + longitude + '&status=' + status +
'&development_stage=' + development_stage + '&port_type=' + port_type + '&foot_type=' + foot_type

\
Retourne une réponse json contenant les données des arbres

GET ../PHP/get_trees.php 

\
Affiche les clusters prédit
POST ../PHP/predict_clusters.php/trees=..

\
Affiche la réponse et met à jour la base de données avec le cluster prédit

POST ../IA/F1F4use.py/total_heigh=.. &trunk_diameter=..

## Remarque
Prediction:  
De base, nous devions envoyer une requête en appuyant sur le bouton prédire l'âge et prédire le déracinement mais nous n'avons pas réussi. L'alternative que nous avons trouvé est qu'en appuyant sur les boutons, nous sommes renvoyé sur une page html avec un formulaire que l'utilisateur doit remplir pour recevoir en retour la classe d'âge de l'arbre ou alors le déracinement  

Pour la prédiction du cluster, nous n'avons pas réussi a récupérer les arbres dans notre base de données. nous avonsdonc choisi de fixer les deux variables nécéssaires pour faire tourner notre programme dans le code javascript de notre page, il suffit donc de modifier les valeurs des varibales en durs pour prédire le cluster.
