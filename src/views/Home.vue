<template lang="pug">
.home
  .logo
    | Placeholder
  .main-content
    HelloWorld
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 20em;
    height: 5em;
    background-color: pink;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-content {
    max-width: 100%;
  }
}
</style>
