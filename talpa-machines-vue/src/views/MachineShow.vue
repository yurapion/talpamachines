<template>
  <v-container>
    <div class="machine-header">
      <h1 class="title">This is a {{ machine.name }}</h1>
    </div>

    <h4 v-if="!checkSensor">Please Select a Sensor</h4>

    <v-select
      @change="onChange($event)"
      :items="machine.sensors"
      v-model="sensor"
      item-text="name"
      item-value="id"
      label="Sensor"
      solo
    ></v-select>

    <div class="location">
      <!-- <BaseIcon name="map" class="icon"><h2>Location</h2></BaseIcon> -->

      <address>Last known gps position {{ machine.lastKnownPosition }}</address>
    </div>

    <form
      v-if="checkSensor"
      @submit.prevent="fetchSesordata(id, startDate, endDate, sensor)"
    >
      <!-- <input type="text" name="startDate" v-model="startDate" />
      <input type="text" name="endDate" v-model="endDate" /> -->
      <!-- <div v-if="checkSensor"> -->
      <div>
        <h3 v-if="!checkDates">Please Select Dates</h3>
        <div class="field">
          <label>First day</label>
          <datepicker
            v-model="startDate"
            placeholder="Select a start date"
            class="date"
          />
        </div>

        <div class="field">
          <label>Last day</label>
          <datepicker
            v-model="endDate"
            placeholder="Select an end date"
            class="date"
          />
        </div>
      </div>

      <v-btn type="submit" v-if="checkDates" color="info"
        >Fetch Sensor Data
      </v-btn>
    </form>

    <DataGraph v-if="checkIfData" cols="12" md="4" :data="chartSensorsData" />

    <!-- <BaseIcon v-if="!chechDataAfterSubmit" name="info">
      Sorry there are no data for selected dates for {{ sensor.name }}</BaseIcon
    > -->
    <v-snackbar v-model="snackbar" :left="$vuetify.breakpoint.lgAndUp">
      You have selected {{ selectedMachine.name }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from "vuex";
import DataGraph from "../components/DataGraph";
export default {
  components: {
    Datepicker,
    DataGraph
  },
  props: ["id"],
  data() {
    return {
      startDate: "",
      endDate: "",
      sensor: {},
      change: true,
      selectedMachine: {
        name: "",
        id: ""
      },
      snackbar: false
    };
  },
  computed: {
    checkDates() {
      return this.startDate && this.endDate;
    },
    checkSensor() {
      return this.sensor > 0;
    },
    chechDataAfterSubmit() {
      return this.change || this.checkIfData;
    },
    ...mapGetters(["chartSensorsData", "checkIfData"]),
    ...mapState(["machine", "sensorDataList"])
  },
  methods: {
    fetchSesordata(id, startDate, endDate, sensorId) {
      this.$store.dispatch("fetchSensorDataList", {
        id,
        sensorId,
        startDate,
        endDate
      });
      this.change = false;
    },
    onChange() {
      this.change = true;
    }
  },
  beforeCreate() {},
  created() {
    this.$store.dispatch("fetchMachine", this.id);

    this.snackbar = true;
    this.selectedMachine.name = this.machine.name;
    this.selectedMachine.id = this.machine.id;
  },
  mounted() {}
};
</script>

<style scoped>
.date {
  width: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.machine-header > .title {
  margin: 0;
}
.field {
  margin-bottom: 24px;
  width: 20%;
}
</style>
