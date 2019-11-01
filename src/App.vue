<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in"
      beforeLeave="beforeLeave"
      enter="enter"
      afterEnter="afterEnter"
    >
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  text-align: center;
}
</style>
