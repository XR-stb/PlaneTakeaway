const app = getApp()

Page({
    data: {
       product: null,
       typeList:[],
       currentType:0,
       goodsList:[],//对应分类的商品列表
       cartList:[]//实时购物车列表
    },
    //添加到购物车
    addCart:function(event){
        let id = event.currentTarget.dataset.id
        wx.cloud.database().collection('goods')
        .where({
            _id:id
        }).get()
        .then(res =>{
            let temp = res.data[0]
            temp.counts = 1
            this.setData({
                product:temp
            })
            //异步调用，执行时机不同，写在外面的话无法先对product操作再进行赋值，注意注意！！！！
            // app.globalData.cartList.push(this.data.product) 
            // wx.setStorageSync('cartList', app.globalData.cartList)
            //购物车中存在商品，数量+1，否则添加进购物车
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
            }
            wx.showToast({
                title: '添加成功',
                duration:400
            })
        })
    },
    jump:function(event){
        let id = event.currentTarget.dataset.id
        wx.navigateTo({
          url: '../details/details?id='+id,
        })
    },
    getTypeList:function(){
        wx.cloud.database().collection('type')
        .get()
        .then(res => {
            this.setData({
                typeList: res.data
            })
        })
    },
    // 获取每一个对应分类的物品
    getTypeGoodsList:function(event){
        let id = event.currentTarget.dataset.id
        let index = event.currentTarget.dataset.index
        this.setData({
            currentType:index
        })
        wx.cloud.database().collection('goods')
        .where({
            goodType:id
        })
        .get()
        .then(res => {
            this.setData({
                goodsList: res.data
            })
            // for(let i = 0; i < this.data.goodsList.length; i++){//计算对应物品在购物车中的数量
            //     this.data.goodsList[i].counts = 0
            // }
        })
        
    },
    onLoad: function (options) {
        this.getTypeList()//获取左边分类
        this.setData({//设置当前进来的下标
            currentType:options.index
        })
        //首页跳转进来的，进行右边商品数据渲染
        let id = options.id//设置当前分类的商品的索引
        //console.log(id)
        wx.cloud.database().collection('goods')
        .where({
            goodType:id
        })
        .get()
        .then(res => {
            this.setData({
                goodsList: res.data
            })
        })
    },
    onShow: function () {   
        this.setData({
            cartList:app.globalData.cartList
        })
        //console.log('show')
    }
})