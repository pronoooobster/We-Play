import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ClanPage from "@/views/ClanPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import ClanListPage from "@/views/ClanListPage.vue";
import GamesPage from "@/views/GamesPage.vue";
import PeoplePage from "@/views/PeoplePage.vue";


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
    path: "/clans",
    name: "ClanListPage",
    component: ClanListPage,
    props:true
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: ProfilePage,
    props: true
  },
  {
    path: "/games",
    name: "Games",
    component: GamesPage,
  },
  {
    path: "/people",
    name: "People",
    component: PeoplePage,
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
