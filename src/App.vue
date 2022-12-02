<template>
    <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// hack para acessar a rota pelo console
function routerInWindow() {
  window.router = router;
}

onMounted(() => {
  routerInWindow();
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
