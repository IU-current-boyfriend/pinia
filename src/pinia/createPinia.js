/**
 *
 * pinia对象: {
 *    install: () => {}。
 *    state, :=> 响应式对象，放着每个store中的state数据，但是需要有键值对与之对应。
 *    scope, => effectScope => 主要是pinia有些api可以让scope作用域内部的响应式数据失效。
 *    store: Map结构: key => store。
 * }
 *
 * 根据pinia的使用方式，面临的第一个问题：
 *  因为pinia是被vue当作插件引入，所以pinia对象存在install方法，
 *  但是这个pinia对象如何能够被所有组件拿到呢？为什么要被所有组件能够拿到呢？
 *  因为，useStore方法的时候，需要用到store对象，但是store对象保存在pinia对象中，
 *  所以在组件调用useStore方法的时候，能够确保组件在useStore能够获取到pinia对象，然后
 *  获取到store对象。
 *
 *  解决方案：使用provide和inject Api，在install方法中通过provide提供给所有组件，
 *  在useStore方法中通过inject获取。
 *
 *
 * 关于install方法内部的app.provide('pinia', this)存在两个问题：
 *  1. ‘pinia’字符串合适吗？即然是字符串的话，那么在之后开发时，可能发生冲突覆盖，所以可以通过symbol解决这个问题。
 *  2. this指向的问题，因为你在useStore中需要用到store，所以此时this就要指向createPinia返回的pinia对象。现在这样写的话this已经指向了pinia实例对象，
 *  这是因为app.use(pinia)的时候，会自动调用pinia实例对象中的install方法，实际上就等于是pinia.install(),所以这个install内部的this指向pinia实例对象。
 *
 *
 * 关于state响应式对象为什么不能写成ref({}),因为在原生pinia的实例对象中存在scope属性，
 * 这个scope属性就是我们之前研究的effectScope效果，pinia有些api能够停止scope作用域内部的
 * 响应式数据，所以我们要把state放进在scope作用域内部。比如说，我现在通过scope.stop方法可以停止
 * scope作用域中的响应式数据。
 *
 *
 *
 */
import { effectScope, ref, provide } from "vue";
import { PINIA_NAME_SYMBOL, VUE_NAME_APPLICATION } from "./config";
import { subscription } from "./utils";

const createPinia = () => {
  // 创建state响应式数据对象
  const scope = effectScope();
  const state = scope.run(() => ref({}));

  // 创建store对象集合
  const store = new Map();

  return {
    install,
    state,
    scope,
    use,
    store,
    // 问题一：store里面要拿pluginsList，挂载到pinia实例对象上即可解决
    plugins: pluginsList
    // 问题二：如何让plugins里面拿到app应用实例呢？
  };
};


// 插件回调函数容器
const pluginsList = [];

function use(cb) {
  subscription.subscribe(pluginsList, cb);
}


// 创建pinia对象内部的install方法
function install(app) {
  app.provide(PINIA_NAME_SYMBOL, this);
  app.provide(VUE_NAME_APPLICATION, app);
}

export default createPinia;
