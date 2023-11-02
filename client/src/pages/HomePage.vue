<template>
  <div class="container-fluid p-4">
    <div class="row">
      <!-- Hero Element -->
    </div>
    <div class="row mx-0">
      <div class="col-12 filter-bar rounded-pill">
        <button @click="filterEditable = filter" v-for="filter in filters" :key="filter" class="btn text-light w-25">
          {{ filter.substring(0, 1).toUpperCase() + filter.substring(1) }}
        </button>
      </div>
    </div>
    <div v-if="towerEvents.length > 0" class="row">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-6 col-lg-4 col-xxl-3 my-2">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <LoadingComponent />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop';
import LoadingComponent from '../components/LoadingComponent.vue';

export default {
    setup() {
        // VARIABLES
        const towerEvents = computed(() => {
          if(filterEditable.value == 'all'){
            return AppState.events
          }else{
            return AppState.events.filter(towerEvent => towerEvent.type == filterEditable.value)
          }
        });
        const filters = ['all', 'concert', 'convention', 'sport', 'digital']
        const filterEditable = ref('all')
        // FUNCTIONS
        async function getTowerEvents() {
            try {
                await towerEventsService.getTowerEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        // LIFECYCLE
        onMounted(() => {
            getTowerEvents();
        });
        return {
            towerEvents,
            filters,
            filterEditable
        };
    },
    components: { LoadingComponent }
}
</script>

<style scoped lang="scss">

.filter-bar{
  display: flex;
  justify-content: space-around;
  background-color: #474C61;
}


</style>
