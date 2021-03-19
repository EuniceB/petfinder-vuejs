import PetListPage from "@/pages/PetListPage";
import PetPage from "@/pages/PetPage";
import HomePage from "@/pages/HomePage";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/pets/:type/:page",
        component: PetListPage,
    },
    {
        path: '/pets/:type',
        redirect: '/pets/:type/1'
    },
    {
        path: "/pet/:id",
        component: PetPage,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;