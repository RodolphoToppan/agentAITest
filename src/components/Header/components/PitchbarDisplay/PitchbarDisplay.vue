<template>
  <div class="pitchbar">
    <div
      v-if="isMounted"
      class="pitchbar-holder"
    >
      <VueSlick
        v-bind="pitchbarSettings"
        ref="slick"
        class="pitchbar__slick"
      >
        <div
          v-for="item in dataPitchbar.menu"
          :key="item.label"
          class="pitchbar__slider-item-wrapper"
        >
          <BaseLink
            :link="item"
            class="pitchbar__slider-item-link"
          >
            <p
              class="pitchbar__slider-item"
              v-html="item.label"
            />
          </BaseLink>
        </div>
      </VueSlick>
    </div>
  </div>
</template>

<script>

import VueSlick from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import BaseLink from '~/components/Base/BaseLink.vue';

export default {
  name: 'PitchbarDisplay',
  components: {
    VueSlick,
    BaseLink

  },
  data () {
    return {
      isMounted: false,
      pitchbarSettings: {
        dots: false,
        arrows: false,
        fade: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000
      }
    };
  },
  computed: {
    dataPitchbar () {
      return this.$store.state.MainHeader.dataPitchbar;
    },
    isMobile () {
      return this.$store.state.screenWidth < 1024;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.isMounted = true;
    });
  }
};
</script>

<style src="./styles.css" />
<style scoped src="./styles.scoped.css" />
