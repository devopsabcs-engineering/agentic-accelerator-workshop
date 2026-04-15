---
nav_exclude: true
permalink: /fr/labs/lab-02
title: "Lab 02 - Comprendre les agents, les skills et les instructions"
description: "Distinguer les agents, les skills, les instructions et les prompts. Apprendre les modèles de conception orchestrateur et détecteur/résolveur."
---

## Aperçu

| | |
|---|---|
| **Durée** | 20 minutes |
| **Niveau** | Débutant |
| **Prérequis** | [Lab 01](lab-01.md) |

## Objectifs d'apprentissage

À la fin de ce lab, vous serez en mesure de :

* Distinguer les agents, les skills, les instructions et les prompts
* Lire le frontmatter YAML d'un agent et comprendre sa configuration
* Comprendre le modèle d'orchestrateur et de délégation aux sous-agents
* Comprendre le modèle de transfert détecteur/résolveur

## Exercices

### Exercice 2.1 : Examiner un fichier d'agent

Ouvrez `.github/agents/security-reviewer-agent.agent.md` dans VS Code et étudiez sa structure.

Chaque fichier d'agent comporte deux parties :

1. **Le frontmatter YAML** (entre les délimiteurs `---` en haut) contenant les métadonnées lisibles par la machine.
2. **Le corps Markdown** contenant le persona de l'agent, ses responsabilités et le format de sortie.

Examinez les champs du frontmatter :

```yaml
name: SecurityReviewerAgent
description: "Security-focused code reviewer that detects OWASP Top 10 vulnerabilities..."
model: Claude Sonnet 4.5 (copilot)
tools:
  - read/readFile
  - search/textSearch
  # ... more tools
```

Notez ces champs importants :

