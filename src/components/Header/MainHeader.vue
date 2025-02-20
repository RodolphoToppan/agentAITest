<template>
  <header
    id="header"
    class="header"
    :class="{ 'up-index': showSideNavigation }"
  >
    <!-- <PitchbarDisplay
      v-if="dataPitchbar?.menu?.length"
      class="header-pitchbar force-fill"
    /> -->

    <div class="header-wrapper-background force-fill">
      <div class="header-wrapper">
        <div class="header-line-one">
          <div class="header-left-container">
            <ButtonMenu
              v-if="isMobile"
              class="header-button-menu"
              @click="showSideNavigation = !showSideNavigation"
            />

            <nuxt-link
              to="/"
              class="header-logo"
            >
              <IconLogoMobiis />
            </nuxt-link>
          </div>

          <UappiSearch
            v-if="!isMobile"
            :sugestoes="true"
            :showPrecoPor="true"
            :showPrecoDe="true"
            :limit="4"
            textPlaceholder="O que você está procurando?"
            class="header-search"
          />

          <div class="header-actions">
            <ButtonCart />
            <UserInformation />
          </div>
        </div>

        <div class="header-line-two">
          <NavigationDesktop
            v-if="!isMobile && remappedMenu"
            :menu="remappedMenu"
            class="force-fill"
          />

          <UappiSearch
            v-if="isMobile"
            :sugestoes="true"
            :showPrecoPor="true"
            :showPrecoDe="true"
            :limit="4"
            textPlaceholder="O que você está procurando?"
            class="header-search"
          />
        </div>
      </div>
    </div>

    <HeaderSide
      v-if="isMobile && remappedMenu"
      :show="showSideNavigation"
      :menu="remappedMenu"
      @close="showSideNavigation = false"
    />
  </header>
</template>

<script>

import IconLogoMobiis from '~/static/icons/IconLogoMobiis.vue';
import ButtonCart from '../Button/ButtonCart/ButtonCart.vue';
import ButtonMenu from '../Button/ButtonMenu/ButtonMenu.vue';
import UserInformation from './components/UserInformation.vue';
// import PitchbarDisplay from './components/PitchbarDisplay/PitchbarDisplay.vue';
import UappiSearch from '~/Packages/Search/Search.vue';
import NavigationDesktop from './components/NavigationDesktop/NavigationDesktop.vue';
import HeaderSide from './components/HeaderSide/HeaderSide.vue';

export default {
  name: 'MainHeader',
  components: {
    IconLogoMobiis,
    // PitchbarDisplay,
    UappiSearch,
    NavigationDesktop,
    HeaderSide,
    ButtonCart,
    ButtonMenu,
    UserInformation
  },
  data () {
    return {
      showSideNavigation: false,
      showDialogSearch: false,
      showDialogUser: false,
      dataMenuImages: null,
      pitfixo: false,
      menufixo: false
    };
  },
  // async fetch () {
  //   await this.$axios
  //     .request({
  //       method: 'get',
  //       url: '/v2/front/struct/menus/header-pitchbar'
  //     })
  //     .then((response) => {
  //       this.$store.commit('MainHeader/setDataPitchbar', response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.error);
  //     });

  //   await this.$axios
  //     .request({
  //       method: 'get',
  //       url: '/v2/front/struct/menus/header-menu'
  //     })
  //     .then((response) => {
  //       this.$store.commit('MainHeader/setDataMenu', response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.error);
  //     });

  //   await this.$axios
  //     .request({
  //       method: 'get',
  //       url: '/v2/front/struct/menus/header-item-with-four-levels'
  //     })
  //     .then((response) => {
  //       this.$store.commit('MainHeader/setDataItemWithFourLevels', response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.error);
  //     });

  //   await this.$axios
  //     .request({
  //       method: 'get',
  //       url: '/v2/front/struct/menus/header-search-suggestions'
  //     })
  //     .then((response) => {
  //       this.$store.commit('MainHeader/setDataSearchSuggestions', response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.error);
  //     });
  // },
  computed: {
    // dataMenu () {
    //   return this.$store.state.MainHeader.dataMenu;
    // },
    remappedMenu () {
      return this.$store.getters['MainHeader/remappedMenu'];
    },
    isMobile () {
      return this.$store.state.screenWidth < 1024;
    }
  }
};
</script>

<style src="./styles.css" />
<style scoped src="./styles.scoped.css" />
