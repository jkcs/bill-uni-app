<template>
  <view :class="bem()">
    <view :class="bem('header')">
      <view :class="bem('header-remarks')"><image class="icon icon-sm" model="widthFix" src="/static/icons/keyboard/remarks.png"/>备注：</view>
      <input v-model="remarks" :class="bem('header-inp')" maxlength="20" type="text" placeholder="点击填写备注"/>
<!--      <view :class="bem('header-de')">0.00</view>-->
      <view :class="bem('header-de')">{{formulaList | filterFormulaList}}</view>
    </view>
    <view :class="bem('content')">
      <view @click.stop="handleClickKey(7)" :class="bem('content-key')">7</view>
      <view @click.stop="handleClickKey(8)" :class="bem('content-key')">8</view>
      <view @click.stop="handleClickKey(9)" :class="bem('content-key')">9</view>
      <view @click.stop="handleClickKey('dataTimePick')" :class="bem('content-key')">
        <picker mode="date" :value="date" :start="startDate" @change="bindDateChange">
			    <image v-if="todayList[0]" class="icon icon-sm" model="widthFix" src="/static/icons/keyboard/date.png"/>{{todayList[1]}}
        </picker>
      </view>
      <view @click.stop="handleClickKey(4)" :class="bem('content-key')">4</view>
      <view @click.stop="handleClickKey(5)" :class="bem('content-key')">5</view>
      <view @click.stop="handleClickKey(6)" :class="bem('content-key')">6</view>
      <view @click.stop="handleClickKey('+')" :class="bem('content-key')">+</view>
      <view @click.stop="handleClickKey(1)" :class="bem('content-key')">1</view>
      <view @click.stop="handleClickKey(2)" :class="bem('content-key')">2</view>
      <view @click.stop="handleClickKey(3)" :class="bem('content-key')">3</view>
      <view @click.stop="handleClickKey('-')" :class="bem('content-key')">-</view>
      <view @click.stop="handleClickKey('.')" :class="bem('content-key')">.</view>
      <view @click.stop="handleClickKey(0)" :class="bem('content-key')">0</view>
      <view @click.stop="handleClickKey('backspace')" :class="bem('content-key')"><image class="icon" model="widthFix" src="/static/icons/keyboard/backspace.png"/></view>
      <view @click.stop="handleClickKey('enter')" :class="bem('content-key', 'primary')">{{formulaList.length === 3 ? '=' : '完成'}}</view>
    </view>
  </view>
</template>

