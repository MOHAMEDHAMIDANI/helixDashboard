<template>
    <Modal :isOpen="isOpen" @close="$emit('close')">
        <template #title>
            <div class="flex items-center">
                <FolderPlusIcon class="h-5 w-5 text-indigo-500 mr-2" />
                Create New Category
            </div>
        </template>

        <template #content>
            <div class="mt-4">
                <label for="category-name" class="block text-sm font-medium text-gray-700">
                    Category Name
                </label>
                <input v-model="categoryName" type="text" id="category-name"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. Laptops" @keyup.enter="handleSubmit" />
                <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
            </div>
        </template>

        <template #footer>
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
                @click="handleSubmit">
                Create Category
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
import { ref } from 'vue'
import { FolderPlusIcon } from '@heroicons/vue/24/outline'
import Modal from './Modal.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close', 'submit'])

const categoryName = ref('')
const error = ref('')

const handleSubmit = () => {
    if (!categoryName.value.trim()) {
        error.value = 'Category name is required'
        return
    }

    emit('submit', categoryName.value.trim())
    categoryName.value = ''
    error.value = ''
    emit('close')
}
</script>