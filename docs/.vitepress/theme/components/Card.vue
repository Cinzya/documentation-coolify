<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    title?: string
    image?: string
    link?: string
    icon?: string
    iconSize?: 'small' | 'medium' | 'large'
    iconColor?: string
    theme?: 'outlined' | 'solid' | 'icon'
    cols?: number | 'auto'
}>()
</script>

<template>
  <a :href="link" class="group p-1 bg-gray-100 border border-gray-200 rounded-lg dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200 no-underline" style="border-bottom: none;">
    <div class="flex flex-col rounded-lg cursor-pointer transition-transform duration-200">
      <div :class="cols && typeof cols === 'number' && cols > 2 ? 'aspect-[3/2] rounded-lg overflow-hidden' : 'aspect-video rounded-lg overflow-hidden'">
        <img
          :src="image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex items-center justify-between px-4 pt-1 pb-0">
        <div class="flex items-center gap-2">
          <p class="text-base font-medium m-0 text-gray-800 dark:text-gray-100">{{ title }}</p>
          <div class="group-hover:translate-x-1 transition-all duration-200 w-4 h-4 text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>


