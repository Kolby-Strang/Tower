<template>
    <router-link :to="{name: 'TowerEvent', params: {eventId: towerEvent.id}}">
        <div class="card-container">
            <div class="position-relative">
                <img class="container-img" :src="towerEvent.coverImg" alt="">
                <div class="info-overlay">
                    <div class="p-2 pb-0">
                        <p class="fw-bold fs-5">{{ towerEvent.name }}</p>
                        <p>{{ towerEvent.location }}</p>
                        <p>{{ towerEvent.startDate.toLocaleDateString() }}</p>
                    </div>
                    <div v-if="towerEvent.capacity - towerEvent.ticketCount > 0 && !towerEvent.isCanceled" class="d-flex justify-content-end my-p-0">
                        <p><span class="text-highlight">{{ towerEvent.capacity - towerEvent.ticketCount}}</span> Spots Left</p>
                    </div>
                    <div v-else-if="towerEvent.isCanceled" class="bg-danger my-p-0 text-center">
                        <p>Cancelled</p>
                    </div>
                    <div v-else class="bg-danger my-p-0 text-center">
                        <p>Full Capacity</p>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent';
export default {
    props:{
        towerEvent: {type: TowerEvent, required: true}
    },
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

p{
    margin-bottom: 0;
}
.card-container{
    padding: .25em;
    background-color: grey;
    border-radius: 4px;
}
.card-container:hover{
    .info-overlay{
        border-color: #56C7FB;
    }
}
.container-img{
    width: 100%;
    aspect-ratio: 9/7;
    object-fit: cover;
    border-radius: 3px;
}
.info-overlay{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: min-content;
    backdrop-filter: blur(20px);
    color: white;
    overflow: hidden;
    border-radius: 3px;
    border: solid 2px #56c7fb91;
    transition: .25s ease-in-out;
}
.my-p-0{
    padding-top: .2em;
    padding-bottom: .2em;
    padding-right: .7em;
    padding-left: .7em;
}

</style>