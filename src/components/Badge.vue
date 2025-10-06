<script setup lang="ts">
const {
  color = 'white',
  dark = false
} = defineProps<{
  color?: string,
  dark?: boolean
}>()
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
