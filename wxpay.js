wx.ready(function () {
    // let zhifu_url1 =  $$.urls.url_tpmallwxpayInfo;
    let paramMap = new $$.DMap();
    $.ajax({
        type: 'get',
        cache: true,
        dataType: 'jsonp',
        url: endurl,
        success: function (data) {
            if (data.code == 0) {
                // WeixinJSBridge.invoke('getBrandWCPayRequest',{
                wx.chooseWXPay({
                    'appId': data.result.appId,
                    //	'appId':'wx914eac518ca92252',
                    'timestamp': data.result.timeStamp,
                    'nonceStr': data.result.nonceStr,
                    'package': data.result.packageStr,
                    'signType': data.result.signType,
                    'paySign': data.result.sign,
                    // 'appId': 'wxc2adbe1763a2d03a',
                    // //	'appId':'wx914eac518ca92252',
                    // 'timeStamp': '1531710825',
                    // 'nonceStr': '4305457733356120651',
                    // 'package': 'prepay_id=wx16111345956548c75ed374331251307861',
                    // 'signType': 'MD5',
                    // 'paySign': 'F5600A7B60AF25E05E82BA921A5891AA',
                    success: function (res) {
                        _this.paySuccess();
                    },
                    fail: function (res) {
                        /*setTimeout(function(){
                            _this.payFail();
                        },3000);*/
                    },
                    complete: function (res) {
                    },
                    cancel: function (res) {
                        /*setTimeout(function(){
                            _this.payFail();
                        },3000);*/
                    }
                });
            } else {
                return;
            }
        }
    });

})