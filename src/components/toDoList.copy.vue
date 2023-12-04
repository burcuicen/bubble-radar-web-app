<template lang="pug">

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ToDo, IToDoStatus } from 'src/api/interfaces';

export default defineComponent({
  name: 'ToDoList',
  props: {
    todos: {
      type: Array as () => ToDo[],
      required: true,
    },
  },
  data() {
    return {
      addNewTodoDialog: false,
      toDoList: {
        inProgress: [] as ToDo[],
        completed: [] as ToDo[],
        toDo: [] as ToDo[],
      },
      newTodo: {
        title: '',
        status: 'to-do' as IToDoStatus,
        details: '',
        estimatedTime: 0,
      }
    };
  },
  mounted() {
    this.prepareTodoList();
  },
  methods: {
    prepareTodoList() {
      this.todos.forEach((todo) => {
        if (todo.status === 'to-do') this.toDoList.toDo.push(todo);
        if (todo.status === 'in-progress') this.toDoList.inProgress.push(todo);
        if (todo.status === 'done') this.toDoList.completed.push(todo);
      });
    },
  }
});
</script>
