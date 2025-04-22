<template>
    <div class="fixed inset-0 bg-gray-900/40 flex items-center justify-center p-4 z-50">
        <!-- Modal content -->
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5 border-b border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900">Edit Product</h3>
                <button type="button"
                    class="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    @click="emit('close')">
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            <!-- Modal body -->
            <form @submit.prevent="submitForm">
                <div class="p-6 space-y-6">
                    <!-- Basic Information -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                            <input v-model="product.name" type="text" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Type product name" required>
                        </div>
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select v-model="product.category" id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required>
                                <option value="" disabled>Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div>
                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                            <input v-model="product.brand" type="text" id="brand"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Product brand" required>
                        </div>
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price ($)</label>
                            <input v-model.number="product.price" type="number" id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="2999" required min="0" step="0.01">
                        </div>
                    </div>

                    <!-- Sizes & Colors -->
                    <div class="space-y-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Sizes</label>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(size, index) in product.sizes" :key="index" class="flex items-center">
                                    <input v-model="size.value" type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-20"
                                        placeholder="Size" required>
                                    <button v-if="product.sizes.length > 1" type="button" @click="removeSize(index)"
                                        class="ml-1 text-red-500 hover:text-red-700">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <button type="button" @click="addSize"
                                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Size
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Colors</label>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(color, index) in product.colors" :key="index" class="flex items-center">
                                    <input v-model="color.value" type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-24"
                                        placeholder="Color" required>
                                    <input v-model="color.hex" type="color" class="w-6 h-6 ml-1 rounded cursor-pointer">
                                    <button v-if="product.colors.length > 1" type="button" @click="removeColor(index)"
                                        class="ml-1 text-red-500 hover:text-red-700">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <button type="button" @click="addColor"
                                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Color
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Promotion Section -->
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <input v-model="product.hasPromotion" id="promotion-checkbox" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                            <label for="promotion-checkbox" class="ml-2 text-sm font-medium text-gray-900">Add
                                Promotion</label>
                        </div>

                        <div v-if="product.hasPromotion" class="pl-6 space-y-3">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="promo-price"
                                        class="block mb-1 text-sm font-medium text-gray-900">Promotional Price
                                        ($)</label>
                                    <input v-model.number="product.promoPrice" type="number" id="promo-price"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="2499" min="0" step="0.01" @input="calculateDiscount">
                                </div>
                                <div>
                                    <label for="discount" class="block mb-1 text-sm font-medium text-gray-900">Discount
                                        Percentage</label>
                                    <div class="relative">
                                        <input v-model.number="product.discount" type="number" id="discount"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                            placeholder="15" min="0" max="100" @input="calculatePromoPrice">
                                        <span class="absolute right-3 top-2.5 text-gray-500 text-sm">%</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="product.promoPrice" class="text-sm text-green-600">
                                You're offering a {{ product.discount }}% discount (Save ${{ (product.price -
                                product.promoPrice).toFixed(2) }})
                            </div>
                            <div>
                                <label for="promo-end" class="block mb-1 text-sm font-medium text-gray-900">Promotion
                                    End Date</label>
                                <input v-model="product.promoEndDate" type="date" id="promo-end"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    :min="new Date().toISOString().split('T')[0]">
                            </div>
                        </div>
                    </div>

                    <!-- Product Images -->
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Product Images</label>
                        <div class="flex flex-wrap gap-4">
                            <!-- Existing Images -->
                            <div v-for="(image, index) in existingImages" :key="'existing-' + index"
                                class="relative w-32 h-32 border rounded-lg overflow-hidden">
                                <img :src="image.url" class="w-full h-full object-cover" alt="Product preview">
                                <button type="button" @click="removeExistingImage(index)"
                                    class="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <!-- New Uploaded Images -->
                            <div v-for="(image, index) in product.images" :key="'new-' + index"
                                class="relative w-32 h-32 border rounded-lg overflow-hidden">
                                <img :src="image.preview" class="w-full h-full object-cover" alt="Product preview">
                                <button type="button" @click="removeImage(index)"
                                    class="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <!-- Upload New Images -->
                            <label for="dropzone-file"
                                class="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div class="flex flex-col items-center justify-center p-4 text-center">
                                    <svg aria-hidden="true" class="w-8 h-8 mb-2 text-gray-500" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                        </path>
                                    </svg>
                                    <p class="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" accept="image/*"
                                    @change="handleImageUpload" multiple>
                            </label>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label for="description"
                            class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea v-model="product.description" id="description" rows="4"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Write product description here"></textarea>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end p-6 space-x-3 border-t border-gray-200">
                    <button type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Update Product
                    </button>
                    <button type="button"
                        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        @click="emit('close')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    productData: {
        type: Object,
        // required: true
    }
})

