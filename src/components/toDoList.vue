<template lang="pug">
.flex.items-center.justify-between.q-mb-md
  .text-h6 To-Do List
  q-btn(@click="addNewTodoDialog = true" color="secondary" label="Add New To Do")
.row.q-col-gutter-md
  .col-12.col-md-4
    q-chip(square color="primary" text-color="white" icon="event" label="To-Do")
    q-card.q-mt-md
      q-card-section
        q-list(v-if="toDoList.toDo.length > 0")
          .item(v-for="(todo, index) in toDoList.toDo" :key="index" :class="{ 'q-pa-md': true, 'cursor-pointer': true }")
            .item-header
              .item-icon
                q-badge(rounded color="primary")
              .item-label {{ todo.title }}
            .item-action
              q-btn(slot="target" icon="more_vert" flat round dense class="q-ml-sm")
                q-menu
                  q-list
                    div(v-for="option in todoStatusOptions" :key="option.value" @click="changeTodoStatus(todo, option.value)")
                      q-item-section {{ option.label }}
        div(v-else) No To Do items

  .col-12.col-md-4
    q-chip(square color="secondary" text-color="white" icon="event" label="In Progress")
    q-card.q-mt-md
      q-card-section
        q-list(v-if="toDoList.inProgress.length > 0")
          .item(v-for="(todo, index) in toDoList.inProgress" :key="index" :class="{ 'q-pa-md': true, 'cursor-pointer': true }")
            .item-header
              .item-icon
                q-badge(rounded color="secondary")
              .item-label {{ todo.title }}
            .item-action
              q-btn(slot="target" icon="more_vert" flat round dense class="q-ml-sm")
                q-menu
                  q-list
                    div(v-for="option in todoStatusOptions" :key="option.value" @click="changeTodoStatus(todo, option.value)")
                      q-item-section {{ option.label }}
        div(v-else) No In Progress items
  .col-12.col-md-4
    q-chip(square color="positive" text-color="white" icon="event" label="Done")
    q-card.q-mt-md
      q-card-section
        q-list(v-if="toDoList.completed.length > 0")
          .item(v-for="(todo, index) in toDoList.completed" :key="index" :class="{ 'q-pa-md': true, 'cursor-pointer': true }")
            .item-header
              .item-icon
                q-badge(rounded color="positive")
              .item-label {{ todo.title }}
            .item-action
              q-btn(slot="target" icon="more_vert" flat round dense class="q-ml-sm")
                q-menu
                  q-list
                    div(v-for="option in todoStatusOptions" :key="option.value" @click="changeTodoStatus(todo, option.value)")
                      q-item-section {{ option.label }}
        div(v-else) No Done items


  q-dialog(v-model="showTodoDialog")
    q-card
      q-card-section(v-if="selectedTodo")
        h2 {{ selectedTodo.title }}
        div {{ selectedTodo.status }}
        div {{ selectedTodo.details }}
        div Estimated Time: {{ selectedTodo.estimatedTime }}
        q-select(v-model="selectedTodo.status" :options="todoStatusOptions" label="Status" outlined)
      q-card-actions
        q-btn(@click="showTodoDialog = false" label="Close")
  q-dialog(v-model="addNewTodoDialog")
    q-card
      q-card-section
        q-input(v-model="newTodo.title" label="Title" outlined)
        q-input(v-model="newTodo.details" label="Details" type="textarea" outlined)
        q-input(v-model="newTodo.estimatedTime" label="Estimated Time" type="number" outlined)
      q-card-actions
        q-btn(@click="addNewTodoDialog = false" label="Cancel")
        q-btn(@click="addNewTodo" label="Add Todo")


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
  emits: ['new-todo'],
  data() {
    return {
      addNewTodoDialog: false,
      showTodoDialog: false,
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
      },
      selectedTodo: null as ToDo | null,
      todoStatusOptions: [
        { label: 'To Do', value: 'to-do' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Done', value: 'done' },
      ],
    };
  },
  created() {
    this.prepareTodoList();
  },
  methods: {
    prepareTodoList() {
      console.log(this.todos)
      this.todos.forEach((todo) => {
        if (todo.status === 'to-do') this.toDoList.toDo.push(todo);
        if (todo.status === 'in-progress') this.toDoList.inProgress.push(todo);
        if (todo.status === 'done') this.toDoList.completed.push(todo);
      });
    },
    addNewTodo() {
      const newTodo = {
        title: this.newTodo.title,
        status: 'to-do',
        details: this.newTodo.details,
        estimatedTime: this.newTodo.estimatedTime,
      };
      this.$emit('new-todo', newTodo);
      this.prepareTodoList();
      this.addNewTodoDialog = false;
    },
    showTodoDetails(todo: ToDo) {
      console.log(todo);
      this.selectedTodo = todo;
      this.showTodoDialog = true;
    },
    changeTodoStatus(todo: ToDo, newStatus: IToDoStatus) {
      todo.status = newStatus;
      //remove todo from current list
      this.toDoList.toDo = this.toDoList.toDo.filter((item) => item.title !== todo.title);
      this.prepareTodoList();
    },
  },
});
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;

  &-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &:hover {
    background-color: rgba($primary, 0.1);
  }

  margin-bottom: 12px;
}
</style>
