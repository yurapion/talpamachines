const { ApolloServer, gql } = require("apollo-server");
const { find, filter } = require("lodash");
const GraphQLDateTime = require("graphql-type-datetime");
const { GraphQLScalarType } = require("graphql");
const { mockServer, MockList } = require("graphql-tools");
const casual = require("casual-browserify");
const faker = require("faker");

const machineTitles = [
  "Cran",
  "Buldozer",
  "Truck",
  "Excavator",
  "Grader",
  "Tractor",
  "Trencher"
];
const sensorTitles = [
  "Temperature Sensor",
  "Proximity Sensor",
  "Accelerometer",
  "Pressure Sensor",
  "Ultrasonic Sensor",
  "Humidity Sensor"
];
const mocks = {
  Query: () => ({
    machines: () => new MockList(5),
    sensorData: (_, { id, sensorId, from, to }) => new MockList(20),
    machine: (o, { id }) => ({ id })
  }),
  ID: () => faker.random.number({ min: 1, max: 25 }),
  Int: () => faker.random.number({ min: 1, max: 35 }),
  String: () => faker.name.firstName(),
  DateTime: () => faker.date.past(),
  Float: () => Math.random() * 10,
  GPSPosition: () => [faker.address.latitude(), faker.address.longitude()],
  Machine: () => ({
    name: () =>
      faker.random.arrayElement(machineTitles) +
      faker.random.number({ min: 1, max: 25 }),
    sensors: () => new MockList([1, 4])
  }),
  Sensor: () => ({
    name: () => faker.random.arrayElement(sensorTitles)
  })
};

const typeDefs = gql`
  scalar DateTime
  scalar GPSPosition
  type Machine {
    id: Int
    sensors: [Sensor]
    name: String
    lastKnownPosition: GPSPosition
  }

  type Sensor {
    id: Int
    name: String
    machine: Machine
  }

  type SensorDataPoint {
    id: Int
    value: Float
    timestamp: DateTime
  }

  type Query {
    machines: [Machine]
    machine(id: Int!): Machine
    sensorData(
      id: Int!
      from: DateTime!
      to: DateTime!
      sensorId: Int!
    ): [SensorDataPoint]
  }
`;

const server = new ApolloServer({ typeDefs, mocks });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
