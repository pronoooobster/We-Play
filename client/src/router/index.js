import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import DashboardPage from "@/components/DashboardPage.vue";
import ClanPage from "@/components/ClanPage.vue";
import UserProfile from "@/components/UserProfile.vue";
import PageNotFound from "@/components/PageNotFound.vue";


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
