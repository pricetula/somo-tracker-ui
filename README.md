# 📘 SomoTracker Monorepo

**SomoTracker** is a modern academic progression platform. This monorepo houses two main web applications:

- `web`: The **public-facing marketing site**, built with **SolidJS**
- `academic-app`: The **authenticated academic dashboard**, built with **Next.js**

---

## 🧱 Project Structure

```bash
somotracker/
├── apps/
│   ├── web/               # SolidJS public site
│   └── academic-app/      # Next.js academic dashboard
├── packages/
│   ├── ui/                # Shared UI components
│   ├── config/            # Shared Tailwind, ESLint, tsconfig
│   └── utils/             # Shared utility functions and types
├── .github/               # CI/CD workflows
├── turbo.json             # Turborepo config (or alternative)
├── package.json
└── tsconfig.base.json
