const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    isPublic: false,
    option1: [
      { text: "外墙漏水", value: 1 },
      { text: "建筑设施与道路维护", value: 2 },
      { text: "水电设施与电梯维护", value: 3 },
      { text: "卫生问题与绿化养护", value: 4 },
      { text: "公共收益与露天停车场", value: 5 },
      { text: "门禁监控与消防安全", value: 6 },
      { text: "其他", value: 7 },
    ],
    type: 1,
    fileList: [],
    nickName: "",
    tel: "",
    state:'',
    building:'',
    cell:'',
    number:'',
    openid: "",
    cloudPath: [],
    content:''
  },
  // 图片文件读取后的事件方法
   afterRead(e) {
    let { file } = e.detail; //获取file，等价于下面的这句话
    //let file = e.detail.file
    //将数据push到fileList中
    let { fileList } = this.data;
    fileList.push({
      url: file.url,
    });
    this.setData({
      fileList,
    });
  },
  // 提交
  // 上传图片
 uploadToCloud() {
    // wx.cloud.init();
    wx.cloud.init({
      env:'krishow-6gw239tw9a6c0170'
    });
    const { fileList } = this.data;
    if (!fileList.length) {
      wx.showToast({
        title: "请选择图片",
        icon: "none",
      });
    } else {
      // console.log(fileList);
      const uploadTasks = fileList.map((file, index) =>
        this.uploadFilePromise(
          `${this.data.openid}/${+new Date()}/my-photo${index}.png`,
          file
        )
      );
      Promise.all(uploadTasks)
        .then((data) => {
          wx.showToast({
            title: "上传成功",
            icon: "none",
          });
          console.log(data);
          this.setData({
            cloudPath: data,
          }); 
          // 图片上传成功，将用户的维修记录保存到数据库
          // 处理楼栋号
          let floor = this.data.state+'期'
          +this.data.building+'栋'
          +this.data.cell+'单元'
          +this.data.number+'号';

          let avatar = JSON.parse(wx.getStorageSync('userInfo')).avatarUrl

          if(this.validate()){
            const db = wx.cloud.database(); //获取云端数据库
          db.collection("repairInfo")
            .add({
              data: {
                nickName: this.data.nickName,
                avatar:avatar,
                tel: this.data.tel,
                floor:floor,
                isPublic:this.data.isPublic,
                type:this.data.type,
                content:this.data.content,
                cloudPath: this.data.cloudPath,
                time:util.formatTime(new Date()),
                HandleState:0,//未处理
              },
            })
            .then((res) => {
              console.log(res);
              wx.navigateBack()
            });
          }else{
            wx.showToast({
              title: "请输入完整信息",
              icon: "none",
            });
          }
          

          }).catch((e) => {
            wx.showToast({
              title: "上传失败",
              icon: "none",
            });
            console.log(e);
          });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  onChange() {
    this.setData({ isPublic: !this.data.isPublic });    
  },
  changeType({ detail }){
    this.setData({ type: detail });
  },

  saveText(){
    wx.setStorageSync('repairInfo', {
      'nickName':this.data.nickName,
      'tel':this.data.tel,
      'state':this.data.state,
      'building':this.data.building,
      'cell':this.data.cell,
      'number':this.data.number,
      'isPublic':this.data.isPublic,
      'type':this.data.type,
      'cloudPath':this.data.cloudPath,
      'fileList':this.data.fileList,
      'content':this.data.content
    })
    wx.showToast({
      title: "保存草稿成功",
      icon: "none",
    });
  },
  deleteSave(){
    wx.removeStorageSync('repairInfo')
    wx.showToast({
      title: "删除草稿成功",
      icon: "none",
    });
    this.onLoad()
  },
  validate(){
    return Boolean(this.data.nickName&&this.data.tel&&this.data.state&&this.data.building&&this.data.cell&&this.data.number&&this.data.content)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取用户openid作为图片上传到云存储的文件夹名
    wx.cloud.callFunction({
      name: "logins",
      complete: (res) => {
        // console.log(res);
        this.setData({
          openid: res.result.openid,
        });
        wx.setStorageSync('openid', res.result.openid)
      },
    });

    let info = wx.getStorageSync('repairInfo')
    if(info){
      this.setData({
        nickName:info.nickName,
        tel:info.tel,
        state:info.state,
        building:info.building,
        cell:info.cell,
        number:info.number,
        isPublic:info.isPublic,
        type:info.type,
        fileList:info.fileList,
        content:info.content
      })
    }
    else{
      this.setData({
        nickName:"",
        tel:"",
        state:"",
        building:"",
        cell:"",
        number:"",
        isPublic:false,
        type:1,
        fileList:[],
        content:""
      })
    }
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

 /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onShareTimeline(){
      
    }

});
