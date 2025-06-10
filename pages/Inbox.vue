<template>
    <MainLayout>
        <div class="flex h-screen bg-gray-50">
            <div class="w-96 border-r border-gray-200 bg-white flex flex-col">
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <div class="flex items-center gap-3">

                        <h1 class="font-semibold text-gray-900">Inbox</h1>
                        <span class="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                            {{ unreadCount }}
                        </span>
                    </div>
                    <div class="bg-gray-100 rounded-full p-1 flex">
                        <button @click="setFilter('all')"
                            class="px-3 py-1 text-xs font-medium rounded-full transition-colors" :class="{
                                'bg-white shadow-sm text-gray-900': filter === 'all',
                                'text-gray-500 hover:text-gray-700': filter !== 'all'
                            }">
                            All
                        </button>
                        <button @click="setFilter('unread')"
                            class="px-3 py-1 text-xs font-medium rounded-full transition-colors" :class="{
                                'bg-white shadow-sm text-gray-900': filter === 'unread',
                                'text-gray-500 hover:text-gray-700': filter !== 'unread'
                            }">
                            Unread
                        </button>
                    </div>
                </div>
                <div v-if="loading" class="flex-1 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
                <div v-else-if="error" class="flex-1 flex items-center justify-center text-center text-red-600 p-4">
                    Error loading messages: {{ error.message }}
                </div>
                <div v-else-if="filteredEmails.length === 0" class="flex-1 flex items-center justify-center">
                    <div class="text-center text-gray-500">
                        <InboxIcon class="w-12 h-12 mx-auto mb-2" />
                        No messages
                    </div>
                </div>
                <div v-else class="flex-1 overflow-y-auto py-2">
                    <div v-for="email in filteredEmails" :key="email.id" @click="selectEmail(email)"
                        class="px-6 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors last:border-b-0"
                        :class="{
                            'bg-blue-50 font-semibold': !email.isRead,
                            'bg-gray-100': selectedEmail?.id === email.id
                        }">
                        <div class="flex justify-between items-start mb-1">
                            <div class="flex items-center gap-2">
                                <span class="font-medium text-gray-900" >
                                    {{ email.senderName }}
                                </span>
                                <span v-if="!email.isRead" class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                            </div>
                            <span class="text-xs text-gray-500 flex-shrink-0">{{ formatDate(email.createdAt) }}</span>
                        </div>
                        <h3 class="text-sm mb-1 truncate" :class="{
                            'text-gray-900 font-medium': !email.isRead,
                            'text-gray-700': email.isRead
                        }">
                            {{ email.senderEmail }}
                        </h3>
                         <p class="text-sm text-gray-500 line-clamp-2">{{ email.message }}</p>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-col bg-white" v-if="selectedEmail">
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <div class="flex items-center gap-3">
                        <button @click="selectedEmail = null" class="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                            <XIcon />
                        </button>
                        <h1 class="font-semibold text-gray-900 truncate">Message from {{ selectedEmail.senderName }}</h1>
                    </div>
                    <div class="flex items-center gap-2">
                         <button @click="toggleReplyForm" class="p-2 rounded-lg hover:bg-gray-100">
                            <ReplyIcon />
                        </button>
                    </div>
                </div>
                <div class="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
                    <div class="flex items-start gap-4">
                         <div>
                            <p class="font-medium text-gray-900">{{ selectedEmail.senderName }}</p>
                            <p class="text-sm text-gray-500">{{ selectedEmail.senderEmail }}</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 flex-shrink-0">{{ formatDateTime(selectedEmail.createdAt) }}</p>
                </div>
                <div class="flex-1 p-6 overflow-y-auto">
                    <div class="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {{ selectedEmail.message }}
                    </div>
                </div>
                 <div v-if="showReplyForm" class="pb-6 px-6 border-t border-gray-200">
                    <div class="rounded-xl bg-gray-50 border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200 flex items-center gap-2 text-gray-500">
                            <ReplyIcon class="w-4 h-4" />
                            <span class="text-sm">Replying to {{ selectedEmail.senderName }} ({{ selectedEmail.senderEmail }})</span>
                        </div>
                        <form @submit.prevent="sendReply" class="p-4">
                            <textarea v-model="replyContent" rows="4" placeholder="Write your reply..."
                                class="w-full border-0 bg-transparent focus:ring-0 resize-none outline-none text-gray-700 placeholder-gray-400"></textarea>
                            <div class="flex justify-end items-center pt-2">
                                 <button type="submit"
                                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                        :disabled="!replyContent.trim() || isSendingReply">
                                         <span v-if="!isSendingReply">Send</span>
                                         <span v-else class="flex items-center gap-2">
                                            <Icon name="eos-icons:loading" class="w-4 h-4" />
                                            Sending...
                                         </span>
                                    </button>
                                </div>
                        </form>
                         <div class="text-red-500 text-sm mt-2" v-if="replyError">{{ replyErrorMessage }}</div>
                          <div class="text-green-600 text-sm mt-2" v-if="replySuccess">Reply sent successfully!</div>
                    </div>
                </div>
            </div>
            <div v-else class="flex-1 flex items-center justify-center bg-gray-50">
                <div class="text-center p-6 max-w-md">
                    <InboxIcon class="w-12 h-12 mx-auto text-gray-400" />
                    <h3 class="mt-2 text-lg font-medium text-gray-900">No message selected</h3>
                    <p class="mt-1 text-gray-500">Select a message from the list to view its contents</p>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '~/layouts/mainLayout.vue'
