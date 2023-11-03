<template>
    <div class="modal fade" id="newTowerEventModal" tabindex="-1" aria-labelledby="newTowerEventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newTowerEventModalLabel">Create Event</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createEvent()">
<!-- TODO add all requirements and maxes/make the capacity throw a warning if more tickets have been sold than the capacity -->
                        <div class="form-floating">
                            <input required v-model="editable.name" type="text" class="form-control" id="Name" placeholder=".">
                            <label for="Name">Name</label>
                        </div>
                        <div class="form-floating">
                            <textarea required v-model="editable.description" class="form-control" placeholder="." id="description"></textarea>
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
                                <input required v-model="editable.location" type="text" class="form-control" id="location" placeholder=".">
                                <label for="location">Location</label>
                            </div>
                            <div class="form-floating">
                                <input required v-model="editable.capacity" type="number" class="form-control" id="capacity" placeholder=".">
                                <label for="capacity">Capacity</label>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="form-floating">
                                <input required v-model="editable.startDate" type="datetime-local" class="form-control" id="startDate" placeholder=".">
                                <label for="startDate">Event Start Time</label>
                            </div>
                            <div class="form-floating">
                                <select required class="form-select" id="floatingSelectGrid">
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
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const editable = ref({})
        async function createEvent(){
            try {
                const towerEvent = await towerEventsService.createEvent(editable.value)
                useRouter().push(`event/${towerEvent.id}`)
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        editable,
        createEvent
     }
    }
};
</script>


<style lang="scss" scoped>

</style>