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
        <li v-for="todo of store.todolist1" :key="todo.id">
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
import useStore from "../store/todoList";

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
 * onActions api的使用方式：
 *
 *
 */
store.$onAction(({ after, onError }) => {
  // 获取$onAction被调用之前的store中的todolist1状态
  console.log("before onAction one: =>", store.todolist1);

  // 第一个after钩子函数
  after((resolvedValue) => {
    // 获取$onAction被调用之后的store中的todolist1状态
    console.log("after1: =>", store.todolist1);

    // resolvedValue: => 表示的是action方法的返回值
    console.log("resolvedValue1: =>", resolvedValue);
  });

  // 第二个after钩子函数
  after((resolvedValue) => {
    console.log("after2: =>", store.todolist1);

    console.log("resolvedValue2: =>", resolvedValue);
  });

  // 第一个onError函数
  onError((err) => {
    console.log("err1: =>", err);
  });

  // 第二个onError函数
  onError((err) => {
    console.log("err2: =>", err);
  });
});

store.$onAction(({ after, onError }) => {
  // 获取$onAction被调用之前的store中的todolist1状态
  console.log("before onAction two: =>", store.todolist1);

  // 第一个after钩子函数
  after((resolvedValue) => {
    // 获取$onAction被调用之后的store中的todolist1状态
    console.log("after1: =>", store.todolist1);

    // resolvedValue: => 表示的是action方法的返回值
    console.log("resolvedValue1: =>", resolvedValue);
  });

  // 第二个after钩子函数
  after((resolvedValue) => {
    console.log("after2: =>", store.todolist1);

    console.log("resolvedValue2: =>", resolvedValue);
  });

  // 第一个onError函数
  onError((err) => {
    console.log("err1: =>", err);
  });

  // 第二个onError函数
  onError((err) => {
    console.log("err2: =>", err);
  });
});

/**
 * 使用patch api的功能：
 *    将一个state补丁应用于当前状态，允许嵌套值。
 *
 */

const handleClickPatch = () => {
  // 两种写法
  store.$patch({
    count: 100,
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

/**
 * 使用$subscribe api:
 *
 *
 */
// store.$subscribe((info, state) => {
//   // console.log("info: =>", info);
//   // console.log("state: =>", state);
// }, {});
</script>

<style scoped></style>
