const baseUrl = process.env.BASE_API
const api = {
  state: {
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 修改头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // 上传文件到七牛云
    equipmentTrashcanUploadApi: baseUrl + '/api/equipment/trashcan/upload',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
