<template>
    <div class="card-container">
        <div class="position-relative">
            <img class="container-img" :src="towerEvent.coverImg" alt="">
            <div class="info-overlay">
                <p class="fw-bold fs-5">{{ towerEvent.name }}</p>
                <p>{{ towerEvent.location }}</p>
                <p>{{ towerEvent.startDate.toLocaleDateString() }}</p>
                <div class="d-flex justify-content-end">
                    <span class="text-highlight me-1">{{ towerEvent.capacity - towerEvent.ticketCount}}</span> Spots Left
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
export default {
    props:{
        towerEvent: {type: TowerEvent, required: true}
    },
    setup(props){
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
    padding: .25em;
    color: white;
    overflow: hidden;
    border-radius: 3px;
    border: solid 2px #56c7fb91;
    transition: .25s ease-in-out;
}


</style>