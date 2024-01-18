import { defineStore } from "../pinia";
import { ref, computed } from "vue";

const store = defineStore("todolist2", () => {
  // state数据
  const todolist2 = ref([]);
  const count = ref(0);
  // 计算属性
  const doubleCount = computed(() => count.value * 2);
  const length = computed(() => todolist2.value.length);
  // 方法
  const addTodo = (todo) => {
    todolist2.value.push(todo);
  };

  const toggleTodo = (id) => {
    todolist2.value = todolist2.value.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
  };

  const removeTodo = (id) => {
    todolist2.value = todolist2.value.filter((item) => item.id !== id);
  };

  const changeCount = () => {
    count.value = count.value + 1;
  };

  return {
    todolist2,
    count,
    doubleCount,
    length,
    addTodo,
    toggleTodo,
    removeTodo,
    changeCount,
  };
});

export default store;
