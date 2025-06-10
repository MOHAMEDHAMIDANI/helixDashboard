<template>
    <Modal :isOpen="isOpen" @close="$emit('close')">
        <template #title>
            <div class="flex items-center">
                <PencilIcon class="h-5 w-5 text-indigo-500 mr-2" />
                Edit Category
            </div>
        </template>

        <template #content>
            <div class="mt-4 space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Select Category
                    </label>
                    <div class="relative">
                        <button @click="dropdownOpen = !dropdownOpen" type="button"
                            class="relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-150"
                            :class="{ 'ring-2 ring-indigo-500 border-indigo-500': dropdownOpen }">
                            <span class="block truncate">
                                {{ selectedCategory ? selectedCategory.categoryName : 'Select a category...' }}
                            </span>
                            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronUpDownIcon class="h-5 w-5 text-gray-400 transition-transform duration-200"
                                    :class="{ 'rotate-180': dropdownOpen }" />
                            </span>
                        </button>

                        <transition name="dropdown">
                            <ul v-show="dropdownOpen"
                                class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60 transition-all duration-200 origin-top"
                                @click.stop>
                                <li v-for="(category, index) in props.category" :key="category.id"
                                    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 group hover:bg-indigo-50 transition-colors duration-100 flex justify-between items-center">
                                    <span @click="selectCategory(category, index)"
                                        class="block truncate flex-grow font-medium">
                                        {{ category.categoryName }}
                                    </span>
                                    <button @click.stop="confirmDelete(category, index)"
                                        class="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100">
                                        <TrashIcon class="h-4 w-4" />
                                    </button>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
                <div class="space-y-1">
                    <label for="new-category-name" class="block text-sm font-medium text-gray-700">
                        New Name
                    </label>
                    <input v-model="newName" type="text" id="new-category-name"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-150"
                        :placeholder="selectedCategory ? `Current: ${selectedCategory.categoryName}` : 'Enter new category name...'"
                        @keyup.enter="handleSubmit" />
                    <p v-if="error" class="mt-1 text-sm text-red-600 transition-all duration-200">{{ error }}</p>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3">
                <button type="button"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
                    @click="$emit('close')">
                    Cancel
                </button>
                <button type="button"
                    class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="handleSubmit" :disabled="!selectedCategory || !newName.trim()">
                    Update Category
                </button>
            </div>
        </template>
    </Modal>
    <Modal :isOpen="showDeleteConfirmation" @close="showDeleteConfirmation = false">
        <template #title>
            <div class="flex items-center">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
                Confirm Deletion
            </div>
        </template>

        <template #content>
            <div class="space-y-2">
                <p class="text-gray-700">
                    Are you sure you want to delete the category:
                </p>
                <p class="font-medium text-gray-900">
                    "{{ categoryToDelete?.categoryName }}"
                </p>
                <p class="text-sm text-gray-500">
                    This action cannot be undone.
                </p>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end space-x-3">
                <button type="button"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 shadow-sm"
                    @click="showDeleteConfirmation = false">
                    Cancel
                </button>
                <button type="button"
                    class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 shadow-sm"
                    @click="handleDelete">
                    Delete
                </button>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { PencilIcon, TrashIcon, ExclamationTriangleIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'
import Modal from './Modal.vue'
import type { Category } from '~/types'

interface Props {
    category: Category[],
    isOpen: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['close', 'submit', 'delete'])

const selectedCategory = ref<{ id: string; categoryName: string, index: number } | null>(null)
const newName = ref('')
const error = ref('')
const showDeleteConfirmation = ref(false)
const categoryToDelete = ref<Category | null>(null)
const categoryToDeleteIndex = ref<number | null>(null)
const dropdownOpen = ref(false)

const selectCategory = (category: Category, index: number) => {
    selectedCategory.value = { ...category, index }
    dropdownOpen.value = false
}

watch(selectedCategory, (newVal) => {
    if (newVal) {
        newName.value = newVal.categoryName
    }
})
 const categoryStore = useCategoryStore()
const confirmDelete = (category: Category, index: number) => {
    categoryToDelete.value = category
    categoryToDeleteIndex.value = index
    showDeleteConfirmation.value = true
    dropdownOpen.value = false
}

const handleDelete = async() => {
    if (categoryToDelete.value && categoryToDeleteIndex.value !== null) {
        console.log('Emitting delete event for:', categoryToDelete.value.id, 'at index:', categoryToDeleteIndex.value);
        await categoryStore.deleteCategory(categoryToDelete.value.id, categoryToDeleteIndex.value)
        showDeleteConfirmation.value = false;
        categoryToDelete.value = null;
        categoryToDeleteIndex.value = null;
    }
};

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
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownOpen.value && !(event.target as HTMLElement).closest('.relative')) {
        dropdownOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
    transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.95);
}
</style>