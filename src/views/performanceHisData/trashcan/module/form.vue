<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="gps编号" >
        <el-input v-model="form.gpsId" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="日期时间" >
        <el-input v-model="form.dateTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="当前采样重量" >
        <el-input v-model="form.wtnG" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="垃圾倾倒重量" >
        <el-input v-model="form.wtdG" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="form.status" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="错误信息" >
        <el-input v-model="form.errInfo" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/performanceHisDataTrashcan'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        gpsId: '',
        dateTime: '',
        wtnG: '',
        wtdG: '',
        status: '',
        errInfo: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        gpsId: '',
        dateTime: '',
        wtnG: '',
        wtdG: '',
        status: '',
        errInfo: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
