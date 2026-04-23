# Taskify - Smart Task Management Dashboard - Angular

A focused task workspace for capturing tasks, tracking progress through clear status views, and acting quickly via inline edits, completion controls, session timing, and contextual feedback—built with Angular standalone components.
<hr/>

## Website Preview : 
🎥 [Watch on LinkedIn](https://www.linkedin.com/posts/ahmed-maher-algohary_angular-frontenddevelopment-webdevelopment-activity-7453190284324085760-7ibl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADxaYJMBq3vC9su8VPtfe-FziMjGaqcNOsA)

<hr/>

## UI Mockup

<a href="https://www.linkedin.com/posts/ahmed-maher-algohary_angular-frontenddevelopment-webdevelopment-activity-7453190284324085760-7ibl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADxaYJMBq3vC9su8VPtfe-FziMjGaqcNOsA">
<img src="https://github.com/user-attachments/assets/d5b604b9-ae55-4a68-8aa3-eba80bea183b" title="ui-mockup-website-preview" width="500" />
</a>
<hr/>


## Overview

Taskify helps users organize daily work inside a single dashboard flow:
- Add new tasks with key details (title, description, category, priority, due date)
- View tasks by status (`All`, `Done`, `In Progress`)
- Update, complete, or remove tasks in place
- Tasks are persisted in your browser using localStorage
- If no tasks exist, default sample tasks are shown
- Track session time from the header timer controls
- Receive contextual tab-switch feedback via toast notifications
- User authentication: signup, login, profile, and route protection

## Core Features

- **Task Capture**: Fast task creation through a dedicated form component
- **Status-Based Workflow**: Filter tasks by progress tab to focus execution
- **Inline Actions**: Edit, complete/undo, and delete directly from each card
- **Task Persistence**: All tasks are saved in localStorage for session continuity
- **Default Tasks**: If no tasks exist, default sample tasks are loaded automatically
- **Header Productivity Timer**: Start/stop/resume/reset flow with icon controls
- **Lifecycle-Driven UI Feedback**: Toast behavior and cleanup handled via component lifecycle hooks
- **Dashboard Highlights**: Carousel section for top-level productivity messaging
- **Authentication**: Signup, login, and profile management with route guards for protected pages

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
