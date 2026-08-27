import React,{useEffect,useState}from"react";
import{motion}from"framer-motion";
import{X}from"lucide-react";
import{PROJECT_COLORS,PROJECT_ICONS,PROJECT_STATUSES}from"../utils/projectConstants";
import{useLanguage}from"@context/LanguageContext";

const overlayVariants={
  hidden:{opacity:0},
  visible:{opacity:1,transition:{duration:.15,ease:"easeOut"}},
  exit:{opacity:0,transition:{duration:.12,ease:"easeIn"}}
};

const panelVariants={
  hidden:{opacity:0,scale:.96,y:10},
  visible:{opacity:1,scale:1,y:0,transition:{duration:.28,ease:[.16,1,.3,1]}},
  exit:{opacity:0,scale:.97,y:6,transition:{duration:.16,ease:"easeIn"}}
};

export default function ProjectModal({mode,project,onClose,onSave,t}){
  const{language}=useLanguage();
  const isRTL=language==="fa";
  const isEdit=mode==="edit";

  const[name,setName]=useState(project?.name??"");
  const[description,setDescription]=useState(project?.description??"");
  const[color,setColor]=useState(project?.color??PROJECT_COLORS[0].id);
  const[icon,setIcon]=useState(project?.icon??PROJECT_ICONS[0].id);
  const[status,setStatus]=useState(project?.status??"active");
  const[techStack,setTechStack]=useState(project?.techStack??[]);
  const[techInput,setTechInput]=useState("");

  useEffect(()=>{
    setName(project?.name??"");
    setDescription(project?.description??"");
    setColor(project?.color??PROJECT_COLORS[0].id);
    setIcon(project?.icon??PROJECT_ICONS[0].id);
    setStatus(project?.status??"active");
    setTechStack(project?.techStack??[]);
    setTechInput("");
  },[project]);

  const addTech=()=>{
    const value=techInput.trim();
    if(!value||techStack.includes(value)){setTechInput("");return}
    setTechStack(prev=>[...prev,value]);
    setTechInput("");
  };

  const removeTech=value=>setTechStack(prev=>prev.filter(tech=>tech!==value));

  const submit=()=>{
    if(!name.trim())return;
    onSave({name:name.trim(),description,color,icon,status,techStack});
  };

  return(
    <motion.div
      dir={isRTL?"rtl":"ltr"}
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/15 p-4 backdrop-blur-[3px]"
    >
      <motion.div
        onClick={e=>e.stopPropagation()}
        variants={panelVariants}
        className="relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white text-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,.16)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:shadow-black/50"
      >

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-3.5 dark:border-neutral-900">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-neutral-950 dark:text-neutral-100">
              {isEdit?t.editProject:t.newProject}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-500">
              {isEdit?t.save:t.create}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t.cancel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all duration-200 hover:bg-neutral-200 active:scale-95 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <X size={18}/>
          </button>
        </div>

        {/* Body */}
        <div className="no-scrollbar flex max-h-[70vh] flex-col gap-5 overflow-y-auto px-4 py-4">

          {/* Name */}
          <input
            autoFocus
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full border-b border-neutral-200 bg-transparent pb-3 text-base font-semibold text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 dark:border-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-600 dark:focus:border-white"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={e=>setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={3}
            className="w-full resize-none rounded-2xl bg-neutral-100 px-3.5 py-3 text-sm leading-relaxed text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:bg-neutral-200/70 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-600 dark:focus:bg-neutral-800"
          />

          {/* Status */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
              {t.status}
            </p>

            <div className="grid grid-cols-4 gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
              {PROJECT_STATUSES.map(s=>(
                <button
                  key={s.id}
                  type="button"
                  onClick={()=>setStatus(s.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[11.5px] font-medium transition-all duration-200 ${
                    status===s.id
                      ?"bg-black text-white shadow-sm dark:bg-white dark:text-black"
                      :"text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{backgroundColor:status===s.id?"currentColor":s.hex}}
                  />
                  {t.statusLabels[s.id]}
                </button>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
              {t.techStack}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-neutral-100 p-2.5 dark:bg-neutral-900">
              {techStack.map(tech=>(
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={()=>removeTech(tech)}
                    className="text-neutral-400 transition-colors hover:text-red-500"
                  >
                    <X size={11}/>
                  </button>
                </span>
              ))}

              <input
                value={techInput}
                onChange={e=>setTechInput(e.target.value)}
                onKeyDown={e=>{
                  if(e.key==="Enter"){
                    e.preventDefault();
                    addTech();
                  }
                }}
                onBlur={addTech}
                placeholder={t.techStackPlaceholder}
                className="min-w-[100px] flex-1 bg-transparent px-1 py-1.5 text-xs text-neutral-950 outline-none placeholder:text-neutral-400 dark:text-neutral-200 dark:placeholder:text-neutral-600"
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
              {t.color}
            </p>

            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-neutral-100 px-3 py-3 dark:bg-neutral-900">
              {PROJECT_COLORS.map(c=>(
                <button
                  key={c.id}
                  type="button"
                  onClick={()=>setColor(c.id)}
                  title={c.id}
                  style={{backgroundColor:c.hex}}
                  className={`h-7 w-7 rounded-full transition-all duration-200 hover:scale-110 ${
                    color===c.id
                      ?"ring-2 ring-black ring-offset-2 ring-offset-neutral-100 dark:ring-white dark:ring-offset-neutral-900"
                      :""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icons */}
          <div>
            <p className="mb-2 px-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-500">
              {t.icon}
            </p>

            <div className="grid grid-cols-6 gap-2 rounded-2xl bg-neutral-100 p-2.5 dark:bg-neutral-900">
              {PROJECT_ICONS.map(({id,Icon})=>(
                <button
                  key={id}
                  type="button"
                  onClick={()=>setIcon(id)}
                  className={`flex h-9 items-center justify-center rounded-xl transition-all duration-200 ${
                    icon===id
                      ?"bg-black text-white shadow-sm dark:bg-white dark:text-black"
                      :"bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  }`}
                >
                  <Icon size={16}/>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-neutral-100 bg-gradient-to-t from-white via-white to-transparent px-4 pb-[calc(.85rem+env(safe-area-inset-bottom))] pt-3 dark:border-neutral-900 dark:from-neutral-950 dark:via-neutral-950">
          <button
            onClick={onClose}
            className="rounded-full bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:bg-neutral-200 active:scale-95 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {t.cancel}
          </button>

          <button
            onClick={submit}
            disabled={!name.trim()}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black"
          >
            {isEdit?t.save:t.create}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}