<template>
  <Transition
    name="fade"
    @after-enter="afterEnterModal"
    @after-leave="afterLeaveModal"
  >
    <div v-if="showBaseModal" class="base-modal" @click.self="showContent = false">
      <Transition
        name="fade"
        @after-leave="afterLeaveContent"
      >
        <slot v-if="showContent" />
      </Transition>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showBaseModal: false,
      showContent: false
    };
  },
  watch: {
    show: {
      handler (newValue) {
        this.showBaseModal = newValue;
        if (newValue && process.client) {
          document.body.style.overflow = 'hidden';
        }
        else if (process.client) {
          document.body.style.overflow = 'unset';
        }
      },
      immediate: true
    }
  },
  methods: {
    afterEnterModal () {
      this.showContent = true;
    },
    afterLeaveModal () {
      this.$emit('close');
    },
    afterLeaveContent () {
      this.showBaseModal = false;
    }
  }
};
</script>

<style scoped>
.base-modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
