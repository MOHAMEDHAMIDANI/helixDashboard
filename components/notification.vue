<template>
  <div
    v-if="notificationStore.NotificationIsOpen"
    id="reka-dialog-v-0-3"
    data-state="open"
    class="fixed inset-0 bg-(--ui-bg-elevated)/75 data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
    style="pointer-events: auto"
    data-aria-hidden="true"
    aria-hidden="true"
  >
    <div
      ref="notifications"
      data-dismissable-layer=""
      role="dialog"
      aria-describedby="reka-dialog-description-v-0-3-1"
      aria-labelledby="reka-dialog-title-v-0-3-0"
      data-state="open"
      data-side="right"
      tabindex="-1"
      class="fixed bg-black/50 z-50 divide-y divide-(--ui-border) sm:ring ring-(--ui-border) sm:shadow-lg flex flex-col focus:outline-none right-0 inset-y-0 w-full max-w-md data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      style="pointer-events: auto"
    >
      <div class="flex items-center gap-1.5 p-4 sm:px-6 min-h-16">
        <div class="">
          <h2
            id="reka-dialog-title-v-0-3-0"
            class="text-(--ui-text-highlighted) font-semibold"
          >
            Notifications
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          class="rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-1.5 absolute top-4 end-4"
          @click="notificationStore.NotificationIsOpen = false"
        >
          <span
            class="iconify i-lucide:x shrink-0 size-5"
            aria-hidden="true"
          ></span>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 sm:p-6">
        <a
          href="/inbox?id=1"
          class="px-3 py-2.5 rounded-md hover:bg-(--ui-bg-elevated)/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
        >
          <div
            class="relative inline-flex items-center justify-center shrink-0"
          >
            <span
              class="inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-8 text-base"
            >
              <img
                role="img"
                src="https://i.pravatar.cc/128?u=2"
                alt="Jordan Brown"
                width="32"
                height="32"
                class="h-full w-full rounded-[inherit] object-cover"
              />
            </span>
            <span
              class="rounded-full ring ring-(--ui-bg) flex items-center justify-center text-(--ui-bg) font-medium whitespace-nowrap bg-(--ui-error) h-[8px] min-w-[8px] text-[8px] top-0 right-0 absolute"
            ></span>
          </div>
          <div class="text-sm flex-1">
            <p class="flex items-center justify-between">
              <span class="text-(--ui-text-highlighted) font-medium"
                >Jordan Brown</span
              >
              <time
                datetime="1969-12-31T23:53:00.000Z"
                class="text-(--ui-text-muted) text-xs"
                >55 years ago</time
              >
            </p>
            <p class="text-(--ui-text-dimmed)">sent you a message</p>
          </div>
        </a>
        <a
          href="/inbox?id=2"
          class="px-3 py-2.5 rounded-md hover:bg-(--ui-bg-elevated)/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
        >
          <div
            class="relative inline-flex items-center justify-center shrink-0"
          >
            <span
              class="inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated) size-8 text-base"
            >
              <span
                class="font-medium leading-none text-(--ui-text-muted) truncate"
                >LW</span
              >
            </span>
          </div>
          <div class="text-sm flex-1">
            <p class="flex items-center justify-between">
              <span class="text-(--ui-text-highlighted) font-medium"
                >Lindsay Walton</span
              >
              <time
                datetime="1969-12-31T23:00:00.000Z"
                class="text-(--ui-text-muted) text-xs"
                >55 years ago</time
              >
            </p>
            <p class="text-(--ui-text-dimmed)">subscribed to your email list</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";
const notificationStore = useNotificationStore();
const target = useTemplateRef<HTMLElement>("notifications");

onClickOutside(
  target,
  (event) => (notificationStore.NotificationIsOpen = false)
);
</script>