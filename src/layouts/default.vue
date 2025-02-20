<template>
  <div>
    <template v-if="$store.state.maintenancePage">
      <WaitingLayout />
    </template>

    <!-- <template v-else-if="$route.name === 'login'">
      <div class="login-layout">
        <Nuxt />
      </div>
    </template> -->

    <template v-else>
      <div
        class="default-layout'"
      >
        <MainHeader />

        <Transition name="fadePage">
          <Nuxt style="transform-origin: top" class="default__page" />
        </Transition>
      </div>
    </template>
  </div>
</template>

<script>
import { version } from '~/../package.json';
import WaitingLayout from './WaitingLayout.vue';
import MainHeader from '~/components/Header/MainHeader.vue';

export default {
  components: {
    MainHeader,
    WaitingLayout
  },
  middleware ({ route, store }) {
    if (route.query.liberarAcesso === version) {
      store.commit('changeManutencaoLojaLiberar', true);
    }
    else if (route.query.liberarAcesso && route.query.liberarAcesso !== version) {
      store.commit('changeManutencaoLojaLiberar', false);
    }
  },
  data () {
    return {
      showPopGlobal: false
    };
  },
  head () {
    if (this.dadosPageAtual) {
      this.changeHead();
      return {
        ...this.changeHead(),

        meta: [
          ...this.changeHead().meta,
          // Configura google site verification
          ...this.tagVerification.map((code) => {
            return {
              name: 'google-site-verification',
              content: code
            };
          }),
          // Facebook Meta Tags
          {
            property: 'og:url',
            content: `${this.$store.state.siteUrl}${this.$route.path}`
          },
          {
            property: 'og:type',
            content: this.dadosPageAtual?.estrutura?.nivel === 'product/detail' ? 'product' : 'website'
          },
          {
            property: 'og:title',
            content: this.seo.titleSocial || this.config.seo.geral.titleSocial
          },
          {
            property: 'og:description',
            content: this.seo.descriptionSocial || this.config.seo.geral.descriptionSocial
          },
          {
            property: 'og:image',
            ccontent: this.seo.openGraphUrlImagem || this.seoProductImage
          },
          // Twitter Meta Tags
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            property: 'twitter:domain',
            content: this.domain
          },
          {
            property: 'twitter:url',
            content: this.$store.state.siteUrl
          },
          {
            name: 'twitter:title',
            content: this.seo.titleSocial || this.config.seo.geral.titleSocial
          },
          {
            name: 'twitter:description',
            content: this.seo.descriptionSocial || this.config.seo.geral.descriptionSocial
          },
          {
            name: 'twitter:image',
            content: this.seo.twitterUrlImagem || this.seoProductImage
          }
        ]
      };
    }
  },
  // computed: {
  //   tagVerification () {
  //     if (!this.$store.state.config) {
  //       return [];
  //     }
  //     return this.$store.state.config.google.tag.verification || [];
  //   },
  //   dadosPageAtual () {
  //     return this.$store.state.dadosPageAtual;
  //   },
  //   config () {
  //     return this.$store.state.config;
  //   },
  //   user () {
  //     return this.$store.state.user;
  //   },
  //   dataPop () {
  //     return this.$store.state.popup.dataPop;
  //   },
  //   dataCarrinho () {
  //     return this.$store.state.carrinhoFrete.dataCarrinho;
  //   },
  //   domain () {
  //     const url = new URL(this.$store.state.siteUrl);
  //     return url.hostname;
  //   },
  //   seo () {
  //     if (this.$store.state.dadosPageAtual && this.$store.state.dadosPageAtual.estrutura) {
  //       return this.$store.state.dadosPageAtual.estrutura.seo;
  //     }
  //     return {
  //       title: 'Página não encontrada',
  //       description: '',
  //       titleSocial: 'Página não encontrada',
  //       descriptionSocial: '',
  //       openGraphUrlImagem: '',
  //       twitterUrlImagem: '',
  //       keywords: '',
  //       canonical: '',
  //       indexar: true
  //     };
  //   }
  // },
  watch: {
    dataCarrinho (val) {
      if (val) {
        this.$store.commit('setCarrinho', val);
      }
    },
    dataPop (val) {
      if (val) {
        const isClosed = localStorage.getItem(`popID${val.id}`);
        if (isClosed || this.$store.state.popup.exibidasNaSessao.includes(val.id)) {
          this.$store.commit('popup/setDataPop', null);
          return;
        }
        setTimeout(() => {
          this.showPopGlobal = true;
        }, val.tempo * 1000);
        return;
      }
      this.showPopGlobal = false;
    },
    $route: {
      deep: true,
      handler () {
        this.$options.head = this.changeHead();

        document.querySelector('html').scrollTop = 0;
      }
    },
    dadosPageAtual (newVal, oldVal) {
      if (this.validaDatePageForGtmGetData(newVal, oldVal)) {
        this.$gtmGetData();
      }
    },
    user (newVal, oldVal) {
      if (newVal && oldVal && newVal.nomeRazao !== oldVal.nomeRazao) {
        this.$gtmUserProfile(this.user);
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.dadosPageAtual) this.$gtmGetData();
    });

    this.$store.commit('setScreenWidth', window.innerWidth);

    this.$store.dispatch('init');

    window.addEventListener('scroll', this.liberaSegundaDobra);

    this.$nextTick(() => {
      this.$store.dispatch('getCarrinho');
    });
    this.$store.commit('setFirstLoad');
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.$store.commit('changeBackPage', from);
      return next();
    });
    // this.$validateMaintenancePage();
  },
  methods: {
    liberaSegundaDobra () {
      window.removeEventListener('scroll', this.liberaSegundaDobra);
      this.$store.commit('setLoadSegundaDobra');
    },
    changeHead () {
      const nextPg = this.$store.state.listagem.nextPg;
      const prevPg = this.$store.state.listagem.prevPg;
      const seo = {
        title: this.seo.title || this.dadosPageAtual.estrutura?.breadcrumb?.at(-1)?.label,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.seo.description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.seo.keywords
          }
        ],
        link: [
          {
            rel: 'canonical',
            href: `${this.seo.canonical}`
          }
        ],
        script: [
          this.$store.state.dadosPageAtual
            ? this.$setPaginaDadosEstruturados('Mobiis', {
              rua: 'Av. Leonardo da Vinci, N° 1034 - 2° Andar - Vila Guarani, 04313-000',
              cidade: 'São Paulo',
              estado: 'SP'
            })
            : ''
        ]
      };

      if (!this.seo.indexar || (this.$store.state.manutencaoLoja)) {
        seo.meta.push({
          hid: 'robots',
          name: 'robots',
          content: 'noindex'
        });
      }

      if (nextPg) seo.link.push(nextPg);
      if (prevPg) seo.link.push(prevPg);

      return seo;
    },
    validaDatePageForGtmGetData (dadosPageAtual, oldDadosPageAtual) {
      const isSameLevel = dadosPageAtual?.estrutura?.nivel === oldDadosPageAtual?.estrutura?.nivel;

      if (!isSameLevel) return true;

      const levelsActual = dadosPageAtual?.estrutura?.seo?.title;
      const levelsOld = oldDadosPageAtual?.estrutura?.seo?.title;

      const verifyLevelsIsEqual = () => {
        if (levelsActual === levelsOld) {
          return false;
        }
        return true;
      };

      return verifyLevelsIsEqual();
    }
  }
};
</script>
