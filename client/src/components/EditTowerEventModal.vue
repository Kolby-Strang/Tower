<template>
    <div class="modal fade" :id="`edit${towerEvent.id}Modal`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" :id="`edit${towerEvent.id}ModalLabel`">Edit {{ towerEvent.name }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editEvent()">
<!-- TODO add all requirements and maxes/make the capacity throw a warning if more tickets have been sold than the capacity -->
                        <div class="form-floating">
                            <input v-model="editable.name" type="text" class="form-control" id="Name" placeholder=".">
                            <label for="Name">Name</label>
                        </div>
                        <div class="form-floating">
                            <textarea v-model="editable.description" class="form-control" placeholder="." id="description"></textarea>
                            <label for="description">Description</label>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="form-floating w-50">
                                <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" placeholder=".">
                                <label for="coverImg">Cover Image Url</label>
                            </div>
                            <div>
                                <img class="img-preview" :src="editable.coverImg" alt="Preview Image">
                            </div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="form-floating">
                                <input v-model="editable.location" type="text" class="form-control" id="location" placeholder=".">
                                <label for="location">Location</label>
                            </div>
                            <div class="form-floating">
                                <input v-model="editable.capacity" type="number" class="form-control" id="capacity" placeholder=".">
                                <label for="capacity">Capacity</label>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="form-floating">
                                <!-- TODO get date to work with editable -->
                                <input v-model="editable.startDate" type="datetime-local" class="form-control" id="startDate" placeholder=".">
                                <label for="startDate">Event Start Time</label>
                            </div>
                            <div class="form-floating">
                                <select v-model="editable.type" class="form-select" id="floatingSelectGrid">
                                    <!-- TODO get selected to work with editable -->
                                    <option value="concert">Concert</option>
                                    <option value="convention">Convention</option>
                                    <option value="sport">Sport</option>
                                    <option value="digital">Digital</option>
                                </select>
                            <label for="floatingSelectGrid">Type</label>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { TowerEvent } from '../models/TowerEvent';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
import { Modal } from 'bootstrap';
export default {
    props:{
        towerEvent: { type: TowerEvent, required: true }
    },
    setup(props){
        const editable = ref({...props.towerEvent})
        async function editEvent(){
            try {
                await towerEventsService.editEvent(editable.value)
                editable.value = {...AppState.activeTowerEvent}
                Modal.getOrCreateInstance(`#edit${props.towerEvent.id}Modal`).hide()
            } catch (error) {
                Pop.error(error)
            }
        }
    return {
        editable,
        editEvent
      }
    }
};
</script>


<style lang="scss" scoped>

.img-preview{
    height: 58px;
    max-width: 100%;
}

</style>