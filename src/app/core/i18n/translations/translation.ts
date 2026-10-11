export interface Translation {
  htmlLang: string;
  ogLocale: string;
  meta: {
    description: string;
  };
  nav: {
    label: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    toggleMenu: string;
    toggleTheme: string;
    language: string;
  };
  hero: {
    greeting: string;
    viewProjects: string;
    downloadCv: string;
    getInTouch: string;
  };
  about: {
    title: string;
  };
  projects: {
    title: string;
    lead: string;
    demo: string;
    source: string;
  };
  skills: {
    title: string;
  };
  contact: {
    title: string;
    text: string;
    send: string;
    copy: string;
    copied: string;
  };
  footer: {
    backToTop: string;
  };
  notFound: {
    title: string;
    text: string;
    backHome: string;
  };
}
