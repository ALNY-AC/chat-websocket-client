<template>
  <div class="default">
    <!-- <nuxt></nuxt> -->
    <nuxt class="nuxt" />
  </div>
</template>

<script>
export default {
  middleware: "root",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {
    $route(to) {},
    active(v) {}
  }
};
</script>
<style lang="scss" scoped>
@import "default.scss";
</style>
<style>
</style>
