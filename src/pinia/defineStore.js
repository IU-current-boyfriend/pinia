/**
 * 处理defineStore遇到的第一个问题：
 *  defineStore方法首先需要处理的是参数问题：
 *  参数传递的可能：
 *    options
 *    id options
 *    id setup
 *  实际上首先要根据传递的参数去选择处理哪种方式，到底是options写法，还是setup写法。
 *
 *
 *
 * 根据传入的参数去创建store对象：
 *  1. 问题一遇见的问题：
 *    要在pinia实例对象中scope保存对应的子scope，因为我们要把store中的state放到pinia中的state
 *  进行保存。
 *
 *
 *
 */

import {
  computed,
  effectScope,
  inject,
  isReactive,
  isRef,
  reactive,
} from "vue";
import { isComputed, isFunction, isObject, isString } from "./utils";
import { PINIA_NAME_SYMBOL } from "./config";

const defineStore = (...args) => {
  // 格式化defineStore方法的参数
  const { id, setup, options } = formatDefineStoreArgs(args);

  const isSetUp = isFunction(setup);

  // 根据传入的参数去创建store
  const useStore = () => {
    // 从组件中获取的pinia实例对象，inject api
    const pinia = inject(PINIA_NAME_SYMBOL);
    // 判断pinia里面是否存在store实例对象
    if (!pinia.store.has(id)) {
      if (isSetUp) {
        createSetUpStore(pinia, id, setup);
      } else {
        createOptionStore(pinia, id, options);
      }
    }
    // 返回值，注意store是map形式
    return pinia.store.get(id);
  };

  return useStore;
};

/**
 * setup执行会返回一个对象: {
 *   todoList, // 数据state
 *   count, // 计算属性computed
 *   addTodo, // 方法actions
 *   toggleTodo,
 *   removeTodo,
 * }
 *
 *
 *
 *
 * @param {*} pinia
 * @param {*} id
 * @param {*} setup
 */
const createSetUpStore = (pinia, id, setup) => {
  // setup函数执行后返回的对象setupStore
  const setupStore = setup();

  // 创建一个store
  const store = reactive({});

  // 创建setupScope作用域
  let setupScope;

  // 处理pinia中的scope特性
  const result = pinia.scope.run(() => {
    setupScope = effectScope();
    return setupScope.run(() => compilerSetup(pinia, id, setupStore));
  });

  // 设置store
  setStore(pinia, id, store, result);
};

const compilerSetup = (pinia, id, setupStore) => {
  !pinia.state.value[id] && (pinia.state.value[id] = {});

  // 找出setupStore对象中state数据ref, reactive computed x watchx
  // 其中ref值包含了computed,剔除特殊的情况
  for (const key in setupStore) {
    if (setupStore.hasOwnProperty(key)) {
      const value = setupStore[key];
      if ((isRef(value) && !isComputed(value)) || isReactive(value)) {
        pinia.state.value[id][key] = value;
      }
    }
  }
  return {
    ...setupStore,
  };
};

const createOptionStore = (pinia, id, options) => {
  const { state, getters, actions } = options;

  const store = reactive({});

  let optionScope;

  const result = pinia.scope.run(() => {
    optionScope = effectScope();

    return optionScope.run(() =>
      compilerOptions(pinia, id, store, {
        state,
        getters,
        actions,
      })
    );
  });

  // 设置store
  setStore(pinia, id, store, result);
};

// 其实就是把options里面的state放入到pinia里面
const compilerOptions = (pinia, id, store, { state, getters, actions }) => {
  const optionState = createOptionState(pinia, id, state);
  const optionGetters = createOptionGetter(store, id, getters);
  const optionActions = createOptionAction(store, id, actions);
  return {
    ...optionState,
    ...optionGetters,
    ...optionActions,
  };
};

const createOptionState = (pinia, id, state) => {
  // 这里返回到是pinia.state.value[id]结果
  return (pinia.state.value[id] = state ? state() : {});
};

const createOptionGetter = (store, id, getters) => {
  return Object.keys(getters).reduce((wrapper, getterName) => {
    // 注意改变getters内部的this指向
    store[getterName] = computed(() => getters[getterName].call(store));
    return wrapper;
  }, {});
};

const createOptionAction = (store, id, actions) => {
  return Object.keys(actions).reduce((wrapper, actionName) => {
    store[actionName] = (...args) => {
      actions[actionName].apply(store, args);
    };
    return wrapper;
  }, {});
};

const formatDefineStoreArgs = (args) => {
  // 声明需要返回的属性
  let id;
  let options;
  let setup;

  // 首先判断第一个参数是否是id值，如果传入的字符串形式，就是id值
  if (isString(args[0])) {
    id = args[0];
    // 判断setup是否是一个函数的形式
    if (isFunction(args[1])) {
      setup = args[1];
    }

    // 判断options是否是一个对象的形式
    if (isObject(args[1])) {
      options = args[1];
    }
    // 如果直接是通过id、options的参数形式传入
  } else if (isObject(args[0])) {
    options = args[0];
    options.id = args[0].id;
  }

  return {
    id,
    options,
    setup,
  };
};

// 设置store方法
const setStore = (pinia, id, store, result) => {
  pinia.store.set(id, store);
  Object.assign(store, result);
};

export default defineStore;
