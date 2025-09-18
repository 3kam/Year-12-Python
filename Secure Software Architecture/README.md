# Secure Software Architecture — Year 12 (Stage 6) Software Engineering

**Time allocation:** 30 hours (suggested format: 10 × 3-hour lessons or equivalent mix of theory + labs)

---

## High-level description

Students learn principles and practices for designing software systems that are secure, resilient and maintainable. Topics emphasise threat awareness, secure design patterns, authentication and authorisation, secure coding, basic cryptography concepts and documenting security decisions for real projects.

---

## Learning outcomes

By the end of this module students will be able to:

* Explain core security principles (confidentiality, integrity, availability) and common threat types.
* Perform basic threat modelling and risk assessment for a small application.
* Apply secure architecture patterns and justify design choices to reduce vulnerabilities.
* Implement and evaluate authentication and authorisation strategies (conceptual + simple implementations).
* Apply secure coding practices (input validation, error handling, secrets management).
* Describe basic cryptography concepts and where to apply them appropriately.
* Produce clear documentation that explains and defends security decisions.

---

## Core topics & concepts

1. **Security fundamentals** — CIA triad, least privilege, defence-in-depth, secure-by-design thinking.
2. **Threat modelling & risk assessment** — identify assets, attack surface, use simple frameworks (e.g., STRIDE), risk matrices.
3. **Secure architecture patterns** — layered designs, gateways, segmentation, threat containment strategies.
4. **Authentication & authorisation** — password policies, session vs token strategies, RBAC/ABAC basics, MFA concepts.
5. **Secure coding** — input validation and sanitisation, parameterised queries, safe error handling, secrets handling.
6. **Web security weaknesses** — OWASP Top 10 concepts (injection, XSS, CSRF, insecure deserialization) and mitigations.
7. **Session management & state** — secure cookies, token lifetimes, session revocation.
8. **Cryptography basics** — hashing vs encryption, symmetric vs asymmetric concepts, TLS/HTTPS overview, key management considerations.
9. **Logging & monitoring** — useful logging practices, avoid logging secrets, basic incident detection ideas.
10. **Deployment & supply chain** — CI/CD security basics, dependency scanning, supply-chain risks.
11. **Ethics, privacy & regulation** — data minimisation, privacy-by-design, basic legal considerations for handling personal data.

---

## Practical activities & labs

* **Threat-modelling workshop:** map attack surface for a small app and prioritise risks.
* **Secure design proposal:** create a short architecture diagram and written justification for mitigating top risks.
* **Vulnerability fixing lab:** find and fix simple vulnerabilities in short code examples (e.g., SQL injection, XSS preview).
* **Session & TLS demo:** configure HTTPS in a local dev environment and demonstrate secure cookie/session settings.
* **CI/CD security demo:** show dependency scanning and how to protect secrets in pipelines.
* **Incident tabletop:** simulated incident response checklist and immediate mitigation steps.

---

## Suggested weekly breakdown (10 lessons)

1. Security fundamentals, CIA triad and case studies
2. Attack surfaces and threat modelling methods
3. Secure architecture patterns and layered design
4. Authentication & authorisation concepts
5. Secure coding basics: input validation and injection prevention
6. OWASP Top 10 overview + code review lab
7. Sessions, cookies, CSRF and XSS protections
8. Cryptography basics, TLS and secrets management
9. Logging, monitoring, CI/CD security and deployment considerations
10. Project presentations and defended architecture documents

---

## Assessment suggestions

* **Major assessment:** Secure architecture document (diagram + 1000–1500 word justification) with an oral defence or Q\&A.
* **Lab assessment:** Practical task to identify and fix vulnerabilities in a supplied codebase (report required).
* **Quiz/test:** Short-answer and scenario-based questions on threat modelling, CIA, and basic crypto concepts.
* **Participation:** graded tabletop incident exercise and peer review of architecture proposals.

---

## Resources & teacher notes

* Use small, concrete examples (a simple web app with login + data) for labs and assessments.
* Teach practical mitigations rather than deep cryptography mathematics; focus on correct application and trade-offs.
* Provide templates for threat-modelling and architecture documents to scaffold student work.
* Introduce relevant, lightweight tools for demonstration (dependency scanners, local TLS config, basic static-analysis examples).

---

*End of Secure Software Architecture README*
