<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model="deptName" clearable placeholder="输入机构名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas"/>
        </div>
        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>
      </el-col>
      <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="20">
        <eHeader :query="query" :sup_this="sup_this" :dicts="dicts"/>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
          <el-table-column label="所属机构">
            <template slot-scope="scope">
              <div>{{ scope.row.dept.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="gpsId" label="模块识别码"/>
          <el-table-column prop="dateTime" label="日期时间">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.dateTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wtnG" label="当前采样重量"/>
          <el-table-column prop="wtdG" label="垃圾倾倒重量"/>
          <el-table-column prop="status" label="状态"/>
          <el-table-column prop="errInfo" label="错误信息"/>
          <el-table-column label="省">
            <template slot-scope="scope">
              <div>{{ CodeToText[scope.row.addressProv] }}</div>
            </template>
          </el-table-column>
          <el-table-column label="市">
            <template slot-scope="scope">
              <div>{{ CodeToText[scope.row.addressCity] }}</div>
            </template>
          </el-table-column>
          <el-table-column label="区">
            <template slot-scope="scope">
              <div>{{ CodeToText[scope.row.addressRegion] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="addressStreet" label="街道"/>
          <el-table-column prop="addressRoom" label="门牌"/>
          <el-table-column prop="trashcanType" label="垃圾桶类型"/>
          <el-table-column prop="garbageType" label="垃圾类型"/>
          <!--<el-table-column v-if="checkPermission(['ADMIN','PERFORMANCEDATATRASHCAN_ALL','PERFORMANCEDATATRASHCAN_EDIT','PERFORMANCEDATATRASHCAN_DELETE'])" label="操作" width="150px" align="center">
            <template slot-scope="scope">
              <edit v-permission="['ADMIN','PERFORMANCEDATATRASHCAN_ALL','PERFORMANCEDATATRASHCAN_EDIT']" :data="scope.row" :sup_this="sup_this"/>
              <el-popover
                v-permission="['ADMIN','PERFORMANCEDATATRASHCAN_ALL','PERFORMANCEDATATRASHCAN_DELETE']"
                :ref="scope.row.id"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
              </el-popover>
            </template>
          </el-table-column>-->
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { CodeToText } from 'element-china-area-data'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/performanceHisDataTrashcan'
import { getDepts } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData, initDict],
  data() {
    return {
      delLoading: false, sup_this: this,
      deptName: '',
      depts: [],
      deptId: null,
      CodeToText: CodeToText,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/performanceHisDataTrashcan'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort, deptId: this.deptId }
      const query = this.query
      const type = query.type
      const value = query.value
      const dt = query.dt
      const addressSelectedOptions = query.addressSelectedOptions
      if (type && value) { this.params[type] = value }
      if (dt) {
        this.params['dateTimeSt'] = dt[0] + ' 00:00:00'
        this.params['dateTimeEd'] = dt[1] + ' 23:59:59'
      }
      if (addressSelectedOptions) {
        this.params['addressProv'] = addressSelectedOptions[0]
        this.params['addressCity'] = addressSelectedOptions[1]
        this.params['addressRegion'] = addressSelectedOptions[2]
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (this.deptName) { params['name'] = this.deptName }
      getDepts(params).then(res => {
        this.depts = res.content
      })
    },
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.deptId = null
      } else {
        this.deptId = data.id
      }
      this.init()
    }
  }
}
</script>

<style scoped>

</style>
