require("./bootstrap");

require("alpinejs");

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import User from "./components/User";

Vue.use(ElementUI, { locale });

Vue.component("user", User);

const app = new Vue({
    el: "#root",
});
