# Taskify - Smart Task Management Dashboard - Angular

A focused task workspace for capturing tasks, tracking progress through clear status views, and acting quickly via inline edits, completion controls, session timing, and contextual feedback—built with Angular standalone components.

## Overview

Taskify helps users organize daily work inside a single dashboard flow:
- Add new tasks with key details (title, description, category, priority, due date)
- View tasks by status (`All`, `Done`, `In Progress`)
- Update, complete, or remove tasks in place
- Track session time from the header timer controls
- Receive contextual tab-switch feedback via toast notifications

## Core Features

- **Task Capture**: Fast task creation through a dedicated form component
- **Status-Based Workflow**: Filter tasks by progress tab to focus execution
- **Inline Actions**: Edit, complete/undo, and delete directly from each card
- **Header Productivity Timer**: Start/stop/resume/reset flow with icon controls
- **Lifecycle-Driven UI Feedback**: Toast behavior and cleanup handled via component lifecycle hooks
- **Dashboard Highlights**: Carousel section for top-level productivity messaging

## Tech Stack

- Angular `21` with standalone components
- TypeScript
- HTML + CSS
- RxJS (Angular runtime dependency)

## Project Structure

```text
task-manager/
├─ public/                    static assets served as-is
├─ src/
│  ├─ app/
│  │  ├─ components/          reusable UI blocks
│  │  │  ├─ addTaskForm/      task creation form (ts/html/css)
│  │  │  ├─ header/           brand + timer + navigation
│  │  │  └─ footer/           footer layout/content
│  │  ├─ pages/               feature views
│  │  │  ├─ dashboard/        page composition + carousel
│  │  │  ├─ TaskList/         filters + toast + list rendering
│  │  │  └─ TaskCard/         single task card actions
│  │  ├─ app.ts               root component logic
│  │  ├─ app.html             root template
│  │  ├─ app.css              root styles
│  │  ├─ app.config.ts        app-wide providers/config
│  │  └─ app.routes.ts        route declarations
│  ├─ main.ts                 Angular bootstrap entry
│  ├─ index.html              host HTML document
│  └─ styles.css              global styles
├─ angular.json               Angular CLI workspace config
├─ package.json               scripts + dependencies
├─ tsconfig.json              base TypeScript config
├─ tsconfig.app.json          app TypeScript config
└─ README.md                  project documentation
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm start
```

The app runs on `http://localhost:4200/`.

## Scripts

- `npm start` - Run development server (opens browser)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode (development configuration)
- `npm test` - Run unit tests

## Build Output

Production artifacts are generated in `dist/`.

## Notes

- This project uses Angular standalone component architecture.
- Current interactions emphasize direct state updates and lifecycle hook cleanup patterns.
