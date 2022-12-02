<template>
  <div class="intro">
    <RouterView />
  </div>
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

<style></style>