const emit = defineEmits(['close', 'submit'])
const product = ref({
    id: props.productData.id,
    name: props.productData.name || '',
    category: props.productData.category || '',
    brand: props.productData.brand || '',
    price: props.productData.price || 0,
    description: props.productData.description || '',
    hasPromotion: props.productData.hasPromotion || false,
    promoPrice: props.productData.promoPrice || 0,
    discount: props.productData.discount || 0,
    promoEndDate: props.productData.promoEndDate || '',
    sizes: props.productData.sizes?.length ? [...props.productData.sizes] : [{ value: '' }],
    colors: props.productData.colors?.length ? [...props.productData.colors] : [{ value: '', hex: '#000000' }],
    images: []
})

const existingImages = ref(props.productData.images || [])
watch(() => props.productData, (newVal) => {
    product.value = {
        id: newVal.id,
        name: newVal.name || '',
        category: newVal.category || '',
        brand: newVal.brand || '',
        price: newVal.price || 0,
        description: newVal.description || '',
        hasPromotion: newVal.hasPromotion || false,
        promoPrice: newVal.promoPrice || 0,
        discount: newVal.discount || 0,
        promoEndDate: newVal.promoEndDate || '',
        sizes: newVal.sizes?.length ? [...newVal.sizes] : [{ value: '' }],
        colors: newVal.colors?.length ? [...newVal.colors] : [{ value: '', hex: '#000000' }],
        images: []
    }
    existingImages.value = newVal.images || []
}, { deep: true })

const addSize = () => {
    product.value.sizes.push({ value: '' })
}

const removeSize = (index) => {
    if (product.value.sizes.length > 1) {
        product.value.sizes.splice(index, 1)
    }
}

const addColor = () => {
    product.value.colors.push({ value: '', hex: '#000000' })
}

const removeColor = (index) => {
    if (product.value.colors.length > 1) {
        product.value.colors.splice(index, 1)
    }
}

const calculateDiscount = () => {
    if (product.value.price > 0 && product.value.promoPrice > 0) {
        product.value.discount = ((product.value.price - product.value.promoPrice) / product.value.price * 100).toFixed(2)
    }
}

const calculatePromoPrice = () => {
    if (product.value.price > 0 && product.value.discount > 0) {
        product.value.promoPrice = (product.value.price * (1 - product.value.discount / 100)).toFixed(2)
    }
}

const handleImageUpload = (event) => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onload = (e) => {
            product.value.images.push({
                file: files[i],
                preview: e.target.result
            })
        }
        reader.readAsDataURL(files[i])
    }
    event.target.value = '' // Reset input to allow selecting same files again
}

const removeImage = (index) => {
    product.value.images.splice(index, 1)
}

const removeExistingImage = (index) => {
    existingImages.value.splice(index, 1)
}

const submitForm = () => {
    // Validate required fields
    if (!product.value.name || !product.value.category || !product.value.brand || product.value.price <= 0) {
        alert('Please fill in all required fields')
        return
    }

    // Validate sizes and colors
    if (product.value.sizes.some(size => !size.value) || product.value.colors.some(color => !color.value)) {
        alert('Please fill in all size and color fields')
        return
    }

    // Validate promotion if enabled
    if (product.value.hasPromotion) {
        if (product.value.promoPrice <= 0 || product.value.discount <= 0 || !product.value.promoEndDate) {
            alert('Please fill in all promotion details')
            return
        }
    }

    // Prepare form data
    const formData = new FormData()
    formData.append('id', product.value.id)
    formData.append('name', product.value.name)
    formData.append('category', product.value.category)
    formData.append('brand', product.value.brand)
    formData.append('price', product.value.price)
    formData.append('description', product.value.description)
    formData.append('hasPromotion', product.value.hasPromotion)

    if (product.value.hasPromotion) {
        formData.append('promoPrice', product.value.promoPrice)
        formData.append('discount', product.value.discount)
        formData.append('promoEndDate', product.value.promoEndDate)
    }

    formData.append('sizes', JSON.stringify(product.value.sizes))
    formData.append('colors', JSON.stringify(product.value.colors))
    formData.append('existingImages', JSON.stringify(existingImages.value))

    product.value.images.forEach((image, index) => {
        formData.append(`newImages[${index}]`, image.file)
    })

    emit('submit', formData)
    emit('close')
}
</script>