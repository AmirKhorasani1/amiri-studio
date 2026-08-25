import { rangeCutoff, isWithinRange, dateKey, daysBetween, RANGE_DAYS } from "./dateRange";

function taskTimestamp(task, project) {
  return task.updatedAt || task.createdAt || project.updatedAt;
}

// 01 — Overview: چهار عدد بالای صفحه + تفکیک Personal/Project برای Tasks Completed
export function computeOverview(projects, personalTasks, range) {
  const cutoff = rangeCutoff(range);

  const personalCompleted = personalTasks.filter(
    (t) => t.status === "completed" && isWithinRange(t.updatedAt, cutoff)
  ).length;

  const workedOnPersonal = personalTasks.filter(
    (t) => isWithinRange(t.createdAt, cutoff) || isWithinRange(t.updatedAt, cutoff)
  ).length;

  let projectCompleted = 0;
  let workedOnProject = 0;
  const touchedProjectIds = new Set();
  const activeDays = new Set();

  projects.forEach((p) => {
    p.tasks.forEach((task) => {
      const ts = taskTimestamp(task, p);
      const touched = isWithinRange(task.createdAt, cutoff) || isWithinRange(ts, cutoff);
      if (touched) {
        workedOnProject += 1;
        touchedProjectIds.add(p.id);
        activeDays.add(dateKey(ts));
      }
      if (task.done && isWithinRange(ts, cutoff)) {
        projectCompleted += 1;
      }
    });
  });

  personalTasks.forEach((t) => {
    if (isWithinRange(t.createdAt, cutoff)) activeDays.add(dateKey(t.createdAt));
    if (isWithinRange(t.updatedAt, cutoff)) activeDays.add(dateKey(t.updatedAt));
  });

  return {
    tasksCompleted: personalCompleted + projectCompleted,
    personalCompleted,
    projectCompleted,
    tasksWorkedOn: workedOnPersonal + workedOnProject,
    activeDays: activeDays.size,
    projectsTouched: touchedProjectIds.size,
  };
}

// 03 — Project Progress: درصد از خودِ Taskهای هر پروژه محاسبه می‌شه، نه دستی
export function computeProjectProgress(projects) {
  return projects
    .filter((p) => p.status !== "archived")
    .map((p) => {
      const total = p.tasks.length;
      const completed = p.tasks.filter((t) => t.done).length;
      return {
        id: p.id,
        name: p.name,
        color: p.color,
        status: p.status,
        total,
        completed,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.progress - a.progress);
}

// 03 — Task Completion: ترکیب My Tasks (سه‌حالته) + Project Tasks (done/not-done)
export function computeTaskCompletion(projects, personalTasks) {
  let completed = 0;
  let inProgress = 0;
  let todo = 0;

  personalTasks.forEach((t) => {
    if (t.status === "completed") completed += 1;
    else if (t.status === "in-progress") inProgress += 1;
    else todo += 1;
  });

  projects.forEach((p) => {
    p.tasks.forEach((task) => {
      if (task.done) completed += 1;
      else todo += 1;
    });
  });

  return { completed, inProgress, todo, total: completed + inProgress + todo };
}

// 02 — Activity: یه ردیف روزانه برای heatmap، هرکدوم با شکست تسک/نوت/پروژه برای hover
export function computeActivity(projects, personalTasks, notes, range) {
  const days = RANGE_DAYS[range] ?? 90; // برای All Time هم عرض heatmap رو محدود نگه می‌داریم
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));

  const byDay = {};
  daysBetween(start, end).forEach((key) => {
    byDay[key] = {
      date: key,
      tasksCompleted: 0,
      tasksCreated: 0,
      notesCreated: 0,
      projectsUpdated: 0,
    };
  });

  const bump = (iso, field) => {
    const key = dateKey(iso);
    if (key && byDay[key]) byDay[key][field] += 1;
  };

  personalTasks.forEach((t) => {
    bump(t.createdAt, "tasksCreated");
    if (t.status === "completed") bump(t.updatedAt, "tasksCompleted");
  });

  const seenProjectDay = new Set();
  projects.forEach((p) => {
    p.tasks.forEach((task) => {
      bump(task.createdAt, "tasksCreated");
      if (task.done) bump(task.updatedAt || task.createdAt, "tasksCompleted");
    });
    const key = dateKey(p.updatedAt);
    const flag = `${p.id}-${key}`;
    if (key && byDay[key] && !seenProjectDay.has(flag)) {
      byDay[key].projectsUpdated += 1;
      seenProjectDay.add(flag);
    }
  });

  notes.forEach((n) => bump(n.createdAt, "notesCreated"));

  return Object.values(byDay).map((d) => ({
    ...d,
    total: d.tasksCompleted + d.tasksCreated + d.notesCreated + d.projectsUpdated,
  }));
}

// 04 — Insights: پرکارترین پروژه + پرکارترین روز (Work Distribution فعلاً کنار گذاشته شده، چون Category نداریم)
export function computeInsights(projects, personalTasks, activityDays) {
  let topProject = null;
  let totalProjectActivity = 0;

  projects.forEach((p) => {
    const count = p.tasks.filter((t) => t.done).length;
    totalProjectActivity += count;
    if (count > 0 && (!topProject || count > topProject.count)) {
      topProject = { id: p.id, name: p.name, count };
    }
  });

  const totalActivity =
    totalProjectActivity + personalTasks.filter((t) => t.status === "completed").length;

  let topDay = null;
  activityDays.forEach((d) => {
    if (!topDay || d.tasksCompleted > topDay.tasksCompleted) topDay = d;
  });

  return {
    topProject: topProject
      ? {
          ...topProject,
          percent: totalActivity > 0 ? Math.round((topProject.count / totalActivity) * 100) : 0,
        }
      : null,
    topDay:
      topDay && topDay.tasksCompleted > 0
        ? {
            date: topDay.date,
            weekday: new Date(`${topDay.date}T00:00:00`).toLocaleDateString(undefined, {
              weekday: "long",
            }),
            completed: topDay.tasksCompleted,
          }
        : null,
  };
}