<template>
  <div class="navigation-item__container-subs type-default">
    <div class="navigation-item__wrapper-subs">
      <div class="navigation-item-left">
        <div class="navigation-item__subs-top">
          <p class="navigation-item__subs-top__title">
            {{ item.label }}
          </p>

          <BaseLink
            v-if="Object.keys(item.rota).length"
            :link="item"
            class="navigation-item__subs-top__link"
          >
            <p data-label="Ver mais">
              Ver tudo de {{ item.label }}
            </p>
          </BaseLink>
        </div>

        <ul
          v-if="item.sub?.length"
          class="navigation-item__subs-wrapper"
        >
          <li
            v-for="(subTwo, subTwoIndex) in item.sub"
            :key="`sub-two-${subTwoIndex}`"
            class="navigation-item__subs"
          >
            <BaseLink :link="subTwo" class="navigation__list-item">
              <p :data-label="subTwo.label">
                {{ subTwo.label }}
              </p>
            </BaseLink>
          </li>
        </ul>
      </div>

      <div
        v-if="item.banner"
        class="navigation-item-right"
      >
        <BannerDisplay :banner="item.banner" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseLink from '~/components/Base/BaseLink.vue';
import BannerDisplay from '../../BannerDisplay/BannerDisplay.vue';

export default {
  name: 'TypeDefault',
  components: {
    BaseLink,
    BannerDisplay
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped src="./styles.scoped.css" />
