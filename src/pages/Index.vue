<template>
  <Layout>
    <Container>
      <Paragraph>
        Holzwege is a blog/diary. Since graduation I have struggled with writing.
        While books expect me to present ideas in a linear fashion, I find myself wondering around
        rather than following a pre-established path. Most often than not I prefer to turn in the sideway
        and explore an unrelated topic.
      </Paragraph>
      <Paragraph>
        I believe that writing is fundamentally different from talking.
        Possibly, I have inherited Plato's hate for the written word.
        Holzwege, from Heidegger's famous book, is my attempt to fall in love with writing again.
        Holzwege will be all about fragmentation, mapping a forest and getting lost in a forest.
        In Holzwege, each post can connect with multiple posts, so when you find yourself reading
        a topic, you might want to switch to another, by following a different path.
      </Paragraph>
      <Paragraph>
        There isn't a good or a bad way to explore, when it comes to leisure.
        We are all guests on the Internet and in this piece in particular, so please go ahead.
      </Paragraph>
      <Paragraph>
        You can open <g-link :to="`/hz/${$page.latestHolzwege.edges[0].node.slug}`">
          the latest Holzwege
        </g-link>,
        or explore one of the main topics:
      </Paragraph>
      <Paragraph>
        <div v-for="trail in $page.allTrail.edges" :key="trail.node.uuid">
          <g-link :to="`/trail/${trail.node.uuid}`">
            {{ trail.node.title }}
          </g-link>
        </div>
      </Paragraph>
    </Container>
    <Container>
      <Paragraph>
        Holzwege is open source and licensed under GNU Affero General Public License.
      </Paragraph>
      <Paragraph>
        It's a static site generated via Vue.js and Gridsome and powered by a Directus API, published on Netlify via GitHub actions.
      </Paragraph>
      <Paragraph>
        You can find the source code on GitHub:
        <a href="https://github.com/dipasqualew/holzwege.dipasqualew.com" target="_blank" rel="noopener noreferrer">dipasqualew/holzwege.dipasqualew.com</a>
      </Paragraph>
    </Container>
  </Layout>
</template>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

<page-query>
query {
  allTrail(filter: { promoted: { eq: true } }) {
    edges {
      node {
        uuid
        title
      }
    }
  }

  latestHolzwege: allHolzwege(sortBy: "date_created", order: DESC, limit: 1) {
    edges {
      node {
        id,
        uuid,
        slug,
        topic {
          uuid,
          title,
        },
        title,
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
  }
}
</page-query>
