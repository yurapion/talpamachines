import graphqlClient from "../utils/graphql";
import gql from "graphql-tag";

export default {
  async getMachines() {
    return await graphqlClient.query({
      query: gql`
        query machines {
          machines {
            id
            name
          }
        }
      `
    });
  },
  async getMachine(id) {
    return await graphqlClient.query({
      query: gql`
        query machine($id: Int!) {
          machine(id: $id) {
            id
            name
            lastKnownPosition
            sensors {
              id
              name
            }
          }
        }
      `,
      variables: {
        id: id
      }
    });
  },
  async getSensorData(id, sensorId, from, to) {
    return await graphqlClient.query({
      query: gql`
        query sensorData(
          $id: Int!
          $sensorId: Int!
          $from: DateTime!
          $to: DateTime!
        ) {
          sensorData(id: $id, from: $from, to: $to, sensorId: $sensorId) {
            timestamp
            value
          }
        }
      `,
      variables: {
        id: id,
        sensorId: sensorId,
        from: from,
        to: to
      }
    });
  }
};
