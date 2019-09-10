<template>
  <div class="row justify-content-center">
    <div class="col-md-9">
      <h4 v-if="typeof $route.query.todo=='undefined'">Add a new todo</h4>
      <h4 v-if="typeof $route.query.todo!='undefined'">Add a new task</h4>
      <form v-bind:model="newTodo" v-on:submit.prevent="addNewTodo">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" v-model="newTodo.title" />
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <input type="text" class="form-control" v-model="newTodo.body" />
        </div>
        <input
        type="submit"
        value="Add"
        class="btn bg-mevn"
        :disabled="newTodo.title =='' || newTodo.body =='' ? true:false "
        />
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: "new-todo",
    data() {
      return {
        newTodo: {
          title: "",
          body: "",
          tasks: []
        }
      };
    },
    watch: {
      "newTodo.title"(val) {
        this.newTodo.title = val;
      },
      "newTodo.body"(val) {
        this.newTodo.body = val;
      }
    },
    methods: {
      addNewTodo() {
        if (typeof this.$route.query.todo == "undefined") {
          let todoCount =  localStorage.getItem('todos') != null ? JSON.parse(localStorage.getItem('todos')).length : 0;
          if(todoCount == 0){
            let blob = [{"id" : todoCount+1,"title" : this.newTodo.title,"body":this.newTodo.body,"parent":0,"tasks":this.newTodo.tasks}];
            localStorage.setItem('todos',JSON.stringify(blob));
          }
          else{
            let blob = {"id" : todoCount+1,"title" : this.newTodo.title,"body":this.newTodo.body,"parent":0,"tasks":this.newTodo.tasks};
            let tmp = JSON.parse(localStorage.getItem('todos'));
            tmp.push(blob);
            localStorage.setItem('todos',JSON.stringify(tmp));
          }
        } else {
          let id =  this.$route.query.todo;
          let newTask = this.$parent.todos.filter(data => data.id == id)[0];
          this.newTodo.id = "1"+newTask.tasks.length;
          let task = this.newTodo;
          newTask.tasks.push(this.newTodo);
          this.$parent.todos[this.$parent.todos.findIndex(data => data.id == id)] = newTask
          localStorage.setItem('todos',JSON.stringify(this.$parent.todos));
        }
            window.location = '/';
      }
    },
    mounted() {}
  };
</script>

<style scoped>
</style>
