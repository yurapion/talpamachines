<template>
  <v-card color="cyan" dark>
    <v-card-text>
      <v-sparkline
        :value="data.values"
        :labels="data.timestamps"
        color="rgba(255, 255, 255, .7)"
        height="150"
        padding="24"
        stroke-linecap="round"
        smooth
      />
    </v-card-text>

    <v-card-text class="text-center">
      <div class="display-1">{{ data.title }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataGraph",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
