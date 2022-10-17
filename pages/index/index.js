// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  // 事件处理函数
  handleReport() {
    if(wx.getStorageSync('userInfo')!=""){
      wx.navigateTo({
      url: '../repair/repair'
    })
    }else{
      // this.getUserProfile()
      wx.showToast({
        title: "请先登录",
        icon: "none",
      });
    }
    
  },
  handleSearch() {
    if(wx.getStorageSync('userInfo')!=""){
      wx.navigateTo({
        url: '../repairsearch/repairsearch'
      })
    }else{
      // this.getUserProfile()
      wx.showToast({
        title: "请先登录",
        icon: "none",
      });
    }
  },
  onLoad() {
    
  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
  //     }
  //   })
  // },

   /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onShareTimeline(){
      
    }

  
})
