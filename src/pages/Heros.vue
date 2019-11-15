<template>
  <div class="heros">
    <card
      :type="type"
      @toggle="changeType($event)"
      :width="width"
    >
      <div class="item" style="margin-top: 10px;">
        <span
          class="text"
          style="line-height: 38px;"
          :style="{ 'width': width }"
        >
          搜索：
        </span>
        <div class="el-radio-group">
          <el-input
            v-model="keyword"
            placeholder="姓名"
            @keyup.enter.native="getData"
            size="small"
          />
          <el-button
            type="primary"
            @click.native="getData"
            size="small"
          >
            查询
          </el-button>
        </div>
      </div>
    </card>
    <div class="table">
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="fetch"
      >
        <el-table-column type="expand" label-class-name="head">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="IP：">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span>{{props.row.country}} {{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="浏览器：">
                <span v-html="uaParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="系统：">
                <span v-html="osParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="内容：">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="120px"
          label-class-name="head"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="160"
          label-class-name="head"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-date mar" />
            {{ scope.row.create_time | format('yyyy-MM-dd')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
          label-class-name="head"
        >
          <template slot-scope="scope">
            {{ scope.row.state === 0 ? '待审核' : (scope.row.state === 1 ? '通过' : '不通过') }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          label-class-name="head"
          fixed="right"
        >
          <template slot-scope="scope">
            <transition-group tag="span" name="btn">
              <el-button
                type="success"
                size="small"
                v-if="scope.row.state === 0 || scope.row.state === 2"
                @click="changeState(scope.row, 1)"
                key="1"
              >
                通过
              </el-button>
              <el-button
                type="danger"
                size="small"
                v-if="scope.row.state === 0 || scope.row.state === 1"
                @click="changeState(scope.row, 2)"
                key="2"
              >
                不通过
              </el-button>
              <el-button
                type="danger"
                size="small"
                key="3"
                @click="deleteHero(scope.row)"
                :disabled="scope.row.deleteing"
              >
                {{ scope.row.deleteing ? '删除中' : '删 除' }}
              </el-button>
            </transition-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          layout="total, prev, pager, next"
          :page-size="16"
          @current-change="pageChange"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { uaParse, osParse } from '@/utils/ua-parse'
import Card from '@/components/Card.vue'

export default {
  components: { Card },

  data () {
    return {
      width: '48px',
      type: [{
        name: '状态',
        typeName: 'state',
        list: [
          { name: '全部', id: '' },
          { name: '待审核', id: 0 },
          { name: '审核通过', id: 1 },
          { name: '审核不通过', id: 2 }
        ],
        default: ''
      }],
      state: null,
      keyword: '',
      currentPage: 1
    }
  },

  beforeCreate () {
    this.$store.dispatch('hero/getHeros', {
      current_page: 1,
      page_size: 16
    })
  },

  computed: {
    fetch () {
      return this.$store.state.hero.fetch
    },
    list () {
      return this.$store.state.hero.list
    },
    total () {
      return this.$store.state.hero.total
    }
  },

  methods: {
    uaParse (e) {
      return uaParse(e)
    },
    osParse (e) {
      return osParse(e)
    },
    // 筛选类型
    changeType (e) {
      this.state = e.id
      this.getData()
    },
    // 改变状态
    async changeState (row, code) {
      await this.$store.dispatch('hero/patchHero', {
        _id: row._id,
        state: code
      })
    },
    // 删除
    deleteHero (row) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('hero/deleteHero', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(error => console.error(error))
    },
    // 分页
    pageChange (val) {
      this.currentPage = val
      this.getData()
    },
    // 获取数据
    getData () {
      this.$store.dispatch('hero/getHeros', {
        current_page: this.currentPage,
        page_size: 16,
        keyword: this.keyword,
        state: this.state
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';

.heros {
  height: 100%;
  >.el-card {
    margin-bottom: $normal-pad;
  }
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }
  .table-expand .el-form-item:last-child {
    width: 100%;
  }
}
</style>
