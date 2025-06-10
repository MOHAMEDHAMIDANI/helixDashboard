<template>
    <MainLayout>
        <div class="container mx-auto p-6">
            <h1 class="text-2xl font-semibold text-gray-900 mb-6">Users</h1>

            <div class="flex justify-end mb-4">
                <button @click="openCreateUserModal" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
                    Create New User
                </button>
            </div>

            <div v-if="loading" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <div v-else-if="error" class="text-center text-red-600 p-4">
                Error loading users: {{ error.message }}
            </div>

            <div v-else-if="users.length === 0" class="text-center text-gray-500 p-4">
                No users found.
            </div>

            <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                             <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.fullName }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                             <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.phoneNumber }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="confirmDeleteUser(user.id)" class="text-red-600 hover:text-red-900 transition">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Create User Modal -->
         <Modal :isOpen="showCreateUserModal" @close="closeCreateUserModal">
             <template #title>
                Create New User
             </template>
             <template #content>
                <form @submit.prevent="createUser" class="space-y-5">
                    <div>
                        <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" id="fullName" v-model="newUser.fullName" required
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2">
                    </div>
                     <div>
                        <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" id="phoneNumber" v-model="newUser.PhoneNum" required
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2">
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" v-model="newUser.email" required
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" v-model="newUser.password" required
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2">
                    </div>

                    <div v-if="createUserManager.error" class="text-red-600 text-sm mt-4">{{ createUserManager.error }}</div>
                     <div v-if="createUserSuccess" class="text-green-600 text-sm mt-4">User created successfully!</div>
                </form>
             </template>
             <template #footer>
                 <div class="flex justify-end gap-3">
                        <button type="button" @click="closeCreateUserModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                            Cancel
                        </button>
                        <button type="submit" :disabled="createUserManager.loading" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed" @click="createUser">
                             <span v-if="!createUserManager.loading">Create User</span>
                             <span v-else class="flex items-center"><Icon name="eos-icons:loading" class="w-5 h-5 mr-2" /> Creating...</span>
                        </button>
                    </div>
             </template>
         </Modal>

        <!-- Delete Confirmation Modal -->
         <Modal :isOpen="showDeleteConfirmModal" @close="cancelDelete">
              <template #title>
                <div class="flex items-center gap-2 text-red-600">
                    <Icon name="heroicons:exclamation-triangle" class="w-6 h-6" />
                    Confirm Deletion
                </div>
              </template>
              <template #content>
                  <div class="py-4">
                      <p class="text-gray-700 text-base">Are you sure you want to delete this user? This action cannot be undone.</p>
                      <div v-if="deleteUserManager.error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                          <div class="flex items-center gap-2">
                              <Icon name="heroicons:exclamation-circle" class="w-5 h-5" />
                              {{ deleteUserManager.error }}
                          </div>
                      </div>
                  </div>
              </template>
              <template #footer>
                  <div class="flex justify-end gap-3">
                     <button @click="cancelDelete" 
                             class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                         Cancel
                     </button>
                     <button @click="deleteUser" 
                             :disabled="deleteUserManager.loading" 
                             class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                          <Icon v-if="deleteUserManager.loading" name="eos-icons:loading" class="w-5 h-5" />
                          <span>{{ deleteUserManager.loading ? 'Deleting...' : 'Delete User' }}</span>
                     </button>
                 </div>
              </template>
         </Modal>

    </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MainLayout from '~/layouts/mainLayout.vue';
import { useNuxtApp } from '#app';
import type { User } from '~/types';
import Modal from '~/components/Modal.vue';

interface FrontendUserType {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
}

const users = ref<FrontendUserType[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);
const showCreateUserModal = ref(false);
const newUser = ref({ fullName: '', PhoneNum: '', email: '', password: '' });
const createUserManager = ref({ loading: false, error: null as string | null });
const createUserSuccess = ref(false);
const showDeleteConfirmModal = ref(false);
const userIdToDelete = ref<string | null>(null);
const deleteUserManager = ref({ loading: false, error: null as string | null });
const deleteUserError = ref(false);

const { $axios } = useNuxtApp();

const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await $axios.get<FrontendUserType[]>('/user');
        users.value = response.data;
    } catch (err: any) {
        console.error('Error fetching users:', err);
        error.value = err;
    } finally {
        loading.value = false;
    }
};

const openCreateUserModal = () => {
    showCreateUserModal.value = true;
    newUser.value = { fullName: '', PhoneNum: '', email: '', password: '' };
    createUserManager.value = { loading: false, error: null };
    createUserSuccess.value = false;
};

const closeCreateUserModal = () => {
    showCreateUserModal.value = false;
};

const createUser = async () => {
    createUserManager.value.loading = true;
    createUserManager.value.error = null;
    createUserSuccess.value = false;

    try {

        const response = await $axios.post<FrontendUserType>('/authentication/addUser', newUser.value);
        users.value.push(response.data); 
        createUserSuccess.value = true;
    } catch (err: any) {
        console.error('Error creating user:', err);
        createUserManager.value.error = err.response?.data?.message || 'Failed to create user';
    } finally {
        createUserManager.value.loading = false;
    }
};

const confirmDeleteUser = (userId: string) => {
    userIdToDelete.value = userId;
    showDeleteConfirmModal.value = true;
    deleteUserManager.value = { loading: false, error: null };
    deleteUserError.value = false;
};

const cancelDelete = () => {
    userIdToDelete.value = null;
    showDeleteConfirmModal.value = false;
};

const deleteUser = async () => {
    if (!userIdToDelete.value) return;

    deleteUserManager.value.loading = true;
    deleteUserManager.value.error = null;
    deleteUserError.value = false;

    try {
        await $axios.delete(`/user/${userIdToDelete.value}`);
        users.value = users.value.filter(user => user.id !== userIdToDelete.value);
        userIdToDelete.value = null;
        showDeleteConfirmModal.value = false;
    } catch (err: any) {
        console.error('Error deleting user:', err);
        deleteUserManager.value.error = err.response?.data?.message || 'Failed to delete user';
        deleteUserError.value = true;
    } finally {
        deleteUserManager.value.loading = false;
    }
};

onMounted(() => {
    fetchUsers();
});
</script>

<style scoped>
.fade-in-overlay {
    animation: fadeIn 0.3s ease-out;
}

.fade-in-modal {
    animation: fadeInScale 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
</style>