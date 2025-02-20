<!-- eslint-disable max-len -->
<template>
  <div
    v-show="showSearch"
    :class="[
      'header-containerBusca',
      {
        buscaComMicrofone: isRecordCapture,
        buscaCapturandoAudio: recordingStatus,
      },
    ]"
    @mouseover="delaySugestoes = 300"
    @mouseout="delaySugestoes = 0"
  >
    <!-- Formulário -->
    <form class="" method="get" @submit.prevent="search">
      <div class="input-wrapper">
        <!-- Campo de busca -->
        <input
          ref="inputSearch"
          v-model="valSearch"
          type="text"
          name=""
          value=""
          :placeholder="textPlaceholder"
          @focusin="focus()"
          @focusout="out()"
        >
        <!-- Botão de busca -->
        <div class="slideBusca-containerBtns">
          <button
            v-if="isRecordCapture && suportRecognition"
            type="button"
            @click="toggleRecord"
          >
            <slot name="contentBtBuscaMic">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2088 18.4494L12.1188 18.4584V18.5489V21.4598V21.5598H12.2188H16.5312C16.6954 21.5598 16.8527 21.625 16.9688 21.7411C17.0848 21.8571 17.15 22.0145 17.15 22.1786C17.15 22.3427 17.0848 22.5001 16.9688 22.6161C16.8527 22.7322 16.6954 22.7973 16.5312 22.7973H6.46875C6.30465 22.7973 6.14727 22.7322 6.03123 22.6161C5.91519 22.5001 5.85 22.3427 5.85 22.1786C5.85 22.0145 5.91519 21.8571 6.03123 21.7411C6.14727 21.625 6.30465 21.5598 6.46875 21.5598H10.7812H10.8812V21.4598V18.5489V18.4584L10.7912 18.4494C9.04303 18.2737 7.42238 17.4549 6.24374 16.1518C5.06509 14.8488 4.41248 13.1544 4.4125 11.3973V9.95984C4.4125 9.79574 4.47769 9.63835 4.59373 9.52232C4.70977 9.40628 4.86715 9.34109 5.03125 9.34109C5.19535 9.34109 5.35273 9.40628 5.46877 9.52232C5.58481 9.63835 5.65 9.79574 5.65 9.95984V11.3973C5.65 12.9489 6.26634 14.4368 7.36343 15.5339C8.46051 16.631 9.94848 17.2473 11.5 17.2473C13.0515 17.2473 14.5395 16.631 15.6366 15.5339C16.7337 14.4368 17.35 12.9489 17.35 11.3973V9.95984C17.35 9.79574 17.4152 9.63835 17.5312 9.52232C17.6473 9.40628 17.8046 9.34109 17.9688 9.34109C18.1329 9.34109 18.2902 9.40628 18.4063 9.52232C18.5223 9.63835 18.5875 9.79574 18.5875 9.95984V11.3973C18.5875 13.1544 17.9349 14.8488 16.7563 16.1518C15.5776 17.4549 13.957 18.2737 12.2088 18.4494Z" fill="black" fill-opacity="0.4" stroke="white" stroke-width="0.2" />
                <path d="M13.6036 13.6036C14.1616 13.0457 14.475 12.289 14.475 11.5V4.3125C14.475 3.52348 14.1616 2.76678 13.6036 2.20886C13.0457 1.65094 12.289 1.3375 11.5 1.3375C10.711 1.3375 9.95428 1.65094 9.39636 2.20886C8.83844 2.76678 8.525 3.52348 8.525 4.3125V11.5C8.525 12.289 8.83844 13.0457 9.39636 13.6036C9.95428 14.1616 10.711 14.475 11.5 14.475C12.289 14.475 13.0457 14.1616 13.6036 13.6036ZM8.52131 1.33381C9.31131 0.543816 10.3828 0.1 11.5 0.1C12.6172 0.1 13.6887 0.543816 14.4787 1.33381C15.2687 2.12381 15.7125 3.19528 15.7125 4.3125V11.5C15.7125 12.6172 15.2687 13.6887 14.4787 14.4787C13.6887 15.2687 12.6172 15.7125 11.5 15.7125C10.3828 15.7125 9.31131 15.2687 8.52131 14.4787C7.73132 13.6887 7.2875 12.6172 7.2875 11.5V4.3125C7.2875 3.19528 7.73132 2.12381 8.52131 1.33381Z" fill="black" fill-opacity="0.4" stroke="white" stroke-width="0.2" />
              </svg>
            </slot>
          </button>
          <button
            type="submit"
            name="button"
            :title="valSearch.trim() ? `Buscar por: ${valSearch}` : 'Buscar'"
            :aria-label="valSearch.trim() ? `Buscar por: ${valSearch}` : 'Buscar'"
          >
            Buscar
          </button>
        </div>
      </div>

      <Transition name="header-suggestions">
        <div
          v-if="showSugestoes && itensBusca && itensBusca.length"
          class="header-containerBusca-sugestoes"
        >
          <template v-if="itensBusca !== 'loading'">
            <div class="header-containerBusca-sugestoes-wrapper">
              <div class="header-containerBusca-sugestoes-holder">
                <div
                  v-if="dataSearchSuggestions?.menu.length"
                  class="header-containerBusca-sugestoes-textos"
                >
                  <p class="header-containerBusca-sugestoes-textos__title">
                    Você quis dizer:
                  </p>

                  <ul class="header-containerBusca-sugestoes-textos__list">
                    <li
                      v-for="(option, index) in dataSearchSuggestions.menu"
                      :key="`${option}-${index}`"
                      class="header-containerBusca-sugestoes-textos__list-item"
                    >
                      <nuxt-link
                        v-if="Object.keys(option.rota).length"
                        :to="option.rota.path"
                      >
                        {{ option.label }}
                      </nuxt-link>
                      <a
                        v-else-if="option.link.length"
                        :href="option.link"
                      >
                        {{ option.label }}
                      </a>
                      <span
                        v-else
                        @click="searchForThatWord(option.label)"
                      >
                        {{ option.label }}
                      </span>
                    </li>
                  </ul>
                </div>

                <ul class="header-containerBusca-sugestoes-box">
                  <li
                    v-for="(item, i) in itensBusca"
                    :key="i"
                    class="header-containerBusca-sugestoes-box-item"
                    @click="() => handleProductSugestionClick(item, valSearch)"
                  >
                    <nuxt-link :to="item.rota.route">
                      <div class="header-containerBusca-sugestoes-box-imgBox">
                        <img
                          v-if="item.midias.imagens[0]"
                          :src="
                            item.midias.imagens[0][$store.state.tipoImg.prod].small
                          "
                          :alt="item.nome"
                        >
                        <img
                          v-else
                          src="./img/default-product.jpg"
                          :alt="item.nome"
                        >
                      </div>
                      <div class="header-containerBusca-sugestoes-infoBox">
                        <p class="header-containerBusca-sugestoes-box-infoBox-nome">
                          {{ item.nome }}
                        </p>
                        <p v-if="item.descricoes && Object.keys(item.descricoes).length && descricao" class="header-containerBusca-sugestoes-box-infoBox-descricao">
                          {{ item.descricoes.curta }}
                        </p>
                        <div class="header-containerBusca-sugestoes-box-infoBox-containerPrecos">
                          <p
                            v-if="item.precos.de > item.precos.vista && showPrecoDe"
                            class="header-containerBusca-sugestoes-box-infoBox-precoDe"
                          >
                            {{ item.precos.de | formatPrice }}
                          </p>
                          <p
                            v-if="!showPrecoPor"
                            class="header-containerBusca-sugestoes-box-infoBox-preco"
                          >
                            {{ item.precos.vista | formatPrice }}
                          </p>
                          <p
                            v-else
                            class="header-containerBusca-sugestoes-box-infoBox-preco preco-por"
                          >
                            {{ item.precos.por | formatPrice }}
                          </p>
                        </div>
                      </div>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </Transition>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sugestoes: {
      type: Boolean,
      default: false
    },
    closeOnMobile: {
      type: Boolean,
      default: true
    },
    textPlaceholder: {
      type: String,
      default: 'Texto da barra de pesquisa'
    },
    sugestoesDefaultBusca: {
      type: Array
    },
    limit: {
      type: Number,
      default: 5
    },
    isRecordCapture: {
      type: Boolean,
      default: false
    },
    verTodos: { // 1.4.0
      type: Boolean,
      default: false
    },
    txtVerTodos: { // 1.4.0
      type: String,
      default: 'Ver todos os resultados'
    },
    showPrecoDe: { // 1.4.0
      type: Boolean,
      default: false
    },
    descricao: { // 1.5.0
      type: Boolean,
      default: false
    },
    closeButtonSugestoes: { // 1.6.0
      type: Boolean,
      default: false
    },
    showPrecoPor: { // 1.6.1
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valSearch: '',
      itensBusca: [],
      dadosBusca: null,
      showSugestoes: false,
      delay: null,
      delaySugestoes: 0,
      suportRecognition: true,
      permissionRecognition: false,
      SourceRecognition: null,
      recordingStatus: false,
      autoSearch: null
    };
  },
  computed: {
    showSearch () {
      if (this.$store.state.screenWidth > 1023 || !this.closeOnMobile) {
        this.$store.commit('search/toggleSearch', true);
      }
      return this.$store.state.search.showSearch;
    },
    dataSearchSuggestions () {
      return this.$store.state.MainHeader.dataSearchSuggestions;
    }
  },
  watch: {
    '$route.fullPath' (val, oldVal) {
      this.showSugestoes = false;
      this.valSearch = '';
      if (oldVal.includes('search?busca=')) {
        this.$store.commit('search/isSubmit', false);
        this.$store.commit('search/changeDataSearch', null);
      }
    },
    valSearch (val) {
      if (!this.showSugestoes) this.showSugestoes = true;
      if (this.delay) clearTimeout(this.delay);
      if (val.length) {
        this.itensBusca = [];
        this.delay = setTimeout(() => {
          this.getSugestoes();
        }, 500);
        return;
      }
      else if (val.length === 0) {
        this.out();
      }
      this.setDefault();
    },
    sugestoesDefaultBusca () {
      this.setDefault();
    }
  },
  mounted () {
    this.setDefault();

    if (this.isRecordCapture) {
      this.configSpeechRecognition();
    }
  },
  methods: {
    search () {
      if (this.valSearch.length) {
        this.$gtmUserSearch(this.valSearch);
        this.$store.commit('search/isSubmit', true);
        this.$store.commit('search/changeDataSearch', null);
        this.$store.commit('search/isSubmit', false);
        this.$router.push({
          name: 'search',
          query: {
            busca: this.valSearch
          }
        });
        if (this.recordingStatus) this.toggleRecord();
        this.valSearch = '';
        const interval = setInterval(() => {
          if (this.valSearch.length === 0) {
            clearInterval(interval);
          }
          this.valSearch = '';
          this.showSugestoes = false;
        }, 300);
      }
    },
    out () {
      setTimeout(() => {
        this.showSugestoes = false;
      }, 100);
      setTimeout(() => {
        if (!this.$store.state.search.submit)
          this.$store.commit('search/changeDataSearch', null);
      }, 100);
    },
    focus () {
      this.showSugestoes = true;
      this.$store.commit('search/changeDataSearch', this.dadosBusca);
    },
    getSugestoes () {
      this.$axios
        .request({
          method: 'get',
          url: `/v2/front/url/product/listing/search?busca=${this.valSearch}&offset=0&limit=${this.limit}`
        })
        .then((res) => {
          this.itensBusca = res.data.conteudo.produtos;
          this.dadosBusca = res.data;
          this.$store.commit('search/changeDataSearch', res.data);
          this.$emit('changeDataSearch', { data: res.data });
        })
        .catch((res) => {
          console.error(res.response);
        });
    },
    setDefault () {
      this.itensBusca = this.sugestoesDefaultBusca
        ? this.sugestoesDefaultBusca
        : [];
      this.dadosBusca = null;
    },
    searchForThatWord (word) {
      this.$router.push(`/busca?busca=${word}`);
    },

    // Eventos para busca por audio.
    async hasMicrophonePermission () {
      const { state } = await navigator.permissions.query({
        name: 'microphone'
      });

      return state === 'granted';
    },
    async toggleRecord () {
      if (await this.hasMicrophonePermission()) {
        if (this.recordingStatus) {
          // Verifica se já esta gravando.
          this.SourceRecognition.stop();
        }
        else {
          this.SourceRecognition.start();
        }
      }
      else {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          this.configSpeechRecognition();
          this.SourceRecognition.start();
        }).catch(function (err) {
          console.log('Não foi possível acessar o microfone', err);
        });
      }
    },
    configSpeechRecognition () {
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!Recognition) {
        return (this.suportRecognition = false);
      }

      this.SourceRecognition = new Recognition();
      this.SourceRecognition.continuous = true;
      this.SourceRecognition.interimResults = true;
      this.recordingStatus = false;

      this.SourceRecognition.onstart = () => {
        this.recordingStatus = true;
      };
      this.SourceRecognition.onend = () => {
        this.recordingStatus = false;
        if (this.autoSearch) clearTimeout(this.autoSearch);
      };
      this.SourceRecognition.onresult = (event) => {
        if (this.autoSearch) clearTimeout(this.autoSearch);
        this.transcriptToText(event);
        this.autoSearch = setTimeout(() => {
          this.search();
        }, 2000);
      };
    },
    transcriptToText (event) {
      this.valSearch = [...event.results]
        .map((result) => result[0])
        .map((data) => data.transcript)
        .join('');
    },
    handleProductSugestionClick (product, valSearch) {
      this.$gtmUserSearch(valSearch);
      this.$gtmProductClick(product);
    }
  }
};
</script>

<style lang="css" scoped>
.header-containerBusca-sugestoes {
  position: absolute;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr;
}

.header-suggestions-enter-active,
.header-suggestions-leave-active {
  transition: 200ms ease;
}
.header-suggestions-enter,
.header-suggestions-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
