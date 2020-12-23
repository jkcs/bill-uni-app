<template>
  <view :class="bem('container')">
    <scroll-view scroll-y show-scrollbar :class="bem('grid')">
      <view v-for="(item, index) in list" :key="index" :class="bem('grid__item', { active: item._checked })" @click="handleClickItem(item)">
        <image :class="bem('grid__item__image')" :src="`/static/icons/keyboard/${item.icon}.png`" model="widthFix"></image>
        <text :class="bem('grid__item__text')">{{item.tagName}}</text>
      </view>
    </scroll-view>
    <keyboard v-if="false" :date.sync="date" :remark.sync="remark"></keyboard>
  </view>
</template>

<script>
  import { createNameSpace } from '@/common/utils/bem'

  const bem = createNameSpace('addition')
  export default {
    data() {
      return {
        date: undefined,
        remark: undefined,
        list: [
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false },
          { icon: 'date', tagName: '日期', _checked: false }
        ]
      }
    },
    methods: {
      bem,
      handleClickItem(item) {
        item._checked = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addition{
    background-color: #fff;
    &__container {
      padding: 20rpx 0;
    }
    &__grid {
      display: flex;
      flex-wrap: wrap;
      &__item {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: $spacing-row-lg;
        align-items: center;
        &--active > &-image {
          @include main-bg;
        }
        &--active > &__text {
          font-weight: bold;
        }
        &__image {
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
        }
        &__text {
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
