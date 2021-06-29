<template>
  <div class="l-SearchPageView">
    <h1>Search page</h1>
    <div class="l-SearchPageView__mainContainer">
      <Filters
        class="l-SearchPageView__filters"
        :filters="filters"
        @changeFilters="handleFiltersChange"></Filters>
      <List
        class="l-SearchPageView__list"
        :listData="listData"
        :unit-of-measure="filters.unitOfMeasure"
        :with-error="withError"></List>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from '@/components/Filters.vue'
import List from '@/components/List.vue'
import { debounce } from '@/utils/utils'

export default {
  name: 'SearchPageView',
  components: {
    Filters,
    List
  },
  data () {
    return {
      withError: false
    }
  },
  computed: {
    ...mapGetters({
      filters: 'filters',
      listData: 'listData'
    })
  },
  methods: {
    loadData () {
      this.$store.dispatch('loadListData').then(() => {
        this.withError = false
      }, () => {
        this.withError = true
      })
    },
    async handleFiltersChange (data) {
      const key = Object.keys(data)[0]

      await this.$store.dispatch('updateFilters', {
        ctx: this,
        data
      })

      if (key === 'search') {
        this.loadData()
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('initListData', this).then(() => {
      this.withError = false
    }, () => {
      this.withError = true
    })
  },
  created () {
    this.loadData = debounce(this.loadData, 350)
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.l-SearchPageView {
  h1 {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 35px;
    display: flex;
    justify-content: center;
    color: $main-font-color;
    margin-bottom: 46px;
  }

  &__mainContainer {
    display: flex;
  }

  &__filters {
    width: 380px;
    margin-right: 30px;
  }
  &__list {
    width: calc(100% - 380px - 30px);
  }
}
</style>
