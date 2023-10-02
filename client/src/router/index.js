import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ClanPage from "@/views/ClanPage.vue";
import UserProfile from "@/views/UserProfile.vue";
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
    path: "/clan",
    name: "Clan",
    component: ClanPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
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
