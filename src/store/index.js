import { createPinia } from "../pinia";

const pinia = createPinia();

console.log('pinia: =>', pinia);

/**
 * 实现pinia本地持久化存储
 * 
 */

const LOCALPINIA = 'localPinia';
pinia.use(({ store, app, pinia, options }) => {
  // 获取storeId
  const storeId = store.$id;
  const initLocalPinia = () => {
    // 获取本地pinia
    const localPinia = JSON.parse(localStorage.getItem(`${LOCALPINIA}${storeId}`)) || {};
    if (!storeId) return;
    store.$patch(state => {
      Object.assign(state, localPinia);
    });
  }


  // 初始化函数
  initLocalPinia();



  store.$subscribe((info, newState) => {
    localStorage.setItem(`${LOCALPINIA}${storeId}`, JSON.stringify(newState));
  });

});

export default pinia;
