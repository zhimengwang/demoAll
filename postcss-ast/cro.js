var vm;
$$.showLoading();

function loadDoc() {
    vm = new Vue({
        el: "#box",
        data: {
            result: {
                "banners": [
                    {
                        "id": 2,
                        "imgUrl": "",
                        "toUrl": ""
                    }

                ],//头部轮播图
                "adProductAreaList": [],//二三类商品
                "areaList": [],//自定义活动模块
                "iconList": [],//品牌种类
                "notice": [],//公告
                "noticeIcon": "",//公告图片
                "specialProduct": {//一类商品
                    "name": "",
                    "productList": []
                }
            },
            "topImgUrl": "",//头部图片
            "carList": {//购物车清单
                "totalCount": 0,
            },
            "lengLi": '',
            fontSize: '',
            timer1: '',
            isapp: false,
            shopId: 202832,
            showDownload: false,
            hidead: false,
            ad: {
                "id": 0,
                "name": "",
                "showPageId": 0,
                "imgUrl": "",
                "toPageId": 0,
                "toPageUrl": "",
                "shopId": 0,
                "platform": 0
            },
            cateList: {},
            cateIndex: 0
        },
        mounted: function () {
            $$.hideLoading();
            if ($$.isApp) {
                this.isapp = true;
            } else {
                this.showDownload = true;
            }
            this.init();
        },
        methods: {
            init: function () {
                if (window.localStorage) {
                    var HDad = window.localStorage.getItem('HTad');
                    if (HDad) {
                        HDad = Number(HDad);
                        if (HDad != new Date().getDate()) {
                            window.localStorage.removeItem('HDad');
                            this.getAd();
                        }
                    } else {
                        this.getAd();
                    }
                } else {
                    this.getAd();
                }
                this.showInfo();
            },
            checkCate: function (index) {
                this.cateIndex = index;
                this.cateList = this.result.adProductAreaList[index]
            },
            showInfo: function () {//首页数据展示
                var _this = this;
                var posurl = $$.urls.url_api;
                var params = new $$.DMap();
                params.put('method', 'ddky.cms.haitao.homepage.get');
                params.put('userId', parmaData.userId);
                params.put('uDate', parmaData.uDate);
                params.put('loginToken', parmaData.loginToken);
                var requestUrl = $$.getRequestURL(posurl, params);
                $.ajax({
                    type: "get",
                    url: requestUrl,
                    cache: true,
                    dataType: 'jsonp',
                    success: function (res) {
                        if (res.code == 0) {
                            _this.result = res.result;

                            if (!res.result.specialProduct) {
                                _this.result.specialProduct = {
                                    name: '',
                                    productList: []
                                }
                            }

                            if (_this.result.adProductAreaList) {
                                _this.cateList = _this.result.adProductAreaList[0]
                            }

                            //var arr=res.result.specialProduct.productList;
                            _this.lengLi = (res.result.iconList.length);
                            //alert(res.result.shopId)
                            //品牌图标的宽
                            setTimeout(function () {
                                $(".li_wid").eq(_this.lengLi - 1).css({"padding-right": "0px"});
                                var leng = ($(".li_wid").eq(1).width()) * (_this.lengLi - 2) + $(".li_wid").eq(0).width() + $(".li_wid").eq(_this.lengLi - 1).width() + 30;
                                $(".icon ul").css("width", leng + "px");
                                if (_this.result.notice.length > 0) {
                                    _this.noti();
                                }
                                _this.swiper();

                                var height = parseInt(getComputedStyle(document.querySelector('.head')).height);
                                var searchTip = document.querySelector('.search_pos');
                                document.getElementById('content_box').addEventListener('scroll', function () {
                                    var _this = this
                                    if (document.getElementById('content_box').scrollTop > height) {
                                        searchTip.className = 'search_pos header search_act';
                                        $('.sea_frame img').attr('src', 'https://img.ddky.com/c/wap/images/app/ddky/crossSale/search-bc-white.png');
                                    } else {
                                        searchTip.className = 'search_pos header';
                                        $('.sea_frame img').attr('src', 'https://img.ddky.com/c/wap/images/app/ddky/crossSale/searchWri.png');
                                    }
                                    var $headers = $(".header");
                                    var scrollTop = $(_this).scrollTop();
                                    var alltop = 0
                                    if (scrollTop < 0) {
                                        // reset all
                                        // $headers.css({
                                        //     position: "relative",
                                        //     top: "0px"
                                        // });
                                    } else {
                                        // 累加头高度
                                        $headers.each(function (index, $el) {
                                            var $curHeader = $($headers).eq(index);
                                            var curTop = $curHeader[0].getBoundingClientRect().top;
                                            var curHeight = $curHeader.height();
                                            // scroll up
                                            var isRelative = ($el.isFixed && scrollTop <= $el.exTop);
                                            // scroll down
                                            var isFixed = (curTop <= alltop);
                                            var position = "";
                                            var top = 0;
                                            if (isRelative) {
                                                // reset
                                                position = index === 0 ? 'fixed' : 'relative'
                                                $el.isFixed = false;
                                            } else if (isFixed) {
                                                position = "fixed";
                                                if (!$el.isFixed) {
                                                    $el.isFixed = true;
                                                    $el.exTop = scrollTop;
                                                }
                                            }
                                            if (isFixed) {
                                                if (position === 'fixed') {
                                                    $($el).css({
                                                        position: position,
                                                        top: alltop + "px"
                                                    });
                                                } else {
                                                    $($el).css({
                                                        position: position,
                                                        top: 0 + "px"
                                                    });
                                                }
                                                for (var i = 0; i <= index; i++) {
                                                    alltop += $($headers).eq(i).height();
                                                }
                                            } else {
                                                $($el).css({
                                                    position: index === 0 ? 'fixed' : position,
                                                    top: 0 + "px"
                                                });
                                            }
                                        });
                                    }
                                });
                                if (res.result.banners.length > 1) {
                                    _this.ss();
                                }
                            }, 100)
                            setTimeout(function () {
                                parmaData.setPos();
                            }, 800)
                            //特价商品的宽（商品分类，一类商品）
                            //展示购物车数量
                            if (parmaData.userId) {
                                parmaData.getCount(function (num) {
                                    _this.carList.totalCount = num;
                                });
                            }

                        } else {
                            $$.alert1({msg1: res.msg, msg: '温馨提示'});
                        }

                    }
                });
            },
            ss: function () {
                var swiper2 = new Swiper('.head .swiper-container', {
                    pagination: {
                        el: '.head .swiper-container .swiper-pagination',
                        type: 'bullets',
                    },
                    loop: true,
                    autoplay: {
                        delay: 3000,//1秒切换一次
                        disableOnInteraction: false,
                    },
                    centeredSlides: true
                });
            },
            noti: function () {
                $('#slide3').swipeSlide({
                    autoSwipe: true,//自动切换默认是
                    speed: 3000,//速度默认4000
                    continuousScroll: true,//默认否
                    transitionType: 'ease-in',
                    axisX: false
                });
            },

            addCar: function (shopId, skuId, selector, index) { // 加购物车
                $$.showLoading();
                var e;
                var selectorList = document.querySelectorAll(selector);
                for (var i = 0; i < selectorList.length; i++) {
                    var dom = selectorList[i];
                    if (dom.contains(event.target)) {
                        e = dom
                        break;
                    }
                }
                e = e.querySelector('.img_com img')
                console.log(e);
                var clientY = e.getBoundingClientRect().y,
                    clientX = e.getBoundingClientRect().x;
                var _this = this;
                if (parmaData.isLogin()) {
                    yiJian(skuId, shopId, function (json) {
                        var div = document.createElement('img');
                        div.src = e.src;
                        div.style.display = 'block';
                        div.style.width = e.offsetWidth+"px" ;
                        div.style.height = e.offsetHeight+"px" ;
                        div.id = 'temp';
                        div.style.position = 'fixed';
                        div.style.zIndex = 3;
                        div.style.top = e.getBoundingClientRect().y + 'px';
                        div.style.left = e.getBoundingClientRect().x + 'px';
                        div.style.transition = 'all .8s cubic-bezier(.25,.1,.25,1)';
                        document.body.appendChild(div);
                        var top1 = document.querySelector('.boot').offsetTop;
                        //var left1 = document.querySelector('.boot').offsetLeft + 300;
//						var left1 = document.querySelector('.boot').offsetWidth -document.querySelector('.mui-tab-label1').offsetWidth/2;
                        var left1 = document.querySelector('.shopNum').offsetLeft;
                        setTimeout(function () {
                            div.style.width = 0;
                            div.style.height = 0;
                            document.getElementById('temp').style.webkitTransform = 'translate(' + (left1 - clientX) + 'px,' + (top1 - clientY) + 'px)';
                            setTimeout(function () {
                                document.body.removeChild(document.getElementById('temp'))
                                _this.carList.totalCount = json.data;
                            }, 700);
                        }, 0);
                    }, 'abc');
                } else {
                    parmaData.toLogin();
                }
            },

            swiper: function () {
                var _this = this;
                var swiper = new Swiper('.bargain .swiper-container', {
                    pagination: '.bargain .swiper-pagination',
                    slidesPerView: 2,
                    centeredSlides: true,
                    paginationClickable: true,
                    spaceBetween: 11,
                    grabCursor: true,
                    loop: true,
                    onSlideChangeEnd: function (swiper) {
                        //console.log(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
                        $(".bargain .swiper-slide").eq(swiper.activeIndex).siblings().css({"opacity": "0.5"});
                        $(".bargain .swiper-slide").eq(swiper.activeIndex).css({"opacity": "1"});
                    }
                });
            },
            //底部跳转
            goIndex: function () {
                window.location.href = "index.html";
            },
            goList2: function () {//点击进入全部商品list2页面
                window.location.href = "list2.html";
            },
            toyaoshi: function () {//药师指导
                window.location.href = 'https://m.ddky.com/app/ddky/zixun/list.html';
            },
            goCar: function () {//点击进入购物车页面
                var _this = this;
                if (_this.result.specialProduct.productList && _this.result.specialProduct.productList.length >= 1) {
                    _this.shopId = _this.result.specialProduct.productList[0].shopId;
                } else {
                    if (_this.result.adProductAreaList && _this.result.adProductAreaList.length >= 1 && _this.result.adProductAreaList[0].productList.length) {
                        _this.shopId = _this.result.adProductAreaList[0].productList[0].shopId;
                    }
                }
                if ($$.isApp) {
                    if (parmaData.isLogin()) {
                        var version = window.JSI.getVersionName() + '';
                        var version = Number(version.replace(/\./g, ''));
                        if (version >= 492) {
                            window.JSI.sendMessage(10014, '');
                        } else {
                            window.location.href = "car.html?shopId=" + _this.shopId;
                        }
                    } else {
                        window.JSI.sendMessage(10006, '');
                    }
                } else {
                    if (parmaData.isLogin()) {
                        window.location.href = "car.html?shopId=" + _this.shopId;
                    } else {
                        parmaData.toLogin();
                    }
                }
            },
            toUrl: function (url) {//点击轮播图跳转
                window.location.href = url;
            },
            search: function () {//点击搜索调转到搜索页面ok
                window.location.href = "seach.html";
            },
            jump: function (url) {//商品分类列表第二类banner跳转列表页；商品跳转详情页；
                parmaData.savePos();
                window.location.href = url;
            },
            jump1: function (url) {//icon跳转到列表页
                parmaData.savePos();
                window.location.href = url;
            },
            jump2: function (url) {//自定义模块跳转到6.5.2	活动商品列表页
                parmaData.savePos();
                window.location.href = url;
            },
            jump3: function (url) {//第一类商品 ”特价商品“点击跳转到该分类下列表页6.6
                parmaData.savePos();
                window.location.href = url;
            },
            notice: function (url) {//公告跳转
                window.location.href = url;
            },
            detail1: function (shopId, skuId) {//点击商品进入商品详情
                parmaData.savePos();
                window.location.href = "detail.html?shopId=" + shopId + "&skuId=" + skuId;
            },
            toShare: function () { // 分享
                $$.mcpShare(window.location.href, '', '', function (options) {
                    if (options.shareUrl) {
                        options.pageUrl = options.shareUrl;
                    }
                    var str = '{"shareImage":"' + options.imageUrl + '","content":"叮当海外购~正品保证，包税特惠  ，足不出户海外名药买到手！","shareTitle":"' + options.shareTitle + '","shareContent":"' + options.shareContent + '","pageUrl":"' + options.pageUrl + '"}';
                    $$.JSI.h5appJSI(10021, str);
                });
            },
            toDown: function () {
                parmaData.savePos();
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ddsy.songyao';
            },
            closeDown: function () {
                this.showDownload = false;
            },
            getAd: function () {
                var ad = new $$.DMap(), _this = this;
                ad.put('method', 'ddky.cms.htSupernatant.get');
                ad.put('showPageId', 5);// 海淘首页 6     全部商品 6
                var endurl = $$.getRequestURL($$.urls.url_api, ad);
                $$.sendAjax(endurl, function (res) {
                    var arr = [];
                    if (res.code == 0) {
                        if ($$.isApp && res.result.isExistApp == 1 && res.result.list && res.result.list.length) { // 客户端平台
                            arr = res.result.list.filter(function (item) {
                                return item.platform == 2;
                            })
                        } else if (!$$.isApp && res.result.isExistH5 == 1 && res.result.list && res.result.list.length) { // 客户端以外的平台
                            arr = res.result.list.filter(function (item, i) {
                                return item.platform == 3;
                            })
                        }
                        if (arr.length) {
                            _this.ad = arr[0];
                            _this.hidead = true;
                        }
                    }
                })

            },
            closeadvertisement: function () {
                this.saveClickAdTime();
                this.hidead = false;
            },
            toadvertisement: function () {
                this.saveClickAdTime();
                this.hidead = false;
                if (this.ad.toPageId == 8 && this.ad.toPageUrl) {
                    window.location.href = this.ad.toPageUrl;
                } else if (this.ad.toPageId == 3 && this.ad.shopId && this.ad.toPageUrl) {//详情
                    window.location.href = 'detail.html?shopId=' + this.ad.shopId + '&skuId=' + this.ad.toPageUrl;
                }
            },
            saveClickAdTime: function () {
                window.localStorage && window.localStorage.setItem('HTad', new Date().getDate())
            }
//			app:function(){
//				var _this=this;
//				$(".swiper-wrapper").html(" ");
//	 			var htmlAll="";
//				$.each(_this.result.banners, function(i,n) {
//					htmlAll+="<div class='swiper-slide'>";
//						htmlAll+="<img src='"+n.imgUrl+"'/>";
//					htmlAll+="</div>";
//				});
//				$(".swiper-wrapper").append(htmlAll);
//			}
        }

    })
}

function DingDangJSBridgeReady() {
    parmaData.getInfo();
    //window.JSI.sendMessage(10020, '');
    setTimeout(function () {
        loadDoc();
    }, 100)
}

if (!$$.isApp) {
    parmaData.getInfo();
    //$$.online && giftShare({type: 2 , orderId:'' , friend: ''}); // 微信分享
    loadDoc();
}

function detail(mythis) {
    parmaData.savePos();
    var shopId = mythis.children.shopId.value;
    var skuId = mythis.children.skuId.value;
    window.location.href = "detail.html?shopId=" + shopId + "&skuId=" + skuId;
}

