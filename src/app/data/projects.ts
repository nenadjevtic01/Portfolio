import { LocalizedText } from '../core/i18n/language';

export interface Project {
  title: LocalizedText;
  description: LocalizedText;
  tech: string[];
  repoUrl?: string;
  demoUrl?: string;
  /** Path to an image in /public, e.g. '/projects/my-app.png' */
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'Flex Travel',
    description: {
      en: 'A platform for selling travel packages from multiple partner agencies, with bookings, hotel and room selection, payments, reviews and real-time notifications. Includes separate panels for agencies and administrators and is covered by more than 100 backend tests.',
      sr: 'Platforma za prodaju turističkih aranžmana više partnerskih agencija, sa rezervacijama, izborom hotela i soba, uplatama, recenzijama i obaveštenjima uživo. Ima posebne panele za agencije i administratore i pokrivena je sa više od 100 backend testova.',
    },
    tech: ['ASP.NET Core', 'EF Core', 'SQL Server', 'SignalR', 'Angular', 'xUnit'],
    repoUrl: 'https://github.com/nenadjevtic01/FlexTravel',
  },
  {
    title: 'EShopper',
    description: {
      en: 'An online clothing store built as my bachelor thesis: product catalog, cart, checkout, user accounts with password reset and an admin panel, backed by a layered ASP.NET Core Web API.',
      sr: 'Online prodavnica odeće rađena kao diplomski rad: katalog proizvoda, korpa, poručivanje, korisnički nalozi sa resetovanjem lozinke i admin panel, uz slojeviti ASP.NET Core Web API.',
    },
    tech: ['ASP.NET Core', 'EF Core', 'SQL Server', 'Angular', 'JWT'],
  },
  {
    title: 'FlexShop',
    description: {
      en: 'An online shop built with the Laravel framework, with server-rendered Blade views and a database created through migrations.',
      sr: 'Online prodavnica napravljena u Laravel framework-u, sa Blade šablonima koji se renderuju na serveru i bazom podataka napravljenom kroz migracije.',
    },
    tech: ['PHP', 'Laravel', 'Blade', 'JavaScript'],
    repoUrl: 'https://github.com/nenadjevtic01/FlexShopProject',
  },
  {
    title: 'Portfolio',
    description: {
      en: 'This website. A prerendered, bilingual Angular app built with standalone components and signals, with a light and dark theme.',
      sr: 'Ovaj sajt. Prerenderovana, dvojezična Angular aplikacija napravljena sa standalone komponentama i signalima, sa svetlom i tamnom temom.',
    },
    tech: ['Angular', 'SSR', 'i18n', 'SCSS'],
    repoUrl: 'https://github.com/nenadjevtic01/Portfolio',
  },
];
