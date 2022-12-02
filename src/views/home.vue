<template>
  <div class="contain">
    <button class="btn" @click="enter_game">Entrar</button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function enter_game() {
  router.push({ name: "arscene" });
}
</script>
<style lang="css">
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.btn {
  background-color: aquamarine;
  padding: 1rem;
  border-radius: 10px;
  color: black;
}
</style>
