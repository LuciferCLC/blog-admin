<template>
  <div class="link">
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
            placeholder="name..."
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
    <div class="btn">
      <el-button size="small" @click="addLink" type="primary">
        增加友链
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="linkData"
        style="width: 100%"
        v-loading="fetch"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          label-class-name="head"
        />
        <el-table-column
          label="名称"
          prop="name"
          width="160"
          label-class-name="head"
          show-overflow-tooltip
        />
        <el-table-column
          label="url"
          min-width="320"
          label-class-name="head"
        >
          <template slot-scope="scope">
            {{ scope.row.url }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          label-class-name="head"
        >
          <template slot-scope="scope">
            <transition-group name="btn" tag="div">
              <el-button type="info" size="small" @click="editLink(scope.row)" key="1">
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteLink(scope.row)"
                :disabled="scope.row.deleteing"
                key="4"
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
          layout="prev, pager, next"
          :page-size="16"
          @current-change="pageChange"
          :total="total"
        />
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogV"
      size="tiny"
      width="460px"
    >
      <el-form
        :model="form"
        ref="form"
        v-if="dialogV"
        label-width="60px"
      >
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '名称', trigger: 'blur' }]"
        >
          <el-input v-model="form.name" :maxlength="20" placeholder="name" />
        </el-form-item>
        <el-form-item label="URL" class="descript">
          <el-input
            type="textarea"
            v-model="form.url"
            :maxlength="100"
            :rows="3"
            placeholder="descript"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogV = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')" :disabled="posting">
          {{ posting ? '提交中' : '确 定'}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { error } from '@/utils/response'
import Card from '@/components/Card.vue'

export default {
  components: { Card },

  data () {
    return {
      width: '48px',
      percent: 0,
      title: '增加友链',
      dialogV: false,
      form: {
        name: '',
        url: ''
      },
      type: [],
      state: null,
      keyword: '',
      currentPage: 1
    }
  },

  async created () {
    await Promise.all([
      // 标签列表
      this.$store.dispatch('link/getLinks', {
        current_page: 1,
        page_size: 16
      })
    ])
  },

  computed: {
    fetch () {
      return this.$store.state.link.fetch
    },
    posting () {
      return this.$store.state.link.posting
    },
    total () {
      return this.$store.state.link.total
    },
    linkData () {
      return this.$store.state.link.list
    }
  },

  methods: {
    // 筛选类型
    changeType (e) {
      this.state = e.id
      this.getData()
    },
    // 改变状态
    async changeState (row, code) {
      await this.$store.dispatch('link/patchLink', {
        _id: row._id,
        state: code
      })
    },
    // 添加友链
    addLink () {
      this.title = '添加友链'
      this.form = Object.assign({}, {
        name: '',
        url: ''
      })
      this.dialogV = true
    },
    // 修改友链
    editLink (row) {
      this.title = '修改友链'
      this.form = { ...row }
      this.dialogV = true
    },
    // 删除友链
    deleteLink (row) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('link/deleteLink', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(err => error(err))
    },
    // 表单提交
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let actionName
          let params
          if (this.form._id) {
            actionName = 'link/putLink'
            params = Object.assign({}, {
              _id: this.form._id,
              name: this.form.name,
              url: this.form.url
            })
          } else {
            actionName = 'link/postLink'
            params = { ...this.form }
          }
          const res = await this.$store.dispatch(actionName, params)
          if (res.code === 1) {
            this.dialogV = false
            this.getData()
          }
          return true
        } else return false
      })
    },
    // 分页
    pageChange (val) {
      this.currentPage = val
      this.getData()
    },
    // 获取数据
    async getData () {
      await this.$store.dispatch('link/getLinks', {
        current_page: this.currentPage,
        page_size: 16,
        keyword: this.keyword,
        state: this.state
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variable.scss';

.link {
  >.el-card {
    margin-bottom: $normal-pad;
  }
  >.btn {
    padding: $normal-pad $normal-pad 0;
    background: $white;
  }
}
</style>
