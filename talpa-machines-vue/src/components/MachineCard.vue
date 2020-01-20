<template>
  <router-link
    class="machine-link"
    :to="{ name: 'machine-show', params: { id: machine.id } }"
  >
    <div class="machine-card -shadow">
      <h4 class="title">{{ machine.name }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    machine: Object
  }
};
</script>

<style scoped>
.machine-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.machine-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.machine-card > .title {
  margin: 0;
}
.machine-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
