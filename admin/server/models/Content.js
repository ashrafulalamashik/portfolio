const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({ value: String, label: String }, { _id: false });
const navItemSchema = new mongoose.Schema({ label: String, href: String }, { _id: false });

const contentSchema = new mongoose.Schema(
  {
    personal: {
      name: { type: String, default: '' },
      shortName: { type: String, default: '' },
      initials: { type: String, default: '' },
      title: { type: String, default: '' },
      tagline: { type: String, default: '' },
      location: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      experience: { type: String, default: '3+' },
      cvPath: { type: String, default: '/cv-ashraful-alam-ashik.pdf' },
      profileImage: { type: String, default: '/profile.png' },
    },

    hero: {
      typewriterTexts: [String],
      stats: [statSchema],
    },

    about: {
      paragraphs: [String],
      quickStats: [statSchema],
    },

    experience: {
      current: {
        title: String,
        company: String,
        period: String,
        location: String,
        description: [String],
      },
      previous: [
        {
          title: String,
          company: String,
          period: String,
          location: String,
          description: [String],
        },
      ],
    },

    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
        icon: String,
        image: String,
      },
    ],

    services: [
      {
        title: String,
        description: String,
        icon: String,
        tags: [String],
      },
    ],

    caseStudies: [
      {
        category: String,
        title: String,
        problem: String,
        solution: String,
        results: [String],
        featured: { type: Boolean, default: false },
        image: String,
      },
    ],

    skills: [String],

    whyWorkWithMe: [
      {
        title: String,
        description: String,
      },
    ],

    seoProposal: {
      title: String,
      subtitle: String,
      plans: [
        {
          name: String,
          price: String,
          period: String,
          description: String,
          features: [String],
          highlighted: { type: Boolean, default: false },
          badge: String,
        },
      ],
      paymentTerms: [String],
    },

    navigation: [navItemSchema],

    settings: {
      googleAnalyticsId: { type: String, default: '' },
      siteTitle: { type: String, default: 'Ashraful Alam Ashik | Portfolio' },
      metaDescription: { type: String, default: '' },
    },

    lastSaved: { type: Date, default: null },
    lastPublished: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
