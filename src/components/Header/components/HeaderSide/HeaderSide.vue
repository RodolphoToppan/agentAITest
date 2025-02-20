<template>
  <transition
    name="transition-header-side"
    @before-enter="lockedBody"
    @after-leave="unlockedBody"
  >
    <div
      v-show="show"
      class="header-side__wrapper"
      @click.self="closeHeaderSide"
    >
      <div class="header-side">
        <div class="header-side-left">
          <NavigationMobile
            ref="menuNavigationRef"
            :menu="menu"
            class="header-side__menu"
            @closeAll="closeHeaderSide"
          />
        </div>

        <div class="header-side__right">
          <button
            class="header-side__close"
            @click="closeHeaderSide"
          >
            <IconClose class="header-side__close__icon" />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IconClose from '~/static/icons/IconClose.vue';
import NavigationMobile from '../NavigationMobile/NavigationMobile.vue';

export default {
  name: 'HeaderSide',
  components: {
    IconClose,
    NavigationMobile
  },
  props: {
    menu: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    '$route.fullPath' (val, oldVal) {
      if (val !== oldVal) {
        this.closeHeaderSide();
      }
    }
  },
  methods: {
    closeHeaderSide () {
      const allSubmenus = this.$refs.menuNavigationRef
        ? this.$refs.menuNavigationRef.$el
        : false;

      if (allSubmenus) {
        allSubmenus
          .querySelectorAll('aside.menu__nav-sub-menu')
          .forEach((submenu) => {
            submenu.classList.remove('openSub');
          });
      }

      this.$emit('close');
    },
    lockedBody () {
      document.body.classList.add('locked');
    },
    unlockedBody () {
      document.body.classList.remove('locked');
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
