<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <div class="w-full md:w-96 lg:w-1/3 bg-gray-800 p-4 flex flex-col">
      <!-- Header with Avatar -->
      <div class="flex items-center justify-between mb-6">
        <Avatar class="h-10 w-10">
          <AvatarImage src="https://via.placeholder.com/150" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      <!-- Search Bar -->
      <div class="mb-4">
        <Input type="text" placeholder="Search..." class="w-full bg-gray-700 text-white" />
      </div>

      <!-- Chat & Group Tabs -->
      <div class="mb-4 flex justify-around text-white">
        <Button variant="link" class="text-sm font-bold">All</Button>
        <Button variant="link" class="text-sm text-gray-400">Chats</Button>
        <Button variant="link" class="text-sm text-gray-400">Groups</Button>
      </div>

      <!-- Chats List -->
      <div class="flex-1 overflow-y-auto">
        <div v-for="chat in chats" :key="chat.id" class="mb-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <Avatar class="h-8 w-8 mr-2">
                <AvatarImage :src="chat.avatar" />
              </Avatar>
              <div>
                <h3 class="font-semibold text-sm">{{ chat.name }}</h3>
                <p class="text-xs text-gray-400">{{ chat.lastMessage }}</p>
              </div>
            </div>
            <div class="text-xs text-gray-400">
              <p>{{ chat.time }}</p>
              <Badge v-if="chat.unread" variant="dot" class="bg-red-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Groups List -->
      <div class="mt-4">
        <h3 class="text-sm font-semibold mb-2">Groups</h3>
        <div v-for="group in groups" :key="group.id" class="mb-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <Avatar class="h-8 w-8 mr-2">
                <AvatarImage :src="group.avatar" />
                <AvatarFallback>{{ group.initials }}</AvatarFallback>
              </Avatar>
              <div>
                <h3 class="font-semibold text-sm">{{ group.name }}</h3>
                <p class="text-xs text-gray-400">{{ group.lastMessage }}</p>
              </div>
            </div>
            <div class="text-xs text-gray-400">
              <p>{{ group.time }}</p>
              <Badge v-if="group.unread" variant="dot" class="bg-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup>
const chats = [
  {
    id: 1,
    name: 'Emily',
    avatar: 'https://via.placeholder.com/150',
    initials: 'E',
    lastMessage: "I'll be home around 7pm",
    time: '08:10',
    unread: true,
  },
  {
    id: 2,
    name: 'Juan',
    avatar: 'https://via.placeholder.com/150',
    initials: 'J',
    lastMessage: "I'm on my way",
    time: '08:10',
    unread: false,
  },
  {
    id: 3,
    name: 'Alicia',
    avatar: 'https://via.placeholder.com/150',
    initials: 'A',
    lastMessage: "Tomorrow let's go to the library",
    time: '08:10',
    unread: false,
  },
];

const groups = [
  {
    id: 1,
    name: 'Gaming',
    avatar: 'https://via.placeholder.com/150',
    initials: 'G',
    lastMessage: "Let's play together",
    time: '08:10',
    unread: true,
  },
  {
    id: 2,
    name: 'Office',
    avatar: 'https://via.placeholder.com/150',
    initials: 'O',
    lastMessage: 'I will do this task now',
    time: '08:10',
    unread: false,
  },
  {
    id: 3,
    name: 'DesignerCommunity',
    avatar: 'https://via.placeholder.com/150',
    initials: 'D',
    lastMessage: 'New project ideas',
    time: '08:10',
    unread: false,
  },
];

const startNewChat = () => {
  console.log('Start a new chat');
};
</script>
