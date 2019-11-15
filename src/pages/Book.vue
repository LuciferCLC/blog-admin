<template>
  <div class="book">
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
      <el-button size="small" @click="addBook" type="primary">
        增加书本
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="bookData"
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
          prop="state"
          label="状态"
          width="80"
          label-class-name="head"
        >
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? '待售' : '已售' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280"
          label-class-name="head"
        >
          <template slot-scope="scope">
            <transition-group name="btn" tag="div">
              <el-button type="info" size="small" @click="editBook(scope.row)" key="1">
                修改
              </el-button>
              <el-button
                type="info"
                size="small"
                @click="changeState(scope.row, 1)"
                v-if="scope.row.state === 2"
                key="2"
              >
                标记待售
              </el-button>
              <el-button
                type="info"
                size="small"
                v-else
                @click="changeState(scope.row, 2)"
                key="3"
              >
                标记已售
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteBook(scope.row)"
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
        <el-form-item label="描述" class="descript">
          <el-input
            type="textarea"
            v-model="form.descript"
            :maxlength="100"
            :rows="3"
            placeholder="descript"
          />
        </el-form-item>
        <el-form-item
          label="缩略图"
          class="img-item"
          prop="thumb"
          :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]"
        >
          <el-upload
            class="avatar-uploader"
            action="https://up.qbox.me/"
            :data="qn"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :on-progress="handlePro"
            :on-error="handleError"
          >
            <img v-if="form.thumb" :src="form.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <el-input v-model="form.thumb" size="small" class="link" />
          <el-progress :percentage="percent" v-if="percent !== 0 && percent !== 100" />
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
      qn: {
        token: '',
        key: ''
      },
      percent: 0,
      title: '增加书本',
      dialogV: false,
      form: {
        name: '',
        descript: '',
        thumb: ''
      },
      type: [{
        name: '状态',
        typeName: 'state',
        list: [
          { name: '全部', id: '' },
          { name: '待售', id: 1 },
          { name: '已售', id: 2 }
        ],
        default: ''
      }],
      state: null,
      keyword: '',
      currentPage: 1
    }
  },

  async created () {
    await Promise.all([
      // 标签列表
      this.$store.dispatch('book/getBooks', {
        current_page: 1,
        page_size: 16
      }),
      this.$store.dispatch('getQiniu')
    ])
    this.qn.token = this.$store.state.QNtoken
  },

  computed: {
    fetch () {
      return this.$store.state.book.fetch
    },
    posting () {
      return this.$store.state.book.posting
    },
    total () {
      return this.$store.state.book.total
    },
    bookData () {
      return this.$store.state.book.list
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
      await this.$store.dispatch('book/patchBook', {
        _id: row._id,
        state: code
      })
    },
    // 上传成功
    handleSuccess () {
      this.form.thumb = 'https://static.nolan.cc/' + this.qn.key
    },
    // 进度条
    handlePro (e) {
      this.percent = Math.ceil(e.percent)
    },
    // 出错
    handleError (res) {
      error(res.message)
    },
    // 上传之前检测
    beforeUpload (file) {
      this.qn.key = file.name
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },
    // 添加书本
    addBook () {
      this.title = '添加书本'
      this.form = Object.assign({}, {
        name: '',
        descript: '',
        thumb: ''
      })
      this.dialogV = true
    },
    // 修改书本
    editBook (row) {
      this.title = '修改书本'
      this.form = { ...row }
      this.dialogV = true
    },
    // 删除书本
    deleteBook (row) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('book/deleteBook', { _id: row._id })
        if (res.code === 1) this.getData()
      }).catch(error => console.error(error))
    },
    // 表单提交
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let actionName
          let params
          if (this.form._id) {
            actionName = 'book/putBook'
            params = Object.assign({}, {
              _id: this.form._id,
              name: this.form.name,
              descript: this.form.descript,
              thumb: this.form.thumb
            })
          } else {
            actionName = 'book/postBook'
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
      await this.$store.dispatch('book/getBooks', {
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

.book {
  >.el-card {
    margin-bottom: $normal-pad;
  }
  >.btn {
    padding: $normal-pad $normal-pad 0;
    background: $white;
  }
}
</style>
