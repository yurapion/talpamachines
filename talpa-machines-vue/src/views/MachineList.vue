<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="machineList"
      :items-per-page="5"
      class="elevation-1"
      @click:row="selectRow"
      :multi-sort="true"
      style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 800px;"
    ></v-data-table>
  </v-container>
</template>

<script>
// import MachineCard from "../components/MachineCard";
import { mapState } from "vuex";
export default {
  components: {
    // MachineCard
  },
  data: () => ({
    headers: [
      { text: "Machine ID", value: "id" },
      { text: "Name", value: "name" }
    ]
  }),
  computed: {
    ...mapState(["machineList"])
  },
  methods: {
    selectRow(event) {
      const machine = {
        name: event.name,
        id: event.id
      };
      this.$emit("select-machine", machine);
      this.$router.push({ name: "machine-show", params: { id: event.id } });
    }
  }
};
</script>

<style scoped></style>
