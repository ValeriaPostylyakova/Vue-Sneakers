<script setup lang="ts">
import type { Sneaker } from '../../../@types/sneakers.ts'

interface Props extends Sneaker {
  onClickAdd: () => void
  onClickFavorite: (id: number) => void
}

const props = defineProps<Props>()

const handleFavoriteClick = () => {
  props.onClickFavorite(props.id)
}
</script>

<template>
  <div
    class="relative flex flex-col w-full border border-slate-100 rounded-2xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="handleFavoriteClick" class="absolute top-8 left-8">
      <img :src="props.isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" />
    </div>
    <img :src="props.imageUrl" class="w-full" alt="Sneaker" />
    <p>{{ props.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ props.price }} руб.</span>
      </div>
      <img @click="onClickAdd" :src="props.isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus" />
    </div>
  </div>
</template>
