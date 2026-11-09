# Damned Bastard Chess — Plateaux, décors et obstacles

Document de référence pour les visuels et les règles liées au plateau.
Dernière mise à jour : 9 novembre 2026.

---

## 1. Plateaux

- Grille **8 x 8**, vue **isométrique** (caméra environ 45°), plateau vide.
- Rendu réaliste et texturé, éclairage doux venant du haut à gauche.
- Chaque plateau alterne deux teintes de cases adaptées au décor.

| Thème | Fichier | Cases claires / foncées |
|---|---|---|
| Mer | `plateau_mer_iso.png` | bois clair / bois sombre |
| Forêt | `plateau_foret_iso.png` | pierre moussue / terre |
| Volcan | `plateau_volcan_iso.png` | roche noire / lave |
| Montagne | `plateau_montagne_iso.png` | granit clair / roche sombre |
| Neige | `plateau_neige_iso.png` | glace claire / pierre gelée |
| Désert | `plateau_desert_iso.png` | grès clair / terre sombre |
| Ruines | `plateau_ruines_iso.png` | marbre moussu / terre |
| Marais | `plateau_marais_iso.png` | planches / terre et mousse |
| Ciel | `plateau_ciel_iso.png` | marbre blanc / marbre bleu |

### À prévoir
- Une **vue de dessus** par plateau (grille 8x8 alignée) pour placer les cases, les portées et les obstacles.
- Un cadrage avec **marge** autour du plateau (certains coins touchent le bord de l'image).
- Forêt, ruines et marais ont une palette proche : changer la teinte d'une case sur l'un des trois.
- Volcan : décider si les cases de lave sont purement visuelles ou ont un effet en jeu.

---

## 2. Règle des obstacles

> Un obstacle posé sur une case s'écroule dès qu'il est touché par une attaque à portée ou par une compétence à distance. Il est détruit immédiatement, sans points de vie, et la case redevient libre. Détruire un obstacle compte comme une attaque normale, donc comme l'une des 2 attaques de la pièce par tour.

- Un obstacle est une cible valide, comme une pièce ennemie.
- Les compétences de zone détruisent tous les obstacles dans leur rayon.
- Les débris restent à l'écran mais ne bloquent pas la case.
- Pas de points de vie, pas de différence de solidité entre un buisson et un rocher.

### Décors hors plateau (hors des cases)
Arbres debout, falaises, piliers, torches, stalagmites, cristaux autour du terrain.
- Versions indestructibles et versions destructibles (fissurées, branches cassées).
- Proposition : les destructibles ne réagissent qu'aux **compétences de zone**.

### Points encore ouverts
- La pièce qui abat un obstacle reste sur sa case (défaut) ou peut avancer sur la case libérée ?
- Un obstacle bloque-t-il aussi la vue, ou seulement la case ?

---

## 3. Obstacles par thème

Chaque objet existe en **3 états** :

| État | Usage | Description |
|---|---|---|
| `intact` | jeu | objet entier |
| `chute` | animation | fissuré, penché, éclats qui se détachent |
| `detruit` | jeu | débris bas et plats, tenant dans une case, sans bloquer |

| Thème | Objets |
|---|---|
| Forêt | arbre, souche, rocher, tronc couché, buisson, statue, pilier, torche, cristaux |
| Volcan | rocher de lave, stalagmite de basalte, cristal de feu, colonne noircie, brasero |
| Mer | caisse, tonneau, mât brisé, rocher couvert de coquillages, filet |
| Neige | bloc de glace, sapin enneigé, rocher gelé, statue de givre |
| Désert | cactus, colonne ensablée, rocher de grès, ossements |
| Ruines | colonne, arche brisée, statue, bloc gravé |
| Marais | arbre mort, souche, tronc couvert de mousse, racines |
| Ciel | colonne de marbre, statue ailée, nuage solidifié, cristal |
| Montagne | rocher, pin, bloc de granit, cairn |

### Avancement
- **Forêt** : 27 images sans socle (9 objets x 3 états) et 18 images avec socle (tronc, statue, arbre, souche, rocher, buisson) découpées. Résolution faible (100 à 300 px de large) : à regénérer en grand format.
- Autres thèmes : à générer.

---

## 4. Spécifications des fichiers

- Format **PNG**, fond **transparent** (à défaut, fond uni magenta `#FF00FF` retiré ensuite).
- Objet seul, **sans socle**, sans bordure de pierre ni carré de terre.
- Base de l'objet dans **une case**, hauteur libre.
- Même échelle et même angle pour tous les objets d'un thème.
- Résolution cible : **2048 x 2048 px**, objet occupant environ 80 % de l'image.
- Nommage : `theme_objet_etat.png`, par exemple `foret_arbre_chute.png`, `volcan_rocher_detruit.png`.
- Fichiers avec socle : `foret_socle_<objet>_<etat>.png`.

---

## 5. Prompt ChatGPT (génération en série)

À utiliser avec une image de référence réaliste jointe. Remplacer `THÈME` et `OBJETS` selon la section 3.

```
Tu es mon assistant de production d'assets pour un jeu d'échecs fantasy en vue isométrique (Damned Bastard Chess).

Je te joins une image de référence : reproduis EXACTEMENT son style (rendu réaliste et texturé, éclairage doux venant du haut à gauche, angle isométrique d'environ 45°, mêmes proportions). Pas de style cartoon, pas de contours épais.

MÉTHODE : génère UNE image par fichier, jamais de planche ni de grille. Enchaîne les images sans attendre mon accord, objet par objet. Après chaque image, indique son nom de fichier.

RÈGLES POUR CHAQUE IMAGE
- Un seul objet, centré, entier, sans partie coupée par le bord
- Fond transparent (PNG). Si la transparence est impossible, fond uni magenta pur #FF00FF, sans ombre portée, sans dégradé, sans sol
- Objet seul : pas de socle, pas de bordure de pierre, pas de carré de terre, pas de personnage, pas de texte
- La base de l'objet tient dans une case de plateau, il peut être haut
- Même échelle et même angle pour toutes les images
- Haute résolution, 2048 x 2048 px, objet occupant environ 80 % de l'image

3 ÉTATS POUR CHAQUE OBJET
1. intact
2. chute : fissuré, penché ou éclaté, avec des dégâts très visibles (clairement différent de l'intact)
3. detruit : débris bas et plats posés au sol, qui tiennent dans une case et ne bloquent pas le passage. Aucun morceau debout, aucun morceau plus long qu'une case

NOMMAGE : theme_objet_etat.png (exemple : foret_arbre_chute.png)

THÈME : FORÊT
OBJETS (dans cet ordre) : arbre, souche, rocher, tronc couché, buisson, statue, pilier, torche, cristaux

Commence par l'arbre, puis enchaîne.
```

---

## 6. Rappel système de jeu lié au plateau

- Mana commun à l'équipe : +1 point par tour, investi dans la compétence d'une pièce (coût 1 à 4 points, avec temps de recharge).
- Pas de statistique de déplacement : c'est un jeu d'échecs augmenté.
- Seules les **armes** modifient les pièces. L'équipement est un **skin** visuel.
