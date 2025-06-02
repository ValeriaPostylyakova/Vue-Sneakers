<script setup lang="ts">
import Card from '@/components/shared/Card.vue'
import type { Sneaker } from '../../../@types/sneakers.ts'
import axios from 'axios'

export interface CardListProps {
  products: Sneaker[]
}

const props = defineProps<CardListProps>()

const onClickAdd = () => {
  console.log('add')
}

const onClickFavorite = async (id: number) => {
  try {
    const sneaker = props.products.find((product) => product.id === id)

    if (!sneaker) {
      return
    }

    await axios.post(`https://125448a15992a523.mokky.dev/favorites`, { ...sneaker, parentId: id })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
      v-for="product in props.products"
      :key="product.id"
      :id="product.id"
      :title="product.title"
      :price="product.price"
      :imageUrl="product.imageUrl"
      is-favorite
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
      :isFavorite="product.isFavorite"
    />
  </div>
</template>
