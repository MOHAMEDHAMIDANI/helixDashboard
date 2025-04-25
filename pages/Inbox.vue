<template>
    <MainLayout>
        <div class="flex h-screen bg-gray-50">
            <!-- Inbox Sidebar -->
            <div class="w-96 border-r border-gray-200 bg-white flex flex-col">
                <!-- Header -->
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <div class="flex items-center gap-3">
                        <button class="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                            <MenuIcon />
                        </button>
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

                <!-- Email List -->
                <div class="flex-1 overflow-y-auto">
                    <div v-for="email in filteredEmails" :key="email.id" @click="selectEmail(email)"
                        class="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        :class="{
                            'bg-blue-50': email.unread,
                            'bg-gray-100': selectedEmail?.id === email.id
                        }">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <span class="font-medium" :class="{
                                    'text-gray-900': email.unread,
                                    'text-gray-700': !email.unread
                                }">
                                    {{ email.sender }}
                                </span>
                                <span v-if="email.unread" class="w-2 h-2 rounded-full bg-blue-500"></span>
                            </div>
                            <span class="text-xs text-gray-500">{{ formatDate(email.date) }}</span>
                        </div>
                        <h3 class="text-sm font-medium mb-1 truncate" :class="{
                            'text-gray-900': email.unread,
                            'text-gray-700': !email.unread
                        }">
                            {{ email.subject }}
                        </h3>
                        <p class="text-sm text-gray-500 line-clamp-1">{{ email.preview }}</p>
                    </div>
                </div>
            </div>

            <!-- Email Content -->
            <div class="flex-1 flex flex-col bg-white" v-if="selectedEmail">
                <!-- Email Header -->
                <div class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <div class="flex items-center gap-3">
                        <button @click="selectedEmail = null" class="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                            <XIcon />
                        </button>
                        <h1 class="font-semibold text-gray-900 truncate">{{ selectedEmail.subject }}</h1>
                    </div>

                    <div class="flex items-center gap-2">
                        <button @click="markAsRead(selectedEmail)" class="p-2 rounded-lg hover:bg-gray-100"
                            :class="{ 'text-blue-500': !selectedEmail.unread }"
                            :title="selectedEmail.unread ? 'Mark as read' : 'Mark as unread'">
                            <InboxIcon />
                        </button>
                        <button class="p-2 rounded-lg hover:bg-gray-100">
                            <ReplyIcon />
                        </button>
                        <button class="p-2 rounded-lg hover:bg-gray-100">
                            <MoreVerticalIcon />
                        </button>
                    </div>
                </div>

                <!-- Sender Info -->
                <div class="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            <img :src="selectedEmail.avatar" :alt="selectedEmail.sender"
                                class="w-full h-full object-cover">
                        </div>
                        <div>
                            <p class="font-medium text-gray-900">{{ selectedEmail.sender }}</p>
                            <p class="text-sm text-gray-500">{{ selectedEmail.email }}</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500">{{ formatDateTime(selectedEmail.date) }}</p>
                </div>

                <!-- Email Body -->
                <div class="flex-1 p-6 overflow-y-auto">
                    <div class="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {{ selectedEmail.body }}
                    </div>

                    <!-- Attachments -->
                    <div v-if="selectedEmail.attachments?.length" class="mt-6 pt-6 border-t border-gray-200">
                        <h3 class="text-sm font-medium text-gray-900 mb-3">Attachments</h3>
                        <div class="flex gap-3">
                            <div v-for="(attachment, index) in selectedEmail.attachments" :key="index"
                                class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                        <FileIcon class="text-gray-500" />
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                                            {{ attachment.name }}
                                        </p>
                                        <p class="text-xs text-gray-500">{{ attachment.size }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Reply Form -->
                <div class="pb-6 px-6 border-t border-gray-200">
                    <div class="rounded-xl bg-gray-50 border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200 flex items-center gap-2 text-gray-500">
                            <ReplyIcon class="w-4 h-4" />
                            <span class="text-sm">Reply to {{ selectedEmail.sender }} ({{ selectedEmail.email }})</span>
                        </div>
                        <form @submit.prevent="sendReply" class="p-4">
                            <textarea v-model="replyContent" rows="4" placeholder="Write your reply..."
                                class="w-full border-0 bg-transparent focus:ring-0 resize-none text-gray-700 placeholder-gray-400"></textarea>
                            <div class="flex justify-between items-center pt-2">
                                <button type="button" @click="toggleAttachments"
                                    class="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                                    <PaperclipIcon />
                                </button>
                                <div class="flex gap-2">
                                    <button type="button"
                                        class="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
                                        Save draft
                                    </button>
                                    <button type="submit"
                                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                        :disabled="!replyContent.trim()">
                                        <SendIcon />
                                        Send
                                    </button>
                                </div>
                            </div>

                            <!-- Attachment input -->
                            <div v-if="showAttachments" class="mt-3">
                                <input type="file" ref="fileInput" multiple @change="handleFileUpload" class="hidden">
                                <button type="button" @click="$refs.fileInput.click()"
                                    class="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <PlusIcon class="w-4 h-4" />
                                    Add attachments
                                </button>

                                <div v-if="attachments.length" class="mt-2 space-y-2">
                                    <div v-for="(file, index) in attachments" :key="index"
                                        class="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                                        <div class="flex items-center gap-2">
                                            <FileIcon class="w-4 h-4 text-gray-500" />
                                            <span class="text-sm text-gray-700 truncate max-w-[200px]">
                                                {{ file.name }}
                                            </span>
                                        </div>
                                        <button type="button" @click="removeAttachment(index)"
                                            class="text-gray-500 hover:text-gray-700">
                                            <XIcon class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else class="flex-1 flex items-center justify-center bg-gray-50">
                <div class="text-center p-6 max-w-md">
                    <InboxIcon class="w-12 h-12 mx-auto text-gray-400" />
                    <h3 class="mt-2 text-lg font-medium text-gray-900">No email selected</h3>
                    <p class="mt-1 text-gray-500">Select an email from the list to view its contents</p>
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
definePageMeta({
    middleware : [
        
    ]
})
const emails = ref([
    {
        id: 1,
        sender: "Alex Smith",
        email: "alex.smith@example.com",
        avatar: "https://i.pravatar.cc/128?u=1",
        date: new Date(2024, 0, 1),
        subject: "Meeting Schedule: Q1 Marketing Strategy Review",
        preview: "Dear Team, I hope this email finds you well. Just a quick reminder about our Q1 Marketing Strategy meeting...",
        body: `Dear Team,
  
  I hope this email finds you well. Just a quick reminder about our Q1 Marketing Strategy meeting scheduled for tomorrow at 10 AM EST in Conference Room A.
  
  Agenda:
  - Q4 Performance Review
  - New Campaign Proposals
  - Budget Allocation for Q2
  - Team Resource Planning
  
  Please come prepared with your department updates. I've attached the preliminary deck for your review.
  
  Best regards,
  Alex Smith
  Senior Marketing Director
  Tel: (555) 123-4567`,
        unread: false,
        attachments: [
            { name: "Q1_Strategy_Deck.pdf", size: "2.4 MB" },
            { name: "Budget_Allocation.xlsx", size: "1.1 MB" }
        ]
    },
    {
        id: 2,
        sender: "Jordan Brown",
        email: "jordan.brown@example.com",
        avatar: "https://i.pravatar.cc/128?u=2",
        date: new Date(2023, 11, 31),
        subject: "RE: Project Phoenix - Sprint 3 Update",
        preview: "Hi team, Quick update on Sprint 3 deliverables: ✅ User authentication module completed...",
        body: `Hi team,
  
  Quick update on Sprint 3 deliverables:
  
  ✅ User authentication module completed
  🏗️ Payment integration at 80%
  ⏳ API documentation pending review
  
  Key metrics:
  - Code coverage: 94%
  - Sprint velocity: 45 points
  - Bug resolution rate: 98%
  
  Please review the attached report for detailed analysis. Let's discuss any blockers in tomorrow's stand-up.
  
  Regards,
  Jordan
  
  --
  Jordan Brown
  Lead Developer | Tech Solutions
  Mobile: +1 (555) 234-5678`,
        unread: true,
        attachments: [
            { name: "Sprint_3_Report.pdf", size: "3.2 MB" }
        ]
    },
    {
        id: 3,
        sender: "Taylor Green",
        email: "taylor.green@example.com",
        avatar: "https://i.pravatar.cc/128?u=3",
        date: new Date(2023, 11, 31),
        subject: "Lunch Plans",
        preview: "Hi there! I was wondering if you'd like to grab lunch this Friday? There's this amazing new Mexican...",
        body: `Hi there!
  
  I was wondering if you'd like to grab lunch this Friday? There's this amazing new Mexican restaurant downtown called "La Casa" that I've been wanting to try. They're known for their authentic tacos and house-made guacamole.
  
  Would 12:30 PM work for you? It would be great to catch up and discuss the upcoming team building event while we're there.
  
  Let me know what you think!
  
  Best,
  Taylor`,
        unread: true,
        attachments: []
    },
    {
        id: 4,
        sender: "Morgan White",
        email: "morgan.white@example.com",
        avatar: "https://i.pravatar.cc/128?u=4",
        date: new Date(2023, 11, 31),
        subject: "New Proposal: Project Horizon",
        preview: "Hi team, I've just uploaded the comprehensive proposal for Project Horizon to our shared drive...",
        body: `Hi team,
  
  I've just uploaded the comprehensive proposal for Project Horizon to our shared drive. The document includes:
  
  • Detailed project objectives and success metrics
  • Resource allocation and team structure
  • Timeline with key milestones
  • Budget breakdown
  • Risk assessment and mitigation strategies
  
  I'm particularly excited about our innovative approach to the user engagement component, which could set a new standard for our industry.
  
  Could you please review and provide feedback by EOD Friday? I'd like to present this to the steering committee next week.
  
  Thanks in advance,
  
  Morgan White
  Senior Project Manager
  Tel: (555) 234-5678`,
        unread: false,
        attachments: [
            { name: "Project_Horizon_Proposal.pdf", size: "5.7 MB" }
        ]
    }
])

// State
const filter = ref('all')
const selectedEmail = ref(null)
const replyContent = ref('')
const showAttachments = ref(false)
const attachments = ref([])

// Computed
const filteredEmails = computed(() => {
    if (filter.value === 'unread') {
        return emails.value.filter(email => email.unread)
    }
    return emails.value
})

const unreadCount = computed(() => {
    return emails.value.filter(email => email.unread).length
})

// Methods
function setFilter(type) {
    filter.value = type
}

function selectEmail(email) {
    selectedEmail.value = email
    // Mark as read when selected
    if (email.unread) {
        markAsRead(email)
    }
}

function markAsRead(email) {
    email.unread = !email.unread
}

function toggleAttachments() {
    showAttachments.value = !showAttachments.value
}

function handleFileUpload(event) {
    const files = Array.from(event.target.files)
    attachments.value = [...attachments.value, ...files.map(file => ({
        name: file.name,
        size: formatFileSize(file.size),
        file
    }))]
}

function removeAttachment(index) {
    attachments.value.splice(index, 1)
}

function sendReply() {
    if (!replyContent.value.trim()) return

    // In a real app, this would send to a server
    alert(`Reply sent:\n\n${replyContent.value}`)

    // Reset form
    replyContent.value = ''
    attachments.value = []
    showAttachments.value = false
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDateTime(date) {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Initialize with first email selected (for demo purposes)
onMounted(() => {
    if (emails.value.length > 0) {
        selectEmail(emails.value[0])
    }
})
</script>

<style scoped>
.prose {
    line-height: 1.6;
}

/* Custom scrollbar */
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