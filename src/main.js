// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Plausible from 'plausible-tracker'

import DefaultLayout from '~/layouts/Default.vue';
import Container from '~/components/atoms/Container.vue';
import Paragraph from '~/components/atoms/Paragraph.vue';

import 'spectre.css';
import './assets/main.css';

const plausible = Plausible({
  domain: process.env.GRIDSOME_BASE_URL,
  trackLocalhost: true,
  apiHost: process.env.GRIDSOME_PLAUSIBLE_HOST,
});


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  Vue.component('Container', Container);
  Vue.component('Paragraph', Paragraph);

  router.afterEach(async () => {
    try {
      await plausible.trackPageview();
    } catch {
      // eat away errors
    }
  });

  head.meta.push({
    name: 'author',
    content: 'William Di Pasquale',
  });

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;1,100&display=swap',
  });
}
