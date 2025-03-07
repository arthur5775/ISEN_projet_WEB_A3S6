import sys
import pickle
import json
import numpy as np
import pandas as pd

def get_age_range(prediction):
    age_ranges = {
        1: "0 à 20 ans",
        2: "20 à 40 ans",
        3: "40 à 60 ans",
        4: "60 à 80 ans",
        5: "80 à 100 ans",
        6: "plus de 100 ans"
    }
    return age_ranges.get(prediction, "Classe inconnue")

def age(method, haut_tot, haut_tronc, tronc_diam, fk_stadedev):
    # Load the model
    with open(f'{method}_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    # Load the encoder
    with open('encoder.pkl', 'rb') as f:
        encoder = pickle.load(f)
    
    # Load the scaler
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    # Vérification de la valeur fk_stadedev
    valeur_colonne = ['Jeune', 'Adulte', 'Vieux', 'senescent']
    if fk_stadedev not in valeur_colonne:
        raise ValueError(f"La valeur de fk_stadedev doit être parmi {valeur_colonne}.")
    
    # Création du tableau avec les données des arbres
    arbre = np.array([[float(haut_tot), float(haut_tronc), float(tronc_diam)]])
    
    # Création du DataFrame pour l'encodage de fk_stadedev
    col_cat = pd.DataFrame({'fk_stadedev': [fk_stadedev]})
    
    # Encodage de la variable catégorielle fk_stadedev
    fk_stadedev_encode = encoder.transform(col_cat[['fk_stadedev']])
    
    # Concaténation de fk_stadedev_encoded avec arbre
    arbre_encode = np.hstack((arbre, fk_stadedev_encode))
    
    # Standardisation des données de l'arbre
    arbre_scaled = scaler.transform(arbre_encode)
    
    # Prédiction
    pred = model.predict(arbre_scaled)
    return int(pred[0]), get_age_range(int(pred[0]))

if __name__ == "__main__":
    # Récupération des arguments de la ligne de commande
    if len(sys.argv) != 6:
        print("python F2F4use.py method haut_tot haut_tronc tronc_diam fk_stadedev")
        sys.exit(1)
    
    method = sys.argv[1]
    haut_tot = sys.argv[2]
    haut_tronc = sys.argv[3]
    tronc_diam = sys.argv[4]
    fk_stadedev = sys.argv[5]
    
    # Appel de la fonction age avec les arguments de la ligne de commande
    try:
        prediction, age_range = age(method, haut_tot, haut_tronc, tronc_diam, fk_stadedev)
        print(f"Classe d'âge prédite: {prediction} ({age_range})")
        
        # Enregistrement de la prédiction dans un fichier JSON
        result = {
            "classe_predite": prediction,
            "intervalle_age": age_range
        }
        with open('class_age.json', 'w') as json_file:
            json.dump(result, json_file)
            
    except ValueError as e:
        print(e)
        sys.exit(1)