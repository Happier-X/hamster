<template>
  <div class="w-screen h-screen bg-background flex flex-col items-center relative">
    <Button variant="ghost" size="icon" class="absolute top-4 right-4">
      <SettingsIcon />
    </Button>
    <div className="text-4xl font-light text-foreground font-mono pb-4 pt-[15vh]">
      {{ timeString }}
    </div>
    <InputGroup class="w-2/5">
      <InputGroupInput v-model="query" @keyup.enter="handleSearch" />
      <InputGroupAddon>
        <span class="icon-[cib--bing]" role="img" aria-hidden="true" v-show="false" />
        <span class="icon-[cib--google]" role="img" aria-hidden="true" />
        <span class="icon-[cib--baidu]" role="img" aria-hidden="true" v-show="false" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" @click="handleSearch">
          <SearchIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Settings as SettingsIcon } from 'lucide-vue-next';
import { ref, onMounted, onUnmounted } from 'vue';

// 时间字符串
const timeString = ref('');
// 更新时间
const updateTime = () => {
  const now = new Date()
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }
  timeString.value = now.toLocaleTimeString("zh-CN", timeOptions)
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

// 查询字符串
const query = ref('')
// 处理搜索
const handleSearch = () => {
  window.open(`https://www.google.com/search?q=${query.value}`)
  query.value = ""
}
</script>
