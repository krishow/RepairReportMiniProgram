// pages/repairsearch/repairsearch.js
const db= wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        option1: [
          { text: '全部',value:0},
            { text: '外墙漏水', value: 1 },
            { text: '建筑设施与道路维护', value: 2 },
            { text: '水电设施与电梯维护', value: 3 },
            { text: '卫生问题与绿化养护', value: 4 },
            { text: '公共收益与露天停车场', value: 5 },
            { text: '门禁监控与消防安全', value: 6 },
            { text: '其他', value: 7 },
          ],    
          type0: 0,
          type1: 0,
          type2: 0,
          unHandled:[],
          handling:[],
          finished:[],
          openid:'',
          show:false,
        comment:'',
        comment_id:''
    },

    previewImg(e){
      console.log(e);
      let dataList = e.currentTarget.dataset.dataList
      let index = e.currentTarget.dataset.index

      let i = e.currentTarget.dataset.i
      let cloudPath = dataList[i].cloudPath
      // console.log(cloudPath);
      let urlList = []
      cloudPath.forEach(ele=>{
          urlList.push(ele.fileID)
      })
      // console.log(urlList);
      wx.previewImage({
          current: urlList[index], // 当前显示图片的 http 链接
          urls: urlList // 需要预览的图片 http 链接列表
        })
  },
  showPopup(e) {
    this.setData({
        comment:'',
        show: true,
        comment_id:e.currentTarget.dataset.index
    });
  },
  submitComment(){
    let userInfo = JSON.parse(wx.getStorageSync("userInfo"))
      db.collection('repairInfo').where({_id:this.data.comment_id}).update({
          data:{
              comment:db.command.push({
                  avatar:userInfo.avatarUrl,
                  nickName:userInfo.nickName,
                 commentInfo: this.data.comment
              })
          },
          success:(res)=>{
              console.log(res);
              this.setData({
                show:false
            })
          this.onLoad()
          }
      })

     
  },

  onClose() {
    this.setData({ show: false });
  },


    changeType0({ detail }){
      this.setData({ type0: detail });
      if(detail>0){
        this.getunHandledData(detail)
      }else{
        this.onLoad()
      }
    },
    changeType1({ detail }){
      this.setData({ type1: detail });
      if(detail>0){
        this.getHandlingData(detail)
      }else{
        this.onLoad()
      }
    },
    changeType2({ detail }){
      this.setData({ type2: detail });
      if(detail>0){
        this.getFinishedData(detail)
      }else{
        this.onLoad()
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      //获取用户openid作为查询条件
    wx.cloud.callFunction({
      name: "logins",
      complete: (res) => {
        wx.setStorageSync('openid', res.result.openid)
      },
    });
    this.getunHandledData(),
    this.getHandlingData(),
    this.getFinishedData()
    },

    getunHandledData(type){
        //未处理的
      db.collection('repairInfo').orderBy('time','desc').where({_openid:wx.getStorageSync('openid'),type,HandleState:0}).get().then(res=>{
        // console.log(res);
        this.setData({
          unHandled:res.data
        })
    })
    },
    getHandlingData(type){
      //处理中的
    db.collection('repairInfo').orderBy('time','desc').where({_openid:wx.getStorageSync('openid'),type,HandleState:1}).get().then(res=>{
      // console.log(res);
      this.setData({
        handling:res.data
      })
  })
    },
    getFinishedData(type){
        //已完成的
  db.collection('repairInfo').orderBy('time','desc').where({_openid:wx.getStorageSync('openid'),type,HandleState:2}).get().then(res=>{
    // console.log(res);
    this.setData({
      finished:res.data
    })
})
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