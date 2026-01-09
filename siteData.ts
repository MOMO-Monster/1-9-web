
import { Project, ProjectCategory, ExperienceItem, SkillItem, CategoryDef, CapabilityItem } from './types';

// Helper to generate mock projects
const generateProjects = (category: ProjectCategory, count: number, startId: number, imageCount: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${startId + i}`,
    title: `${category.toUpperCase()} Project ${startId + i}`,
    slug: `${category}-${startId + i}`,
    category: category,
    client: `Client ${startId + i}`,
    year: '2023-2024',
    coverImage: `https://picsum.photos/seed/${category}${i}/800/1000`, // Vertical aspect for variety
    summary: `Detailed case study for ${category} project showing comprehensive design systems.`,
    tags: [category.toUpperCase(), 'Design', 'Strategy'],
    blocks: [
      {
        type: 'text',
        content: 'This is a comprehensive showcase of the visual identity system. Below are the detailed design outputs.'
      }
    ],
    mockImageCount: imageCount // Triggers auto-generation of images in CaseStudy
  } as Project));
};

// 1. Branding: 8 Projects
const brandingProjects = generateProjects(ProjectCategory.BRANDING, 8, 1, 32);

// Update the first branding project with specific user requirements
if (brandingProjects.length > 0) {
  brandingProjects[0] = {
    ...brandingProjects[0],
    title: "微笑宝贝计划",
    client: "公益品牌活动全案及品牌IP设计",
    year: "2025",
    mockImageCount: 44, // 44 images as requested
    summary: "这是一次关于儿童口腔健康的品牌公益尝试。挑战在于如何通过设计降低儿童对医疗环境的天然恐惧感。我从「游戏化体验」切入，设计了名为「牙牙大作战」的品牌IP形象与闯关地图，最终形成了从视觉规范到线下物料的完整全案。",
    tags: ["BRANDING", "IP DESIGN", "SOCIAL GOOD"],
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop"
  };
}

// 2. Logo: 4 Projects, each with 20+ images
const logoProjects = generateProjects(ProjectCategory.LOGO, 4, 1, 24);

