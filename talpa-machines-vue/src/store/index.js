import Vue from "vue";
import Vuex from "vuex";
import GraphqlService from "@/services/graphql-service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    machine: null,
    machineList: [],
    sensorDataList: []
  },
  mutations: {
    setMachine(state, machine) {
      state.machine = machine;
    },
    setMachinesList(state, machineList) {
      state.machineList = machineList;
    },
    setSensorDataList(state, sensorDataList) {
      state.sensorDataList = sensorDataList;
    }
  },
  actions: {
    fetchMachineList({ commit }) {
      GraphqlService.getMachines().then(
        response => {
          commit("setMachinesList", response.data.machines);
        },
        error => console.log(error)
      );
    },
    fetchMachine({ commit }, id) {
      GraphqlService.getMachine(id).then(response => {
        commit("setMachine", response.data.machine);
      });
    },
    fetchSensorDataList({ commit }, { id, sensorId, startDate, endDate }) {
      GraphqlService.getSensorData(id, sensorId, startDate, endDate).then(
        response => {
          commit("setSensorDataList", response.data.sensorData);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  getters: {
    // chartSensorsData: state => {
    //   let data = {};
    //   const sensorList = state.sensorDataList;
    //   for (let index = 0; index < sensorList.length; index++) {
    //     let timestamp = sensorList[index].timestamp;
    //     let value = sensorList[index].value;
    //     data[timestamp] = value;
    //   }
    //   return data;
    // },
    chartSensorsData: state => {
      let data = {};
      let values = [];
      let timestamps = [];
      const sensorList = state.sensorDataList;
      for (let index = 0; index < sensorList.length; index++) {
        let timestamp = sensorList[index].timestamp;
        let value = sensorList[index].value;
        values.push(value);
        timestamps.push(new Date(timestamp).getMonth());
      }
      data = {
        values: values,
        timestamps: timestamps,
        title: "Data for this period"
      };
      console.log(data);
      return data;
    },
    checkIfData: state => {
      return state.sensorDataList.length > 0;
    }
  },
  modules: {}
});
