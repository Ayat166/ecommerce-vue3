<script lang="ts">
import { defineComponent } from 'vue'
import Layout from './components/LayoutComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout
  }
})
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style scoped></style>
