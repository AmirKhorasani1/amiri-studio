import React, { useState, useMemo, useCallback, useEffect } from "react";

import { uid, todayISO } from "./utils/helpers";
import { initialTasks } from "./utils/Seeddata";

import Toolbar from "./components/Toolbar";
import ListView from "./components/ListView";
import BoardView from "./components/BoardView";
import SidePanel from "./components/SidePanel";
import NewTaskModal from "./components/NewTaskModal";

const STORAGE_KEY = "task-manager:tasks";
const VIEW_STORAGE_KEY = "task-manager:view";

function loadStoredTasks() {
  if (typeof window === "undefined") return initialTasks;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialTasks;
  } catch (err) {
    console.error("Failed to read tasks from localStorage:", err);
    return initialTasks;
  }
}

function loadStoredView() {
  if (typeof window === "undefined") return "list";
  try {
    const raw = window.localStorage.getItem(VIEW_STORAGE_KEY);
    return raw === "list" || raw === "board" ? raw : "list";
  } catch (err) {
    console.error("Failed to read view from localStorage:", err);
    return "list";
  }
}

export default function TaskManagerApp() {
  const [tasks, setTasks] = useState(loadStoredTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [groupBy, setGroupBy] = useState("status");
  const [view, setView] = useState(loadStoredView);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [activeTask, setActiveTask] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save tasks to localStorage:", err);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch (err) {
      console.error("Failed to save view to localStorage:", err);
    }
  }, [view]);

  const completedToday = tasks.filter(
    (t) => t.status === "completed" && t.updatedAt.slice(0, 10) === todayISO()
  ).length;

  const toggleGroup = (key) =>
    setCollapsedGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const updateTask = useCallback((id, fields) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...fields, updatedAt: new Date().toISOString() } : t
      )
    );
    setActiveTask((prev) =>
      prev && prev.id === id
        ? { ...prev, ...fields, updatedAt: new Date().toISOString() }
        : prev
    );
  }, []);

  const deleteTask = useCallback((task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setActiveTask((prev) => (prev && prev.id === task.id ? null : prev));
  }, []);

  const duplicateTask = useCallback((task) => {
    const copy = {
      ...task,
      id: uid(),
      title: `${task.title} (copy)`,
      checklist: task.checklist.map((c) => ({ ...c, id: uid() })),
      attachments: task.attachments.map((a) => ({ ...a, id: uid() })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [copy, ...prev]);
  }, []);

  const cycleStatus = useCallback(
    (task) => {
      const order = ["todo", "in-progress", "completed"];
      const next = order[(order.indexOf(task.status) + 1) % order.length];
      updateTask(task.id, { status: next });
    },
    [updateTask]
  );

  const createTask = useCallback((fields) => {
    const task = {
      id: uid(),
      ...fields,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    setShowNewTask(false);
  }, []);

  const cardHandlers = {
    onOpen: setActiveTask,
    onEdit: setActiveTask,
    onDuplicate: duplicateTask,
    onDelete: deleteTask,
    onCycleStatus: cycleStatus,
  };

  const visibleTasks = useMemo(() => {
    let list = tasks;

    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    list = [...list].sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return list;
  }, [tasks, statusFilter, search, sortBy]);

  return (
    <div className="min-h-screen w-full text-white">
      <style>{`
        .field-input {
          background: transparent;
          outline: none;
          border: 1px solid rgb(38 38 38);
          border-radius: 0.5rem;
          padding: 0.4rem 0.6rem;
          font-size: 0.8rem;
          color: rgb(229 229 229);
        }
        .field-input:focus {
          border-color: rgb(82 82 82);
        }
        select.field-input option {
          background: rgb(10 10 10);
        }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: rgb(38 38 38); border-radius: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-25 flex flex-col gap-10">
        {/* Toolbar */}
        <Toolbar
          title="My Tasks"
          taskCount={tasks.length}
          completedToday={completedToday}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          view={view}
          setView={setView}
          onNewTask={() => setShowNewTask(true)}
        />

        {/* Content */}
        {view === "list" ? (
          <ListView
            tasks={visibleTasks}
            groupBy={groupBy}
            collapsedGroups={collapsedGroups}
            toggleGroup={toggleGroup}
            {...cardHandlers}
          />
        ) : (
          <BoardView
            tasks={visibleTasks}
            onNewTask={() => setShowNewTask(true)}
            {...cardHandlers}
          />
        )}
      </div>

      {activeTask && (
        <SidePanel
          task={tasks.find((t) => t.id === activeTask.id) ?? null}
          onClose={() => setActiveTask(null)}
          onChange={updateTask}
          onDelete={(t) => deleteTask(t)}
          onDuplicate={(t) => duplicateTask(t)}
        />
      )}

      {showNewTask && (
        <NewTaskModal onClose={() => setShowNewTask(false)} onCreate={createTask} />
      )}
    </div>
  );
}