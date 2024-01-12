<template>
  <!-- <div class="wapper">
    <h1>count: {{ count }}</h1>
    <h2>doubleCount: {{ doubleCount }}</h2>
    <h3>tripleCount: {{ tripleCount }}</h3>
    <button @click="addCount">AddCount</button>
    <button @click="stopDoubleCount">stopDoubleCount</button> -->
  <!-- </div> -->
  <todo-list1></todo-list1>
  <hr />
  <todo-list2></todo-list2>
</template>

<script setup>
import todoList1 from "./components/todoList1.vue";
import todoList2 from "./components/todoList2.vue";
// import { computed, effectScope, ref } from 'vue';

// const count = ref(0);
// const scope = effectScope();

// let doubleCount;
// let tripleCount;

// scope.run(() => {
//   doubleCount = computed(() => count.value * 2);
//   const subScope = effectScope();
//   subScope.run(() => {
//     tripleCount = computed(() => count.value * 3);
//   })
// });

// const stopDoubleCount = () => {
//   scope.stop();
// }

// const addCount = () => {
//   count.value += 1;
// }
</script>

<style scoped></style>
