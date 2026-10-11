import { Localized, LocalizedText } from '../core/i18n/language';
import { IconName } from '../shared/components/icon/icon';

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
}

export interface SkillGroup {
  title: LocalizedText;
  items: LocalizedText[];
}

export interface Profile {
  name: string;
  role: LocalizedText;
  tagline: LocalizedText;
  about: Localized<string[]>;
  highlights: { label: LocalizedText; value: LocalizedText }[];
  /** Reversed and base64 encoded, decoded only on click so it never appears in the HTML. */
  emailEncoded: string;
  /** Profile photo in /public. Remove it to hide the photo. */
  photo?: { src: string; width: number; height: number };
  /** Put the file in /public (e.g. public/cv.pdf) and set this to '/cv.pdf'. Empty hides the button. */
  cvUrl: string;
  /** Links with an empty url are hidden. */
  socials: SocialLink[];
  skills: SkillGroup[];
}

export const profile: Profile = {
  name: 'Nenad Jevtić',
  role: { en: 'Full-Stack Developer', sr: 'Full-stack developer' },
  tagline: {
    en: 'I build web applications end to end, from ASP.NET Core APIs and databases to Angular interfaces.',
    sr: 'Pravim web aplikacije od početka do kraja, od ASP.NET Core API-ja i baza podataka do Angular interfejsa.',
  },

  about: {
    en: [
      'I am a full-stack developer working mostly with .NET and Angular. On the backend I build REST APIs with ASP.NET Core and Entity Framework Core, with a layered architecture, validation, authentication and tests. On the frontend I build Angular applications with signals and standalone components.',
      'I like taking a feature from the database all the way to the screen, and I pay attention to business rules, clean code and a user interface that is pleasant to use.',
    ],
    sr: [
      'Ja sam full-stack developer i najviše radim u .NET-u i Angularu. Na backendu pravim REST API-je u ASP.NET Core-u i Entity Framework Core-u, sa slojevitom arhitekturom, validacijom, autentifikacijom i testovima. Na frontendu pravim Angular aplikacije sa signalima i standalone komponentama.',
      'Volim da jednu funkcionalnost provedem od baze podataka do ekrana, a posebnu pažnju posvećujem poslovnim pravilima, čistom kodu i interfejsu koji je prijatan za korišćenje.',
    ],
  },

  highlights: [
    {
      label: { en: 'Focus', sr: 'Fokus' },
      value: { en: '.NET & Angular', sr: '.NET i Angular' },
    },
    {
      label: { en: 'Location', sr: 'Lokacija' },
      value: { en: 'Serbia', sr: 'Srbija' },
    },
    {
      label: { en: 'Open to', sr: 'Otvoren za' },
      value: { en: 'Full-time & freelance', sr: 'Stalni posao i freelance' },
    },
  ],

  emailEncoded: 'dmVkLmNpdHZlamRhbmVuQHRjYXRub2M=',

  photo: { src: '/profile.jpg', width: 460, height: 460 },

  cvUrl: '',

  socials: [
    { label: 'GitHub', url: 'https://github.com/nenadjevtic01', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nenadjevtic01', icon: 'linkedin' },
  ],

  skills: [
    {
      title: 'Backend',
      items: [
        'C#',
        'ASP.NET Core',
        'Entity Framework Core',
        'REST API',
        'SignalR',
        'JWT',
        'PHP',
        'Laravel',
      ],
    },
    {
      title: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML', 'SCSS'],
    },
    {
      title: { en: 'Databases & tools', sr: 'Baze i alati' },
      items: ['SQL Server', 'SQL', 'Git', 'Swagger', 'xUnit', 'Vitest'],
    },
    {
      title: { en: 'Practices', sr: 'Pristupi' },
      items: [
        { en: 'Layered architecture', sr: 'Slojevita arhitektura' },
        { en: 'Unit testing', sr: 'Unit testiranje' },
        { en: 'Real-time features', sr: 'Funkcionalnosti uživo' },
        { en: 'Responsive design', sr: 'Responzivni dizajn' },
      ],
    },
  ],
};

export const visibleSocials = profile.socials.filter((link) => link.url);
