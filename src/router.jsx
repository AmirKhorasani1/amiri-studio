import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "@components/Layouts/MainLayout";
import DashboardLayout from "@components/Layouts/DashboardLayout";
import DevNotesLayout from "@components/templates/dev-notes/layouts/DevNotesLayout";
import StillTimeLayout from "@home/tools/components/StillTime/layouts/StillTimeLayout";

// Protected Route
import ProtectedRoute from "@components/ProtectedRoute";

// Lazy Pages
const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsPage = lazy(() => import("@pages/ToolsPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const AdminLogin = lazy(() => import("@pages/AdminLogin"));

const SnippetVaultPage = lazy(() =>
  import("@home/tools/components/SnippetVault/SnippetVaultPage")
);

const DevNotesHome = lazy(() =>
  import("@templates/dev-notes/pages/Home/DevNotesHome")
);

const NotesPage = lazy(() =>
  import("@templates/dev-notes/pages/Notes/NotesPage")
);

const TasksPage = lazy(() =>
  import("@templates/dev-notes/pages/Tasks/TasksPage")
);

const ProjectsPage = lazy(() =>
  import("@templates/dev-notes/pages/Projects/ProjectsPage")
);

const MeetingsPage = lazy(() =>
  import("@templates/dev-notes/pages/Meetings/MeetingsPage")
);

const TemplatesPage = lazy(() =>
  import("@templates/dev-notes/pages/Templates/TemplatesPage")
);

const ClockPage = lazy(() =>
  import("@home/tools/components/StillTime/pages/ClockPage")
);

const TimerPage = lazy(() =>
  import("@home/tools/components/StillTime/pages/TimerPage")
);

const StopwatchPage = lazy(() =>
  import("@home/tools/components/StillTime/pages/StopwatchPage")
);

const Loader = (
  <div className="min-h-screen flex items-center justify-center">
    Loading...
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "tools",
        element: (
          <Suspense fallback={Loader}>
            <ToolsPage />
          </Suspense>
        ),
      },
      {
        path: "tools/snippet-vault",
        element: (
          <Suspense fallback={Loader}>
            <SnippetVaultPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/dashboard/login",
    element: (
      <Suspense fallback={Loader}>
        <AdminLogin />
      </Suspense>
    ),
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/dev-notes",
    element: <DevNotesLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={Loader}>
            <DevNotesHome />
          </Suspense>
        ),
      },
      {
        path: "notes",
        element: (
          <Suspense fallback={Loader}>
            <NotesPage />
          </Suspense>
        ),
      },
      {
        path: "tasks",
        element: (
          <Suspense fallback={Loader}>
            <TasksPage />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={Loader}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "meetings",
        element: (
          <Suspense fallback={Loader}>
            <MeetingsPage />
          </Suspense>
        ),
      },
      {
        path: "templates",
        element: (
          <Suspense fallback={Loader}>
            <TemplatesPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/tools/still-time",
    element: <StillTimeLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="clock" replace />,
      },
      {
        path: "clock",
        element: (
          <Suspense fallback={Loader}>
            <ClockPage />
          </Suspense>
        ),
      },
      {
        path: "timer",
        element: (
          <Suspense fallback={Loader}>
            <TimerPage />
          </Suspense>
        ),
      },
      {
        path: "stopwatch",
        element: (
          <Suspense fallback={Loader}>
            <StopwatchPage />
          </Suspense>
        ),
      },
    ],
  },
]);