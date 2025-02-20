<template>
  <nav
    ref="navigation"
    class="navigation"
  >
    <div class="navigation__container">
      <ul class="navigation__list">
        <li
          v-for="(item, itemIndex) in menu.slice(0, 8)"
          :key="`navigation${itemIndex}`"
          class="navigation__list-item-wrapper"
          :class="{ 'relative': is(item) !== 'TypeFourLevels' }"
          @mouseover="handleMouseOver(item)"
          @mouseleave="handleMouseLeave(item)"
        >
          <BaseLink
            :link="item"
            class="navigation__list-item"
            :class="{
              'with-subs': item.sub.length,
              'with-icon': item.icone
            }"
          >
            <nuxt-img
              v-if="item.icone"
              :src="item.icone"
              :alt="item.label"
              :title="item.label"
              width="24"
              height="24"
              loading="lazy"
              :sizes="'mb:24px dk:24px'"
              quality="85"
              format="webp"
            />

            <p :data-label="item.label">
              {{ item.label }}
            </p>
          </BaseLink>

          <component
            :is="is(item)"
            v-if="item.sub.length"
            :item="item"
            class="navigation__sub"
            :class="[ getSideClass(itemIndex) ]"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import BaseLink from '~/components/Base/BaseLink.vue';
import TypeDefault from './MenuTypes/TypeDefault/TypeDefault.vue';
import TypeExpandable from './MenuTypes/TypeExpandable/TypeExpandable.vue';
import TypeFourLevels from './MenuTypes/TypeFourLevels/TypeFourLevels.vue';

export default {
  name: 'NavigationDesktop',
  components: {
    BaseLink,
    TypeDefault,
    TypeExpandable,
    TypeFourLevels
  },
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  watch: {
    '$route.fullPath': {
      handler (newPath, oldPath) {
        if (newPath !== oldPath && (this.$refs.navigation)) {
          this.$refs.navigation.classList.add('no-pointer-events');

          setTimeout(() => {
            this.$refs.navigation.classList.remove('no-pointer-events');
          }, 500);
        }
      },
      immediate: true
    }
  },
  methods: {
    is (item) {
      if (this.hasFourLevels(item)) {
        return 'TypeFourLevels';
      }
      if (item.sub.some(e => e.sub.length)) {
        return 'TypeExpandable';
      }

      return 'TypeDefault';
    },
    handleMouseOver (item) {
      if (item.sub.length) {
        this.lockedBody();
      }
    },
    handleMouseLeave (item) {
      if (item.sub.length) {
        this.unlockedBody();
      }
    },
    lockedBody () {
      document.body.classList.add('locked');
    },
    unlockedBody () {
      document.body.classList.remove('locked');
    },
    getSideClass (index) {
      return index <= this.menu.length / 2 ? 'left' : 'right';
    },
    hasFourLevels (item) {
      return item.sub?.some(subItem => subItem.sub?.some(subSubItem => subSubItem.sub?.length > 0)) || false;
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
<style src="./styles.css" />
