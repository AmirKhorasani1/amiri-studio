import React from "react";
import ProjectHero from "../components/ProjectHero";
import ProjectMeta from "../components/ProjectMeta";
import ProjectFeatures from "../components/ProjectFeatures";
import ProjectChallengeSolution from "../components/ProjectChallengeSolution";
import ProjectArchitecture from "../components/ProjectArchitecture";
import ProjectResults from "../components/ProjectResults";
import ProjectNavigation from "../components/ProjectNavigation";

const ClothingStoreProjectPage = () => {
  return (
    <main className="container py-25">
      <div className="flex flex-col gap-4.5">
        {/* Hero */}
        <ProjectHero
          title="فروشگاه آنلاین پوشاک"
          description={[
            "این پروژه یک فروشگاه آنلاین پوشاک بود که برای تمرین مدیریت state پیچیده و طراحی UI واکنش‌گرا ساخته شد.",
            "هدف اصلی، پیاده‌سازی یک سبد خرید کامل با فیلتر محصولات و انیمیشن‌های روان بین صفحات بود.",
          ]}
          image="/projects/clothing-store/cover.png"
          liveUrl="https://..."
          githubUrl="https://..."
        />

        {/* Project information */}
        <ProjectMeta
          role="Frontend Developer"
          type="E-commerce / Personal Project"
          status="Completed"
          duration="3 Weeks"
          techStack={[
            { category: 'Frontend', items: ['React', 'React Router', 'Tailwind CSS'] },
            { category: 'Backend', items: ['Node.js', 'Express'] },
            { category: 'Database', items: ['MongoDB'] },
            { category: 'Tools', items: ['Vite', 'Git'] },
          ]}
        />

        {/* Key Features */}
        <ProjectFeatures
          features={[
            {
              title: "فیلتر پیشرفته محصولات",
              description:
                "فیلتر بر اساس رنگ، سایز و قیمت به‌صورت لحظه‌ای.",
            },
            {
              title: "سبد خرید پایدار",
              description:
                "ذخیره سبد خرید در localStorage بین رفرش‌ها.",
            },
            {
              title: "انیمیشن صفحات",
              description:
                "ترنزیشن روان بین صفحات با Framer Motion.",
            },
            {
              title: "ریسپانسیو کامل",
              description:
                "طراحی واکنش‌گرا از موبایل تا دسکتاپ.",
            },
            {
              title: "دارک / لایت مود",
              description:
                "سوییچ تم با ذخیره‌سازی ترجیح کاربر.",
            },
            {
              title: "چندزبانه",
              description:
                "پشتیبانی کامل از فارسی و انگلیسی با RTL / LTR.",
            },
          ]}
        />

        {/* Challenge & Solution */}
        <ProjectChallengeSolution
          challenge="مدیریت state سبد خرید بین چندین صفحه بدون افت پرفورمنس و بدون استفاده از کتابخانه سنگین، مسئله اصلی این پروژه بود."
          solution="با ترکیب Context API و یک لایه persist سبک روی localStorage، سبد خرید سریع، پایدار و بدون نیاز به Redux پیاده‌سازی شد."
        />

        {/* Architecture */}
        <ProjectArchitecture
          flow={["Components", "State", "Logic", "API", "Data"]}
          decisions={[
            {
              title: "چرا Context API به‌جای Redux؟",
              text: "با توجه به مقیاس پروژه، Context API به‌همراه یک لایه persist سبک کافی بود و از پیچیدگی اضافه جلوگیری کرد.",
            },
            {
              title: "جداسازی منطق از UI",
              text: "منطق فیلتر و مدیریت داده از لایه نمایش جدا نگه داشته شد تا کامپوننت‌ها تمیزتر و قابل توسعه‌تر باشند.",
            },
          ]}
        />

        {/* Results */}
        <ProjectResults
          results={[
            {
              value: "40%",
              label: "Performance",
              description:
                "بهبود سرعت لود اولیه با lazy-loading تصاویر و code splitting.",
            },
            {
              value: "3x",
              label: "UX",
              description:
                "کاهش تعداد کلیک‌های لازم برای تکمیل فرآیند خرید.",
            },
            {
              label: "Technical Growth",
              description:
                "یادگیری عمیق‌تر مدیریت state و بهینه‌سازی رندر در React.",
            },
          ]}
        />

        {/* Project Navigation */}
        <ProjectNavigation
          nextProject={{
            title: "گالری طلا",
            href: "/projects/gold-gallery",
          }}
        />
      </div>
    </main>
  );
};

export default ClothingStoreProjectPage;