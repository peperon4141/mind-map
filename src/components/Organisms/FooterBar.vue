<template lang="pug">
footer#footerbar
  #left
  #right
</template>

<style lang="sass" scoped>
#footerbar
  display: flex
  height: 32px
  background-color: var(--brand)
  box-shadow: 0 0 4px 0 var(--shadow)
  z-index: 20
  #left
    justify-content: flex-start
  #right
    margin-left: auto
</style>