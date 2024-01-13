import { defineStore } from "../pinia";

const store = defineStore("todolist1", {
  state: () => ({
    todoList1: [],
  }),
  getters: {
    count() {
      return this.todoList1.length;
    },
  },
  actions: {
    addTodo(todo) {
      this.todoList1.unshift(todo);
    },
    toggleTodo(id) {
      this.todoList1 = this.todoList1.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    removeTodo(id) {
      this.todoList1 = this.todoList1.filter((todo) => todo.id !== id);
    },
  },
});
export default store;
