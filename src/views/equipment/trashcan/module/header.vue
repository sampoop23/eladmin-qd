<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <!--<el-select v-model="query.equipmentType" clearable placeholder="设备类型" class="filter-item" style="width: 90px" @change="toQuery">
      <el-option v-for="item in equipmentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>-->
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','EQUIPMENT_TRASHCAN_ALL','EQUIPMENT_TRASHCAN_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add">新增</el-button>
      <eForm ref="form" :sup_this="sup_this" :is-add="true" :dicts="dicts"/>
    </div>
    <!-- 上传 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-upload"
        @click="$refs.formUpload.dialog = true">上传文件</el-button>
      <eFormUpload ref="formUpload"/>
    </div>
    <!-- 导出 -->
    <div style="display: inline-block;">
      <el-button
        v-permission="['ADMIN']"
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="download">导出</el-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import eForm from './form'
import eFormUpload from './formUpload'
export default {
  components: { eForm, eFormUpload },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'gpsId', display_name: '模块识别码' },
        { key: 'equipmentNo', display_name: '设备编号' },
        { key: 'equipmentName', display_name: '设备名称' }
      ]
      // equipmentTypeOptions: [
      //   { key: '1', display_name: '汽车' },
      //   { key: '2', display_name: '飞机' },
      //   { key: '3', display_name: '轮船' }
      // ]
    }
  },
  methods: {
    add() {
      this.$refs.form.getDepts()
      this.$refs.form.dialog = true
    },
    toQuery() {
      // this.$parent.page = 0
      // this.$parent.init()
      this.sup_this.page = 0
      this.sup_this.init()
    },
    // 导出
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '模块识别码', '设备编号', '设备名', '垃圾桶类型', '垃圾类型', '注册日期']
        const filterVal = ['id', 'gpsId', 'equipmentNo', 'equipmentName', 'trashcanType', 'garbageType', 'createTime']
        const data = this.formatJson(filterVal, this.sup_this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '垃圾桶设备-(' + parseTime(new Date()) + ')'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
