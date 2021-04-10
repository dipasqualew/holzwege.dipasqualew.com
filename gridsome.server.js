const axios = require('axios');
const marked = require('marked');

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const getTrails = async () => {
  const fields = ['*'];

  const response = await axios.get('https://data.dipasqualew.com/items/holzwege_trails', {
    params: { fields },
  });

  return response.data.data;
};

const getHolzwege = async () => {
  const fields = [
    '*',
    'origins.topic',
    'origins.origin_caption',
    'origins.forward_caption',
    'origins.origin.uuid',
    'origins.origin.title',
    'forwards.topic',
    'forwards.origin_caption',
    'forwards.forward_caption',
    'forwards.forward.uuid',
    'forwards.forward.title',
  ].join(',');

  const response = await axios.get('https://data.dipasqualew.com/items/holzwege', {
    params: { fields },
  });

  return response.data.data;
};

const getHolzwegeSlug = (node) => {
  const prefix = node.title ? node.title.replace(/[\W_-]+/g, '-').toLowerCase() : 'untitled';
  const slug = `${prefix}-${node.uuid}`;

  return slug;
};

/**
 * Loads data sources
 *
 * @param api
 */
module.exports = function loader(api) {
  api.loadSource(async ({ addCollection, store }) => {
    const trailsCollection = addCollection({ typeName: 'Trail' });
    const trailUuidMap = {};
    const trails = await getTrails();

    trails.forEach((trail) => {
      const item = trailsCollection.addNode({ ...trail, id: trail.uuid });
      trailUuidMap[trail.uuid] = item.id;
    });

    const holzwege = addCollection({ typeName: 'Holzwege' });

    const items = await getHolzwege();

    items.forEach((item) => {
      const origins = (item.origins || []).map((origin) => ({
        uuid: origin.origin.uuid,
        title: origin.origin.title || '',
        slug: getHolzwegeSlug(origin.origin),
        caption: origin.origin_caption || '',
        trail: store.createReference('Trail', origin.trail),
      }));

      const forwards = (item.forwards || []).map((forward) => ({
        uuid: forward.forward.uuid,
        title: forward.forward.title || '',
        slug: getHolzwegeSlug(forward.forward),
        caption: forward.forward_caption || '',
        trail: store.createReference('Trail', forward.trail),
      }));

      const node = {
        ...item,
        id: item.id,
        topic: store.createReference('Trail', item.topic),
        html: marked(item.body),
        origins,
        forwards,
        slug: getHolzwegeSlug(item),
      };

      holzwege.addNode(node);
    });
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  });

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api/
  // });
};
