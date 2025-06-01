<script setup lang="ts">
import Card from '@/components/shared/Card.vue'
import { onMounted, reactive } from 'vue'
import axios from 'axios'

defineProps({
  products: Array,
})

interface Product {
  title: string
  price: number
  imageUrl: string
}

const products = reactive<Product[]>([])

const onClickAdd = () => {
  console.log('add')
}

const onClickFavorite = () => {
  console.log('favorite')
}

onMounted(async () => {
  try {
    const { data } = await axios.get<Product[]>('https://3ad519bdc442b341.mokky.dev/sneaker')
    products.push(...data)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
      v-for="product in products"
      :key="product.title"
      :title="product.title"
      :price="product.price"
      :imageUrl="`/sneakers/${product.imageUrl}.jpg`"
      is-favorite
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>
