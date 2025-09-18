# Software Automation — Year 12 (Stage 6) Software Engineering

**Time allocation:** 30 hours (suggested format: 10 × 3-hour lessons or equivalent mix of theory + practical labs)

---

## High-level description

This module focuses on automating software development lifecycle tasks to improve reliability, repeatability and delivery speed. Students learn scripting for automation, automated testing, build and deployment pipelines (CI/CD), basic containerisation and toolchains that support modern software engineering practices.

---

## Learning outcomes

By the end of this module students will be able to:

* Explain the purposes and benefits of automation in software development.
* Write scripts to automate repetitive tasks (building, testing, packaging).
* Create and run automated tests (unit, integration basics) and interpret results.
* Design a simple CI/CD pipeline and understand its components and triggers.
* Use basic containerisation or environment-isolation concepts for reproducible builds.
* Apply version control workflows and integrate automation with repositories.
* Reflect on trade-offs and safety considerations (e.g., automating deployments to production).

---

## Core topics & concepts

1. **Introduction to automation** — goals, benefits, common tasks to automate, idempotence and reproducibility.
2. **Scripting languages & tools** — using shell scripts, Python scripts, or task runners (npm scripts, Makefiles) to automate local tasks.
3. **Version control workflows** — branching strategies, hooks, integrating automated checks with Git.
4. **Automated testing** — unit tests, test-driven development (TDD) concepts, basic integration testing, test coverage basics.
5. **Continuous Integration (CI)** — automated builds, running tests on commits/PRs, status checks and artifact creation.
6. **Continuous Delivery / Deployment (CD)** — automated deployment pipelines, stages (build → test → deploy), rollback strategies.
7. **Containers & environment reproducibility** — container basics (Docker concepts), using containers for consistent build/test environments.
8. **Package management & dependency security** — locking dependencies, vulnerability scanning, semantic versioning concepts.
9. **Infrastructure as code (introductory)** — configuration files, simple declarative setup (conceptual: Terraform/Ansible overview).
10. **Observability & pipelines monitoring** — ensuring pipelines are reliable and logging/build-notifications.

---

## Practical activities & labs

* **Scripting lab:** write a script that runs tests, creates a build artifact, and packages a release (local automation).
* **Unit testing lab:** write unit tests for a small codebase; measure and report test coverage.
* **CI pipeline setup:** configure a CI workflow (GitHub Actions/GitLab CI/Travis) to run tests on each push and PR.
* **CD exercise:** create a multi-stage pipeline that builds, tests and deploys to a staging environment (could be simulated).
* **Containerisation lab:** build a simple container image for a web app and run it locally.
* **Dependency & security scan demo:** run a dependency check and interpret results; discuss mitigation strategies.

---

## Suggested weekly breakdown (10 lessons)

1. Intro to automation, goals and common patterns; scripting primer
2. Scripting lab: build/test/package scripts and Makefile basics
3. Version control workflows and hooks; integrating checks with Git
4. Automated testing fundamentals and unit test lab
5. CI basics and setting up a CI workflow (practice)
6. CD concepts and building a multi-stage pipeline (demo)
7. Container basics and building a reproducible environment
8. Dependency management, scanning and release strategies
9. Monitoring pipelines, rollback strategies and pipeline security
10. Project presentations: documented pipeline + demonstration and reflection

---

## Assessment suggestions

* **Major assessment (project):** Design and implement an automated pipeline for a small project (scripts + CI configuration + documentation) with a reflective report (1000–1500 words) explaining choices, risks and improvements.
* **Lab assessments:** scripting task, unit test coverage task, container build task.
* **Quiz/test:** concepts of CI/CD, testing types and container basics.

---

## Resources & teacher notes

* **Tools & services:** Git/GitHub, GitHub Actions or GitLab CI, Docker (conceptual + local), pytest/unittest (Python) or Jest/Mocha (JS) for testing, Make/npm scripts for task automation.
* **Teaching tips:** focus on reproducibility and safety—use staging environments for demo deployments and never expose real credentials. Provide starter templates for pipelines and scripts.
* **Assessment scaffolding:** provide a small sample app repo that students can fork and practice automating.

---

*End of Software Automation README*
