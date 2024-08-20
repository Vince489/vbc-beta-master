<template>
  <div class="py-16">
    <div class="container mx-auto px-10 max-w-5xl">
      <h1 class="text-4xl font-bold mb-2 text-center">Esports Athletic Commission</h1>
      <h2 class="mb-12 text-center">BOXING & MIXED MARTIAL ARTS</h2>

      <div class="mb-12">
        <h2 class="text-3xl font-bold mb-4">Overview</h2>
        <p class="mb-2 font-semibold">
          The Esports Athletic Commission (EAC) is a regulatory body dedicated to overseeing and regulating combat sports such as boxing and mixed martial arts (MMA) within the metaverse.
        </p>
        <p>
          The commission plays a pivotal role in licensing, supervising stakeholders, and ensuring the fair and ethical conduct of unarmed esports combat.
        </p>
      </div>

      <div>
        <h2 class="text-xl text-center font-bold mb-4">Register Here</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px] text-gray-400">
                Position
              </TableHead>
              <TableHead class="text-gray-400">VRT</TableHead>
              <TableHead class="text-gray-400">Application</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium">
                FIGHTER
              </TableCell>
              <TableCell>100</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300" @click="register('FIGHTER')">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                SECOND
              </TableCell>
              <TableCell>25</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                TRAINER
              </TableCell>
              <TableCell>500</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                MANAGER
              </TableCell>
              <TableCell>1000</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300"  @click="register('MANAGER')">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                MATCHMAKER
              </TableCell>
              <TableCell>1500</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                PROMOTER
              </TableCell>
              <TableCell>2500</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300">Register</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">
                JUDGE
              </TableCell>
              <TableCell>500</TableCell>
              <TableCell>
                <button class="px-4 py-1.5 rounded-md bg-[#0b7696] text-gray-300">Register</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 class="text-xl text-center font-bold mb-4">Contracts</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const register = (position) => {
  if (position === 'FIGHTER') {
    router.push('/registerFighter');
  } else
  if (position === 'MANAGER') {
    router.push('/registerManager');
  }
};
</script>

<style scoped>
</style>
