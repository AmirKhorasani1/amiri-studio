import React,{useEffect,useRef,useState}from"react";
import{motion}from"framer-motion";
import{Pencil,Trash2,Plus,Circle,CheckCircle2,MoreVertical}from"lucide-react";
import{PROJECT_COLORS,PROJECT_ICONS,PROJECT_STATUSES}from"../utils/projectConstants";
import{formatDateTime}from"../utils/projectStorage";
import{IoIosArrowRoundBack}from"react-icons/io";
import{useLanguage}from"@context/LanguageContext";

const overlayVariants={
  hidden:{opacity:0},
  visible:{opacity:1,transition:{duration:.15,ease:"easeOut"}},
  exit:{opacity:0,transition:{duration:.12,ease:"easeIn"}}
};

const panelVariants={
  hidden:{opacity:0,x:24},
  visible:{opacity:1,x:0,transition:{duration:.4,ease:[.16,1,.3,1]}},
  exit:{opacity:0,x:16,transition:{duration:.25,ease:"easeIn"}}
};

const menuVariants={
  hidden:{opacity:0,scale:.95,y:-4},
  visible:{opacity:1,scale:1,y:0,transition:{duration:.15,ease:"easeOut"}},
  exit:{opacity:0,scale:.95,y:-4,transition:{duration:.1,ease:"easeIn"}}
};

const HEADER_H=68;

