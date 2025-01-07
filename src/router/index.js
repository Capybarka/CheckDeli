import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import PersonsPage from '@/pages/PersonsPage.vue';
import DishesPage from '@/pages/DishesPage.vue';
import ResultPage from '@/pages/DishesPage.vue';

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/persons',
        component: PersonsPage,
    },
    {
        path: '/dishes',
        component: DishesPage,
    },
    {
        path: '/result',
        component: ResultPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
