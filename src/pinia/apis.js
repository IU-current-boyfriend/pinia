import { watch } from "vue";
import { isFunction, mergeObject, subscription } from "./utils";

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

export const createSubscribeApi = (pinia, id, scope) => {
  return function $createSubscribe(cb, options = {}) {
    return scope.run(() =>
      watch(
        pinia.state.value[id],
        (state) => {
          cb({ storeId: id }, state);
        },
        options
      )
    );
  };
};

export let onActionCallbackFnList = [];

export const createOptionActionApi = () => {
  return function $onAction(callbackFn) {
    // 开启订阅
    subscription.subscribe(onActionCallbackFnList, callbackFn);
  };
};


export const createDisposeApi = (pinia, id, scope) => {
  return function $dispose() {
    // 首先把action里面的回调函数清空
    onActionCallbackFnList = [];
    // 清空pinia里面保存的store对象，注意pinia.store数据格式是map
    pinia.store.delete(id);
    // 利用scope.stop清空作用域内部的副作用
    scope.stop();
  }
}


export const setStoreStateHijacking = (store, state) => {
  Object.defineProperty(store, '$state', {
    get() {
      return state;
    },
    set(newValue) {
      store.$patch(s => {
        Object.assign(s, newValue);
      })
    }
  });
}



