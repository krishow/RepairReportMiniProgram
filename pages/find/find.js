// pages/find/find.js
const db= wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        notice:[],
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
        type: 0,
        show:false,
        comment:'',
        comment_id:''
    },


    previewImg(e){
        // console.log(e);
        let index = e.currentTarget.dataset.index
        let i = e.currentTarget.dataset.i
        let cloudPath = this.data.notice[i].cloudPath
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        db.collection('repairInfo').orderBy('time','desc').where({isPublic:true}).get().then(res=>{
            // console.log(res);
            this.setData({
                notice:res.data
            })
        })
    },
    onSearch() {
        let value = this.data.searchValue;
        db.collection("repairInfo").orderBy('time','desc').where({
            content :{
                $regex:'.*' + value +'.*',
                $options:'i'
            }
            }).get().then(res=>{
                // console.log(res);
                this.setData({
                    notice:res.data
                })
            })
      },
      changeType({ detail }){
        this.setData({ type: detail });
        if(detail>0){
            db.collection('repairInfo').orderBy('time','desc').where({isPublic:true,type:detail}).get().then(res=>{
                // console.log(res);
                this.setData({
                    notice:res.data
                })
            })
        }else{
          this.onLoad()
        }
      },
      showPopup(e) {
        if(wx.getStorageSync('userInfo')!=""){
            this.setData({
                comment:'',
                show: true,
                comment_id:e.currentTarget.dataset.index
            });
          }else{
            // this.getUserProfile()
            wx.showToast({
              title: "请先登录",
              icon: "none",
            });
          }
        
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.onLoad()
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