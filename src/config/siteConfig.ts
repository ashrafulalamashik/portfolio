// Site Configuration - Edit this file to update content easily
// No need to modify component files

export const siteConfig = {
  // Personal Info
  personal: {
    name: "Ashraful Alam Ashik",
    shortName: "Ashik",
    initials: "A",
    title: "Elite DevSecOps Engineer | Senior Full-Stack Architect",
    tagline: "Full-Stack & DevSecOps · Automation · Web Design & SEO",
    location: "Birgram, Kharna, Shajahanpur, Bogura-5800, Bangladesh",
    phone: "+8801737940250",
    email: "aa.ashik777@gmail.com",
    whatsapp: "http://wa.me/+8801737940250",
    linkedin: "https://www.linkedin.com/in/ashraful-alam-ashik/",
    experience: "3+",
    cvPath: "/cv-ashraful-alam-ashik.pdf",
  },

  // Hero Section
  hero: {
    typewriterTexts: [
      "Full-Stack Architect",
      "DevSecOps Engineer",
      "Automation Expert",
      "WordPress Developer",
      "SEO Specialist",
    ],
    stats: [
      { value: "50+", label: "Projects Completed" },
      { value: "30+", label: "Happy Clients" },
      { value: "3+", label: "Years Experience" },
      { value: "100%", label: "Client Satisfaction" },
    ],
  },

  // About Section
  about: {
    paragraphs: [
      "Dynamic Senior Full-Stack Architect & DevSecOps Engineer with 3+ years of experience designing secure, high-performance web applications, automating deployment pipelines, and building robust cloud infrastructures.",
      "Currently serving as Lead Full-Stack Architect & DevSecOps Engineer at Future Minds Academy, where I oversee system architecture, API designs, and secure deployment workflows. I lead Laravel and React/Next.js integrations, database optimizations, and n8n-based automation pipelines.",
      "Proficient in containerization, CI/CD pipelines, zero-trust security setups, and automation workflows, while maintaining strong foundations in WordPress customization and Technical SEO audits. Passionate about writing clean, secure, and well-tested code while ensuring peak performance."
    ],
    quickStats: [
      { value: "200+", label: "Team Members Managed" },
      { value: "2", label: "Branches Managed" },
    ],
  },

  // Experience Section
  experience: {
    current: {
      title: "Lead Full-Stack Architect & DevSecOps Engineer",
      company: "Future Minds Academy",
      period: "Nov 2024 - Present",
      location: "Bogura, Bangladesh",
      description: [
        "Architecting secure and scalable multi-vendor marketplaces and educational platforms using Next.js 16 and Laravel 12",
        "Designing stateless Sanctum authentication, Redis-backed OTP security, and robust database architectures",
        "Implementing zero-trust security systems, including secure HttpOnly cookie middleware and payment gateway signature verification",
        "Managing deployment pipelines, CORS configurations, and secure Cloudflare R2 file storage sandboxes",
      ],
    },
    previous: [
      {
        title: "Full-Stack Developer & Security Lead",
        company: "SEO Expate BD",
        period: "May 2024 - Nov 2024",
        location: "Bogura, Bangladesh",
        description: [
          "Supervised a team of developers in building and optimizing web applications with PHP, Laravel, and WordPress",
          "Implemented advanced application security practices and optimized site load speed for international clients",
          "Created custom plugins, custom payment gateway webhooks, and automated system workflows",
        ],
      },
      {
        title: "Backend Engineer & WordPress Developer",
        company: "SEO Expate BD",
        period: "Dec 2023 - May 2024",
        location: "Bogura, Bangladesh",
        description: [
          "Developed custom PHP and database solutions for complex websites",
          "Conducted deep-dive security audits and resolved critical performance and database bottlenecks",
        ],
      },
      {
        title: "Junior Web Developer",
        company: "SEO Expate BD",
        period: "Sep 2023 - Dec 2023",
        location: "Bogura, Bangladesh",
        description: [
          "Assisted in building custom templates and layouts with HTML, CSS, and JavaScript",
          "Integrated backend APIs and database tables",
        ],
      },
    ],
  },

  // Certifications Section
  certifications: [
    {
      title: "Search Engine Optimization (SEO)",
      issuer: "SEO Expate Bangladesh Ltd.",
      year: "2023",
      icon: "seo",
    },
    {
      title: "Website Design & WordPress Customization",
      issuer: "Institute of Technical & IT",
      year: "2024",
      icon: "web",
    },
    {
      title: "Leadership & Team Management",
      issuer: "SEO Expate Bangladesh Ltd.",
      year: "2024",
      icon: "leadership",
    },
    {
      title: "Computer Office Application",
      issuer: "Institute of Technical & IT",
      year: "2019",
      icon: "office",
    },
  ],

  // Services Section
  services: [
    {
      title: "Full-Stack Web Architecture",
      description: "End-to-end web application development using high-performance stacks like Next.js, React, Laravel, and PostgreSQL. Clean code, type-safety, and mobile-first design.",
      icon: "Globe",
      tags: ["Next.js", "Laravel", "React"],
    },
    {
      title: "DevSecOps & Security Audits",
      description: "Hardening system architectures with stateless auth, Redis-backed OTP lockout, strict input validation, payment signature checks, and sandboxed storage integrations.",
      icon: "Zap",
      tags: ["Stateless Auth", "HMAC Checks", "Form Validation"],
    },
    {
      title: "System Automation & API Design",
      description: "Automating operational workflows using Redis, n8n, and custom cron schedulers. Building scalable RESTful and GraphQL APIs with robust caching.",
      icon: "RefreshCw",
      tags: ["Redis Cache", "API Design", "n8n Automation"],
    },
    {
      title: "SEO & WordPress Customization",
      description: "WordPress theme/plugin customization, landing page designs, and technical search engine optimization (SEO) audits to ensure search visibility and fast load times.",
      icon: "Settings",
      tags: ["WordPress", "Technical SEO", "Speed Optimization"],
    },
  ],

  // Case Studies Section
  caseStudies: [
    {
      slug: "future-shop",
      category: "E-COMMERCE & DEVSECOPS",
      title: "Future Shop: Secure Multi-Vendor Marketplace",
      problem: "Traditional local retail models in Bogura lack secure, scalable, mobile-first marketplace infrastructure, exposing transactions and inventory to exploits.",
      solution: "Architected a zero-trust multi-vendor platform with Redis-backed OTP lockout, strict database locking, stateless auth, and robust server-side checkouts.",
      results: [
        "100% complete Laravel backend built",
        "Zero vulnerabilities in Sanctum/OTP auth",
        "Pessimistic locking prevents double sales",
        "85% MVP complete with high-density admin dashboard",
      ],
      featured: true,
    },
    {
      slug: "local-retail-seo",
      category: "E-COMMERCE",
      title: "E-commerce SEO Optimization for Local Retailer",
      problem: "A local retail client was struggling with low organic visibility, poor site speed (8+ seconds load time), and zero conversions from organic traffic.",
      solution: "Implemented comprehensive technical SEO audit, optimized 150+ product pages with proper schema markup, improved Core Web Vitals, and built quality backlinks from industry-relevant sites.",
      results: [
        "Page load time reduced from 8s to 2.1s",
        "Organic traffic increased by 180% in 4 months",
        "15 keywords ranked on first page of Google",
        "Organic conversions increased from 0 to 45/month",
      ],
      featured: false,
    },
    {
      slug: "corporate-redesign",
      category: "CORPORATE",
      title: "Corporate Website Redesign for Service Company",
      problem: "A B2B service company had an outdated website with poor mobile experience, high bounce rate (78%), and low lead generation.",
      solution: "Redesigned the entire website with modern UI/UX, implemented conversion-focused landing pages, optimized for mobile-first indexing, and integrated CRM for lead tracking.",
      results: [
        "Bounce rate reduced from 78% to 32%",
        "Mobile traffic engagement increased by 150%",
        "Lead generation improved by 220%",
        "Average session duration increased by 3x",
      ],
      featured: false,
    },
  ],

  // Skills Section
  skills: [
    "Technical SEO",
    "On-page SEO",
    "Off-page SEO",
    "WordPress",
    "PHP Customization",
    "Page Speed Optimization",
    "Schema Markup",
    "Google Analytics",
    "Google Search Console",
    "Ahrefs",
    "SEMrush",
    "Screaming Frog",
    "n8n Automation",
    "HTML/CSS",
    "JavaScript",
    "Landing Page Design",
    "Core Web Vitals",
    "Team Leadership",
    "Project Management",
  ],

  // Why Work With Me Section
  whyWorkWithMe: [
    {
      title: "Proven Leadership Experience",
      description: "Managed 200+ professionals across two operational branches. I understand how to lead teams and deliver results at scale.",
    },
    {
      title: "Full-Stack Digital Expertise",
      description: "From SEO strategy to WordPress development to digital operations—I handle the complete digital ecosystem.",
    },
    {
      title: "Data-Driven Approach",
      description: "Every decision is backed by analytics and focused on measurable ROI for your business.",
    },
    {
      title: "Automation & Efficiency",
      description: "Expert in n8n workflows and process automation to streamline operations and reduce manual work.",
    },
    {
      title: "International Client Experience",
      description: "Experience working with clients from USA, UK, and other international markets with clear communication.",
    },
  ],

  // SEO Proposal Page
  seoProposal: {
    title: "SEO Proposal",
    subtitle: "Choose the plan that fits your business goals",
    plans: [
      {
        name: "Starter SEO Plan",
        price: "$120",
        period: "month",
        description: "Perfect for small businesses starting their SEO journey",
        features: [
          "Technical SEO health monitoring",
          "Basic on-page optimisation (meta titles, descriptions, headers)",
          "Optimisation of 1 page per month",
          "Keyword tracking (up to 10 keywords)",
          "Foundational backlink building",
          "Google Search Console monitoring",
          "Monthly performance report",
        ],
        highlighted: false,
      },
      {
        name: "Growth SEO Plan",
        price: "$350",
        period: "month",
        description: "Ideal for growing businesses seeking aggressive growth",
        features: [
          "Everything in Starter Plan",
          "Advanced technical optimisation",
          "Optimisation of up to 3 pages per month",
          "2 SEO-optimised blog posts per month",
          "Competitor keyword analysis",
          "Quality backlink outreach campaign",
          "Keyword tracking (up to 30 keywords)",
          "Local SEO optimisation support",
          "Detailed monthly strategy report",
        ],
        highlighted: true,
        badge: "Most Popular",
      },
      {
        name: "Authority SEO Plan",
        price: "$750",
        period: "month",
        description: "For enterprises seeking market dominance",
        features: [
          "Everything in Growth Plan",
          "Full technical SEO management",
          "Core Web Vitals optimisation",
          "4–6 SEO content pieces per month",
          "High-authority backlink outreach",
          "Conversion optimisation strategy",
          "Advanced competitor intelligence",
          "Bi-weekly reporting",
          "Strategic SEO consultation sessions",
        ],
        highlighted: false,
      },
    ],
    paymentTerms: [
      "Monthly payment in advance",
      "30-day cancellation notice",
      "No lock-in contract unless agreed",
      "GST not included (if applicable)",
    ],
  },

  // Navigation
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Certifications", href: "#certifications" },
    { label: "Skills", href: "#skills" },
    { label: "SEO Proposal", href: "/seo-proposal" },
  ],
};

export default siteConfig;
