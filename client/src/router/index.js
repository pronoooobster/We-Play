import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ClanPage from "@/views/ClanPage.vue";
import MyProfilePage from "@/views/MyProfilePage.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ClanListPage from "@/views/ClanListPage.vue";
import GamesPage from "@/views/GamesPage.vue";


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
    path: "/users/:id/clans",
    name: "ClanListPage",
    component: ClanListPage,
    props:true
  },
  {
    path: "/profile/:id",
    name: "myrofile",
    component: MyProfilePage,
    props: true
  },
  {
    path: "/games",
    name: "Games",
    component: GamesPage,
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
