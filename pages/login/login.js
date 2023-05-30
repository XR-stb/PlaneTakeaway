
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    data: {
        usuallyList: [],
        serviceList: [],
        avatarUrl: defaultAvatarUrl
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail 
        this.setData({
          avatarUrl,
        })
    },
    jumpTo:function(e){
        var pgurl = e.currentTarget.dataset.pgurl;
        wx.navigateTo({
            url: pgurl//页面路径
        });
    },

    getUsually:function(){
        let that = this;
        wx.request({
          url: 'http://101.34.212.195:9998/shareFile/wxSrc/json/usually.json',
          success(res){ 
                //console.log(res.data);
                that.setData({
                    usuallyList:res.data
                })
          }
        })
    },

    getService:function(){
        let that = this;
        wx.request({
          url: 'http://101.34.212.195:9998/shareFile/wxSrc/json/service.json',
          success(res){
                that.setData({
                    serviceList: res.data
                })
          }
        })
    },
    onLoad: function (options) {
        this.getService();
        this.getUsually();
    },
})