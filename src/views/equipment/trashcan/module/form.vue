<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="800px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="所属机构" prop="deptId">
        <treeselect v-model="deptId" :options="depts" :style="style" placeholder="选择机构" />
      </el-form-item>
      <el-form-item label="模块识别码" prop="gpsId">
        <el-input v-model="form.gpsId" :style="style" />
      </el-form-item>
      <el-form-item label="设备编号" prop="equipmentNo">
        <el-input v-model="form.equipmentNo" :style="style" />
      </el-form-item>
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input v-model="form.equipmentName" :style="style" />
      </el-form-item>
      <el-form-item label="省/市/区" prop="addressSelectedOptions">
        <el-cascader
          :options="options"
          v-model="addressSelectedOptions"
          size="large"
          style="width: 520px;"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="街道地址" prop="addressStreet">
        <el-input v-model="form.addressStreet" :style="style" />
      </el-form-item>
      <el-form-item label="小区/房号" prop="addressRoom">
        <el-input v-model="form.addressRoom" :style="style" />
      </el-form-item>
      <el-form-item label="岗位">
        <el-select v-model="jobId" :style="style" placeholder="请先选择机构">
          <el-option
            v-for="(item, index) in jobs"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/equipmentTrashcan'
import { getDepts } from '@/api/dept'
import { getAllJob } from '@/api/job'
import Treeselect from '@riophae/vue-treeselect'
import { regionData } from 'element-china-area-data'
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
        // id: '',
        gpsId: '',
        // equipment: {
        //   gpsId: '',
        //   equipmentNo: '',
        //   equipmentName: '',
        //   dept: {
        //     id: ''
        //   }
        // },
        equipmentNo: '',
        equipmentName: '',
        addressProv: '',
        addressCity: '',
        addressRegion: '',
        addressStreet: '',
        addressRoom: '',
        dept: {
          id: ''
        }
      },
      depts: [], deptId: null,
      jobs: [], jobId: null,
      // equipmentNo: null,
      // equipmentName: null,
      style: 'width: 200px',
      rules: {
        deptId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        gpsId: [
          { required: true, message: '请输入模块识别码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        equipmentNo: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        equipmentName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        addressSelectedOptions: [
          { required: true, message: '请选择省/市/区', trigger: 'blur' }
        ],
        addressStreet: [
          { required: true, message: '请输入街道地址', trigger: 'blur' }
        ],
        addressRoom: [
          { required: true, message: '请输入小区/房号', trigger: 'blur' }
        ]
      },
      options: regionData,
      addressSelectedOptions: []
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      // this.form.equipment.gpsId = this.form.gpsId
      // this.form.equipment.equipmentNo = this.equipmentNo
      // this.form.equipment.equipmentName = this.equipmentName
      // this.form.equipment.dept.id = this.deptId
      //
      this.form.addressProv = this.addressSelectedOptions[0]
      this.form.addressCity = this.addressSelectedOptions[1]
      this.form.addressRegion = this.addressSelectedOptions[2]
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
        this.sup_this.init()
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
      this.deptId = null
      this.jobId = null
      this.addressSelectedOptions = []
      this.form = {
        // id: '',
        gpsId: '',
        // equipment: {
        //   gpsId: '',
        //   equipmentNo: '',
        //   equipmentName: '',
        //   dept: {
        //     id: ''
        //   }
        // },
        equipmentNo: '',
        equipmentName: '',
        addressProv: '',
        addressCity: '',
        addressRegion: '',
        addressStreet: '',
        addressRoom: '',
        dept: {
          id: ''
        }
      }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
      })
    },
    getJobs(id) {
      getAllJob(id).then(res => {
        this.jobs = res.content
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
