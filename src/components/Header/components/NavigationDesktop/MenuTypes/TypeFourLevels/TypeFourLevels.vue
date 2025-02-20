<template>
  <div class="navigation-item__container-subs type-four-levels">
    <div class="navigation-item__holder-subs">
      <!-- COLUNA ESQUERDA - LVL2 -->
      <div class="navigation-item__subs-two-wrapper">
        <ul
          v-if="item.sub?.length"
          class="navigation-item__subs-two-list"
        >
          <li
            v-for="(subTwo, subTwoIndex) in item.sub"
            :key="`sub-two-${subTwoIndex}`"
            class="navigation-item__subs-two-list__item-wrapper"
            @mouseover="setNewIndex(subTwo, subTwoIndex)"
          >
            <BaseLink
              :link="subTwo"
              class="navigation-item__subs-two-list__item"
              :class="{ 'current': currentIndex === subTwoIndex }"
            >
              <p class="navigation-item__subs-two-list__item__text">
                <span :data-label="subTwo.label">
                  {{ subTwo.label }}
                </span>

                <IconArrowRight v-if="subTwo.sub.length" />
              </p>
            </BaseLink>
          </li>
        </ul>
      </div>

      <!-- COLUNA DIREITA - LVL3 E BANNER LVL2 -->
      <Transition
        name="transition-sub"
        mode="out-in"
      >
        <div
          :key="currentIndex"
          class="navigation-item__subs-three-wrapper"
        >
          <div class="navigation-item__subs-three-left">
            <div class="navigation-item__subs-three-top">
              <p class="navigation-item__subs-three-top__title">
                {{ currentLevelThree.label }}
              </p>

              <BaseLink
                v-if="Object.keys(currentLevelThree.rota).length"
                :link="currentLevelThree"
                class="navigation-item__subs-three-top__link"
              >
                Ver tudo de {{ currentLevelThree.label }}
              </BaseLink>
            </div>

            <div class="navigation-item__subs-three-list-wrapper">
              <ul class="navigation-item__subs-three-list">
                <li
                  v-for="(subThree, subThreeIndex) in getLevelsThreeWithLevelFour(currentLevelThree)"
                  :key="`sub-three-${subThreeIndex}`"
                  class="navigation-item__subs-four-wrapper"
                >
                  <div class="navigation-item__subs-four-top">
                    <p class="navigation-item__subs-four-top__title">
                      {{ subThree.label }}
                    </p>
                  </div>

                  <ul class="navigation-item__subs-four-list">
                    <li
                      v-for="(subFour, subFourIndex) in subThree.sub"
                      :key="`sub-four-${subFourIndex}`"
                      class="navigation-item__subs-four-list__item-wrapper"
                    >
                      <BaseLink
                        :link="subFour"
                        class="navigation-item__subs-four-list__item"
                      >
                        {{ subFour.label }}
                      </BaseLink>
                    </li>

                    <li
                      v-if="Object.keys(subThree.rota).length"
                      class="navigation-item__subs-four-list__item-wrapper"
                    >
                      <BaseLink
                        :link="subThree"
                        class="navigation-item__subs-four-list__item see-all"
                      >
                        Ver tudo
                      </BaseLink>
                    </li>
                  </ul>
                </li>

                <li class="navigation-item__subs-three-withour-four-wrapper">
                  <ul class="navigation-item__subs-three-withour-four-list">
                    <li
                      v-for="(subThree, subThreeIndex) in getLevelsThreeWithoutLevelFour(currentLevelThree)"
                      :key="`sub-three-without-four-${subThreeIndex}`"
                      class="navigation-item__subs-three-withour-four__item-wrapper"
                    >
                      <BaseLink
                        :link="subThree"
                        class="navigation-item__subs-three-withour-four__item"
                      >
                        {{ subThree.label }}
                      </BaseLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="currentLevelThree.banner"
            class="navigation-item__subs-three-right"
          >
            <BannerDisplay :banner="currentLevelThree.banner" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import BaseLink from '~/components/Base/BaseLink.vue';
import IconArrowRight from '~/static/icons/IconArrowRight.vue';
import BannerDisplay from '../../BannerDisplay/BannerDisplay.vue';

export default {
  name: 'TypeFourLevels',
  components: {
    IconArrowRight,
    BaseLink,
    BannerDisplay
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  computed: {
    currentLevelThree () {
      return this.item.sub[this.currentIndex];
    }
  },
  methods: {
    setNewIndex (item, index) {
      if (item.sub.length) {
        this.currentIndex = index;
      }
    },
    getLevelsThreeWithLevelFour (item) {
      return item.sub.filter((e) => e.sub.length > 0);
    },
    getLevelsThreeWithoutLevelFour (item) {
      return item.sub.filter((e) => e.sub.length === 0);
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
