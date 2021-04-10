<template>
  <div :class="`trail-step-${type}`">
    <g-link :to="url">
      {{ label }}
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    step: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /**
     * Returns the label associated
     * to the step
     */
    label() {
      if (this.step.caption) {
        return this.step.caption;
      }

      if (this.step.title) {
        return this.step.title;
      }

      if (this.step.trail) {
        const direction = this.type === 'forward' ? 'Next' : 'Previous';

        return `${direction} in ${this.step.trail.title}`;
      }

      return 'Untitled';
    },
    /**
     * Returns the related URL
     */
    url() {
      return `/hz/${this.step.slug}`;
    },
  },
};
</script>

<style scoped>
.trail-step-forward {
  text-align: right;
}

.trail-step-origin {
  text-align: left;
}
</style>
