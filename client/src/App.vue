<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view :key="$route.path" />
  </main>
  <NewTowerEventModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import NewTowerEventModal from './components/NewTowerEventModal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, NewTowerEventModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
body{
  background-color: #2e303c;
}
header{
  border-bottom: solid rgba(255, 255, 255, 0.421) 1px;
}

.text-highlight{
  color: #56C7FB;
}
.my-bg-secondary{
  background-color: #474C61;
}
</style>
