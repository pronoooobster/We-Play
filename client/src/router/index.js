import { createWebHistory, createRouter } from "vue-router"
import HomePage from "@/components/HomePage.vue"
import DashboardPage from "@/components/DashboardPage.vue"
import PageNotFound from "@/components/PageNotFound.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage,
    },
    {
        path: "/:catchAll(.*)",
        name: "PageNotFound",
        component: PageNotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
  
export default router