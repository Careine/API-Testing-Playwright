# Projet Playwright

Ce projet utilise [Playwright](https://playwright.dev/) pour automatiser les tests de bout en bout dans des environnements de navigateurs modernes (Chrome, Firefox, WebKit, etc.).

## Prérequis

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou plus récente)
- [npm](https://www.npmjs.com/)

## Installation

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Careine/API-Testing-Playwright.git
   cd API-Testing-Playwright

2. Installez les dépendances nécessaires avec npm ou yarn :

   ```bash
   npm install

4. Installez les navigateurs pris en charge par Playwright :
   ```bash
   npx playwright install

5. Installez faker pour générer de données de test aléatoires 
  ```bash
  npm install --save-dev @faker-js/faker
 ```
## Utilisation

### Lancer les tests
   ```bash
   npx playwright test
   ```
#### Pour exécuter les tests avec un navigateur spécifique :
   ```bash
   npx playwright test --browser=chromium
   npx playwright test --browser=firefox
   npx playwright test --browser=webkit
   ```
### Ouvrir le rapport des tests
 ```bash
npx playwright show-report
```
### Lancer en mode headless ou non-headles
Par défaut, les tests s'exécutent en mode headless (sans interface graphique). Pour exécuter en mode avec interface graphique (non-headless), ajoutez l'option --headed :
   ```bash
   npx playwright test --headed
   ```
## Structure du projet
 ```bash
   API-TESTING-PLAYWRIGHT/
   │
   ├── tests/                     # Contient les fichiers de tests
   │   ├── apiTesting.spec.js         # Exemple de fichier de test
   │
   ├── fixtures/                   # Contient les fixtures pour réutilisation dans les tests
   │   └── faker.js        # Fixtures spécifiques au projet
   │
   │
   ├── playwright-report/                    # Rapport des tests (généré automatiquement après chaque exécution)
   │   └── index.html              # Rapport interactif Playwright
   │
   ├── playwright.config.js        # Fichier de configuration de Playwright
   │
   ├── package.json                # Dépendances et scripts du projet
   │
   │
   ├── .gitignore                  # Fichier pour ignorer les fichiers dans Git
   │
   └── README.md                   # Documentation du projet
   ```

 
