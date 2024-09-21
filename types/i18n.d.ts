export interface Translations {
    general: {
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
    };
    services: {
      title: string;
      privateTutoring: {
        title: string;
        description: string;
        cta: string;
      };
      dataConsultancy: {
        title: string;
        description: string;
        cta: string;
      };
      photography: {
        title: string;
        description: string;
        cta: string;
      };
      music: {
        title: string;
        description: string;
        cta: string;
      };
    };
    about: {
      title: string;
      intro: string;
      content: string;
      sections: {
        academicWorks: {
          title: string;
          content: string;
          works: Array<{
            title: string;
            type: string;
            description: string;
            file: string;  // Added this line
          }>;
        };
        interests: {
          title: string;
          content: string;
          list: string;
        };
        languages: {
          title: string;
          content: string;
          list: string;
        };
        teaching: {
          title: string;
          content: string;
        };
        education: {
          title: string;
          content: string;
          expanded: string;
        };
        tutoring: {
          title: string;
          content: string;
          expanded: string;
          years: string;
        };
        research: {
          title: string;
          content: string;
          details: string;
        };
        techStack: {
          title: string;
          content: string;
        };
      };
    };
    expertise: {
      title: string;
      summary: string;
      items: {
        advancedEducation: string;
        diverseKnowledge: {
          title: string;
          details: string;
        };
        problemSolving: {
          title: string;
          details: string;
        };
        programmingSkills: {
          title: string;
          details: string;
        };
        lifelongLearner: {
          title: string;
          details: string;
        };
        researchAppliedMath: string;
      };
    };
    photos: {
      outdoor: {
        caption: string;
      };
      teaching: {
        caption: string;
      };
    };
  }
  
  declare module 'i18next' {
    interface CustomTypeOptions {
      resources: {
        common: Translations;
      };
    }
  }