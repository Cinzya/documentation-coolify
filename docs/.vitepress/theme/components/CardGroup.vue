<template>
    <div class="grid w-full gap-4" :style="cols === 'auto' ? 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));' : `grid-template-columns: repeat(${cols}, 1fr);`">
        <Card
            v-for="(card, i) in cards" :key="i"
            :title="card.title"
            :image="card.image"
            :link="card.link"
            :cols="cols"
        />
    </div>
</template>

<script setup lang="ts">

interface CardData {
  title: string
  image: string
  link: string
}

const props = withDefaults(defineProps<{
  cards: CardData[]
  cols?: number | 'auto'
}>(), { cols: 'auto' })

const cards = props.cards || []
</script>

