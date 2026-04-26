# RandifyUsers

Random user discovery app with an interactive 3D infinite menu, profile dialog tabs, and culture-based quick insights.

## Live Website

https://randifyusers.netlify.app/

## Additional Features

- Interactive 3D infinite user menu with WebGL rendering.
- User profile dialog with tabbed sections: Overview, Contact, Location, and Account.
- Culture Snapshot card with nationality-based greeting style, weekend pattern, and quick cultural note.
- Gender filters (All, Male, Female) and one-click refresh for fetching a new user set.
- Loading and error states for better API request handling.

## Run Locally

### Using pnpm

```bash
pnpm install
pnpm dev
```

### Using npm

```bash
npm install
npm run dev
```

## Available Scripts

```bash
# Development
pnpm dev
npm run dev

# Production build
pnpm build
npm run build

# Preview production build
pnpm preview
npm run preview

# Lint
pnpm lint
npm run lint
```

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Motion (Framer Motion)
- Lucide React
- gl-matrix (React Bits Component/3D math)
- Base UI + shadcn utilities
- ESLint

## Data Source

- Random User API: https://randomuser.me/
