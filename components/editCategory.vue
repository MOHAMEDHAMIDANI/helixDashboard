<template>
    <Modal :isOpen="isOpen" @close="$emit('close')">
        <template #title>
            <div class="flex items-center">
                <PencilIcon class="h-5 w-5 text-indigo-500 mr-2" />
                Edit Category
            </div>
        </template>

        <template #content>
            <div class="mt-4 space-y-4">
                <div>
                    <label for="category-select" class="block text-sm font-medium text-gray-700">
                        Select Category
                    </label>
                    <select v-model="selectedCategory" id="category-select"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option :value="null" disabled>Select category</option>
                        <option v-for="(category, index) in props.category" :key="category.id"
                            :value="{ ...category, index: index }">
                            {{ category.categoryName }}
                        </option>
                    </select>
                </div>

                <div>
                    <label for="new-category-name" class="block text-sm font-medium text-gray-700">
                        New Name
                    </label>
                    <input v-model="newName" type="text" id="new-category-name"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        :placeholder="selectedCategory ? `Current: ${selectedCategory.name}` : ''"
                        @keyup.enter="handleSubmit" />
                    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
                </div>
            </div>
        </template>

        <template #footer>
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
                @click="handleSubmit">
                Update Category
            </button>
            <button type="button"
                class="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                @click="$emit('close')">
                Cancel
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PencilIcon } from '@heroicons/vue/24/outline'
import Modal from './Modal.vue'
import type { Category } from '~/types'

interface Props {
    category: Category[],
    isOpen: boolean
}
const props = defineProps<Props>()


const emit = defineEmits(['close', 'submit'])

const selectedCategory = ref<{ id: string; categoryName: string, index: number } | null>(null)
const newName = ref('')
const error = ref('')

watch(selectedCategory, (newVal) => {
    console.log(newVal)
    if (newVal) {
        newName.value = newVal.categoryName
    }
})

const handleSubmit = () => {
    if (!selectedCategory.value) {
        error.value = 'Please select a category'
        return
    }

    if (!newName.value.trim()) {
        error.value = 'New name is required'
        return
    }

    emit('submit', {
        id: selectedCategory.value.id,
        name: newName.value.trim(),
        index: selectedCategory.value.index
    })

    selectedCategory.value = null
    newName.value = ''
    error.value = ''
    emit('close')
}
</script>