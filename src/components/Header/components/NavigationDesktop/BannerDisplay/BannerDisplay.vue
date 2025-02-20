<template>
  <BaseAnchor
    :link="banner.link"
    :wrapper="'div'"
    class="banner-display"
  >
    <nuxt-img
      :src="banner.icone"
      :alt="banner.label"
      :title="banner.label"
      width="300"
      height="384"
      loading="lazy"
      :sizes="'mb:300px dk:300px'"
      quality="85"
      format="webp"
      class="banner-display__image"
    />
  </BaseAnchor>
</template>

<script>
import BaseAnchor from '~/components/Base/BaseAnchor.vue';

export default {
  name: 'BannerDisplay',
  components: {
    BaseAnchor
  },
  props: {
    banner: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
