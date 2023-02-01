<template>
  <input class="text-field" :value="value" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
  },
});
</script>


<style lang="scss">
.text-field {
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--color-foreground1);
  background: transparent;
  color: var(--color-foreground3);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--color-foreground3);
    color: var(--color-foreground3);
  }
}
</style>
