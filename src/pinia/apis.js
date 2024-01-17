import { isFunction, mergeObject } from "./utils";

export const createPatchApi = (pinia, id) => {
  return function $patch(stateOrFn) {
    // 判断当前stateOrFn是否是函数
    if (isFunction(stateOrFn)) {
      const state = pinia.state.value[id];
      // 如果是函数的话，执行函数就可以了
      stateOrFn(state);
    } else {
      const state = pinia.state.value[id];
      // 如果是对象的话，需要合并两个对象
      mergeObject(state, stateOrFn);
    }
  };
};

export const createResetApi = (store, state) => {
  return function $reset() {
    const initState = state ? state() : {};
    store.$patch((state) => {
      Object.assign(state, initState);
    });
  };
};
