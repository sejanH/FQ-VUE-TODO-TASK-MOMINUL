<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-mevn">
    <div class="container">
      <a class="navbar-brand" href="/">To Do List</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "navbar",
};
</script>