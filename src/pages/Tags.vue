<template>
  <div class="tags">
    <div class="btn">
      <el-button size="small" @click="addTag" type="primary">
        增加标签
      </el-button>
      <div class="search">
        <el-input
          v-model="keyword"
          placeholder="name..."
          @keyup.enter.native="getData"
          icon="search"
          :on-icon-click="getData"
          size="small"
        />
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tagData"
        style="width: 100%"
        v-loading="fetch"
      >
        <el-table-column
          label="名称"
          width="160"
          label-class-name="head"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <i class="iconfont icon-tag mar" />
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="320"
          label-class-name="head"
        >
          <template slot-scope="scope">
            <i class="iconfont icon-descript mar" />
            {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="文章"
          width="80"
          label-class-name="head"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
          label-class-name="head"
        >
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="editTag(scope.row)">
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteTag(scope.row)"
              :disabled="scope.row.deleteing"
            >
              {{ scope.row.deleteing ? '删除中' : '删 除' }}
            </el-button>
            <el-button type="text" class="darg" size="small">
              <i class="iconfont icon-list" />
            </el-button>
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
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogV"
      size="tiny"
      width="460px"
    >
      <el-form :model="form" ref="form" v-if="dialogV">
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '名称', trigger: 'blur' }]"
        >
          <el-input v-model="form.name" :maxlength="20" placeholder="name" />
        </el-form-item>
        <el-form-item label="描述" class="descript">
          <el-input
            type="textarea"
            v-model="form.descript"
            :maxlength="100"
            :rows="3"
            placeholder="descript"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogV = false">
          取 消
        </el-button>
        <el-button type="primary" @click="submit('form')" :disabled="posting">
          {{ posting ? '提交中' : '确 定'}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as Sortable from 'sortablejs'

import { error } from '@/utils/response'

export default {
  data () {
    return {
      title: '增加标签',
      dialogV: false,
      sortable: null,
      form: {
        name: '',
        descript: ''
      },
      keyword: '',
      currentPage: 1
    }
  },

  created () {
    this.getData()
  },

  computed: {
    fetch () {
      return this.$store.state.tag.fetch
    },
    posting () {
      return this.$store.state.tag.posting
    },
    total () {
      return this.$store.state.tag.total
    },
    tagData () {
      return this.$store.state.tag.list
    },
    list () {
      return this.tagData.map((item) => item._id)
    }
  },

  methods: {
    // 添加标签
    addTag () {
      this.title = '添加标签'
      this.form = Object.assign({}, {
        name: '',
        descript: ''
      })
      this.dialogV = true
    },
    // 修改标签
    editTag (row) {
      this.title = '修改标签'
      this.form = { ...row }
      this.dialogV = true
    },
    // 删除标签
    deleteTag (row) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('tag/deleteTag', { _id: row._id })
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
            actionName = 'tag/putTag'
            params = Object.assign({}, {
              _id: this.form._id,
              name: this.form.name,
              descript: this.form.descript
            })
          } else {
            actionName = 'tag/postTag'
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
      const res = await this.$store.dispatch('tag/getTags', {
        current_page: this.currentPage,
        page_size: 16,
        keyword: this.keyword
      })
      if (res.code === 1) {
        this.$nextTick(() => {
          this.setSort()
        })
      }
    },
    // 标签排序
    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        animation: 150,
        // handle: '.drag-handler',
        onEnd: (evt) => {
          const tempIndex = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, tempIndex)
          this.$store.dispatch('tag/patchTag', {
            ids: this.list
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variable.scss';

.tags {
  >.btn {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1rem 0;
    background: $white;
    >.search {
      display: flex;
    }
  }
  .darg {
    cursor: move;
    i {
      font-size: .8rem;
    }
  }
}
</style>
