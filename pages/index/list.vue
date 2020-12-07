<template>
  <view :class="bem('container')">
    <view :class="bem('grid')">
      <view :class="bem('grid-item')">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/date.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
      <view :class="bem('grid-item', { active: true })">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/backspace.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
      <view :class="bem('grid-item')">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/date.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
      <view :class="bem('grid-item')">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/date.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
      <view :class="bem('grid-item')">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/date.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
      <view :class="bem('grid-item')">
        <image :class="bem('grid-item-image')" src="/static/icons/keyboard/date.png" model="widthFix"></image>
        <text :class="bem('grid-item-text')">测试</text>
      </view>
    </view>
    <keyboard v-if="false" :date.sync="date" :remark.sync="remark"></keyboard>
  </view>
</template>

<script>
  import { createNameSpace } from "@/common/utils/bem"

  const bem = createNameSpace('list')
  export default {
    data() {
      return {
        date: undefined,
        remark: undefined
      }
    },
    methods: {
      bem
    }
  }
</script>

<style lang="scss" scoped>
.list{
  background-color: #fff;
  &__container {
    padding: 20rpx 0;
  }
  &__grid {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: $spacing-row-lg;
      align-items: center;
      &--active > &-image {
        @include main-bg;
      }
      &--active > &-text {
        font-weight: bold;
      }
      &-image {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }
      &-text {
        padding-top: $spacing-row-base;
        font-size: $font-size-sm;
        text-align: center;
        color: #000;
        font-weight: 400;
        line-height: 30rpx;
      }
    }
  }
}
</style>
