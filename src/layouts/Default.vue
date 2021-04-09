<template>
  <div class="app">
    <header>
        <h1><g-link to="/">Holzwege</g-link></h1>
        <small>reflections by <a href="https://dipasqualew.com">William Di Pasquale</a></small>
    </header>
    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped>
header h1 {
  margin-bottom: 0px;
}

main {
  margin-top: 3rem;
}
</style>
