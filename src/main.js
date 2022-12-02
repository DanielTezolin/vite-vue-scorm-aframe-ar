import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// import "aframe";
// import "../build/ar.min.js";

const appvue = createApp(App);

appvue.use(router).mount("#app");
