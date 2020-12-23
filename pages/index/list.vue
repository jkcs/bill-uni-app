<template>
  <view :class="bem('container')">
    <navigator url="bill/addition">
      <button type="default">跳转到发布页面</button>
    </navigator>
    <view :class="bem('header')">
      <view :class="bem('header-left')">left icon</view>
      <view :class="bem('header-center')">bill</view>
    </view>
    <view :class="bem('count')">
      <view :class="bem('count-left')">
        <text :class="bem('count-title')">2020年</text>
        <text :class="bem('count-content')">11<text :class="bem('count-content__sub')">月</text> <view :class="bem('count-content__triangle')"></view></text>
      </view>
      <view :class="bem('count-right')">
        <text :class="bem('count-title')">收入</text>
        <text :class="bem('count-content')">0.00</text>
      </view>
      <view :class="bem('count-right')">
        <text :class="bem('count-title')">支出</text>
        <text :class="bem('count-content')">0.00</text>
      </view>
    </view>
    <view :class="bem('list')">
      <view :class="bem('list__item')">
        <view :class="bem('list__item-bar')">
          <view :class="bem('list__item-bar__title')">12月08日</view>
          <view :class="bem('list__item-bar__right')">
            <text :class="bem('list__item-bar__right__title')">支出：</text>
            <text :class="bem('list__item-bar__right__amount')">0.00</text>
          </view>
          <view :class="bem('list__item-bar__right')">
            <text :class="bem('list__item-bar__right__title')">收入：</text>
            <text :class="bem('list__item-bar__right__amount')">0.00</text>
          </view>
        </view>
        <view :class="bem('list__item-sub')">
          <view :class="bem('list__item-sub__icon')">
            <image class="icon icon-m" :src="`/static/icons/keyboard/date.png`" model="widthFix"></image>
          </view>
          <view :class="bem('list__item-sub__text')">吃饭</view>
          <view :class="bem('list__item-sub__amount')">- 2.12</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { createNameSpace } from '@/common/utils/bem'

  const bem = createNameSpace('list')
  export default {
    data() {
      return {}
    },
    methods: {
      bem
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    &__container {
      padding: 15rpx;
    }
    &__header {
      display: flex;
      justify-content: space-between;
      &-left {
        font-size: $font-size-s;
      }
      &-center {
        align-self: center;
        font-size: $font-size-base;
      }
    }
    &__count {
      &-left {

      }
      &-right {

      }
      &-title {

      }
      &-content {

      }
    }
    &__list {
      &__item {
        &-bar {
          &__title {

          }
          &__right {
            &__title {

            }
            &__amount {

            }
          }
        }

        &-sub {
          &__icon {

          }
          &__text {

          }
          &__amount {

          }
        }
      }
    }
  }

</style>
