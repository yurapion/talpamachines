import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MachineList from "../views/MachineList.vue";
import MachineShow from "../views/MachineShow.vue";
import store from "../store/index";
import NProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },

  {
    path: "/machines",
    name: "machine-list",
    component: MachineList,
    beforeEnter(routeTo, routeFrom, next) {
      // before this route is loaded
      store.dispatch("fetchMachineList").then(() => {
        next();
      });
    }
  },
  {
    path: "/machine/:id",
    name: "machine-show",
    component: MachineShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      // before this route is loaded
      store.dispatch("fetchMachine", routeTo.params.id).then(() => {
        next();
      });
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start();
  next();
});
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
