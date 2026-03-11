.
├── apps/
│   ├── host-app (Port 5000)      # The "Shell" or Container application (Main Dashboard).
│   └── remote-app (Port 5001)    # Independent Micro-frontend (Cargo Tracker Widget).
├── packages/
│   ├── ui/                       # Design System. Vue 3 Component Library + Storybook.
│   ├── monitoring/               # Error tracking package with Sentry & Error Boundaries.
│   ├── vite-plugins/             # Custom build-time logic (jonyTerser plugin).
│   └── tsconfig/                 # Centralized TypeScript configurations.
├── package.json                  # Root workspace definitions (pnpm).
└── turbo.json                    # Pipeline and caching configuration (Turborepo).

Key Features
Micro-frontends (Module Federation)
The platform uses Vite Module Federation to load the Cargo Tracker widget from remote-app into host-app dynamically. This allows independent deployments of different business modules.

Security & Dependency Auditing
Snyk & pnpm audit: Continuous scanning of the pnpm-lock.yaml for known vulnerabilities (CVEs).

Dependency Patching: Critical vulnerabilities in packages like rollup and minimatch have been resolved via manual overrides.

Custom Optimization (jonyTerser)
A bespoke Vite plugin (@jonyrepo/vite-plugins) created by Jony to handle production-grade code cleanup:

Debug Removal: Strips console.log and debugger statements.

Logic Minification: Compresses logic (e.g., true into !0).

Comment Stripping: Automatically removes comments to reduce bundle size.

 Testing & Performance
Load Testing: Performance benchmarking using k6 (e.g., testing 10 VUs for 10s duration).

API Mocking: Fully autonomous frontend development enabled by MSW (Mock Service Worker).

Sentry Monitoring: Real-time error reporting and performance tracing via the @jonyrepo/monitoring package.

Setup & Usage
1. Installation
PowerShell
pnpm install
2. Development Mode
Launch all micro-frontends and packages simultaneously:

PowerShell
pnpm dev
3. Production Build
Utilize Turborepo for optimized, cached builds:

PowerShell
pnpm build
4. Security Audit (Snyk)
To perform a deep-scan of the entire monorepo:

PowerShell
snyk test --all-projects
Design System (Storybook)
The UI library is hosted in packages/ui. To view and test components in an isolated environment:

PowerShell
cd packages/ui
pnpm storybook
Accessibility (a11y)
The platform is designed for inclusivity. Critical widgets include:

ARIA Live Regions: aria-live="polite" for real-time status updates.

Semantic HTML: Proper use of role="status" and role="alert" for screen reader compatibility.