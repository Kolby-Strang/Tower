<template>
    <div v-if="towerEvent" class="container">
        <div class="row pt-2">
            <div class="rounded card-container col-12 p-0" :style="`background-image: url('${towerEvent.coverImg}');`">
                <div class="info-overlay container-fluid rounded">
                    <div class="row">

                        
                        <div class="col-12 col-lg-6 col-xxl-5">
                            <img class="foreground-cover-img" :src="towerEvent.coverImg" alt="">
                        </div>
                        <div class="info col-12 col-lg-6 col-xxl-7 d-flex flex-column justify-content-between text-light text-shadow">
                            <div>
                                <div v-if="towerEvent.creatorId == account.id && !towerEvent.isCanceled" class="d-flex justify-content-end">
                                    <div>
                                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-menu fs-2"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <button class="dropdown-item btn" data-bs-toggle="modal" :data-bs-target="`#edit${towerEvent.id}Modal`">
                                                Edit Event
                                            </button>
                                            <button @click="destroyEvent()" class="dropdown-item btn text-danger">
                                                Cancel Event
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <p class="fs-4 fw-bold">{{ towerEvent.name }}</p>
                                    <p class="fs-5">{{ towerEvent.startDate.toLocaleDateString() }}</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <p class="fs-5">{{ towerEvent.location }}</p>
                                    <p class="fs-5">Starts at {{ towerEvent.startDate.toLocaleTimeString() }}</p>
                                </div>
                                <div>
                                    <p>{{ towerEvent.description }}</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div v-if="towerEvent.capacity - towerEvent.ticketCount > 0 && !towerEvent.isCanceled" class="d-flex justify-content-between align-items-center p-1 w-100">
                                    <p class="m-0"><span class="text-highlight">{{ towerEvent.capacity - towerEvent.ticketCount}}</span> Spots Left</p>
                                    <div class="d-flex flex-column align-items-center">
                                        <button v-if="account.id" @click="createTicket()" class="btn btn-warning">Grab A Ticket!</button>
                                        <p v-if="eventTickets.find(ticket => ticket.accountId == towerEvent.creatorId)" class="text-success m-0">You are attending this event!</p>
                                    </div>
                                </div>
                                <div v-else-if="towerEvent.isCanceled" class="bg-danger p-1 text-center w-100">
                                    <p class="m-0">Cancelled</p>
                                </div>
                                <div v-else class="bg-danger p-1 text-center w-100">
                                    <p class="m-0">Full Capacity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 py-5">
                <p class="text-secondary">See who's attending</p>
                <div v-if="eventTickets.length > 0" class="row my-bg-secondary rounded py-2">
                    <div v-for="ticket in eventTickets" :key="ticket.id" class="col">
                        <img class="small-profile-picture" :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name">
                    </div>
                </div>
                <div v-else class="row my-bg-secondary rounded py-2">
                    <p class="m-0">No-one is here yet,</p>
                    <p class="m-0">You could be the first one!</p>
                </div>
            </div>
            <div class="col-12 px-5 pb-5">
                <div class="my-bg-secondary p-4">
                    <div v-if="account.id">
                        <p class="text-end text-success">Join The Conversation!</p>
                        <form @submit.prevent="createComment()">
                            <div class="form-floating mb-3">
                                <textarea v-model="editable.body" class="form-control" placeholder="Leave a comment here" id="commentBody" style="height: 120px"></textarea>
                                <label for="commentBody">Comment...</label>
                            </div> 
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-success">Post Comment</button>
                            </div>
                        </form>
                    </div>

                    <div v-if="eventComments.length > 0" class="row">
                        <div v-for="comment in eventComments" :key="comment.id" class="col-12 my-2">
                            <div class="row">
                                <div class="col-2">
                                    <img class="comment-profile-picture shadow" :src="comment.creator.picture" alt="">
                                </div>
                                <div class="col-10 bg-light rounded shadow">
                                    <div class="d-flex justify-content-between pt-2">
                                        <p class="fs-5 fw-bold mb-0">{{ comment.creator.name }} <span v-if="eventTickets.find(ticket => ticket.accountId == comment.creator.id)" class="fs-6 text-primary">Attending This Event</span></p>
                                        <button @click="deleteComment(comment.id)" v-if="comment.creator.id == account.id" class="btn btn-outline-danger"><i class="mdi mdi-delete"></i></button>
                                    </div>
                                    <p>{{ comment.body }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center"><LoadingComponent /></div>
    <EditTowerEventModal v-if="towerEvent" :towerEvent="towerEvent" />
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, onMounted, popScopeId, ref } from 'vue';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
import { commentsService } from '../services/CommentsService';
import { ticketsService } from '../services/TicketsService';
import LoadingComponent from '../components/LoadingComponent.vue';
import EditTowerEventModal from '../components/EditTowerEventModal.vue';
export default {
    setup() {
        // VARIABLES
        const route = useRoute();
        const towerEvent = computed(() => AppState.activeTowerEvent);
        const eventComments = computed(()=>AppState.activeComments)
        const eventTickets = computed(()=>AppState.activeTickets)
        const account = computed(()=>AppState.account)
        const editable = ref({})
        // FUNCTIONS
        async function getActiveTowerEvent() {
            try {
                await towerEventsService.getActiveTowerEvent(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getComments(){
            try {
                await commentsService.getActiveComments()
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTickets(){
            try {
                await ticketsService.getActiveComments()
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createTicket(){
            try {
                await ticketsService.createTicket(towerEvent.value.id)
                Pop.success('You got the Ticket!!!')
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createComment(){
            try {
                await commentsService.createComment(editable.value, towerEvent.value.id)
                Pop.success('Comment Created!')
                editable.value = {}
            } catch (error) {
                Pop.error(error)
            }
        }
        async function destroyEvent(){
            try {
                const confirmDelete = await Pop.confirm(`Are you sure you want to delete "${towerEvent.value.name}"`)
                if(confirmDelete){
                    await towerEventsService.deleteActiveEvent()
                }
            } catch (error) {
                Pop.error(error)
            }
        }
        async function deleteComment(commentId){
            try {
                const confirmDelete = await Pop.confirm('Are you sure you want to delete this comment?')
                if(confirmDelete)
                await commentsService.deleteComment(commentId)
            } catch (error) {
                Pop.error(error)
            }
        }
        function clearData(){
            towerEventsService.clearData()
        }
        // LIFECYCLE
        onMounted(async() => {
            clearData()
            await getActiveTowerEvent();
            await getComments()
            await getTickets()
        });
        return { 
            towerEvent,
            account,
            eventComments,
            eventTickets,
            createTicket,
            createComment,
            editable,
            destroyEvent,
            deleteComment
        };
    },
    components: { LoadingComponent, EditTowerEventModal }
};
</script>


<style lang="scss" scoped>

.card-container{
    height: min-content;
    background-position: center;
    background-size: cover;
}
.foreground-cover-img{
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
}
.info-overlay{
    backdrop-filter: blur(10px);
    background-color: #29cbf43b;
    width: 100%;
    height: 100%;
    padding: .5em;
}
.text-shadow> *p{
    filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.818));
}
.small-profile-picture{
    aspect-ratio: 1/1;
    border-radius: 50%;
    height: 8vh;
}
.comment-profile-picture{
    aspect-ratio: 1/1;
    border-radius: 50%;
    width: 100%;
}
.info{
    z-index: 1;
    position: relative;
}
</style>