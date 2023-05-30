Page({
    data: {
        navList: [],
        productList: [],
        swiperList: [],
        msgList:[]
    },
    toSearch:function(event){
        console.log(event)
        wx.navigateTo({
            url: '../search/search'
        })
    },
    jump:function(event){
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
          url: '../details/details?id='+id,
        })
    },
    jumpType:function(event){
        let index = event.currentTarget.dataset.index
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
          url: `../shop/shop?index=${index}&id=${id}`,
        })
    },
    getNavList:function(){
        wx.cloud.database().collection('type').get()
        .then(res => {
            //console.log(res)
            this.setData({
                navList: res.data
            })
        })
        // let that = this;
        // wx.request({
        //   url: 'http://101.34.212.195:9998/shareFile/wxSrc/json/menu.json',
        //   success(res){
        //         //console.log(res.data);
        //         that.setData({
        //             navList:res.data
        //         })
        //   }
        // })
    },
    getProductList:function(){
        wx.cloud.database().collection('goods')
        .get()
        .then(res => {
            //console.log(res)
            this.setData({
                productList: res.data
            })
        })
        // let that = this;
        // wx.request({
        //   url: 'http://101.34.212.195:9998/shareFile/wxSrc/json/product.json',
        //   success(res){
        //         //console.log(res.data);
        //         that.setData({
        //             productList: res.data
        //         })
        //   }
        // })
    },
    getSwiperList:function(){
        wx.cloud.database().collection('good_swp').get()
        .then(res => {
            //console.log(res)
            this.setData({
                swiperList: res.data
            })
        })
        // let that = this;
        // wx.request({
        //   url: 'http://101.34.212.195:9998/shareFile/wxSrc/json/swiper.json',
        //   success(res){
        //         //console.log(res.data);
        //         that.setData({
        //             swiperList: res.data
        //         })
        //   }
        // })
    },
    messageDetails(e){
        wx.navigateTo({
          url: '/pages/setting/protocol/splAgreement/index'     
          })
   
    },
    
    onLoad: function (options) {
        this.setData({
            msgList: [
              { url: "url", title: "黄*敏在两分钟前购买了蛋炒饭并给出好评" },
              { url: "url", title: "王*立刚刚购买了两个大西瓜" },
              { url: "url", title: "恭喜用户：187***抽中了一折优惠券" }]
          });
        this.getNavList();
        this.getProductList();
        this.getSwiperList();
    }
})