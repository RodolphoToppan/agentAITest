<template>
  <div class="menu">
    <nav
      :class="[
        { 'menu__nav-subNiveis': currentLevelMenuMobile !== 0 },
        `menu__nav-currentNivel-${currentLevelMenuMobile}`
      ]"
      class="menu__nav"
    >
      <div class="menu-side__nav-header-wrapper">
        <p class="menu-side__nav-header-wrapper__title">
          <strong>{{ firstItem.label }}</strong>
        </p>
      </div>

      <!-- LVL1 -->
      <ul class="menu__nav-itens">
        <li
          v-for="(item, iNvUm) in firstItem.sub"
          :key="iNvUm"
          class="menu__nav-item menu__nav-sub-one"
          :class="{ 'item-emphasis': item.destaque }"
        >
          <LinkManager
            :item="item"
            @openSub="toggleSub(`menuNvDois${iNvUm}`)"
          />

          <!-- SUBMENUS MOBILES -->
          <aside
            v-if="item.sub && item.sub.length"
            :ref="`menuNvDois${iNvUm}`"
            class="menu__nav-sub-menu menu__nav-sub-two"
          >
            <div class="menu-side__nav-header">
              <div class="menu-side__nav-header-wrapper">
                <button
                  class="menu__nav-closeSub menu-side__nav-header--back"
                  @click="toggleSub(`menuNvDois${iNvUm}`)"
                >
                  <IconArrowLeft width="8" height="8" />

                  Voltar para {{ firstItem.label.toLowerCase() }}
                </button>

                <p class="menu-side__nav-header-wrapper__title">
                  Exibindo: <strong>{{ item.label }}</strong>
                </p>
              </div>
            </div>

            <ul>
              <li
                v-for="(subNvDois, iNvDois) in item.sub"
                :key="iNvDois"
                class="menu__nav-item"
              >
                <LinkManager
                  :item="subNvDois"
                  @openSub="toggleSub(`menuNvTres${iNvUm}${iNvDois}`)"
                />

                <aside
                  v-if="subNvDois.sub && subNvDois.sub?.length"
                  :ref="`menuNvTres${iNvUm}${iNvDois}`"
                  class="menu__nav-sub-menu menu__nav-sub-two"
                >
                  <div class="menu-side__nav-header-wrapper">
                    <button
                      class="menu__nav-closeSub menu-side__nav-header--back"
                      @click="toggleSub(`menuNvTres${iNvUm}${iNvDois}`)"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="
                            M5.67678 7.17678C5.77441 7.07915 5.77441 6.92085 5.67678 6.82322L2.85355
                            4L5.67678 1.17678C5.77441 1.07915 5.77441 0.920855 5.67678 0.823223C5.57915
                            0.725592 5.42085 0.725592 5.32322 0.823223L2.32322 3.82322C2.22559 3.92085
                            2.22559 4.07915 2.32322 4.17678L5.32322 7.17678C5.42085 7.27441 5.57915
                            7.27441 5.67678 7.17678Z"
                          fill="#6D6D6B"
                        />
                      </svg>

                      Voltar para {{ item.label.toLowerCase() }}
                    </button>

                    <p class="menu-side__nav-header-wrapper__title">
                      Exibindo: <strong>{{ subNvDois.label }}</strong>
                    </p>
                  </div>

                  <ul>
                    <li
                      v-for="(subNvTres, iNvTres) in subNvDois.sub"
                      :key="iNvTres"
                      class="menu__nav-item"
                    >
                      <LinkManager :item="subNvTres" />
                    </li>

                    <li
                      v-if="Object.keys(subNvDois.rota).length"
                      class="menu__nav-item"
                    >
                      <nuxt-link
                        class="menu__nav-item-text see-all"
                        :to="subNvDois.rota.route"
                      >
                        Ver tudo
                      </nuxt-link>
                    </li>

                    <HelpInformation />
                  </ul>
                </aside>
              </li>

              <li
                v-if="Object.keys(item.rota).length"
                class="menu__nav-item"
              >
                <nuxt-link
                  class="menu__nav-item-text see-all"
                  :to="item.rota.route"
                >
                  Ver tudo
                </nuxt-link>
              </li>

              <HelpInformation />
            </ul>
          </aside>
        </li>

        <HelpInformation />
      </ul>
    </nav>
  </div>
</template>

<script>
import HelpInformation from '../HelpInformation/HelpInformation.vue';
import LinkManager from './LinkManager/LinkManager.vue';
import IconArrowLeft from '~/static/icons/IconArrowLeft.vue';

export default {
  name: 'NavigationMobile',
  components: {
    HelpInformation,
    LinkManager,
    IconArrowLeft
  },
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      menuOpen: {
        nvDois: null,
        nvTres: null
      },
      currentLevelMenuMobile: 1
    };
  },
  computed: {
    firstItem () {
      return this.menu[0];
    }
  },
  methods: {
    toggleSub (refNameMenu, closeAll = false) {
      const el = this.$refs[refNameMenu][0];
      const nv = refNameMenu.includes('menuNvTres') ? 'nvTres' : 'nvDois';

      // Altera a classe openSub no submenu
      el.classList.toggle('openSub');

      // Verifica qual o submenu aberto atualmente
      this.menuOpen[nv] = el.classList.contains('openSub') ? el : null;

      if (closeAll) {
        this.$emit('closeAll', true);
      }
    }
  }
};
</script>

<style src="./styles.css" />
