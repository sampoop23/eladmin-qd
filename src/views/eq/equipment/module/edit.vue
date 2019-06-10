<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :dicts="dicts"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
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
  methods: {
    to() {
      const _this = this.$refs.form
      _this.getDepts()
      _this.form = {
        id: this.data.id,
        gpsId: this.data.gpsId,
        equipmentNo: this.data.equipmentNo,
        equipmentName: this.data.equipmentName,
        equipmentType: this.data.equipmentType,
        enabled: this.data.enabled,
        createTime: this.data.createTime,
        dept: { id: this.data.dept.id }
      }
      _this.deptId = this.data.dept.id
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
