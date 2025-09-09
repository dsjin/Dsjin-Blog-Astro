<script setup lang="ts">
const {
  color,
  dark
} = withDefaults(defineProps<{
  color: string,
  dark: boolean
}>(), {
  color: 'white',
  dark: false
})
</script>


<template>
  <div
    class="badge"
    :style="{ backgroundColor: color, color: dark ? 'white' : 'black' }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.badge {
  border-radius: 20px;
  padding: 0.5em 1em 0.5em 1em;
  width: fit-content;
  font-size: 0.5em;
}
</style>
