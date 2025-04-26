<template>
    <MainLayout>
        <div class="flex flex-col space-y-6 p-6">
            <!-- Profile Header -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <img :src="'http://localhost:3000/uploads/Profile/' + authStore.user?.avatar" alt="Profile" class="w-16 h-16 rounded-full">
                        <button @click="triggerFileInput"
                            class="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-400"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41" />
                            </svg>
                        </button>
                        <input type="file" ref="fileInput" @change="handleAvatarChange" accept="image/*" class="hidden">
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ authStore.user?.fullName }}</h1>
                    </div>
                </div>
                <button v-if="!editMode" @click="toggleEditMode"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Edit information
                </button>
                <button v-else @click="saveChanges"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Save Changes
                </button>
            </div>
            <div class="grid grid-cols-1 gap-6">
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h2>

                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                            <input v-if="editMode" v-model="editableUser.fullName"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                            <p v-else class="text-gray-900 dark:text-white">{{ authStore.user?.fullName }}</p>
                        </div>

                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <input v-if="editMode" v-model="editableUser.email" type="email"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                            <p v-else class="text-gray-900 dark:text-white">{{ authStore.user?.email }}</p>
                        </div>

                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <input v-if="editMode" v-model="editableUser.phoneNumber" type="tel"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                            <p v-else class="text-gray-900 dark:text-white">{{ authStore.user?.phoneNumber }}</p>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h2>

                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Password</p>
                            <div class="relative">
                                <input v-model="password.current" :type="showCurrentPassword ? 'text' : 'password'"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md pr-10">
                                <button @click="showCurrentPassword = !showCurrentPassword"
                                    class="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            :d="showCurrentPassword ? 'M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5' : 'M12 17c-1.63 0-3.06-.79-3.98-2H15v-2H8v-2h7v-2h-7V9h7c0-1.1-.9-2-2-2H4V5h12c1.12 0 2.12.38 2.95 1.01l1.7-1.7l1.41 1.41l-1.7 1.7C20.03 7.21 20 7.6 20 8v8c0 2.21-1.79 4-4 4zm0-7c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1'" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">New Password</p>
                            <div class="relative">
                                <input v-model="password.new" :type="showNewPassword ? 'text' : 'password'"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md pr-10">
                                <button @click="showNewPassword = !showNewPassword"
                                    class="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            :d="showNewPassword ? 'M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5' : 'M12 17c-1.63 0-3.06-.79-3.98-2H15v-2H8v-2h7v-2h-7V9h7c0-1.1-.9-2-2-2H4V5h12c1.12 0 2.12.38 2.95 1.01l1.7-1.7l1.41 1.41l-1.7 1.7C20.03 7.21 20 7.6 20 8v8c0 2.21-1.79 4-4 4zm0-7c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1'" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button @click="changePassword()"
                            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors mt-2"
                            :disabled="!password.current || !password.new">
                            Change Password
                        </button>
                    </div>
                </div>
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-900/50 p-6">
                    <h2 class="text-lg font-medium text-red-700 dark:text-red-400 mb-4">Danger Zone</h2>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">Logout</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Sign out of your account</p>
                            </div>
                            <div @click="logout()"
                                class="px-3 cursor-pointer py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Log Out
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">Delete account</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Permanently remove your account and
                                    data</p>
                            </div>
                            <button @click="confirmDeleteAccount"
                                class="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-md hover:bg-red-100 dark:hover:bg-red-900/30">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Account</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete your account? This
                        action cannot be undone.</p>

                    <div class="flex justify-end gap-3">
                        <button @click="showDeleteModal = false"
                            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            Cancel
                        </button>
                        <button @click="deleteAccount"
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/mainLayout.vue';
import type { User } from '~/types';
const authStore = useAuthStore()
const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const editMode = ref(false);
const showDeleteModal = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);



const editableUser = ref<User>({});
onMounted(() => {
    editableUser.value = authStore.user
})
const password = ref({
    current: '',
    new: ''
});

const toggleEditMode = () => {
    editMode.value = !editMode.value;
};

const saveChanges = async () => {
    await authStore.updateUser({ fullName: editableUser.value.fullName, email: editableUser.value.email, phoneNumber: editableUser.value.phoneNumber })
    await authStore.GetUserFromToken()
    editableUser.value = authStore.user
    toggleEditMode()
}
const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleAvatarChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const formData = new FormData()
        formData.append('file', input.files[0])
        await authStore.Upload(formData);
        authStore.GetUserFromToken()
        
    }
};

const changePassword = async () => {
    console.log('Changing password...');
    if (!password.value.current || !password.value.new) {
        alert('Please enter both current and new passwords.');
        return;
    }
    const passwords = { current_password: password.value.current, new_password: password.value.new };
    await authStore.changePassword(passwords)
    password.value = { current: '', new: '' };
};

const logout = () => {
    authStore.logout();
};

const confirmDeleteAccount = () => {
    showDeleteModal.value = true;
};

const deleteAccount = async () => {
    console.log('deleting is in progress')
    await authStore.deleteAccount()
    showDeleteModal.value = false;
};
</script>

<style scoped></style>