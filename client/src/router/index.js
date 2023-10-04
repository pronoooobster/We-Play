import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ClanPage from "@/views/ClanPage.vue";
import UserProfilePage from "@/views/UserProfilePage.vue";
import PageNotFound from "@/views/PageNotFound.vue";


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
    path: "/clans/:id",
    name: "ClanPage",
    component: ClanPage,
    props: true
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfilePage,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
