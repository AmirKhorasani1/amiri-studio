import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "@components/Layouts/MainLayout";
import DashboardLayout from "@components/Layouts/DashboardLayout";
import DevNotesLayout from "@tools/DevNotes/layouts/DevNotesLayout";

// Protected Route
import ProtectedRoute from "@components/ProtectedRoute";

// Lazy Pages
const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsPage = lazy(() => import("@pages/ToolsPage"));
const ProjectsPage = lazy(() => import("@pages/ProjectsPage"));
const ArticlesPage = lazy(() => import("@pages/ArticlesPage"));
const ArticleDetailPage = lazy(() => import("@pages/ArticleDetailPage"));

const DashboardPage = lazy(() => import("@pages/DashboardPage"));
const AdminLogin = lazy(() => import("@pages/AdminLogin"));
const ArticlesManagePage = lazy(
  () => import("@pages/admin/Articles/ArticlesManagePage"),
);
const ArticleFormPage = lazy(
  () => import("@pages/admin/Articles/ArticleFormPage"),
);

const FitsazProjectPage = lazy(
  () => import("@projects/fitsaz/FitsazProjectPage"),
);

const GoldGalleryProjectPage = lazy(
  () => import("@projects/gold-gallery/GoldGalleryProjectPage"),
);

const ClothingStoreProjectPage = lazy(
  () => import("@projects/clothing-store/ClothingStoreProjectPage"),
);

const PortfolioProjectPage = lazy(
  () => import("@projects/portfolio/PortfolioProjectPage"),
);

const SnippetVaultPage = lazy(
  () => import("@tools/SnippetVault/SnippetVaultPage"),
);

const ColorCraftPage = lazy(() => import("@tools/ColorCraft/ColorCraftPage"));

const TypeScalePage = lazy(() => import("@tools/TypeScale/TypeScalePage"));

const AnimationLabPage = lazy(
  () => import("@tools/AnimationLab/AnimationLabPage"),
);

const RegexLabPage = lazy(() => import("@tools/RegexLab/pages/RegexLabPage"));

const UiBuilderPage = lazy(
  () => import("@/components/templates/tools/UIBuilder/UiBuilderPage"),
);

const DevNotesHome = lazy(
  () => import("@tools/DevNotes/pages/Home/DevNotesHome"),
);

const NotesPage = lazy(() => import("@tools/DevNotes/pages/Notes/NotesPage"));

const TasksPage = lazy(() => import("@tools/DevNotes/pages/Tasks/TasksPage"));

const ProjectsPageDevNotes = lazy(
  () => import("@tools/DevNotes/pages/Projects/ProjectsPage"),
);

const ProgressPage = lazy(
  () =>
    import("@/components/templates/tools/DevNotes/pages/Progress/ProgressPage"),
);

const TemplatesPage = lazy(
  () => import("@tools/DevNotes/pages/Templates/TemplatesPage"),
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
        ),
      },
      {
        path: "tools/animation-lab",
        element: (
          <Suspense fallback={Loader}>
            <AnimationLabPage />
          </Suspense>
        ),
      },
      {
        path: "tools/regex-lab",
        element: (
          <Suspense fallback={Loader}>
            <RegexLabPage />
          </Suspense>
        ),
      },
      {
        path: "tools/ui-builder",
        element: (
          <Suspense fallback={Loader}>
            <UiBuilderPage />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: [
          <Suspense fallback={Loader}>
            <ProjectsPage />
          </Suspense>,
        ],
      },
      {
        path: "projects/fitsaz",
        element: [
          <Suspense>
            <FitsazProjectPage />
          </Suspense>,
        ],
      },
      {
        path: "projects/gold-gallery",
        element: [
          <Suspense>
            <GoldGalleryProjectPage />
          </Suspense>,
        ],
      },
      {
        path: "projects/clothing-store",
        element: [
          <Suspense>
            <ClothingStoreProjectPage />
          </Suspense>,
        ],
      },
      {
        path: "projects/portfolio",
        element: [
          <Suspense>
            <PortfolioProjectPage />
          </Suspense>,
        ],
      },
      {
        path: "articles",
        element: (
          <Suspense fallback={Loader}>
            <ArticlesPage />
          </Suspense>
        ),
      },
      {
        path: "articles/:slug",
        element: (
          <Suspense fallback={Loader}>
            <ArticleDetailPage />
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
      {
        path: "articles",
        element: (
          <Suspense fallback={Loader}>
            <ArticlesManagePage />
          </Suspense>
        ),
      },
      {
        path: "articles/new",
        element: (
          <Suspense fallback={Loader}>
            <ArticleFormPage />
          </Suspense>
        ),
      },
      {
        path: "articles/:id/edit",
        element: (
          <Suspense fallback={Loader}>
            <ArticleFormPage />
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
            <ProjectsPageDevNotes />
          </Suspense>
        ),
      },
      {
        path: "progress",
        element: (
          <Suspense fallback={Loader}>
            <ProgressPage />
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
]);
