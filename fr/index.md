---
nav_exclude: true
layout: default
title: Accueil
description: Atelier pratique et progressif pour intégrer les agents GitHub Copilot personnalisés dans vos flux de travail Accelerator.
nav_order: 0
permalink: /fr/
---

<p align="center">
  <img src="../assets/branding/logo-128.png" alt="Agentic Accelerator Framework" width="100">
</p>

# Agentic Accelerator Workshop

> 🇬🇧 **[English version](../)**

Bienvenue dans l'**Agentic Accelerator Workshop** — un atelier pratique et progressif qui vous apprend à intégrer les agents GitHub Copilot personnalisés dans vos flux de travail Accelerator.

Vous configurerez des scanners de sécurité, des vérificateurs d'accessibilité, des analyseurs de qualité de code et des portes de contrôle FinOps, le tout alimenté par des agents IA qui produisent des résultats conformes à SARIF visibles dans l'onglet Sécurité de GitHub.

> [!NOTE]
> Cet atelier fait partie du [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework).

## À qui s'adresse cet atelier ?

| Public | Ce que vous apprendrez |
|---|---|
| **Développeurs** | Exécuter des analyses alimentées par l'IA depuis VS Code à l'aide des agents Copilot |
| **Ingénieurs DevOps** | Intégrer des flux de travail pilotés par des agents dans les pipelines GitHub Actions |
| **Ingénieurs en sécurité** | Comprendre la sortie SARIF et intégrer les résultats dans la gouvernance |
| **Ingénieurs de plateforme** | Étendre le framework avec des agents personnalisés pour votre organisation |

## Prérequis

Avant de commencer le Lab 00, assurez-vous de disposer des éléments suivants :

- [Visual Studio Code](https://code.visualstudio.com/) (dernière version stable)
- [Node.js](https://nodejs.org/) v20 ou ultérieur
- [Git](https://git-scm.com/) 2.40 ou ultérieur
- Un [compte GitHub](https://github.com/) avec accès à
  [GitHub Copilot](https://github.com/features/copilot)
- L'extension GitHub Copilot Chat installée dans VS Code

## Labs

| # | Lab | Durée | Niveau |
|---|-----|-------|--------|
| 00 | [Prérequis](labs/lab-00-setup.md) | 30 min | Débutant |
| 01 | [Explorer l'application exemple](labs/lab-01.md) | 25 min | Débutant |
| 02 | [Agents, compétences et instructions](labs/lab-02.md) | 20 min | Débutant |
| 03 | [Analyse de sécurité](labs/lab-03.md) | 40 min | Intermédiaire |
| 04 | [Analyse d'accessibilité](labs/lab-04.md) | 35 min | Intermédiaire |
| 05 | [Analyse de la qualité du code](labs/lab-05.md) | 35 min | Intermédiaire |
| 06 | [Comprendre la sortie SARIF](labs/lab-06.md) | 30 min | Intermédiaire |
| 07 | [Pipelines GitHub Actions](labs/lab-07.md) | 40 min | Intermédiaire |
| 08 | [Onglet Sécurité GitHub](labs/lab-08.md) | 25 min | Intermédiaire |
| 09 | [Agents FinOps](labs/lab-09.md) | 45 min | Avancé |
| 10 | [Remédiation par agent](labs/lab-10.md) | 45 min | Avancé |
| 11 | [Création d'agents personnalisés](labs/lab-11.md) | 45 min | Avancé |

## Programme de l'atelier

### Demi-journée (3 heures)

| Horaire | Activité |
|---------|----------|
| 0:00 – 0:30 | Lab 00 : Prérequis |
| 0:30 – 0:55 | Lab 01 : Explorer l'application exemple |
| 0:55 – 1:15 | Lab 02 : Agents, compétences et instructions |
| 1:15 – 1:55 | Lab 03 : Analyse de sécurité |
| 1:55 – 2:10 | Pause |
| 2:10 – 2:45 | Lab 04 : Analyse d'accessibilité |
| 2:45 – 3:00 | Lab 05 : Analyse de la qualité du code (début) |

### Journée complète (5,5 heures)

| Horaire | Activité |
|---------|----------|
| 0:00 – 0:30 | Lab 00 : Prérequis |
| 0:30 – 0:55 | Lab 01 : Explorer l'application exemple |
| 0:55 – 1:15 | Lab 02 : Agents, compétences et instructions |
| 1:15 – 1:55 | Lab 03 : Analyse de sécurité |
| 1:55 – 2:30 | Lab 04 : Analyse d'accessibilité |
| 2:30 – 2:45 | Pause |
| 2:45 – 3:20 | Lab 05 : Analyse de la qualité du code |
| 3:20 – 3:50 | Lab 06 : Comprendre la sortie SARIF |
| 3:50 – 4:30 | Lab 07 : Pipelines GitHub Actions |
| 4:30 – 4:45 | Pause |
| 4:45 – 5:10 | Lab 08 : Onglet Sécurité GitHub |

### Étendu (7,5 heures)

| Horaire | Activité |
|---------|----------|
| 0:00 – 5:10 | Labs demi-journée + journée complète (comme ci-dessus) |
| 5:10 – 5:25 | Pause |
| 5:25 – 6:10 | Lab 09 : Agents FinOps |
| 6:10 – 6:55 | Lab 10 : Remédiation par agent |
| 6:55 – 7:10 | Pause |
| 7:10 – 7:55 | Lab 11 : Création d'agents personnalisés |

## Niveaux de prestation

Choisissez le niveau qui correspond à votre emploi du temps :

| Niveau | Labs | Durée | Public |
|---|---|---|---|
| **Demi-journée** | Labs 00 – 05 | ~3 heures | Première exposition à l'analyse pilotée par des agents |
| **Journée complète** | Labs 00 – 08 | ~5,5 heures | Intégration de bout en bout dans le pipeline |
| **Étendu** | Labs 00 – 11 | ~7,5 heures | Approfondissement incluant FinOps, remédiation et agents personnalisés |

## Diagramme de dépendances des labs

![Diagramme de dépendances des labs montrant la progression du Lab 00 au Lab 11](../images/lab-dependency-diagram.png)

Les Labs 03, 04 et 05 peuvent être complétés dans n'importe quel ordre. Le Lab 09
est optionnel et ne bloque pas les labs suivants.

## Pour commencer

1. **Forkez ou utilisez ce modèle** pour créer votre propre instance de l'atelier.
2. Complétez le [Lab 00 : Prérequis](labs/lab-00-setup.md) pour configurer votre environnement.
3. Parcourez les labs dans l'ordre — chaque lab s'appuie sur le précédent.

> **Astuce** : Cet atelier est conçu pour GitHub Codespaces. Cliquez sur **Code → Codespaces → New codespace** pour obtenir un environnement préconfiguré avec tous les outils installés.

## Dépôts associés

| Dépôt | Description |
|-------|-------------|
| [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework) | Définitions d'agents, instructions, compétences et flux de travail CI/CD |
| [Accessibility Scan Workshop](https://devopsabcs-engineering.github.io/accessibility-scan-workshop/) | Atelier d'analyse d'accessibilité WCAG 2.2 |
| [FinOps Scan Workshop](https://devopsabcs-engineering.github.io/finops-scan-workshop/) | Atelier d'analyse de gouvernance des coûts Azure |
| [Code Quality Scan Workshop](https://devopsabcs-engineering.github.io/code-quality-scan-workshop/) | Atelier d'analyse de la qualité du code |

## Licence

Ce projet est sous licence [MIT License](../LICENSE).
