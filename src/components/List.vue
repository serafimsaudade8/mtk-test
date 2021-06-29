<template>
  <div class="c-List">
    <ul
      v-if="!withError"
      class="c-List__mainContainer">
      <li
        class="c-List__item"
        :class="itemClass(item)"
        v-for="(item, index) in listData"
        :key="index">
        <div class="c-List__imgContainer">
          <img
            :src="item.image"
            alt="car cover image" />
          <div v-if="item.isKm0">
            <i />
            <span>{{ parseKm0(item) }}</span>
          </div>
          <i />
        </div>
        <div class="c-List__mainContent">
          <p class="c-List__makeModel">{{ item.make }} {{ item.model }}</p>
          <p class="c-List__version">{{ item.version }}</p>
          <div class="c-List__separator" />
          <div class="c-List__priceFavContainer">
            <div class="c-List__priceContainer">
              <span>A partire da</span>
              <p>€ {{ parsePrice(item) }}</p>
            </div>
            <div
              class="c-List__favContainer"
              :class="itemFavouritedClass(item)"
              @click="handleFavourite(item)">
              <i />
            </div>
          </div>
          <div class="c-List__detailsContainer">
            <p class="c-List__mainDetails">
              {{ parseRegistrationYear(item) }} - {{ parseKms(item) }} - Combustibili
            </p>
            <div class="c-List__consumptionRatingContainer">
              <p class="c-List__consumptionContainer">
                Cons. Comb. Carburante: {{ parseFuel(item) }} - CO2: {{ parseCo2(item) }}
              </p>
              <p class="c-List__ratingContainer">
                <span>A+</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>
      <p class="c-List__error">An error occurred, please try again</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    listData: {
      type: Array,
      required: true,
      default: () => []
    },
    unitOfMeasure: {
      type: String,
      required: true,
      default: () => ''
    },
    withError: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  methods: {
    handleFavourite (item) {
      const payload = {}
      payload[item.id] = !item.isFavourited
      this.$store.dispatch('updateFavourites', payload)
    },
    itemClass (item) {
      return { isSold: item.status === 'SOLD' }
    },
    itemFavouritedClass (item) {
      return { isActive: item.isFavourited }
    },
    parseKm0 () {
      return this.unitOfMeasure === 'km' ? 'km 0' : 'mi 0'
    },
    parsePrice (item) {
      return new Intl.NumberFormat('it').format(item.price)
    },
    parseRegistrationYear (item) {
      return item.registrationYear ? item.registrationYear : 'No info'
    },
    parseKms (item) {
      return this.unitOfMeasure === 'km' ? item.parsedKm : item.parsedMi
    },
    parseFuel (item) {
      return this.unitOfMeasure === 'km' ? item.parsedConsumptionKm : item.parsedConsumptionMpg
    },
    parseCo2 (item) {
      return this.unitOfMeasure === 'km' ? item.parsedCo2Km : item.parsedCo2Mi
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.c-List {
  &__mainContainer {
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(252px, 1fr));
  }

  &__item {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid $main-border-color;
    border-radius: 4px;
    position: relative;

    &.isSold {
      user-select: none;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        opacity: 0.7;
        z-index: 2;
      }
    }
  }

  &__imgContainer {
    width: 100%;
    height: 190px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    div {
      position: absolute;
      left: 8px;
      top: 8px;
      padding: 6px 8px 6px 6px;
      background: #FFFFFF;
      border-radius: 99px;
      display: flex;
      align-items: center;
      z-index: 2;

      i {
        width: 12px;
        height: 12px;
        border-radius: 12px;
        background-color: #0C5E95;
        margin-right: 6px;
      }

      span {
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        color: $main-font-color;
      }
    }

    > i {
      width: 34px;
      height: 20px;
      display: block;
      position: absolute;
      left: 11px;
      bottom: 11px;
      background-image: url("data:image/svg+xml,%3Csvg width='34' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.792 6.738c3.203 1.339 3.875 2.892 3.875 3.962 0 3.471-6.638 5.426-13.324 5.898v2.627l-3.33-3.338 3.33-3.34v2.382C27.96 14.4 32 12.206 32 10.7c0-.772-1.067-1.678-2.85-2.423l.642-1.539zm-15.929 8.204C6.537 14.455 2 12.36 2 10.7c0-.342.202-.707.6-1.085L1.452 8.407C.71 9.113.333 9.885.333 10.7c0 3.46 6.74 5.46 13.42 5.907l.11-1.665zm15.33-13.8c-.36 0-.425.745-.425 1.01 0 .28.04.97.425.97.37 0 .424-.73.424-.97 0-.279-.04-1.01-.424-1.01zm-.015 3.148c-1.261 0-1.9-.943-1.9-2.125 0-1.168.639-2.165 1.9-2.165 1.302 0 1.929.97 1.929 2.178 0 1.197-.652 2.112-1.929 2.112zm-5.491 1.733c0-.53-.025-2.218-.797-2.218-.743 0-.743 1.688-.743 2.193 0 .385.013.77.051 1.155.042.452.067 1.689.719 1.689.756 0 .77-1.754.77-2.259v-.56zm-.675 4.892c-2.527 0-3.217-2.605-3.217-4.665 0-1.992.743-4.517 3.162-4.517 2.418 0 3.096 2.59 3.096 4.559 0 1.938-.625 4.623-3.041 4.623zm-6.877-4.32c-.583 0-.665.745-.665 1.183 0 .437.067 1.222.665 1.222.612 0 .678-.81.678-1.262 0-.438-.106-1.143-.678-1.143zm.385-2.178c-.132.24-.278.465-.438.691.278-.146.531-.24.85-.24 1.448 0 2.18 1.569 2.18 2.83 0 1.847-1.197 3.217-3.084 3.217-1.858 0-2.895-1.448-2.895-3.202 0-1.861 1.394-4.186 2.245-5.821h2.565L16.52 4.417zm-10.268 0c.116-1.622 1.235-2.684 2.868-2.684 1.462 0 2.763 1.05 2.763 2.577 0 .81-.371 1.462-1.076 1.86.8.467 1.183 1.143 1.183 2.06 0 1.7-1.395 2.685-3.002 2.685-1.583 0-2.911-.958-2.911-2.632V8.15h2.34c0 .398.091.797.585.797.451 0 .651-.425.651-.824 0-.598-.375-.93-.956-.93-.147 0-.28.014-.427.027V5.333c.093.014.198.014.293.014.637 0 .982-.227.982-.904 0-.333-.12-.73-.518-.73-.385 0-.452.412-.464.704H6.252z' fill='%23fff'/%3E%3C/svg%3E");
      background-position: center;
      background-repeat: no-repeat;
      z-index: 2;
    }
  }

  &__mainContent {
    padding: 16px;
  }

  &__makeModel {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: $main-font-color;
  }

  &__version {
    font-family: 'Hind', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #606164;
    min-height: 20px;
    margin-bottom: 16px;
  }

  &__separator {
    width: 55px;
    height: 2px;
    background-color: #F89F1C;
    margin-bottom: 18px;
  }

  &__priceFavContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__priceContainer {
    span {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: $main-font-color;
      display: block;
    }

    p {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: $main-font-color;
    }
  }

  &__favContainer {
    width: 40px;
    height: 40px;
    border: 1px solid $main-border-color;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-color: #F89F1C;
    }

    i {
      width: 18px;
      height: 16px;
      display: block;
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.001 1.711C3.754-3.295-3.365 3.771 1.782 8.956c2.745 2.765 4.855 4.844 6.334 6.238l.817.77.044-.044.081.08.818-.797c1.444-1.407 3.548-3.48 6.312-6.217C21.383 3.84 14.283-3.21 9.001 1.71zm-.084 12.864l-.115-.109c-1.467-1.382-3.568-3.451-6.31-6.215C1.376 7.127.98 5.967 1 4.951c.02-1.031.47-2.003 1.2-2.732.729-.728 1.713-1.186 2.764-1.217 1.036-.031 2.21.35 3.346 1.433l.682.65.69-.642c2.22-2.07 4.702-1.597 6.132-.163.727.729 1.17 1.697 1.185 2.72.013 1.007-.388 2.159-1.515 3.275a1198.232 1198.232 0 01-6.307 6.212l-.116.113-.085-.083-.06.058z' fill='%23606164'/%3E%3C/svg%3E");
      background-position: center;
      background-repeat: no-repeat;
    }

    &.isActive i {
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.188 8.986c-2.764 2.738-4.868 4.81-6.312 6.217L9.058 16l-.08-.08-.045.044-.817-.77c-1.48-1.395-3.59-3.473-6.334-6.238-5.147-5.186 1.972-12.25 7.22-7.245 5.28-4.92 12.381 2.13 7.186 7.275z' fill='%23F89F1C'/%3E%3C/svg%3E");
    }
  }

  &__detailsContainer {
    width: 100%;
    background-color: #F1F1F2;
    border-radius: 2px;
    padding: 8px;
  }

  &__mainDetails {
    font-family: 'Hind', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 14px;
    color: $main-font-color;
    margin-bottom: 4px;
  }

  &__consumptionRatingContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__consumptionContainer {
    font-family: 'Hind', Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #606164;
    margin-right: 8px;
  }

  &__ratingContainer {
    width: 40px;
    height: 16px;
    background-color: #008F36;
    display: flex;
    align-items: center;

    span {
      font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      font-weight: 700;
      font-size: 10px;
      line-height: 12px;
      color: #FFFFFF;
      margin-left: 8px;
    }
  }

  &__error {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: $main-font-color;
    text-align: center;
    margin-top: 40px;
  }
}
</style>
