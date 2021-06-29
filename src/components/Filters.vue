<template>
  <div class="c-Filters">
    <h2 class="c-Filters__title">
      <i></i>
      <span>Filters</span>
    </h2>
    <div class="c-Filters__filterBlock--search">
      <h2>Search</h2>
      <input
        v-model="searchString"
        type="text"
        placeholder="Search here"
        @input="handleSearchString" />
    </div>
    <div class="c-Filters__filterBlock">
      <h2>Unit of measure</h2>
      <div class="c-Filters__btnsGroup">
        <button
          type="button"
          :class="activeMiState"
          @click="changeUnitOfMeasure('mi')">
          <span>Miles</span>
        </button>
        <button
          type="button"
          :class="activeKmState"
          @click="changeUnitOfMeasure('km')">
          <span>Km</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      searchString: undefined
    }
  },
  computed: {
    searchValue () {
      return this.filters.search
    },
    activeMiState () {
      return {
        isActive: this.filters.unitOfMeasure === 'mi'
      }
    },
    activeKmState () {
      return {
        isActive: this.filters.unitOfMeasure === 'km'
      }
    }
  },
  methods: {
    handleSearchString () {
      this.$emit('changeFilters', {
        search: this.searchString
      })
    },
    changeUnitOfMeasure (val) {
      this.$emit('changeFilters', {
        unitOfMeasure: val
      })
    }
  },
  watch: {
    searchValue: {
      handler (val) {
        this.searchString = val
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.c-Filters {
  width: 100%;
  border: 1px solid $main-border-color;
  border-radius: 4px;
  padding: 24px;
  height: fit-content;

  h2 {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: $main-font-color;
  }

  &__title {
    margin-bottom: 27px;
    display: flex;

    i {
      width: 21px;
      height: 21px;
      display: block;
      background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.06 9.045h3.973a.98.98 0 110 1.96h-3.974v1.958h-4.02V7.575h4.02v1.47zM5.04 20.082v-5.038h4v5.038h-4zM.03 1.983a.98.98 0 01.985-.98h1.974v1.96H1.014a.98.98 0 01-.985-.98zM5.04 5.01V0h4v5.01h-4zM.03 10.024c0-.544.439-.98.98-.98h8.027v1.96H1.01a.977.977 0 01-.981-.98zM0 16.981C0 16.435.438 16 .978 16h2.01v1.962H.978a.982.982 0 01-.978-.98zm11.039.981V16h7.976c.543 0 .975.44.975.981a.976.976 0 01-.975.981H11.04zm0-15V1.004h8.002c.545 0 .978.439.978.98 0 .545-.438.98-.978.98h-8.002z' fill='%23313336'/%3E%3C/svg%3E");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 10px;
    }
  }

  &__filterBlock {
    width: 100%;

    h2, &--search h2 {
      padding: 16px 0;
    }

    &--search {
      border-top: 1px solid #F1F1F2;
      border-bottom: 1px solid #F1F1F2;

      input {
        width: 100%;
        border: 1px solid $main-border-color;
        font-family: 'Hind', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $main-font-color;
        padding: 10px 18px;
        box-sizing: border-box;
        margin-bottom: 16px;

        &:focus {
          outline: 2px solid $main-font-color;
          border-color: transparent;
        }
      }
    }
  }

  &__btnsGroup {
    display: flex;
    margin-bottom: 16px;

    button {
      border: 1px solid $main-border-color;
      background-color: #FFFFFF;
      border-radius: 4px;
      padding: 16px 0;
      width: calc(50% - 4px);
      cursor: pointer;

      &:first-child {
        margin-right: 8px;
      }

      span {
        font-family: 'Hind', Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
      }

      &:hover {
        text-decoration: underline;
      }

      &.isActive {
        background-color: $main-font-color;
        border: 1px solid $main-font-color;
        text-decoration-color: #FFFFFF;

        span {
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
