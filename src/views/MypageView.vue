<template>
    <v-container fluid>
        <v-card
        variant="text"
        :title="id"
        subtitle="작성 댓글 모음">
        </v-card>
        <v-card
        title="reviews">
        <div class="ma-2" 
        v-for="review in reviews"
        :key="review.id">
            <v-card
            variant="text"
            :title="review.name"
            :subtitle="review.time"
            @click="move(review.id)"
            >
                <v-card-text class="bg-surface-light pt-4">{{review.content}}</v-card-text>
            </v-card>                            
        </div>
        <br/>
            <div class="ma-2">
                <v-pagination
                    v-model="page"
                    :length="lengthOfPage">
                </v-pagination>
            </div>
        
        </v-card>
    </v-container>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCommentsByUser } from "@/api/anime"

export default defineComponent({
    setup() {
        const router = useRouter()
        const store = useStore()
        const id = store.getters["userStore/getUserId"]
        const reviews = ref([])
        const page = ref(1)
        const pageSize = 20
        const lengthOfPage = ref(1)

        const fetchReviews = async () => {
            const tokenInfo = store.getters['userStore/getToken']
            const response = await getCommentsByUser(
                {userId: id},
                tokenInfo,
                page.value,
                pageSize
            )

            reviews.value = response.result || []
            lengthOfPage.value = response.pagination?.total_pages || 1
        }

        onMounted(fetchReviews)
        watch(page, fetchReviews)

        const move = (id) => {
            router.push(`/anime/${id}`)
        }
       return {
        id,
        reviews, lengthOfPage,
        page,
        move
       } 
    },
})
</script>
