<template>
  <div class="warpper">
    <div class="todo_header">
      <h2>count: {{ store.count }}</h2>
      <h2>doubleCount: {{ store.doubleCount }}</h2>
      <input type="text" v-model="inputText" placeholder="please try to..." />
      <button type="button" @click="addTodo">ADD</button>
      <button @click="handleClickChangeCount">ChangeCount</button>
      <button @click="handleClickPatch">handleClickPatch</button>
      <button @click="handleClickReset">handleClickReset</button>
    </div>
    <div class="todo_main">
      <h2>todolist length: {{ store.length }}</h2>
      <ul class="list">
        <li v-for="todo of store.todolist2" :key="todo.id">
          <input
            type="checkbox"
            :checked="todo.completed"
            @click="toggleTodo(todo.id)"
          />
          <span
            :style="{ textDecoration: todo.completed ? 'line-through' : '' }"
            >{{ todo.content }}</span
          >
          <button type="button" @click="removeTodo(todo.id)">RemoveTodo</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useStore from "../store/todoList2";

const store = useStore();

const inputText = ref("");

const addTodo = () => {
  const todo = {
    id: Date.now(),
    content: inputText.value,
    completed: false,
  };
  if (!inputText.value) return;
  store.addTodo(todo);
  resetInputText();
};

/**
 * 使用patch api的功能：
 *    将一个state补丁应用于当前状态，允许嵌套值。
 *
 */

const handleClickPatch = () => {
  // 两种写法
  // store.$patch({
  //   count: 100,
  // });

  store.$patch((state) => {
    state.count = 100;
  });
};

const handleClickReset = () => {
  store.$reset();
};

const resetInputText = () => {
  inputText.value = "";
};

const toggleTodo = (id) => {
  store.toggleTodo(id);
};

const removeTodo = (id) => {
  store.removeTodo(id);
};

const handleClickChangeCount = () => {
  store.changeCount();
};
</script>

<style scoped></style>
