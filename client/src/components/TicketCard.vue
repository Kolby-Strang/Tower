<template>
    <div class="container-fluid">
        <div class="row my-bg-secondary">
            <div class="col-5 p-0">
                <img class="ticket-img" :src="ticket.event.coverImg" alt="">
            </div>
            <div class="col-7 p-3">
                <p>{{ ticket.event.name }}</p>
                <div class="text-primary">
                    <p class="m-0">{{ ticket.event.location }}</p>
                    <p>{{ ticket.event.startDate.toLocaleDateString() }}</p>
                </div>
                <button @click="deleteTicket()" class="btn btn-danger">
                    Un-attend Event
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import {ticketsService} from '../services/TicketsService.js'
export default {
    props:{
        ticket: {type: Object, required: true}
    },
    setup(props){
        async function deleteTicket(){
            try {
                const confirmDelete = await Pop.confirm(`Are you sure you want to delete ticket to event: ${props.ticket.event.name}?`)
                if(confirmDelete)
                await ticketsService.deleteTicket(props.ticket.id)
            } catch (error) {
                Pop.error(error)
            }
        }
    return { deleteTicket }
    }
};
</script>


<style lang="scss" scoped>

.ticket-img{
    width: 100%;
    height: 30vh;
    object-fit: cover;
    object-position: center;
}

</style>