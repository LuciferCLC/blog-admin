<template>
  <div class="comments">
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
            placeholder="name, content, email..."
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
                <span>{{props.row.country}}/{{ props.row.city }}</span>
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
          label="文章id"
          label-class-name="head"
          show-overflow-tooltip
          width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.post_id }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          label-class-name="head"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.author.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          label-class-name="head"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.author.email }}
          </template>
        </el-table-column>
        <el-table-column
          label="site"
          label-class-name="head"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.author.site || '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="200"
          label-class-name="head"
        >
          <template slot-scope="scope">
            {{ scope.row.create_at | format('yyyy-MM-dd hh.mm.ss')}}
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
          width="240"
          label-class-name="head"
          fixed="right"
        >
          <template slot-scope="scope">
            <transition-group tag="span" name="btn">
              <el-button
                type="info"
                size="small"
                @click="editComment(scope.row)"
                key="-1"
              >
                修改
              </el-button>
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
                @click="deleteComment(scope.row)"
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
          :page-size="20"
          @current-change="pageChange"
          :total="total"
        />
      </div>
      <el-dialog
        title="修改评论"
        :visible.sync="dialogV"
        size="tiny"
        width="460px"
      >
        <el-form :model="form" ref="form" v-if="dialogV">
          <el-form-item label="名字">
            <el-input v-model="form.name" :maxlength="20" placeholder="name" />
          </el-form-item>
          <el-form-item label="内容" class="descript">
            <el-input
              type="textarea"
              v-model="form.content"
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
          { name: '审核通过', id: 1 },
          { name: '审核不通过', id: 2 }
        ],
        default: ''
      }],
      state: null,
      keyword: '',
      currentPage: 1,
      dialogV: false,
      form: {
        author: {
          name: ''
        },
        name: '',
        content: ''
      }
    }
  },

  beforeCreate () {
    this.$store.dispatch('comment/getComments', {
      current_page: 1,
      page_size: 16
    })
  },

  computed: {
    fetch () {
      return this.$store.state.comment.fetch
    },
    list () {
      return this.$store.state.comment.list
    },
    total () {
      return this.$store.state.comment.total
    },
    posting () {
      return this.$store.state.comment.posting
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
      await this.$store.dispatch('comment/putComment', {
        ...row,
        state: code,
        post_ids: row.post_id
      })
    },
    // 删除
    deleteComment (row) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$store.dispatch('comment/deleteComment', {
          _id: row._id,
          post_ids: row.post_id
        })
        if (res.code === 1) this.getData()
      }).catch(error => console.error(error))
    },
    // 修改
    editComment (row) {
      this.dialogV = true
      this.form = {
        ...row,
        name: row.author && row.author.name
      }
    },
    // 表单提交
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form.author.name = this.form.name
          delete this.form.name
          const res = await this.$store.dispatch('comment/putComment', {
            ...this.form,
            post_ids: this.form.post_id,
            author: JSON.stringify(this.form.author)
          })
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
    getData () {
      this.$store.dispatch('comment/getComments', {
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

.comments {
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
