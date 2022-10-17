// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        hasUserInfo:false
    },
    logout(){
        wx.showModal({
          title: '提示',
          content: '你确定退出吗？',
          success: (res)=> {
            if (res.confirm) {
              this.setData({
                userInfo:{},
                hasUserInfo:false
              })
              wx.removeStorageSync('userInfo')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    toLogin(){
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/login/login'
      })
      },1000)
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let userInfoStr = wx.getStorageSync("userInfo")
    if(userInfoStr!=""){
      let userInfo = JSON.parse(userInfoStr)
      this.setData({
        userInfo,
        hasUserInfo:true
      })
    }
    },
    onTabItemTap(){
      let userInfoStr = wx.getStorageSync("userInfo")
      if(userInfoStr!=""){
        let userInfo = JSON.parse(userInfoStr)
        this.setData({
          userInfo,
          hasUserInfo:true
        })
      }
    },

    goUnhandle(){
      let userInfoStr = wx.getStorageSync("userInfo")
      if(userInfoStr!=""){
      wx.navigateTo({
        url: '/pages/repairsearch/repairsearch?active=0',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
      this.toLogin()
    }
    },
    goHandling(){
      let userInfoStr = wx.getStorageSync("userInfo")
      if(userInfoStr!=""){
        wx.navigateTo({
          url: '/pages/repairsearch/repairsearch?active=1',
        })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
      this.toLogin()
    }
     
    },
    goFinished(){
      let userInfoStr = wx.getStorageSync("userInfo")
      if(userInfoStr!=""){
        wx.navigateTo({
          url: '/pages/repairsearch/repairsearch?active=2',
        })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
      this.toLogin()
     
    }
      
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
      let userInfoStr = wx.getStorageSync("userInfo")
      if(userInfoStr!=""){
        let userInfo = JSON.parse(userInfoStr)
        this.setData({
          userInfo,
          hasUserInfo:true
        })
      }
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