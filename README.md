# chronology

A Next.js application with automated dependency management and Vercel deployment configuration.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building

Build the application for production:

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Configuration

### Vercel Deployment

This project includes Vercel deployment configuration (`vercel.json`). Simply connect your repository to Vercel for automatic deployments.

### Renovate

Renovate is configured to automatically create pull requests for dependency updates. The configuration (`renovate.json`) includes:
- Weekly schedule (before 6am on Monday, UTC)
- Auto-merge for minor and patch updates (excluding 0.x versions)

## Tech Stack

- Next.js 15.5.12
- React 19.0.0
- TypeScript
- ESLint

## Project Structure

```
chronology/
├── pages/          # Next.js pages
├── public/         # Static assets
├── styles/         # CSS files
├── next.config.js  # Next.js configuration
├── tsconfig.json   # TypeScript configuration
├── vercel.json     # Vercel deployment configuration
└── renovate.json   # Renovate configuration
```