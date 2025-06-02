<script setup lang="ts">
import CardList from '@/components/shared/CardList.vue'
import Header from '@/components/shared/Header.vue'
import Drawer from '@/components/shared/Drawer.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import type { Sneaker } from '../../../@types/sneakers.ts'
import type { TFilters } from '@/pages/Home/Home.types.ts'

const sneakers = ref<Sneaker[]>([])

const filters: TFilters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const fetchSneakers = async () => {
  try {
    const { data } = await axios.get<Sneaker[]>(
      `https://125448a15992a523.mokky.dev/sneakers?sortBy=${filters.sortBy}&title=*${filters.searchQuery}*`
    )
    sneakers.value = data.map((sneaker) => ({
      ...sneaker,
      isFavorite: false,
      isAdded: false,
    }))
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get<Sneaker[]>(
      'https://125448a15992a523.mokky.dev/favorites'
    )
    sneakers.value = sneakers.value.map((sneaker) => {
      const favoriteSneaker = favorites.find((favorite) => favorite.parentId === sneaker.id)
      if (!favoriteSneaker) {
        return sneaker
      }

      return {
        ...sneaker,
        isFavorite: true,
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const onChangeSearchInput = (e: ChangeEvent) => {
  filters.searchQuery = e.target.value
}

const onChangeSelect = (e: ChangeEvent) => {
  filters.sortBy = e.target.value
}

onMounted(async () => {
  await fetchSneakers()
  await fetchFavorites()
})
watch(filters, fetchSneakers)
</script>

<template>
  <!--  <Drawer />-->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 my-10">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none bg-white"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
              @input="onChangeSearchInput"
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>

      <CardList :products="sneakers" />
    </div>
  </div>
</template>
