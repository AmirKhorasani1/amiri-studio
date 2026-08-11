import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "@components/Layouts/MainLayout";
import DashboardLayout from "@components/Layouts/DashboardLayout";
import DevNotesLayout from "@tools/DevNotes/layouts/DevNotesLayout";
import StillTimeLayout from "@tools/StillTime/layouts/StillTimeLayout";

// Protected Route
import ProtectedRoute from "@components/ProtectedRoute";

// Lazy Pages
const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsPage = lazy(() => import("@pages/ToolsPage"));
const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const AdminLogin = lazy(() => import("@pages/AdminLogin"));

const SnippetVaultPage = lazy(() =>
  import("@tools/SnippetVault/SnippetVaultPage")
);

const ColorCraftPage = lazy(() =>
  import("@tools/ColorCraft/ColorCraftPage")
);

const TypeScalePage = lazy(() =>
  import("@tools/TypeScale/TypeScalePage")
);

const AnimationLabPage = lazy(() =>
  import("@tools/AnimationLab/AnimationLabPage")
);

const DevNotesHome = lazy(() =>
  import("@tools/DevNotes/pages/Home/DevNotesHome")
);

const NotesPage = lazy(() =>
  import("@tools/DevNotes/pages/Notes/NotesPage")
);

const TasksPage = lazy(() =>
  import("@tools/DevNotes/pages/Tasks/TasksPage")
);

const ProjectsPage = lazy(() =>
  import("@tools/DevNotes/pages/Projects/ProjectsPage")
);

const MeetingsPage = lazy(() =>
  import("@tools/DevNotes/pages/Meetings/MeetingsPage")
);

const TemplatesPage = lazy(() =>
  import("@tools/DevNotes/pages/Templates/TemplatesPage")
);

const ClockPage = lazy(() =>
  import("@tools/StillTime/pages/ClockPage")
);

const TimerPage = lazy(() =>
  import("@tools/StillTime/pages/TimerPage")
);

const StopwatchPage = lazy(() =>
  import("@tools/StillTime/pages/StopwatchPage")
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
      {
        path: "tools/color-craft",
        element: (
          <Suspense fallback={Loader}>
            <ColorCraftPage />
          </Suspense>
        ),
      },
      {
        path: "tools/type-scale",
        element: (
          <Suspense fallback={Loader}>
            <TypeScalePage />
          </Suspense>
        )
      },
      {
        path: "tools/animation-lab",
        element: (
          <Suspense fallback={Loader}>
            <AnimationLabPage />
          </Suspense>
        )
      }
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
    path: "/tools/dev-notes",
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