export default function ProjectDetailModal({
  project,onClose,onEdit,onDelete,onUpdateStatus,
  onAddTask,onToggleTask,onDeleteTask,t
}){
  const{language}=useLanguage();
  const isRTL=language==="fa";

  const[newTask,setNewTask]=useState("");
  const[menuOpen,setMenuOpen]=useState(false);
  const menuRef=useRef(null);

  const colorMeta=PROJECT_COLORS.find(c=>c.id===project.color);
  const iconMeta=PROJECT_ICONS.find(i=>i.id===project.icon)||PROJECT_ICONS[0];
  const Icon=iconMeta.Icon;
  const accent=colorMeta?.hex||"#a3a3a3";

  useEffect(()=>{
    if(!menuOpen)return;
    const handleClickOutside=e=>{
      if(menuRef.current&&!menuRef.current.contains(e.target))setMenuOpen(false);
    };
    document.addEventListener("mousedown",handleClickOutside);
    return()=>document.removeEventListener("mousedown",handleClickOutside);
  },[menuOpen]);

  useEffect(()=>{
    window.history.pushState({projectModal:true},"");
    const handlePopState=()=>onClose();
    window.addEventListener("popstate",handlePopState);
    return()=>window.removeEventListener("popstate",handlePopState);
  },[]);

  const handleClose=()=>{
    if(window.history.state?.projectModal)window.history.back();
    else onClose();
  };

  const submitTask=()=>{
    if(!newTask.trim())return;
    onAddTask(project.id,newTask.trim());
    setNewTask("");
  };

  const handleEdit=()=>{
    setMenuOpen(false);
    onEdit(project);
  };

  const handleDelete=()=>{
    setMenuOpen(false);
    onDelete(project);
  };

  const done=project.tasks.filter(task=>task.done).length;

  return(
    <motion.div
      dir={isRTL?"rtl":"ltr"}
      onClick={handleClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex justify-end bg-black/15 backdrop-blur-[2px]"
    >
      <motion.div
        onClick={e=>e.stopPropagation()}
        variants={panelVariants}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white dark:bg-black md:w-[430px] md:max-w-[92vw] md:rounded-l-3xl md:border-l md:border-neutral-200 md:dark:border-neutral-800"
      >

        {/* Header */}
        <div
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 bg-gradient-to-b from-white via-white/90 to-transparent px-3.5 pt-2.5 dark:from-black dark:via-black/90"
          style={{height:HEADER_H}}
        >
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={()=>setMenuOpen(p=>!p)}
              title={t.edit}
              aria-label={t.edit}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full duration-200 active:scale-95 ${
                menuOpen
                  ?"bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-white"
                  :"bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              }`}
            >
              <MoreVertical size={22}/>
            </button>

            {menuOpen&&(
              <motion.div
                role="menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`absolute top-[calc(100%+0.5rem)] z-10 w-44 overflow-hidden rounded-2xl border border-neutral-100 bg-white py-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.12)] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40 ${
                  isRTL?"right-0":"left-0"
                }`}
              >
                <button
                  role="menuitem"
                  onClick={handleEdit}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-start text-sm text-neutral-800 duration-150 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <Pencil size={16} className="shrink-0 text-neutral-500 dark:text-neutral-400"/>
                  {t.edit}
                </button>

                <button
                  role="menuitem"
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-start text-sm text-red-500 duration-150 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} className="shrink-0"/>
                  {t.delete}
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex h-12 min-w-0 flex-1 items-center gap-2.5 overflow-hidden rounded-full bg-neutral-100 px-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            <span
              className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full"
              style={{backgroundColor:`${accent}22`,color:accent}}
            >
              <Icon size={20}/>
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight text-neutral-950 dark:text-neutral-100 md:text-[15.5px]">
                {project.name}
              </p>
              <p className="mt-1 truncate text-xs text-secondary">
                {done}/{project.tasks.length} {t.tasksLabel}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            title={t.cancel}
            aria-label={t.cancel}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 duration-200 active:scale-95 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <IoIosArrowRoundBack
              size={32}
              className={isRTL?"":"rotate-180"}
            />
          </button>
        </div>

        {/* Body */}
        <div
          className="absolute inset-0 overflow-y-auto px-4"
          style={{
            paddingTop:HEADER_H+8,
            paddingBottom:112
          }}
        >

          {/* Status */}
          <div className="sticky top-0 z-10">
            <div className="relative grid grid-cols-4 gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">

              {/* Animated active background */}
              <motion.div
                layoutId="project-status-active"
                transition={{
                  type:"spring",
                  stiffness:500,
                  damping:35,
                  mass:.7
                }}
                className="absolute inset-y-1 rounded-full bg-black dark:bg-white"
                style={{
                  width:"calc((100% - 0.75rem) / 4)",
                  [isRTL?"right":"left"]:
                    `calc(${PROJECT_STATUSES.findIndex(s=>s.id===project.status)} * ((100% - 0.75rem) / 4 + 0.25rem) + 0.25rem)`
                }}
              />

              {PROJECT_STATUSES.map(s=>(
                <button
                  key={s.id}
                  onClick={()=>onUpdateStatus(project.id,s.id)}
                  className={`relative z-10 flex items-center justify-center rounded-full py-2.5 text-[12.5px] font-medium duration-200 ${
                    project.status===s.id
                      ?"text-white dark:text-black"
                      :"text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {t.statusLabels[s.id]}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="mt-4 flex flex-col gap-1">
            {project.tasks.length===0?(
              <p className="py-6 text-center text-sm text-secondary">
                {t.noTasks}
              </p>
            ):(
              project.tasks.map(task=>(
                <div
                  key={task.id}
                  className="group/task flex items-center gap-2.5 rounded-md px-2 py-2 duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  <button
                    onClick={()=>onToggleTask(project.id,task.id)}
                    className="shrink-0"
                    style={{color:task.done?accent:undefined}}
                  >
                    {task.done
                      ?<CheckCircle2 size={18}/>
                      :<Circle size={18} className="text-neutral-400 dark:text-neutral-600"/>
                    }
                  </button>

                  <span className={`min-w-0 flex-1 truncate text-sm ${
                    task.done
                      ?"text-secondary line-through"
                      :"text-neutral-950 dark:text-neutral-200"
                  }`}>
                    {task.text}
                  </span>

                  <button
                    onClick={()=>onDeleteTask(project.id,task.id)}
                    className="dn-editor-btn shrink-0 text-secondary opacity-0 hover:text-red-400 group-hover/task:opacity-100"
                  >
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-4 dark:border-neutral-900">
            <span className="text-xs text-secondary">
              {t.created} {formatDateTime(project.createdAt)}
            </span>
          </div>
        </div>

        {/* Bottom input */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2.5 bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-6 dark:from-black dark:via-black/90">
          <input
            value={newTask}
            onChange={e=>setNewTask(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&submitTask()}
            placeholder={t.taskPlaceholder}
            className="min-w-0 flex-1 rounded-full bg-neutral-100 px-4 py-3.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-500 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
          />

          <button
            onClick={submitTask}
            disabled={!newTask.trim()}
            aria-label={t.newTask}
            className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-full bg-black text-white duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"
          >
            <Plus size={20}/>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}