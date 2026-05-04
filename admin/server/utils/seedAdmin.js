require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Content = require('../models/Content');

// ── Seed initial content from the current siteConfig ─────────────────────────
const initialContent = {
  personal: {
    name: 'Ashraful Alam Ashik',
    shortName: 'AAA',
    initials: 'AAA',
    title: 'Digital Operation Manager | SEO Specialist | WordPress Developer',
    tagline: 'SEO · Web Design · Digital Operations',
    location: 'Birgram, Kharna, Shajahanpur, Bogura-5800, Bangladesh',
    phone: '+8801737940250',
    email: 'aa.ashik777@gmail.com',
    whatsapp: 'http://wa.me/+8801737940250',
    linkedin: 'https://www.linkedin.com/in/ashraful-alam-ashik/',
    experience: '3+',
    cvPath: '/cv-ashraful-alam-ashik.pdf',
    profileImage: '/profile.png',
  },
  hero: {
    typewriterTexts: ['SEO Expert', 'Web Designer', 'Digital Operations Manager'],
    stats: [
      { value: '50+', label: 'Projects Completed' },
      { value: '30+', label: 'Happy Clients' },
      { value: '3+', label: 'Years Experience' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
  },
  about: {
    paragraphs: [
      'Dynamic Digital Operation Manager with 3+ years of proven expertise in SEO optimization, team leadership, and digital operations. Successfully managed two operational branches and led cross-functional teams to deliver high-impact SEO campaigns.',
      'Currently serving as Assistant Operation (Technical SEO Specialist & WordPress Customization) at Future Minds Academy, where I oversee all digital operations, content workflow, and performance monitoring. I lead SEO, website management, and automation-based operational improvements.',
      'Demonstrated proficiency in WordPress development, PHP customization, automation workflows (n8n), and prompt engineering. Committed to driving digital growth through data-driven strategies and operational excellence.',
    ],
    quickStats: [
      { value: '200+', label: 'Team Members Managed' },
      { value: '2', label: 'Branches Managed' },
    ],
  },
  experience: {
    current: {
      title: 'Assistant Operation (Technical SEO Specialist & WordPress Customization)',
      company: 'Future Minds Academy',
      period: 'Nov 2024 - Present',
      location: 'Bogura, Bangladesh',
      description: [
        'Overseeing all digital operations, content workflow, and performance monitoring',
        'Leading SEO, website management, and automation-based operational improvements',
        'Developing conversion-focused website funnels to improve student sign-ups',
        'Managing cross-functional teams to ensure high-quality digital service delivery',
      ],
    },
    previous: [
      {
        title: 'SEO In-Charge',
        company: 'SEO Expate BD',
        period: 'May 2024 - Nov 2024',
        location: 'Bogura, Bangladesh',
        description: [
          'Managed SEO operations and supervised 200+ professionals',
          'Implemented advanced Technical SEO strategies, resulting in significant improvements in search rankings and organic traffic',
          'Designed and customized WordPress websites with PHP-based solutions and landing pages',
        ],
      },
      {
        title: 'SEO Team Leader',
        company: 'SEO Expate BD',
        period: 'Dec 2023 - May 2024',
        location: 'Bogura, Bangladesh',
        description: [
          'Led a team of SEO professionals in executing client projects',
          'Conducted comprehensive website audits and resolved critical technical issues',
        ],
      },
      {
        title: 'SEO Worker',
        company: 'SEO Expate BD',
        period: 'Sep 2023 - Dec 2023',
        location: 'Bogura, Bangladesh',
        description: [
          'Performed on-page and off-page SEO tasks',
          'Assisted in keyword research and competitor analysis',
        ],
      },
    ],
  },
  certifications: [
    { title: 'Search Engine Optimization (SEO)', issuer: 'SEO Expate Bangladesh Ltd.', year: '2023', icon: 'seo', image: '' },
    { title: 'Website Design & WordPress Customization', issuer: 'Institute of Technical & IT', year: '2024', icon: 'web', image: '' },
    { title: 'Leadership & Team Management', issuer: 'SEO Expate Bangladesh Ltd.', year: '2024', icon: 'leadership', image: '' },
    { title: 'Computer Office Application', issuer: 'Institute of Technical & IT', year: '2019', icon: 'office', image: '' },
  ],
  services: [
    { title: 'SEO-Optimized Website Design', description: 'WordPress websites built from the ground up for search visibility and conversion. Clean code, fast loading, and mobile-first design.', icon: 'Globe', tags: ['WordPress', 'SEO Ready', 'Responsive'] },
    { title: 'Technical SEO & Performance', description: 'Comprehensive site audits, speed optimization, schema markup implementation, and technical fixes that improve rankings.', icon: 'Zap', tags: ['Site Audits', 'Speed Optimization', 'Schema Markup'] },
    { title: 'Website Redesign', description: 'Transform outdated websites into modern, fast, conversion-focused platforms that reflect your brand and drive results.', icon: 'RefreshCw', tags: ['UI/UX', 'Conversion Focus', 'Modern Design'] },
  ],
  caseStudies: [
    { category: 'E-COMMERCE', title: 'E-commerce SEO Optimization for Local Retailer', problem: 'A local retail client was struggling with low organic visibility, poor site speed (8+ seconds load time), and zero conversions from organic traffic.', solution: 'Implemented comprehensive technical SEO audit, optimized 150+ product pages with proper schema markup, improved Core Web Vitals, and built quality backlinks from industry-relevant sites.', results: ['Page load time reduced from 8s to 2.1s', 'Organic traffic increased by 180% in 4 months', '15 keywords ranked on first page of Google', 'Organic conversions increased from 0 to 45/month'], featured: true, image: '' },
    { category: 'CORPORATE', title: 'Corporate Website Redesign for Service Company', problem: 'A B2B service company had an outdated website with poor mobile experience, high bounce rate (78%), and low lead generation.', solution: 'Redesigned the entire website with modern UI/UX, implemented conversion-focused landing pages, optimized for mobile-first indexing, and integrated CRM for lead tracking.', results: ['Bounce rate reduced from 78% to 32%', 'Mobile traffic engagement increased by 150%', 'Lead generation improved by 220%', 'Average session duration increased by 3x'], featured: false, image: '' },
  ],
  skills: ['Technical SEO', 'On-page SEO', 'Off-page SEO', 'WordPress', 'PHP Customization', 'Page Speed Optimization', 'Schema Markup', 'Google Analytics', 'Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'n8n Automation', 'HTML/CSS', 'JavaScript', 'Landing Page Design', 'Core Web Vitals', 'Team Leadership', 'Project Management'],
  whyWorkWithMe: [
    { title: 'Proven Leadership Experience', description: 'Managed 200+ professionals across two operational branches. I understand how to lead teams and deliver results at scale.' },
    { title: 'Full-Stack Digital Expertise', description: 'From SEO strategy to WordPress development to digital operations—I handle the complete digital ecosystem.' },
    { title: 'Data-Driven Approach', description: 'Every decision is backed by analytics and focused on measurable ROI for your business.' },
    { title: 'Automation & Efficiency', description: 'Expert in n8n workflows and process automation to streamline operations and reduce manual work.' },
    { title: 'International Client Experience', description: 'Experience working with clients from USA, UK, and other international markets with clear communication.' },
  ],
  seoProposal: {
    title: 'SEO Proposal',
    subtitle: 'Choose the plan that fits your business goals',
    plans: [
      { name: 'Starter SEO Plan', price: '$120', period: 'month', description: 'Perfect for small businesses starting their SEO journey', features: ['Technical SEO health monitoring', 'Basic on-page optimisation', 'Optimisation of 1 page per month', 'Keyword tracking (up to 10 keywords)', 'Foundational backlink building', 'Google Search Console monitoring', 'Monthly performance report'], highlighted: false, badge: '' },
      { name: 'Growth SEO Plan', price: '$350', period: 'month', description: 'Ideal for growing businesses seeking aggressive growth', features: ['Everything in Starter Plan', 'Advanced technical optimisation', 'Optimisation of up to 3 pages per month', '2 SEO-optimised blog posts per month', 'Competitor keyword analysis', 'Quality backlink outreach campaign', 'Keyword tracking (up to 30 keywords)', 'Local SEO optimisation support', 'Detailed monthly strategy report'], highlighted: true, badge: 'Most Popular' },
      { name: 'Authority SEO Plan', price: '$750', period: 'month', description: 'For enterprises seeking market dominance', features: ['Everything in Growth Plan', 'Full technical SEO management', 'Core Web Vitals optimisation', '4–6 SEO content pieces per month', 'High-authority backlink outreach', 'Conversion optimisation strategy', 'Advanced competitor intelligence', 'Bi-weekly reporting', 'Strategic SEO consultation sessions'], highlighted: false, badge: '' },
    ],
    paymentTerms: ['Monthly payment in advance', '30-day cancellation notice', 'No lock-in contract unless agreed', 'GST not included (if applicable)'],
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Skills', href: '#skills' },
    { label: 'SEO Proposal', href: '/seo-proposal' },
  ],
  settings: {
    googleAnalyticsId: '',
    siteTitle: 'Ashraful Alam Ashik | Portfolio',
    metaDescription: 'SEO Specialist, Web Designer & Digital Operations Manager based in Bangladesh.',
  },
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Create admin user
  const existing = await User.findOne({ username: process.env.ADMIN_USERNAME });
  if (!existing) {
    await User.create({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
    console.log(`✅ Admin user created: ${process.env.ADMIN_USERNAME}`);
  } else {
    console.log('ℹ️  Admin user already exists — skipping');
  }

  // Seed content
  const existingContent = await Content.findOne();
  if (!existingContent) {
    await Content.create(initialContent);
    console.log('✅ Initial content seeded');
  } else {
    console.log('ℹ️  Content already exists — skipping seed');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch(console.error);
