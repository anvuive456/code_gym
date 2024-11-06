<template>
    <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      <router-link to="/" class="navbar-brand d-flex d-lg-none me-4">
        <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
      </router-link>
      <a href="#" class="sidebar-toggler flex-shrink-0">
        <i class="fa fa-bars"></i>
      </a>
      <form class="d-none d-md-flex ms-4">
        <input class="form-control border-0" type="search" placeholder="Search" />
      </form>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  