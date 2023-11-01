<template>
  <div class="container-fluid p-4">
    <div class="row">
      <!-- Hero Element -->
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <button class="btn">MAKE THIS FILTER BAR</button>
      </div>
    </div>
    <div class="row">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-6 col-lg-4 col-xxl-3 my-2">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop';

export default {
  setup() {
    // VARIABLES
    const towerEvents = computed( () => AppState.events ) 
    // FUNCTIONS
    async function getTowerEvents(){
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    // LIFECYCLE
    onMounted(()=>{
      getTowerEvents()
    })
    return {
      towerEvents,
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
