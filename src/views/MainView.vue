<template>
    <v-container fluid>
        <h1>アニメ</h1>
        <br/>
        <v-card>
            <v-row>
                <v-col
                v-for="n in list"
                :key="n.id"
                cols="12" 
                md="2">
                    <v-card 
                    @click="clickAnime(n.id)"
                    class="anime-card"
                    hover
                    >
                        <v-img
                        :src="n.Image"
                        height="400"
                        cover
                        ></v-img>
                        <v-card-title class="text-wrap pa-3">
                            {{ n.Name }}
                        </v-card-title>
                    </v-card>   
                </v-col>
            </v-row>
            <v-pagination
            v-model="page"
            :length="lengthOfPage">
            </v-pagination>


        </v-card>
    </v-container>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { getAnimes } from "../api/anime";

export default defineComponent({
    setup() {
        const router = useRouter()
        const list = ref([])
        const page = ref(1)
        const lengthOfPage = ref(1)
        const totalCount = 24

        const fetchAnimes = async () => {
            const response = await getAnimes(page.value, totalCount)
            list.value = response.message || []
            lengthOfPage.value = response.pagination?.total_pages || 1
        }

        onMounted(fetchAnimes)
        watch(page, fetchAnimes)

        const clickAnime = (id) => {
            router.push({path: `/anime/${id}`})
        }

        return {
            list, page, 
            lengthOfPage,
            clickAnime,
            totalCount
        }
    }
})

</script>

<style scoped>
.anime-card {
  overflow: visible;
}

.anime-card :deep(.v-card-title) {
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-height: auto;
  line-height: 1.4;
  padding: 12px !important;
}

.anime-card :deep(.v-img) {
  border-radius: 4px 4px 0 0;
}
</style>
