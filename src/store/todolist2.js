import { defineStore } from "pinia";
import { ref, computed } from "vue";

/**
 * defineStore参数二的setup函数写法:
 *
 *
 */
const store = defineStore("todolist2", () => {
  // 定义state
  const todoList2 = ref([]);
  // 定义getters，其实getter就是计算属性
  const count = computed(() => this.todoList2.length);
  // 定义actions，其实actions就是methods
  const addTodo = (todo) => {
    todoList2.value.unshift(todo);
  };

  const toggleTodo = (id) => {
    todoList2.value = todoList2.value.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  };

  const removeTodo = (id) => {
    todoList2.value = todoList2.value.filter((todo) => todo.id !== id);
  };

  return {
    todoList2,
    count,
    addTodo,
    toggleTodo,
    removeTodo,
  };
});

export default store;