* `name` identifie l'agent lors des transferts et dans Copilot Chat.
* `description` indique à Copilot quand invoquer cet agent.
* `tools` liste les capacités VS Code que l'agent peut utiliser.
* `handoffs` (lorsqu'il est présent) définit les autres agents auxquels cet agent peut déléguer.

Faites défiler jusqu'au corps Markdown et notez l'exigence de sortie SARIF ainsi que la liste de contrôle OWASP Top 10 qui guide l'examen de l'agent.

![Fichier d'agent avec le frontmatter YAML mis en évidence](../../images/lab-02/lab-02-agent-file-frontmatter.png)

### Exercice 2.2 : Explorer les modèles d'agents

Le framework utilise deux modèles de conception pour organiser les agents. Ouvrez les fichiers ci-dessous et identifiez quel modèle chacun utilise.

**Modèle 1 : Orchestrateur avec sous-agents**

Ouvrez `.github/agents/security-agent.agent.md`. Remarquez la section `handoffs` dans son frontmatter :

```yaml
handoffs:
  - label: "Review Application Code"
    agent: SecurityReviewerAgent
  - label: "Review CI/CD Pipelines"
    agent: PipelineSecurityAgent
  - label: "Review Infrastructure Code"
    agent: IaCSecurityAgent
```

Le Security Agent agit comme un orchestrateur. Il n'effectue pas d'analyse approfondie lui-même. Au lieu de cela, il délègue à trois sous-agents spécialisés en fonction du type de code examiné.

**Modèle 2 : Paire détecteur et résolveur**

Ouvrez `.github/agents/a11y-detector.agent.md`. Remarquez son transfert :

```yaml
handoffs:
  - label: "🔧 Fix Accessibility Issues"
    agent: A11yResolver
```

Le A11y Detector identifie les violations d'accessibilité et produit un rapport. Il propose ensuite un transfert vers le A11y Resolver, qui lit le rapport et applique les corrections de code. Le Resolver peut retransférer vers le Detector pour vérification.

Cela crée un cycle de détection → correction → vérification.

### Exercice 2.3 : Explorer les skills, instructions et prompts

Le framework dispose de trois types d'artefacts de support au-delà des agents. Ouvrez un exemple de chacun :

1. **Skill** — Ouvrez `.github/skills/security-scan/SKILL.md`.
   Un skill est un paquet de connaissances de domaine. Les agents chargent les skills lorsqu'ils ont besoin d'un contexte approfondi sur un sujet (catégories OWASP, correspondances CWE, classification de sévérité). Les skills sont invoqués à la demande, pas toujours actifs.

2. **Instruction** — Ouvrez `.github/instructions/code-quality.instructions.md`.
   Un fichier d'instruction contient des règles permanentes. Le glob `applyTo` dans son frontmatter (`**/*.ts,**/*.js,...`) indique à Copilot d'appliquer ces règles automatiquement chaque fois que des fichiers correspondants sont modifiés. Les instructions n'ont pas besoin d'être invoquées ; elles sont actives par défaut.

3. **Prompt** — Ouvrez `.github/prompts/a11y-scan.prompt.md`.
   Un prompt est un modèle réutilisable invoqué à la demande. Il spécifie un `agent` pour traiter la requête et définit des variables d'entrée (`${input:url}`, `${input:component}`). Les prompts standardisent la façon dont vous demandez aux agents d'effectuer des tâches courantes.

Voici comment les quatre types d'artefacts sont liés :

| Artefact | Activation | Objectif |
|---|---|---|
| Agent | Invoqué via `@agent-name` dans Copilot Chat | Effectue l'analyse, prend des décisions, produit des résultats |
| Skill | Chargé par un agent lorsqu'il a besoin de connaissances de domaine | Fournit des données de référence et des procédures |
| Instruction | Toujours actif en fonction des modèles de fichiers `applyTo` | Applique automatiquement les règles et les standards |
| Prompt | Invoqué à la demande comme modèle de conversation | Standardise les requêtes courantes avec des variables d'entrée |

![Diagramme montrant la relation entre agents/skills/instructions/prompts](../../images/lab-02/lab-02-domain-diagram.png)

### Exercice 2.4 : Comprendre les modèles de transfert

Deux chaînes de transfert sont centrales dans ce framework. Tracez chacune d'elles à l'aide des fichiers d'agents.

**Chaîne 1 : Accessibilité — Détecter, corriger, vérifier**

1. `A11yDetector` recherche les violations WCAG 2.2 Level AA et produit un rapport structuré.
2. Il propose un transfert : **« Corriger les problèmes d'accessibilité »** → `A11yResolver`.
3. `A11yResolver` lit les résultats, applique les corrections de code et propose un transfert retour : **« Vérifier les corrections »** → `A11yDetector`.
4. Le Detector effectue un nouveau scan pour confirmer que les corrections ont résolu les violations.

**Chaîne 2 : Qualité du code — Détecter, générer, vérifier**

1. `CodeQualityDetector` analyse les rapports de couverture et identifie les fonctions en dessous du seuil de 80 %.
2. Il propose un transfert : **« Générer des tests »** → `TestGenerator`.
3. `TestGenerator` écrit des tests pour les fonctions non couvertes et propose un transfert retour : **« Vérifier la couverture »** → `CodeQualityDetector`.
4. Le Detector relance l'analyse de couverture pour confirmer que les nouveaux tests atteignent le seuil.

Les deux chaînes suivent la même boucle : détecter un problème, transférer pour la remédiation, retransférer pour la vérification.

## Point de vérification

Avant de continuer, vérifiez :

* [ ] Vous pouvez expliquer la différence entre un agent, un skill, une instruction et un prompt
* [ ] Vous pouvez identifier les champs `name`, `description`, `tools` et `handoffs` dans le frontmatter YAML d'un agent
* [ ] Vous pouvez décrire le modèle orchestrateur (le Security Agent délègue aux sous-agents)
* [ ] Vous pouvez décrire le modèle détecteur/résolveur (cycle détecter → corriger → vérifier)

## Étapes suivantes

Passez au [Lab 03](lab-03.md).
