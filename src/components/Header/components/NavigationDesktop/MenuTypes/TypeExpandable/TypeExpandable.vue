<template>
  <div class="navigation-item__container-subs type-expandable">
    <div class="navigation-item__holder-subs">
      <!-- COLUNA ESQUERDA - LVL2 -->
      <div class="navigation-item__subs-two-wrapper">
        <div class="navigation-item__subs-two-top">
          <p class="navigation-item__subs-two-top__title">
            {{ item.label }}
          </p>

          <BaseLink
            v-if="Object.keys(item.rota).length"
            :link="item"
            class="navigation-item__subs-two-top__link"
          >
            Ver tudo de {{ item.label }}
          </BaseLink>
        </div>

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
            </div>

            <ul
              v-if="currentLevelThree.sub?.length"
              class="navigation-item__subs-three-list"
            >
              <li
                v-for="(subThree, subThreeIndex) in currentLevelThree.sub"
                :key="`sub-three-${subThreeIndex}`"
                class="navigation-item__subs-three-list__item-wrapper"
              >
                <BaseLink
                  :link="subThree"
                  class="navigation-item__subs-three-list__item"
                >
                  <p :data-label="subThree.label">
                    {{ subThree.label }}
                  </p>
                </BaseLink>
              </li>
            </ul>
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
  name: 'TypeExpandable',
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
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
