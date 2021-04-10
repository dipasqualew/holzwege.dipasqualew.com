<template>
  <Layout>
    <Container>
      <Holzweg :holzwege="$page.holzwege" />
    </Container>
  </Layout>
</template>

<script>
import Holzweg from '../components/Holzweg.vue';


export default {
  components: {
    Holzweg,
  },

  /**
   * Meta Info
   */
  metaInfo() {
    const title = this.$page.holzwege.title || 'Untitled';

    const keywords = [
      ...title.replace(/[\W-_\s]+/, ' ').split(' '),
      'Holzwege',
      'William Di Pasquale',
    ];

    return {
      title,
      meta: [
        {
          name: 'description',
          content: this.$page.holzwege.body
            .split('.')
            .slice(0, 3)
            .join('.')
            .substring(0, 180),
        },
        {
          name: 'keywords',
          content: keywords.join(', '),
        },
      ],
    };
  },
};
</script>

<page-query>
query ($id: ID!) {
  holzwege(id: $id) {
    id,
    uuid,
    slug,
    topic {
      uuid,
      title,
    },
    title,
    body,
    html,
    forwards {
      uuid,
      caption,
      trail {
        title,
      }
      title,
      slug,
    },
    origins {
      uuid,
      caption,
      trail {
        title
      }
      title,
      slug,
    }
  }
}
</page-query>
