.
├── apps/
│   ├── host-app (Port 5000)      # The "Shell" or Container application
│   └── remote-app (Port 5001)    # Independent Micro-frontend (Widget provider)
├── packages/
│   ├── ui/                       # Shared Vue 3 Design System (Base components)
│   ├── tsconfig/                 # Centralized TypeScript configurations
│   └── vite-plugins/             # Custom build-time logic and instrumentation
├── package.json                  # Root workspace definitions
└── turbo.json                    # Pipeline and caching configuration