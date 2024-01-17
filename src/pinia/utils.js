import { isRef } from "vue";

// 判断是否是一个字符串形式
export const isString = (value) => {
  return typeof value === "string";
};

// 判断是否是一个函数的形式
export const isFunction = (value) => {
  return typeof value === "function";
};

// 判断是否是一个对象的形式
export const isObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

// 判断是否是一个计算属性的形式,源码中计算属性存在effect属性
export const isComputed = (value) => {
  return Boolean(isRef(value) && value.effect);
};

export const isobject = (val) => {
  return typeof val === "object" && val !== null;
};

// 合并两个对象，但是深度合并
export const mergeObject = (targetState, originState) => {
  for (let key in originState) {
    if (originState.hasOwnProperty(key)) {
      const oldValue = targetState[key];
      const newValue = originState[key];
      if (isobject(newValue) && isObject(newValue)) {
        targetState[key] = mergeObject(oldValue, newValue);
      } else {
        targetState[key] = newValue;
      }
    }
  }
  return targetState;
};
