export interface ExpertiseItemData {
  title: string;
  details: string;
}

export interface ExpertiseSectionData {
  title: string;
  summary: string;
  items: {
    [key: string]: string | ExpertiseItemData;
  };
}

// General interface
export interface General {
  name: string;
  intro: string;
  comingSoon: string;
  readMore: string;
  readLess: string;
  showMore: string;
  showLess: string;
  goTo: string;
  visitSite: string;
  additionalInfo: string;
}

// Service interface
export interface Service {
  title: string;
  description: string;
  cta: string;
}

// Services interface
export interface Services {
  title: string;
  privateTutoring: Service;
  dataConsultancy: Service;
  photography: Service;
  music: Service;
}

// Academic Work interface
export interface AcademicWork {
  title: string;
  type: string;
  description: string;
  file: string;
}

// About Section interface
export interface AboutSection {
  title: string;
  content: string;
}

// About interface
export interface About {
  title: string;
  intro: string;
  content: string;
  sections: {
    academicWorks: AboutSection & {
      works: AcademicWork[];
    };
    interests: AboutSection & {
      list: string;
    };
    languages: AboutSection & {
      list: string;
    };
    teaching: AboutSection;
    education: AboutSection & {
      expanded: string;
    };
    tutoring: AboutSection & {
      expanded: string;
      years: string;
    };
    research: AboutSection & {
      details: string;
    };
    techStack: AboutSection;
  };
}

// Expertise interfaces
// export interface ExpertiseItem {
//   title: string;
//   description: string;
//   details?: string[];
// }

// export interface ExpertiseSection {
//   title: string;
//   summary: string;
//   categories: {
//     [key: string]: ExpertiseItem[];
//   };
// }

// Photos interface
export interface Photos {
  outdoor: { caption: string };
  teaching: { caption: string };
}

// Main Translations interface
export interface Translations {
  general: General;
  services: Services;
  about: About;
  expertise: ExpertiseSectionData;
  photos: Photos;
}

// i18next module declaration
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: Translations;
    };
  }
}