<template>
  <div class="container mx-auto px-4 px-md-4 px-lg-5 mt-2">
    <div class="flex justify-center gap-4">
      <!-- First hardcoded card -->
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Project 1</CardTitle>
          <CardDescription>Description of Project 1</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Additional project details can go here...</p>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline" @click="cancelProject(1)">Cancel</Button>
          <Button @click="deployProject(1)">Deploy</Button>
        </CardFooter>
      </Card>

      <!-- Second hardcoded card -->
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Project 2</CardTitle>
          <CardDescription>Description of Project 2</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Additional project details can go here...</p>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button variant="outline" @click="cancelProject(2)">Cancel</Button>
          <Button @click="deployProject(2)">Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>