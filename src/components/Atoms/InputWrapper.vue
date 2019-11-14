<template lang="pug">
#inputwrapper(@click.stop)
  slot
</template>

<style lang="sass">
#inputwrapper
  position: absolute
  background-color: var(--trans)
  border-radius: 4px
  right: 20px
  top: 20px
  padding-bottom: 4px
  width: var(--width)
  box-shadow: 0 0 2px 0 var(--shadow)
  cursor: default
  z-index: 200
  > div:first-of-type
    border-radius: 4px 4px 0 0 
  > div:last-of-type
    border-radius: 0 0 4px 4px 
  /deep/ div:first-of-type#inputtitle
    margin-top: 0
</style>