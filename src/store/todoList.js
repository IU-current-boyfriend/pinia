import { defineStore } from "../pinia";

const store = defineStore("todolist1", {
  state: () => ({
    todolist1: [],
    count: 0,
  }),
  getters: {
    doubleCount() {
      return this.count * 2;
    },
    length() {
      return this.todolist1.length;
    },
  },
  actions: {
    addTodo(todo) {
      this.todolist1.push(todo);
    },
    toggleTodo(id) {
      this.todolist1 = this.todolist1.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    removeTodo(id) {
      this.todolist1 = this.todolist1.filter((item) => item.id !== id);
    },
    changeCount() {
      this.count = this.count + 1;
    },
  },
});

export default store;
