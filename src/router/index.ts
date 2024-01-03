import { createRouter, createWebHistory } from "vue-router";

const NotFound = () => import("@/views/NotFound.vue");
const Profile = () => import("@/views/Profile.vue");
const Works = () => import("@/views/Works.vue");
const Blog = () => import("@/views/Blog.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/works",
      name: "works",
      component: Works,
    },
    {
      path: "/blog",
      name: "blog",
      component: Blog,
    },
    { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
  ],
});

export default router;
