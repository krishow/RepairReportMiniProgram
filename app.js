// app.js

App({
  onLaunch() {
    wx.cloud.init({
      env:'krishow-6gw239tw9a6c0170'
    })
  },
  globalData: {
    userInfo: null
  }
})
