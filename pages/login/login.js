// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      checked: false,
    },
    onChange(event) {
      this.setData({
        checked: event.detail,
      });
    },
    login(){
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              // console.log(res)
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
              wx.switchTab({
                url: '/pages/user/user',
              })
              
            }
          })
    },
    back(){
        wx.navigateBack()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onShareTimeline(){
      
    }

})