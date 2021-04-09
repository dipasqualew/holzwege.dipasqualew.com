<template>
  <Layout>
    <div>
      <h2>Topic: {{ $page.trail.title }}</h2>
      <div>{{ $page.trail.description }}</div>
    </div>
    <div style="margin-top: 50px">
      <h4>Latest Holwege</h4>
      <TrailStep v-for="step in $page.holzwege.edges" :key="step.node.uuid" type="origins" :step="step.node" />
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  trail(id: $id) {
    uuid,
    title,
    description,
    promoted,
  }

  holzwege: allHolzwege(filter: { topic: { eq: $id }}) {
    edges {
      node {
        uuid,
        title,
        slug,
      }
    }
  }
}
</page-query>

<script>
import TrailStep from '../components/TrailStep.vue';

export default {
  components: {
    TrailStep,
  }
}
</script>