export const siteData = {
  general: {
    siteTitle: "Lillian | Brand & Visual Design",
    author: "Lillian",
    email: "hello@lillian-design.com",
    // Updated to an image URL for the download feature
    resumeUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  navigation: [
    { id: 'home', path: '/', label: '首页' },
    { id: 'work', path: '/projects', label: '作品' },
    { id: 'service', path: '/services', label: '能力' }, // Changed label to "能力"
    { id: 'about', path: '/about', label: '我' },
  ],
  home: {
    hero: {
      status: "OPEN FOR OPPORTUNITIES",
      titleLine1: "品牌 & 运营设计师",
      titleLine2: "用设计提升商业转化", 
      description: "Branding / Logo / Campaign / Illustration",
      ctaText: "向下滑动查看更多作品",
      // Changed to a scenic landscape (foggy mountains)
      bgImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop", 
      noiseTexture: "https://grainy-gradients.vercel.app/noise.svg"
    },
    marquee: [
      "Brand Identity", "Visual Operation", "Illustration", "IP Design", 
      "Packaging", "Brand Identity", "Visual Operation", "Illustration"
    ],
    featured: {
      title: "精选作品",
      viewAllText: "全部作品",
      showreel: {
        title: "SHOWREEL",
        subtitle: "2024",
        bgImage: "https://picsum.photos/seed/reel/400/400"
      }
    }
  },
  projectsPage: {
    title: "作品分类 & 展示", // Updated
    subtitle: "品牌 · 运营 · 插画设计案例", // Updated
    // Updated header background image for Projects page
    headerBgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", 
    categories: [
      {
        id: ProjectCategory.BRANDING,
        title: "Branding",
        subtitle: "品牌全案",
        description: "Full Brand Identity Systems",
        // Updated cover image
        coverImage: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2000&auto=format&fit=crop"
      },
      {
        id: ProjectCategory.LOGO,
        title: "Logo",
        subtitle: "标志 / 识别系统",
        description: "Visual Identity & Marks",
        // Updated cover image
        coverImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop"
      },
      {
        id: ProjectCategory.CAMPAIGN,
        title: "Campaign",
        subtitle: "运营长图 & 活动落地页",
        description: "Key Visuals & Landing Pages",
        // Updated cover image
        coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
      },
      {
        id: ProjectCategory.ILLUSTRATION,
        title: "Illustration",
        subtitle: "插画",
        description: "Commercial & Creative Illustration",
        // Updated cover image
        coverImage: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=2000&auto=format&fit=crop"
      }
    ] as CategoryDef[],
    // Data for the "Gallery" style categories
    campaignImages: [
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop", // Long image 1
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop", // Long image 2
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"  // Long image 3
    ],
    illustrationImages: Array.from({length: 8}).map((_, i) => `https://picsum.photos/seed/illus${i}/800/1200`)
  },
  servicesPage: {
    title: "设计方法 & 思考",
    description: "比好看更重要的，是如何解决实际问题",
    // Added header background image for Services page
    headerBgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    // New Structure for Capabilities
    items: [
      {
        id: 'methodology',
        title: "设计方法论",
        description: "从业务目标出发，将复杂需求转化为可落地的视觉方案",
        icon: "Workflow",
        modalImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000&auto=format&fit=crop", // Placeholder for methodology flow
        modalContent: "我的设计流程并非始于画布，而是始于对业务目标的拆解。通过「需求分析 - 核心概念提炼 - 视觉语言转化 - 规范化输出」的四步法，确保每一个像素都有其商业逻辑支撑。在多个 B 端项目中，这套方法论帮助团队减少了 30% 的返工率。"
      },
      {
        id: 'case-study',
        title: "运营案例拆解",
        description: "以儿童口腔公益项目为例，拆解一次完整的运营设计流程",
        icon: "Layers",
        modalImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop", // Placeholder for case study breakdown
        modalContent: "在该公益项目中，挑战在于如何降低儿童对医疗的恐惧感。我从「游戏化体验」切入，设计了名为「牙牙大作战」的闯关地图。通过 IP 形象的情感化引导，配合高饱和度但柔和的配色体系，最终该活动线下参与度提升了 45%，并形成了完整的物料 SOP。"
      },
      {
        id: 'capability',
        title: "专业能力结构",
        description: "将品牌、运营与插画能力整合为系统化设计能力",
        icon: "Hexagon",
        modalImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", // Placeholder for radar chart/structure
        modalContent: "我不止于单一维度的视觉表现。我的核心竞争力在于「多维整合」：利用品牌思维把控整体调性，利用插画能力提升视觉差异化，利用运营思维优化转化路径。这种 T 型能力结构使我能够独立承担从 0 到 1 的复杂项目，降低跨职能沟通成本。"
      }
    ] as CapabilityItem[]
  },
  caseStudy: {
    backText: "返回",
    escText: "ESC",
    challengeLabel: "项目挑战",
    clientLabel: "客户",
    yearLabel: "年份",
    backToTop: "回到顶部",
    notFound: "项目未找到"
  },
  about: {
    hero: {
      titlePrefix: "用设计",
      titleHighlight: "解决实际业务问题",
      portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop",
      introPrimary: "你好，我是 Lillian，一名品牌与视觉设计师。",
      introSecondary: "擅长品牌设计、Logo、插画与运营物料视觉整合，关注设计的故事性与商业落地。",
      introTertiary: "欢迎一起创造好看的品牌。",
      ctaContact: "联系我",
      ctaResume: "简历",
      // QR Code for WeChat/Contact
      contactQr: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=13488779450", // Placeholder QR
      contactPhone: "13488779450"
    },
    // skillsTitle removed
    experienceTitle: "工作经历",
    experienceSubtitle: "WORK EXPERIENCE",
    footerText: "© 2025 Lillian DESIGN."
  },
  playground: {
    title: "实验室",
    description: "探索性设计与视觉 experiment",
    badgePrefix: "EXP_",
    closeText: "点击任意处关闭"
  },
  statsComponent: {
    title: "数据表现",
    badge: "LIVE DATA"
  },
  projects: [
    ...brandingProjects,
    ...logoProjects
  ] as Project[],
  // Skills array retained but unused in new layout
  skills: [
    { name: 'Brand Identity', level: 95 },
    { name: 'Illustration', level: 90 },
    { name: 'Visual Operation', level: 90 },
    { name: 'Layout Design', level: 85 },
  ] as SkillItem[],
  experience: [
    {
      role: "品牌 / 运营视觉设计师",
      company: "品牌 & 运营设计能力整合（项目实践）",
      period: "2022 - PRESENT",
      description: "系统性重构个人设计能力结构，聚焦品牌设计/运营视觉与内容传播方向，完成多个品牌与运营类完整项目实践\n· 品牌定位与视觉系统构建\n· 活动运营视觉（KV / 长图 / 社交传播物料）\n· IP 形象与插画在品牌中的应用",
      active: true
    },
    {
      role: "运营设计师 / 品牌设计支持",
      company: "纳里健康（互联网医疗）",
      period: "2021 – 2022",
      description: "· 负责公司电商商城板块的整体视觉支持，包括活动页面、促销物料与运营视觉\n· 配合市场及运营团队，完成多场线上活动及线下推广物料设计\n· 参与公司品牌相关设计工作，包括品牌视觉规范应用、宣传物料设计等\n· 在高频需求环境中，持续优化视觉表达与执行效率",
      active: false
    },
    {
      role: "UI / 运营设计师",
      company: "身边医生（互联网医疗）",
      period: "2017 – 2021",
      description: "· 项目早期参与 App（C 端）及管理后台（B端）的界面设计与基础交互设计\n· 产品上线后，负责部分页面的视觉优化与迭代调整\n· 后期转向运营设计方向，主要负责公司品牌宣传，长期支持线上线下活动视觉输出，服务对象包括企业客户与医疗机构\n在多角色环境中，积累了 产品理解 + 运营视觉落地 的综合经验",
      active: false
    }
  ] as ExperienceItem[]
};
