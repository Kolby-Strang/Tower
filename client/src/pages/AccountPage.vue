<template>
  <div class="container-fluid p-5 text-light">
    <div class="row">
      <div class="col-12">
        <h1>Welcome {{ account.name }}</h1>
      </div>
    </div>

    <div v-if="towerEvents.length > 0" class="row">
      <div class="col-12">
        <p class="fs-3">My Events</p>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-12 col-md-6 col-lg-4 col-xxl-3 my-2">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
    <div v-if="tickets.length > 0" class="row">
      <div class="col-12">
        <p class="fs-3">My Tickets</p>
      </div>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-12 my-2 px-5">
        <TicketCard :ticket="ticket" />
      </div>
    </div>

  </div>
    
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import TowerEventCard from '../components/TowerEventCard.vue';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { ticketsService } from '../services/TicketsService';
export default {
    setup() {
        // VARIABLES
        const account = computed(() => AppState.account);
        const towerEvents = computed(() => AppState.events.filter(towerEvent => towerEvent.creatorId == account.value.id && !towerEvent.isCanceled));
        const tickets = computed(()=> AppState.myTickets)
        // FUNCTIONS
        async function getEvents(){
          try {
            await towerEventsService.getTowerEvents();
          }catch (error) {
            Pop.error(error);
          }
        }
        async function getTickets(){
          try {
            await ticketsService.getMyTickets()
          } catch (error) {
            Pop.error(error);
          }
        }
        // LIFECYCLE
        onMounted(()=>{
          getEvents()
          getTickets()
        })
        return {
            account,
            towerEvents,
            tickets
        };
    },
    components: { TowerEventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
