import { createRouter, createMemoryHistory } from 'vue-router';
import home from '../views/home.vue'
import arscene from '../views/arscene.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/arscene',
        name: 'arscene',
        component: arscene,
    },
];

const router = createRouter({
    history: createMemoryHistory('/'),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});


export default router;
