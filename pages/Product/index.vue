<template>
    <MainLayout>
        <!-- Product Management Dashboard -->
        <div class="container mx-auto px-4 py-8">
            <!-- Header with Action Buttons -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-gray-800">Product Management</h1>
                <div class="flex space-x-3">
                    <button @click="addProduct = true"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                        <PlusIcon class="w-5 h-5 mr-2" />
                        Add Product
                    </button>
                    <button @click="openCreateCategoryModal"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                        <FolderPlusIcon class="w-5 h-5 mr-2" />
                        New Category
                    </button>
                    <button @click="openEditCategoryModal"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                        <PencilIcon class="w-5 h-5 mr-2" />
                        Edit Category
                    </button>
                </div>
            </div>

            <!-- Products Table -->
            <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Brand</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img class="h-10 w-10 rounded-md object-cover"
                                                :src="product.images[0]?.url || '/placeholder-product.jpg'"
                                                :alt="product.name">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                            <div class="text-sm text-gray-500">#{{ product.id }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ product.category.categoryName }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ product.brand }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        <span v-if="product.hasPromotion" class="line-through text-gray-400 mr-2">${{
                                            product.price.toFixed(2) }}</span>
                                        <span :class="{ 'text-red-600': product.hasPromotion }">${{ product.hasPromotion
                                            ? product.promoPrice.toFixed(2) : product.price.toFixed(2) }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="product.hasPromotion ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                                        {{ product.hasPromotion ? 'On Sale' : 'Regular' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Menu as="div" class="relative inline-block text-left">
                                        <div>
                                            <MenuButton class="flex items-center text-gray-400 hover:text-gray-600">
                                                <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems
                                                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                <div class="py-1">
                                                    <MenuItem v-slot="{ active }">
                                                    <button @click="openEditModal(product)"
                                                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left']">
                                                        <PencilIcon class="h-4 w-4 mr-2 inline" />
                                                        Edit Product
                                                    </button>
                                                    </MenuItem>
                                                    <MenuItem v-slot="{ active }">
                                                    <button @click="confirmDelete(product.id)"
                                                        :class="[active ? 'bg-gray-100 text-red-600' : 'text-red-500', 'block px-4 py-2 text-sm w-full text-left']">
                                                        <TrashIcon class="h-4 w-4 mr-2 inline" />
                                                        Delete
                                                    </button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="products.length === 0"
                class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                <div class="mt-6">
                    <button @click="addProduct = true" type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                        <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
                        New Product
                    </button>
                </div>
            </div>

            <!-- Modals -->
            <AddProduct v-if="addProduct" @close="addProduct = false" @submit="handleAddProduct" :category="categoryStore.categories" />

            <EditProduct v-if="editingProduct" :productData="editingProduct" @close="editingProduct = null"
                @submit="handleUpdateProduct" />

            <CreateCategory v-if="showCreateCategory" :isOpen="showCreateCategory" @close="showCreateCategory = false"
                @submit="handleCreateCategory" />
            <EditCategory v-if="showEditCategory" :isOpen="showEditCategory" :category="categoryStore.categories"
                @close="showEditCategory = false" @submit="handleUpdateCategory" />
            <Modal :isOpen="showDeleteConfirm" @close="showDeleteConfirm = false">
                <template #title>
                    <div class="flex items-center">
                        <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
                        Confirm Deletion
                    </div>
                </template>
                <template #content>
                    <div class="mt-4">
                        <p class="text-sm text-gray-500">Are you sure you want to delete this product? This action
                            cannot be undone.</p>
                    </div>
                </template>
                <template #footer>
                    <button type="button"
                        class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:text-sm"
                        @click="deleteProduct">
                        Delete
                    </button>
                    <button type="button"
                        class="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                        @click="showDeleteConfirm = false">
                        Cancel
                    </button>
                </template>
            </Modal>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    FolderPlusIcon,
    ShoppingBagIcon,
    EllipsisVerticalIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import MainLayout from '~/layouts/mainLayout.vue'
import CreateCategory from '~/components/createCategory.vue'
import EditCategory from '~/components/editCategory.vue'


const addProduct = ref(false)
const showCreateCategory = ref(false)
const showEditCategory = ref(false)
const showDeleteConfirm = ref(false)
const editingProduct = ref<Product | null>(null)
const productToDelete = ref<string | null>(null)
const categoryStore = useCategoryStore()
const products = ref<Product[]>([
    {
        id: '1',
        name: 'Smartphone X',
        category: 'PH',
        brand: 'TechBrand',
        price: 799.99,
        description: 'Latest smartphone with advanced features',
        hasPromotion: true,
        promoPrice: 699.99,
        discount: 12.5,
        promoEndDate: '2023-12-31',
        sizes: [{ value: 'S' }, { value: 'M' }],
        colors: [{ value: 'Black', hex: '#000000' }, { value: 'Silver', hex: '#C0C0C0' }],
        images: [
            { url: '/images/products/smartphone-x-1.jpg' },
            { url: '/images/products/smartphone-x-2.jpg' }
        ]
    },
    {
        id: '2',
        name: 'Gaming Monitor Pro',
        category: 'TV',
        brand: 'GameVision',
        price: 499.99,
        description: '27" 144Hz gaming monitor with HDR',
        hasPromotion: false,
        promoPrice: 0,
        discount: 0,
        promoEndDate: '',
        sizes: [{ value: '27"' }],
        colors: [{ value: 'Black', hex: '#000000' }],
        images: [
            { url: '/images/products/monitor-1.jpg' }
        ]
    },
    {
        id: '3',
        name: 'Wireless Earbuds',
        category: 'PH',
        brand: 'SoundWave',
        price: 129.99,
        description: 'Noise cancelling wireless earbuds',
        hasPromotion: true,
        promoPrice: 99.99,
        discount: 23,
        promoEndDate: '2023-11-30',
        sizes: [{ value: 'One Size' }],
        colors: [{ value: 'White', hex: '#FFFFFF' }, { value: 'Black', hex: '#000000' }],
        images: [
            { url: '/images/products/earbuds-1.jpg' },
            { url: '/images/products/earbuds-2.jpg' }
        ]
    }
])

const categories = ref<Category[]>([
])


const openCreateCategoryModal = () => {
    showCreateCategory.value = true
}

const openEditCategoryModal = () => {
    if (categories.value.length > 0) {
        showEditCategory.value = true
    } else {
        alert('No categories available to edit')
    }
}

const openEditModal = (product: Product) => {
    editingProduct.value = { ...product }
}

const confirmDelete = (id: string) => {
    productToDelete.value = id
    showDeleteConfirm.value = true
}

const deleteProduct = () => {
    if (productToDelete.value) {
        products.value = products.value.filter(p => p.id !== productToDelete.value)
        productToDelete.value = null
        showDeleteConfirm.value = false
    }
}

const handleAddProduct = (formData: FormData) => {
    const newProduct = {
        id: String(products.value.length + 1),
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        brand: formData.get('brand') as string,
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description') as string,
        hasPromotion: formData.get('hasPromotion') === 'true',
        promoPrice: parseFloat(formData.get('promoPrice') as string) || 0,
        discount: parseFloat(formData.get('discount') as string) || 0,
        promoEndDate: formData.get('promoEndDate') as string || '',
        sizes: JSON.parse(formData.get('sizes') as string),
        colors: JSON.parse(formData.get('colors') as string),
        images: [] // You would handle image uploads separately
    }

    products.value.unshift(newProduct)
    addProduct.value = false
}

const handleUpdateProduct = (formData: FormData) => {
    const updatedProduct = {
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        brand: formData.get('brand') as string,
        price: parseFloat(formData.get('price') as string),
        description: formData.get('description') as string,
        hasPromotion: formData.get('hasPromotion') === 'true',
        promoPrice: parseFloat(formData.get('promoPrice') as string) || 0,
        discount: parseFloat(formData.get('discount') as string) || 0,
        promoEndDate: formData.get('promoEndDate') as string || '',
        sizes: JSON.parse(formData.get('sizes') as string),
        colors: JSON.parse(formData.get('colors') as string),
        images: JSON.parse(formData.get('existingImages') as string)
    }

    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
        products.value[index] = updatedProduct
    }

    editingProduct.value = null
}

const handleCreateCategory = async (categoryName: string) => {
    try {
        console.log('Created category:', categoryName);
        const newCategory : Category = await categoryStore.createCategory(categoryName);
        categories.value.push(newCategory);
        showCreateCategory.value = false;
    } catch (error) {
        console.error('Error creating category:', error);
    }
}

const handleUpdateCategory = async (updatedCategory: { id: string; name: string , index : number}) => {
    if (updatedCategory.index !== -1) {
        try {
            console.log('Updated category:', updatedCategory);
            const newCategory = await categoryStore.updateCategory(updatedCategory.id, updatedCategory.name);
            console.log('Updated category:', newCategory);

        } catch (error) {
            console.error('Error updating category:', error);
        }
    }
    showEditCategory.value = false
}

// Types
interface Product {
    id: string
    name: string
    category: string
    brand: string
    price: number
    description: string
    hasPromotion: boolean
    promoPrice: number
    discount: number
    promoEndDate: string
    sizes: { value: string }[]
    colors: { value: string; hex: string }[]
    images: { url: string }[]
}

interface Category {
    id: string
    name: string
}
</script>

<style scoped>
/* Custom styles if needed */
</style>