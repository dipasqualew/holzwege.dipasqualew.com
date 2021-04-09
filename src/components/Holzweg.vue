<template>
  <div>
    <h3 v-if="holzwege.title">
      {{ holzwege.title }}
    </h3>
    <div v-html="holzwege.html" />
    <TrailMap :origins="holzwege.origins" :forwards="holzwege.forwards" />
  </div>
</template>

<script>
import TrailMap from './TrailMap.vue';

export default {
  components: {
    TrailMap,
  },

  props: {
    holzwege: {
      type: Object,
      required: true,
    }
  }

};
</script>
