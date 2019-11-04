<template lang="pug">
#wrapper(@click.stop)
  slot
</template>

<style lang="sass">
#wrapper
  position: absolute
  background-color: var(--darkerColor)
  border-radius: 4px
  right: 20px
  top: 20px
  padding-bottom: 4px
  box-shadow: 0 2px 2px 0 var(--darkColor)
  width: var(--width)
  > div:first-of-type
    border-radius: 4px 4px 0 0 
  > div:last-of-type
    border-radius: 0 0 4px 4px 
  /deep/ div:first-of-type#inputtitle
    margin-top: 0
</style>