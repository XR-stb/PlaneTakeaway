var app = getApp()
Page({
  data: {
    navbar: ['全部订单', '待评价', '退款'],
    currentTab: 0,
    num:1,
    minusStatus:'disable'
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num>1) {
      num--;
    }
    var minusStatus = num>1 ? 'normal':'disable';
    this.setData({
      num:num,
      minusStatus:minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num:num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num:num,
      minusStatus: minusStatus
    })
  }
})