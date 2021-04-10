// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Holzwege',
  description: 'Holzwege is a blog/diary, a map of my thoughts without forcing them in a linear presentation.',
  icon: './src/assets/favicon-32x32.png',
  plugins: [],
  templates: {
    Holzwege: [
      {
        name: 'Holzwege',
        path: '/hz/:slug',
      },
    ],
    Trail: [
      {
        name: 'Trail',
        path: '/trail/:uuid',
      },
    ],
  },
};
