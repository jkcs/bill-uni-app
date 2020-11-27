<template>
  <view class="keyboard">
    <view class="keyboard__header">
      <view class="keyboard__header--remarks">备注：</view>
      <input class="keyboard__header--inp" type="text"/>
      <view class="keyboard__header--de">0.00</view>
    </view>
    <view class="keyboard__content">
      <view class="key">7</view>
      <view class="key">8</view>
      <view class="key">9</view>
      <view class="key">今天</view>
      <view class="key">4</view>
      <view class="key">5</view>
      <view class="key">6</view>
      <view class="key">+</view>
      <view class="key">1</view>
      <view class="key">2</view>
      <view class="key">3</view>
      <view class="key">-</view>
      <view class="key">.</view>
      <view class="key">0</view>
      <view class="key">减</view>
      <view class="key">完成</view>
    </view>
  </view>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
.keyboard {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1rpx solid $border-thin;
  box-sizing: border-box;
  &__header {
    height: 75rpx;
    display: flex;
    align-items: center;
    &--remarks {
      width: 80rpx;
      font-size: 26rpx;
      color: #000;
      padding-left: 20rpx;
    }
    &--inp {
      flex: 1;
      font-size: 28rpx;
    }
    &--de {
      font-size: 38rpx;
      font-weight: bold;
      width: 140rpx;
      text-align: center;
      @include ellipsis(1);
    }
  }
  &__content {
    display: flex;
    border-top: 1rpx solid $border-thin;
    flex: 1;
    flex-wrap: wrap;

    .key {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1rpx solid $border-thin;
      border-right: 1rpx solid $border-thin;
      width: calc(25% - 2rpx);
      height: 100rpx;
    }
  }
}
</style>
