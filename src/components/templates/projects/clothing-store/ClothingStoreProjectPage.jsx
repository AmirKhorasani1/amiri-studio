import React from 'react'
import ProjectHero from '../components/ProjectHero'
import ProjectMeta from '../components/ProjectMeta'
import ProjectOverview from '../components/ProjectOverview'
import ProjectFeatures from '../components/ProjectFeatures'
import ProjectChallengeSolution from '../components/ProjectChallengeSolution'
import ProjectArchitecture from '../components/ProjectArchitecture'
import ProjectGallery from '../components/ProjectGallery'
import ProjectResults from '../components/ProjectResults'
import ProjectTechStack from '../components/ProjectTechStack'
import ProjectNavigation from '../components/ProjectNavigation'

const ClothingStoreProjectPage = () => {
  return (
    <div className="flex flex-col gap-4.5 container py-20">
      <ProjectHero
        title="Clothing Store"
        category="E-commerce / Frontend"
        description="یک توضیح کوتاه درباره پروژه"
        image="/projects/clothing-store/cover.png"
        liveUrl="https://..."
        githubUrl="https://..."
      />

      <ProjectMeta
        role="Frontend Developer"
        type="E-commerce / Personal Project"
        status="Completed"
        duration="3 Weeks"
        techStack={['React', 'React Router', 'Tailwind CSS']}
      />

      <ProjectOverview
        paragraphs={[
          'این پروژه یک فروشگاه آنلاین پوشاک بود که برای تمرین مدیریت state پیچیده و طراحی UI واکنش‌گرا ساخته شد.',
          'هدف اصلی، پیاده‌سازی یک سبد خرید کامل با فیلتر محصولات و انیمیشن‌های روان بین صفحات بود.',
        ]}
      />

      <ProjectFeatures
        features={[
          { title: 'فیلتر پیشرفته محصولات', description: 'فیلتر بر اساس رنگ، سایز و قیمت به‌صورت لحظه‌ای.' },
          { title: 'سبد خرید پایدار', description: 'ذخیره سبد خرید در localStorage بین رفرش‌ها.' },
          { title: 'انیمیشن صفحات', description: 'ترنزیشن روان بین صفحات با Framer Motion.' },
          { title: 'ریسپانسیو کامل', description: 'طراحی واکنش‌گرا از موبایل تا دسکتاپ.' },
          { title: 'دارک/لایت مود', description: 'سوییچ تم با ذخیره‌سازی ترجیح کاربر.' },
          { title: 'چندزبانه', description: 'پشتیبانی کامل از فارسی و انگلیسی با RTL/LTR.' },
        ]}
      />

      <ProjectChallengeSolution
        challenge="مدیریت state سبد خرید بین چندین صفحه بدون افت پرفورمنس و بدون استفاده از کتابخانه سنگین، مسئله اصلی این پروژه بود."
        solution="با ترکیب Context API و یه لایه persist سبک روی localStorage، سبد خرید سریع، پایدار و بدون نیاز به Redux پیاده‌سازی شد."
      />

      <ProjectArchitecture
        flow={['Components', 'State', 'Logic', 'API', 'Data']}
        decisions={[
          {
            title: 'چرا Context API به‌جای Redux؟',
            text: 'با توجه به مقیاس پروژه، Context API + یه لایه persist سبک کافی بود و از پیچیدگی اضافه جلوگیری کرد.',
          },
          {
            title: 'جداسازی منطق از UI',
            text: 'تمام فراخوانی‌های API و منطق فیلتر داخل custom hookها نگه داشته شد تا کامپوننت‌ها تمیز و قابل تست بمونن.',
          },
        ]}
      />

      <ProjectGallery
        images={[
          '/projects/clothing-store/gallery-1.png',
          '/projects/clothing-store/gallery-2.png',
          '/projects/clothing-store/gallery-3.png',
        ]}
      />

      <ProjectResults
        results={[
          {
            value: '40%',
            label: 'Performance',
            description: 'بهبود سرعت لود اولیه با lazy-loading تصاویر و کد اسپلیتینگ.',
          },
          {
            value: '3x',
            label: 'UX',
            description: 'کاهش تعداد کلیک‌های لازم برای تکمیل خرید.',
          },
          {
            label: 'Technical Growth',
            description: 'یادگیری عمیق‌تر مدیریت state و بهینه‌سازی رندر در React.',
          },
        ]}
      />

      <ProjectTechStack techStack={['React', 'React Router', 'Tailwind CSS']} />
      
      <ProjectNavigation
        prevProject={{ title: 'Portfolio Dashboard', href: '/projects/portfolio-dashboard' }}
        nextProject={{ title: 'Task Manager App', href: '/projects/task-manager' }}
      />
    </div>
  )
}

export default ClothingStoreProjectPage