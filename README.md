<h1 align="center" style="font-size:60px;">
🛡️ Adversarial Graph Benchmark (AGB)
</h1>

### Towards Practical and Fair Evaluation of Adversarial Graph Neural Networks

</div>

---

## Overview

The **Adversarial Graph Benchmark (AGB)** is a benchmark platform for evaluating the robustness of Graph Neural Networks (GNNs) against adversarial attacks.

AGB provides a standardized framework for:

* 📊 Benchmark datasets
* 🛡️ Adversarial attack evaluation
* 🔒 Defense robustness assessment
* 🏆 Public leaderboards
* 📚 Reproducible evaluation protocols
* 🔬 Fair and consistent benchmarking

The goal of AGB is to facilitate rigorous comparison of graph learning methods under realistic adversarial settings.

---

## Key Features

### 🏆 Benchmark Leaderboards

Evaluate and compare attack and defense methods using standardized metrics and experimental settings.

### 📊 Diverse Graph Datasets

Includes homophilic, heterophilic, and large-scale graph benchmarks commonly used in adversarial graph learning research.

### 🛡️ Attack Evaluation

Support for evaluating poisoning attacks, evasion attacks, and robustness degradation under adversarial perturbations.

### 🔒 Defense Analysis

Benchmark graph defense methods under unified protocols for fair comparison.

### 📚 Research Methodology

Transparent benchmark design, reproducibility guidelines, and standardized evaluation procedures.

---

## Benchmark Datasets

### Homophilic Graphs

* CORA
* CITESEER
* PUBMED

### Heterophilic Graphs

* CHAMELEON
* SQUIRREL

### Large-Scale Graphs

* OGB-ARXIV

---

## Evaluation Categories

### Adversarial Attacks

* Nettack
* FGA
* SGA
* PR-BCD
* Additional benchmarked attack methods

### Robust Defenses

* GCN-based defenses
* Robust aggregation methods
* Structure-aware defenses
* Adversarial training approaches

---

## Website Structure

| Page          | Description                           |
| ------------- | ------------------------------------- |
| Home          | Overview of the benchmark             |
| AGB Challenge | Community challenge and participation |
| Datasets      | Benchmark datasets and statistics     |
| Leaderboard   | Performance rankings                  |
| Paper         | Benchmark publication and methodology |               
| GitHub        | Repository and source code            |

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/FDataLab/AGB.github.io.git
cd AGB.github.io
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:4000
```

---

## Build

Generate the production build:

```bash
npm run build
```

Deployment-ready files are generated in:

```text
dist/
```

---

## Deployment

The website is designed for:

* Git-based deployment
* Static hosting
* SFTP deployment
* cPanel hosting

All production assets are exported as static files for reproducible deployment.

---

## Project Goals

* Standardized evaluation
* Reproducible experimentation
* Fair attack comparison
* Robust defense benchmarking
* Open research collaboration

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

Please open an issue or submit a pull request.

---

## License

This project is intended for academic and research use.

---

<div align="center">

Built for the Graph Learning and Adversarial Machine Learning Research Community

</div>
