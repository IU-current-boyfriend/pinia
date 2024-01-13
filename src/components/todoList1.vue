<template>
  <div class="wrapper">
    <div class="input_container">
      <input type="text" v-model="inputText" placeholder="please try into..." />
      <button @click="addTodo">ADDTODO</button>
    </div>

    <div class="lists">
      <ul>
        <li v-for="todo of store.todoList1" :key="todo.id">
          <input
            type="checkbox"
            :checked="todo.completed"
            @click="store.toggleTodo(todo.id)"
          />
          <span
            :style="{ textDecoration: todo.completed ? 'line-through' : '' }"
            >{{ todo.content }}</span
          >
          <button @click="store.removeTodo(todo.id)">REMOVE</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useStore from "../store/todolist1";

const store = useStore();

const inputText = ref("");

const addTodo = () => {
  if (inputText.value.length <= 0) return;
  const todo = {
    id: Date.now(),
    content: inputText.value,
    completed: false,
  };
  store.addTodo(todo);
  inputText.value = "";
};
</script>

<style scoped></style>
