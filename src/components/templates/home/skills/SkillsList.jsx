import React from 'react';

const SkillsList = () => {
  const listItems = [
    {
      id: '01',
      text: (
        <>
          Architecting scalable applications and effortlessly solving complex frontend challenges with <strong className="text-white font-semibold">React & Next.js</strong>.
        </>
      ),
    },
    {
      id: '02',
      text: (
        <>
          Writing robust, type-safe logic and handling intricate data flows easily using <strong className="text-white font-semibold">TypeScript & JavaScript</strong>.
        </>
      ),
    },
    {
      id: '03',
      text: (
        <>
          Translating complex designs into high-performance, pixel-perfect responsive interfaces with <strong className="text-white font-semibold">Tailwind CSS</strong>.
        </>
      ),
    },
    {
      id: '04',
      text: (
        <>
          Managing complex application states efficiently across large-scale projects using <strong className="text-white font-semibold">Redux</strong>.
        </>
      ),
    },
    {
      id: '05',
      text: (
        <>
          Structuring accessible, semantic, and SEO-friendly web foundations via modern <strong className="text-white font-semibold">HTML & CSS</strong>.
        </>
      ),
    }
  ];

  return (
    // کانتینر اصلی با پس‌زمینه تیره و پدینگ مناسب
    <div className="w-full bg-black md:py-5">
      <div className="flex flex-col gap-5 md:gap-10 max-w-4xl mx-auto">
        {listItems.map((item) => (
          <div key={item.id} className="flex items-start gap-5 md:gap-8 group cursor-default">
            
            {/* ستون اعداد - دقیقا مشابه عکس با رنگ طوسی مات */}
            <span className="text-neutral-400 text-xl md:text-2xl pt-0.5 select-none transition-colors duration-300 group-hover:text-[#888]">
              {item.id}
            </span>

            {/* ستون متن - با فونت خوانا و لاین‌هایت مناسب */}
            <p className="text-neutral-200 text-[15.5px] md:text-lg leading-[1.65] md:leading-[1.7] tracking-wide font-light transition-colors duration-300 group-hover:text-[#EAEAEA]">
              {item.text}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;