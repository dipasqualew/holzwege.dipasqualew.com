<template>
  <div>
    <TrailStep v-for="step in origins" :key="step.uuid" type="origin" :step="step" />
    <TrailStep v-for="step in forwards" :key="step.uuid" type="forward" :step="step" />
  </div>
</template>

<script>
import TrailStep from './TrailStep.vue';

export default {
  components: {
    TrailStep,
  },

  props: {
    origins: {
      type: Array,
      required: true,
    },
    forwards: {
      type: Array,
      required: true,
    },
  },
}
</script>
