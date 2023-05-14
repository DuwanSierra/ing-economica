import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Capitalización y Amortización',
      href: getPermalink('/amortizacion'),
    },
    {
      text: 'Anualidades',
      href: getPermalink('/anualidades'),
    },
    {
      text: 'Conversiones',
      href: getPermalink('/conversiones'),
    },
    {
      text: 'Descuentos',
      href: getPermalink('/descuentos'),
    },
    {
      text: 'Interes',
      href: getPermalink('/interes'),
    },
    {
      text: 'Renta perpetua',
      href: getPermalink('/renta-perpetua'),
    },
  ],
  actions: [
  ],
};
  
export const footerData = {
  links: [
    {
      title: 'Acerca de este proyecto',
      links: [
        { text: 'Código fuente', href: '' },
        { text: 'Grupo 301', href: '' },
        { text: 'Ingeniería económica', href: '' },
      ],
    },
    {
      title: 'Desarrolladores',
      links: [
        { text: 'Duwan Sierra 20231678001', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 float-left rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
