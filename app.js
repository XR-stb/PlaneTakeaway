//#F98F2E 主题色橙色
//#00a480 主题色绿色

App({
    onLaunch(){
        wx.cloud.init({
            env:'cloud1-4gjroihg1408529a',
            traceUser: true
        })
        //如果缓存里面有购物车数据，则从缓存获取
        if(wx.getStorageSync('cartList')){
            this.globalData.cartList =  wx.getStorageSync('cartList')
        }
        
    },
    //下面两个page监听都是为了退出小程序的时候保存缓存数据，保证购物车内商品的数量不会变成1
    onHide: function(){
        wx.setStorageSync('cartList', this.globalData.cartList)
    }, //监听页面隐藏
    onUnload: function(){
        wx.setStorageSync('cartList', this.globalData.cartList)
    }, //监听页面卸载
    globalData: {
      userInfo: null,
      //购物车列表
      cartList:[]
    },
    //判断某个商品是否已经添加到购物车中，返回该商品在缓存数据中的下标index和该商品的信息
    //id 为商品在数据库中id，arr为缓存中的购物车数据
    exist:function(id,arr){    
        var result = {index: -1, data: ''};
        for(let i = 0; i < arr.length; i++){
            if(arr[i]._id == id){
                result = {
                    index: i,
                    data: arr[i]
                }
                break;
            }
        }
        return result;
    }
  })