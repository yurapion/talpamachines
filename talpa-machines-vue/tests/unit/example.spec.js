import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MachineShow from "../../src/views/MachineShow.vue";
import Vuetify from "vuetify";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { graphql } from "graphql";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe("MachineShow.vue", () => {
  let actions;
  let store;
  let state;
  let getters;
  let obj = {
    a: 1
  };
  let vuetify;

  beforeEach(() => {
    state = {
      machine: { name: "Buldoser", id: 1, sensors: [{ name: "Speed", id: 1 }] }
    };
    actions = {
      fetchSensorDataList: jest.fn(),
      fetchMachine: jest.fn()
    };
    getters = {
      checkIfData: () => true,
      chartSensorsData: () => obj
    };
    store = new Vuex.Store({
      state,
      actions,
      getters
    });
    vuetify = new Vuetify();
  });
  it("call action fetchSensorDataList when form submit", () => {
    const wrapper = shallowMount(MachineShow, {
      computed: { checkSensor: () => true },
      // mocks: {
      //   $vuetify: { breakpoint: {} }
      // },
      store,
      localVue,
      vuetify
    });
    // wrapper.setData({ sensor: { a: 1 } });
    // wrapper.setData({ checkSensor: () => true });
    wrapper.find("form").trigger("submit");
    expect(actions.fetchSensorDataList).toHaveBeenCalled();
  });

  it("call action fetchMachine  when created", () => {
    const wrapper = shallowMount(MachineShow, {
      computed: { checkSensor: () => true },
      store,
      localVue,
      vuetify
    });

    wrapper.find(".title");
    expect(actions.fetchMachine).toHaveBeenCalled();
  });

  it("check if snaphot is correct", () => {
    const wrapper = shallowMount(MachineShow, {
      computed: { checkSensor: () => true },
      store,
      localVue,
      vuetify
    });

    // expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toBe("This is a Buldoser");
  });

  //////////////////////////////////////// SHOULD ADD APPOLLO DIRECTLY TO THE COMPONENT.
  /////////////////////////////////////// TEST DOESN'T WORK BECAUSE ALL QUERIES ARE GOING THROUGH VUEX.
  it("Query data GraphQl", () => {
    const wrapper = shallowMount(MachineShow, {
      computed: { checkSensor: () => true },
      mocks: { $appollo: { queries: { machine: {} } } },
      store,
      localVue,
      vuetify
    });

    const sourceSchema = `
  type Machine {
    id: Int!
    name: String!
  }

  type Query {
    machines: [Machine]
  }
`;

    const query = `
  query {
    machines {
      id
      name
    }
  }
`;

    const schema = makeExecutableSchema({
      typeDefs: sourceSchema
    });

    addMockFunctionsToSchema({
      schema
    });

    graphql(schema, query).then(result => {
      wrapper.setData(result.data);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // it("should emit an event when the action v-select is changed", () => {
  //   const wrapper = shallowMount(MachineShow, {
  //     computed: { checkSensor: () => true },
  //     store,
  //     localVue,
  //     vuetify
  //   });

  //   const event = jest.fn();
  //   const select = wrapper.find(".v-select");

  //   wrapper.vm.$on("@change", event);

  //   expect(event).toHaveBeenCalledTimes(0);
  //   console.log(wrapper.vm.machine.sensors);
  //   select.trigger("change");

  //   expect(event).toHaveBeenCalledTimes(1);
  // });
});
