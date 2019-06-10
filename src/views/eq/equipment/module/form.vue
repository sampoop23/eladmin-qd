<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="570px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="gps号" >
        <el-input v-model="form.gpsId" />
      </el-form-item>
      <el-form-item label="设备号" >
        <el-input v-model="form.equipmentNo" />
      </el-form-item>
      <el-form-item label="设备名" >
        <el-input v-model="form.equipmentName" />
      </el-form-item>
      <!--<el-form-item label="设备类型" >
        <el-input v-model="form.equipmentType" style="width: 370px;"/>
      </el-form-item>-->
      <el-form-item label="机构">
        <treeselect v-model="deptId" :options="depts" :style="style" placeholder="选择机构" />
      </el-form-item>
      <!--<el-form-item label="deptId" >
        <el-input v-model="form.deptId" style="width: 370px;"/>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/equipment'
import { getDepts } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
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
        equipmentNo: '',
        equipmentName: '',
        equipmentType: '',
        enabled: '',
        createTime: '',
        dept: { id: '' }
      },
      depts: [], deptId: null,
      style: 'width: 184px',
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.form.dept.id = this.deptId
      //
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.deptId === null || this.deptId === undefined) {
            this.$message({
              message: '机构不能为空',
              type: 'warning'
            })
          } else {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          }
        } else {
          return false
        }
      })
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
        equipmentNo: '',
        equipmentName: '',
        equipmentType: '',
        enabled: '',
        createTime: '',
        deptId: ''
      }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
      })
    }
  }
}
</script>

<style scoped>

</style>
