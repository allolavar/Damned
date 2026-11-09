# Damned Bastard Chess (Kingout)

Jeu d'échecs augmenté en fantasy, inspiré du manga *Damned Bastard*. Les pièces ont des classes, des compétences et un mana partagé, sur des plateaux 8 x 8 en vue isométrique.

## Principes du jeu

- Jeu d'échecs : les déplacements sont ceux des échecs (pas de statistique de vitesse).
- **Mana commun** à l'équipe : +1 point par tour, à investir dans la compétence d'une pièce (coût 1 à 4 points, avec temps de recharge).
- **Armes** : seule modification possible d'une pièce. L'équipement (armure, tenue) est un **skin** visuel.
- Chaque pièce peut attaquer 2 fois par tour au maximum.
- **Obstacles** sur le plateau : ils s'écroulent dès qu'ils sont touchés (voir `docs/DECORS_ET_OBSTACLES.md`).

## Contenu du dépôt

```
README.md
docs/
  CLASSES.md                  13 classes et sous-classes
  STATS_DE_BASE.md            6 statistiques de base
  DECORS_ET_OBSTACLES.md      plateaux, règle des obstacles, prompt ChatGPT
  STATUT_GDD.md               ce qui est défini et ce qui reste à décider
prototype/
  index.html                  prototype jouable (ouvrir dans un navigateur)
  board.jpg, forest.jpg       images de fond utilisées par la page
assets/
  plateaux/                   plateau_<theme>_iso.png (9 fichiers)
  obstacles/
    foret/                    foret_<objet>_<etat>.png (27 fichiers, sans socle)
    foret_avec_socle/         foret_socle_<objet>_<etat>.png (18 fichiers)
```

## Prototype jouable

`prototype/index.html` : plateau d'échecs fantasy jouable (contre l'IA ou à deux), avec PV, ATK, mana, niveaux, orientation des pièces (+50 % de dégâts dans le dos) et une compétence par type de pièce. Ouvrir le fichier dans un navigateur, en gardant `board.jpg` et `forest.jpg` dans le même dossier.

Pas encore dedans : classes, races, équipements, cartes, arbre complet des compétences.

## Où ranger les images

| Nom du fichier | Dossier |
|---|---|
| `plateau_*.png` | `assets/plateaux/` |
| `foret_socle_*.png` | `assets/obstacles/foret_avec_socle/` |
| `foret_*.png` (sans `socle`) | `assets/obstacles/foret/` |

## Thèmes de plateau

Mer, forêt, volcan, montagne, neige, désert, ruines, marais, ciel.
