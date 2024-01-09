import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import blogs from "@/assets/data/blogs.json";

const NotFound = () => import("@/views/NotFound.vue");
const Profile = () => import("@/views/Profile.vue");
const Works = () => import("@/views/Works.vue");
const Blog = () => import("@/views/Blog.vue");
const Post = () => import("@/views/Post.vue");

const routes: RouteRecordRaw[] = [
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
];

blogs.forEach((blog) => {
  routes.push({
    path: `/blog/${blog.date}`,
    name: blog.title,
    component: Post,
    props: { blog: { ...blog, date: new Date(blog.date) } },
  });
});

routes.push({
  path: "/:catchAll(.*)",
  name: "NotFound",
  component: NotFound,
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
