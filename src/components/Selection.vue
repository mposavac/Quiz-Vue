<template>
  <select @change="$emit('input', $event.target.value)">
    <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["options"]
});
</script>