<template>
  <view>
    <keyboard :date.sync="date" :remark.sync="remark"></keyboard>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        date: undefined,
        remark: undefined
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
