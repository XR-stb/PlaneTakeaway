
const app = getApp()
Page({
    data: {
      cartList:[],//用来记录购物车的长度
      product: null,
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      pjDataList: [{
          headpic: '/images/good.jpg',
          author: '黄*敏',
          add_time: '2018-06-04',
          content: '好评好评，真实太好了!'
        },
        {
          headpic: '/images/good.jpg',
          author: '张*江',
          add_time: '2022-06-01',
          content: '不错哟这个味道，下次还来！'
        },
        {
            headpic: '/images/good.jpg',
            author: '王*立',
            add_time: '2022-06-11',
            content: '刚下单不一会儿就到了，真不错！'
          }
      ], //评价数据
    },
    getProduct:function(){
        wx.cloud.database().collection('goods').get()
        .then(res => {
            this.setData({
                productList: res.data
            })
        })
    },
    //添加到购物车
    addCart:function(event){
        let id = event.currentTarget.dataset.id
        let cart =  wx.getStorageSync('cartList')
        let isExist = app.exist(id, cart)
        if(isExist.index == -1){//购物车中不存在该商品的情况
            this.data.product.counts = 1
            this.data.product.selectStatus = true
            // 加入全局的购物车中
            app.globalData.cartList.push(this.data.product)
            //放到缓存，保存购物车数据
            wx.setStorageSync('cartList', app.globalData.cartList)
        }else{
            //这里要修改到全局的数据，否则数量不会增加
            app.globalData.cartList[isExist.index].counts += 1
            app.globalData.cartList[isExist.index].selectStatus = true
            //下面这样也是可以的，不过不知道为什么在shop界面那里不行，估计还是生命周期的问题，回头再研究了，先放着
            // this.data.product.counts += 1
            // this.data.product.selectStatus = true
        }
        this.setData({
            cartList:app.globalData.cartList
        })
        wx.showToast({
          title: '添加成功',
          duration:400
        })
    },
    buy:function(){
        wx.showToast({
          title: '支付功能未开通',
          icon:'none'
        })
    },
    jumpToCart:function(){
        //console.log('hello')
        wx.reLaunch({
          url: '../cart/cart',
        })
    },
    onLoad: function (options) {
        this.getProduct();
        wx.cloud.database().collection('goods').doc(options.id).get()
        .then(res =>{
            this.setData({
                goods_info:{
                    goods_title:res.data.good_name,
                    goods_price:res.data.price
                },
                product:res.data
            })
        })
        this.setData({
            cartList:app.globalData.cartList
        })
    },
    onShow: function () {

    }
  })
  