<script>
  import { createNameSpace } from "@/common/utils/bem"
  import { dateFormat, getNow, isToday } from "@/common/utils/dateUtils"

  const bem = createNameSpace('keyboard')
  const nowDate = dateFormat(getNow(), '{y}-{m}-{d}')
  export default {
    props: {
      maxLength: {
        type: Number,
        default: 12
      },
      amount: {
        type: [Number, String],
        default: '0.00'
      },
      date: {
        type: String,
        default: nowDate
      },
      remark: {
        type: String,
        default: ''
      },
      startDate: {
        type: String,
        default: nowDate
      }
    },
    data() {
      return {
        formulaList: ['0.00'] // num symbol num
      }
    },
    watch: {
      value(val) {
        this.formulaList = [val]
      }
    },
    computed: {
      todayList() {
        return isToday(this.date)
      },
      remarks: {
        get() {
          return this.remark;
        },
        set(val) {
          this.$emit('update:remark', val)
        }
      }
    },
    filters: {
      filterFormulaList(list) {
        return list.join('')
      }
    },
    mounted() {
      this.formulaList = [this.amount]
    },
    methods: {
      bem,
      bindDateChange(e) {
        console.log(e)
        this.$emit('update:date', e.target.value)
      },
      handleClickKey(key) {
        const len = this.formulaList.length
        if (typeof key === "number") {
          this.clickNumber(key, len)
        }
        if (key === '.') {
          this.clickPoint(len)
        }
        if (key === '+' || key === '-') {
          this.clickSymbol(key, len)
        }
        if (key === 'enter') {
          this.clickEnter(len)
        }
        this.formulaList = this.formulaList.slice()
        if (key === 'backspace') {
          this.clickBackspace(len)
        }
      },
      clickNumber(num, len) {
        if (this.isAchieveMax()) return
        const item = this.formulaList[len - 1]
        if (this.isFixed(item, 2) && Number(item) !== 0) return
        if (len === 1 || len === 3) {
          this.formulaList[len - 1] = Number(item) === 0
            ? (this.hasPoint(item) && !this.isFixed(item, 2)) ? String(item) + num : num
            : this.isFixed(item, 2) ? item : String(item) + num
        }
        if (len === 2) {
          this.formulaList.push(num)
        }
      },
      clickPoint(len) {
        if (this.isAchieveMax()) return
        const item = this.formulaList[len - 1]
        if (this.hasPoint(item)) return
        if (len === 1 || len === 3) {
          this.formulaList[len - 1] = Number(item) === 0
            ? '0.'
            : String(item) + '.'
        }
        if (len === 2) {
          this.formulaList.push('0.')
        }
      },
      isAchieveMax() {
        return this.formulaList.join('').length >= this.maxLength
      },
      hasPoint(num) {
        return String(num).indexOf('.') !== -1
      },
      isFixed(num, len = 2) {
        if (!this.hasPoint(num)) return !1
        return (String(num).length - (String(num).indexOf('.') + 1)) === len
      },
      clickSymbol(sym, len) {
        if (len === 1 && Number(this.formulaList[0]) !== 0) {
          this.formulaList.push(sym)
        }
        if (len === 2) {
          this.formulaList[len - 1] = sym
        }
        if (len === 3) {
          const [num1, sym1, num2] = this.formulaList
          this.formulaList = [this.sumNumber(num1, num2, sym1 === '+'), sym]
        }
      },
      sumNumber(num1 = 0, num2 = 0, isAdd) {
        return isAdd
          ? (Number(num1) + Number(num2)).toFixed(2)
          : (Number(num1) - Number(num2)).toFixed(2)
      },
      clickBackspace(len) {
        if (len === 1 && Number(this.formulaList[len - 1]) === 0) {
          return
        }
        if (len === 1 && String(this.formulaList[len - 1]).length === 1) {
          this.formulaList = [0]
          return
        }
        if (Number(this.formulaList[len - 1]) === 0 || this.formulaList[len - 1].length === 1) {
          this.formulaList = this.formulaList.slice(0, -1)
          return
        }
        const item = this.formulaList[len - 1]
        this.formulaList[len - 1] = String(item).slice(0, -1)
        if (!this.formulaList[len - 1]) this.formulaList[len - 1] = '0'
        this.formulaList = this.formulaList.slice()
      },
      clickEnter(len) {
        if (len > 1) {
          const [num1, sym, num2] = this.formulaList
          this.formulaList = [this.sumNumber(num1, num2, sym === '+')]
        }
        const [amount] = this.formulaList
        if (Number(amount) === 0) return
        console.log(amount)
      }
    }
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
    justify-content: space-around;
    &-remarks {
      width: 130rpx;
      font-size: $font-size-m;
      color: #000;
      padding-left: $spacing-row-base;
      line-height: 75rpx;
      .icon {
        position: relative;
        top: -2rpx;
        vertical-align: middle;
        margin-right: $spacing-row-sm;
      }
    }
    &-inp {
      flex: 1;
      font-size: $font-size-base;
    }
    &-de {
      font-size: 38rpx;
      font-weight: bold;
      width: 300rpx;
      text-align: right;
      // @include ellipsis(1);
      white-space: nowrap;
      padding-right: $spacing-row-sm;
    }
  }
  &__content {
    display: flex;
    border-top: 1rpx solid $border-thin;
    flex: 1;
    flex-wrap: wrap;

    &-key {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1rpx solid $border-thin;
      border-right: 1rpx solid $border-thin;
      width: calc(25% - 2rpx);
      height: 100rpx;
      background-color: #fff;
      &:active {
        filter: contrast(70%);
      }
      &--primary {
        background-color: $color-success;
      }
    }
  }
}
</style>
