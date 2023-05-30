
const app = getApp()

Page({
    data: {
        cartList:[],
        navbar: ['全部订单', '待评价', '退款'],
        currentTab: 0,
        num:1,
        minusStatus:'disable',
        total:0//订单总价
    },
    calcPrice:function(){
        let list = this.data.cartList
        let sum = 0
        for(let i = 0; i < list.length; i++){
            if(list[i].selectStatus){
                sum += list[i].price * list[i].counts
            }
        }
        this.setData({
            total:sum.toFixed(2)//保留两位小数
        })
    },
    //对应商品数量 + 1
    addOne:function(event){
        let id = event.currentTarget.dataset.id
        let cart =  wx.getStorageSync('cartList')
        let isExist = app.exist(id, cart)
        if(isExist.index == -1){//购物车中不存在该商品的情况，因为这里是在订单页面了，所以商品一定存在
        }else{
            //这里要修改到全局的数据，否则数量不会增加
            app.globalData.cartList[isExist.index].counts += 1
            this.setData({//同时更新当前文件内的购物车数组，保证数据最新，便于计算总价格和显示数据
                cartList:app.globalData.cartList
            })
        }
        this.calcPrice()
    },
    //对应商品数量 - 1
    subOne:function(event){
        let id = event.currentTarget.dataset.id
        let cart =  wx.getStorageSync('cartList')
        let isExist = app.exist(id, cart)
        if(isExist.index == -1){//购物车中不存在该商品的情况，因为这里是在订单页面了，所以商品一定存在
        }else{
            if(app.globalData.cartList[isExist.index].counts > 1){
                //这里要修改到全局的数据，否则数量不会增加
                app.globalData.cartList[isExist.index].counts -= 1
                this.setData({//同时更新当前文件内的购物车数组，保证数据最新
                    cartList:app.globalData.cartList
                })
            }else{
                wx.showToast({
                    title: '最少购买一件哦!小主qwq',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
        this.calcPrice()
    },
    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },
    onLoad(options) {
        this.calcPrice()
    },
    onShow() {
        //console.log(app.globalData.cartList)
        this.setData({
            cartList:app.globalData.cartList
        })
        this.calcPrice()
    },
})