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
