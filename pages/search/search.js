Page({
    data: {
        productList: [],
        focus: false
    },
    jump:function(event){
        let id = event.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
          url: '../details/details?id='+id,
        })
    },
    toSearch:function(event){
        //console.log(event.detail.value)
        let inputValue = event.detail.value

        //正则 模糊查询
        wx.cloud.database().collection('goods').where({
            good_name: wx.cloud.database().RegExp({
                regexp: inputValue,
                options:'i' //不区分大小写
            })
        }).get()
        .then(res => {
            //console.log(res)
            this.setData({
                productList: res.data
            })
        })
    },
    onLoad(options) {
        this.setData({
            focus:true
        })
    },
    onShow() {

    }
})