import {
    Menu as MenuIcon,
    X as XIcon,
    Inbox as InboxIcon,
    Reply as ReplyIcon,
    MoreVertical as MoreVerticalIcon,
    Paperclip as PaperclipIcon,
    Send as SendIcon,
    File as FileIcon,
    Plus as PlusIcon
} from 'lucide-vue-next'
import { useNuxtApp } from '#app'



const emails = ref([])
const filter = ref('all')
const selectedEmail = ref(null)
const replyContent = ref('')
const showReplyForm = ref(false);
const loading = ref(true);
const error = ref(null);
const replyError = ref(false);
const replyErrorMessage = ref('');
const replySuccess = ref(false);
const isSendingReply = ref(false);

const { $axios } = useNuxtApp();

const fetchInboxMessages = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await $axios.get('/inbox');
        emails.value = response.data;
        if (emails.value.length > 0) {
            selectEmail(emails.value[0]);
        }
    } catch (err) {
        console.error("Error fetching inbox messages:", err);
        error.value = err;
    } finally {
        loading.value = false;
    }
}

const filteredEmails = computed(() => {
    if (filter.value === 'unread') {
        return emails.value.filter(email => !email.isRead)
    }
    return emails.value
})

const unreadCount = computed(() => {
    return emails.value.filter(email => !email.isRead).length
})

function setFilter(type) {
    filter.value = type
}

function selectEmail(email) {
    selectedEmail.value = email
    if (!email.isRead) {
        markAsRead(email);
    }
    showReplyForm.value = false; 
    replyContent.value = ''; 
    replySuccess.value = false;
    replyError.value = false;
    replyErrorMessage.value = ''; 
}

async function markAsRead(email) {
     if (email.isRead) return; 
    try {
        await $axios.patch(`/inbox/${email.id}/read`);
        email.isRead = true;
    } catch (err) {
        console.error("Error marking as read:\\", err);
    }
}

function toggleReplyForm() {
    showReplyForm.value = !showReplyForm.value;
     if (!showReplyForm.value) {
        replyContent.value = '';
        replySuccess.value = false; 
        replyError.value = false; 
        replyErrorMessage.value = '';
    }
}

async function sendReply() {
    if (!replyContent.value.trim() || !selectedEmail.value) return;

    isSendingReply.value = true;
    replyError.value = false;
    replySuccess.value = false;
    replyErrorMessage.value = '';

    try {
        const response = await $axios.post(`/inbox/${selectedEmail.value.id}/reply`, {
            replyMessage: replyContent.value
        });

        if (response.status === 200) { 
            replySuccess.value = true;
            replyContent.value = ''; 
        } else {
            replyError.value = true;
            replyErrorMessage.value = response.data.message || 'Failed to send reply';
        }

    } catch (err) {
        console.error('Error sending reply:', err);
        replyError.value = true;
         replyErrorMessage.value = err.response?.data?.message || err.message || 'An error occurred while sending the reply';
    } finally {
        isSendingReply.value = false;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(dateString) {
     if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

onMounted(() => {
    fetchInboxMessages();
})
</script>

<style scoped>
.prose {
    line-height: 1.6;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>