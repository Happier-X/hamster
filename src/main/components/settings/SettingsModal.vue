<template>
    <Dialog v-model:open="isOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>设置</DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { ref } from 'vue';

const isOpen = ref(false);
const open = () => {
    isOpen.value = true;
}
const close = () => {
    isOpen.value = false;
}
defineExpose({
    open,
    close,
})
</script>