<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-cascader
      :options="options"
      v-model="query.addressSelectedOptions"
      size="large"
      class="filter-item"
      @change="handleChange"
    />
    <el-date-picker
      v-model="query.dt"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="filter-item"
      clearable
      size="small"
      type="daterange"
      align="right"
      value-format="yyyy/MM/dd"
      unlink-panels />
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <!--<div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','PERFORMANCEDATATRASHCAN_ALL','PERFORMANCEDATATRASHCAN_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>-->
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
import { regionData } from 'element-china-area-data'
import eForm from './form'
export default {
  components: { eForm },
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
        { key: 'gpsId', display_name: 'gps编号' },
        // { key: 'dateTime', display_name: '日期时间' },
        // { key: 'wtnG', display_name: '当前采样重量' },
        // { key: 'wtdG', display_name: '垃圾倾倒重量' },
        { key: 'status', display_name: '状态' }
      ],
      options: regionData,
      addressSelectedOptions: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
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
        const tHeader = ['模块识别码', '日期', '设备编号', '设备名', '当前采样重量', '垃圾倾倒重量', '状态', '错误信息']
        const filterVal = ['gpsId', 'dateTime', 'equipmentNo', 'equipmentName', 'wtnG', 'wtdG', 'status', 'errInfo']
        const data = this.formatJson(filterVal, this.sup_this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '垃圾桶历史工况-(' + parseTime(new Date()) + ')'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'dateTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
