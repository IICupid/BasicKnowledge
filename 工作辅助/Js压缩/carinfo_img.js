var __seo_title = $('#hidTitle').val();

$(function () {
    /*�Ŵ�Ч��*/
    (function ($, window) {
        var cover = $(".taoche-details-mongolia-cover"), //��ȡcover��
                    float_div = $("#float_div"), //��ȡ������
                    big_pic_div = $("#big_pic_div"), //��ȡ��ͼ��DIV
                    big_pic = $("#bigImg"),
                    outerDiv = $('#taoche-details-pic');
        var valObj = {//���������ݴ��������
            coverw: 0, //�������
            coverh: 0, ////�������
            hasValue: true//�Ƿ��Ѿ�ȡֵ
        };
        //���over��ʱ��
        var right_img;
        cover.mouseover(function () {
            //��ȡ��ͼ��url��bigImg��ֵ
            var currentIndex = $('#taoche-details-xs-pic li.current').index(), //��ǰͼƬ������ֵ ��Сͼѡ�еĶ�Ӧ
                        zoomImgUrl = $("#taoche-details-piclist li").eq(currentIndex).find("img").attr("data-zoomimage"); //�Ҳ��ͼ��url
            !!zoomImgUrl && big_pic.attr("src", zoomImgUrl);
            right_img = new Image();
            right_img.onload = function () {
                $(this).css("cursor", "move"); //������ֵ���״
                $("#float_div,#big_pic_div").show(); //�ƶ�����ʹ�ͼ�����divչʾ
                if (valObj.hasValue) {
                    //��ȡ��СͼƬ�Ĳ����Ա㸡�����С�ļ��㣬����ȡһ�μ���
                    valObj.coverw = cover.width(),
                                valObj.coverh = cover.height();
                    valObj.hasValue = false;
                }
            };
            right_img.src = zoomImgUrl;
        }).mouseout(function () {////����Ƴ�
            $("#float_div,#big_pic_div").hide();
        }).mousemove(function (ev) { ////����ƶ�
            var sw = 256, sh = 170;
            var pos = ev || event,
                        left = pos.clientX - outerDiv.offset().left - sw / 2, //����left 256/2=128
                        top = pos.clientY - outerDiv.offset().top - sh / 2 + $(window).scrollTop(); //����top 130/2=65
            if (left < 0) {
                left = 0; //��С��0ǿ�ƹ̶�
            }
            else if (left > valObj.coverw - sw) {//����ĳһ����Ҳ�̶����Է��������Ƴ�ͼƬ��
                left = valObj.coverw - sw;
            }
            if (top < 0) {
                top = 0;
            }
            else if (top > valObj.coverh - sh) {
                top = valObj.coverh - sh;
            }
            //������λ�øı�
            float_div.css({ "left": left + "px", "top": top + "px" });
            //��ͼ��λ��
            var percentX = left / valObj.coverw; //��������
            var percentY = top / valObj.coverh;
            var bigImgleft = -percentX * (big_pic.width()) + "px", //�ұߴ�ͼλ�õĸı䣬������ʵ�����ǷŴ����ı�
                        bigImgTop = -percentY * (big_pic.height()) + "px";
            big_pic.css({ "left": bigImgleft, "top": bigImgTop });
        });
    })($, window);
    /*�����ֲ�*/
    (function ($, window) {
        /*���ֲ�ͼ�����߼�*/
        var bigUL = $("#taoche-details-piclist"),
                    bigLi = $("#taoche-details-piclist  li"),
                    bigLiCount = bigLi.length,
                    bigLiWidth = bigLi.width();
        //����ul�Ŀ�Ȳ���ֵ
        var bigULWidth = bigLiCount * bigLiWidth;
        bigUL.css({ "width": bigULWidth });

        /*Сͼ�����߼�*/
        var ul = $("#taoche-details-xs-pic"),
                    liObj = $('#taoche-details-xs-pic li'),
                    slideCount = liObj.length, //li������
                    slideWidth = liObj.width(), //li�Ŀ��
                    pageCount = slideCount >= 5 ? 5 : slideCount; //��ʾ����������
        //����ul�Ŀ�Ȳ���ֵ
        var sliderUlWidth = (slideCount) * (slideWidth + 3) + 3;
        ul.css({ "width": sliderUlWidth });
        //��ʼ������ͼ����ʽ
        liObj.first().addClass("current");

        var leftBtn = $("#move_left"), //����ť
                    rightBtn = $("#move_right"); //���Ұ�ť
        bottomNow = 0; //�ײ�ul����ߵ�li������

        //��ť��ʼ��
        leftBtn.addClass("nohover");
        slideCount <= 1 && rightBtn.addClass("nohover");

        //���ƶ�����¼�
        leftBtn.click(function () {
            var that = $(this);
            if (!that.hasClass("nohover") && !ul.is(":animated")) {
                var current = $('#taoche-details-xs-pic li.current'),
                            index = current.index();
                rightBtn.hasClass("nohover") && rightBtn.removeClass("nohover"); //ȥ��nohover
                if (bottomNow > 0) {
                    if (bottomNow == slideCount - pageCount && index >= slideCount - 2) {//�Ҳ�ͷ�� ���� ����ͼ�����������м�λ��
                        current.removeClass("current").prev("li").addClass("current");
                        bigMove($('#taoche-details-xs-pic li.current').index());
                    } else {
                        bottomNow = bottomNow - 1;
                        move(bottomNow, "left");
                    }
                } else if (bottomNow == 0) {//�����ͷ��
                    if (slideCount > 5) {
                        if (index <= 2 && index > 0) {
                            current.removeClass("current").prev("li").addClass("current");
                            !(index - 1) && that.addClass("nohover");
                            bigMove($('#taoche-details-xs-pic li.current').index());
                        }
                    } else {
                        current.removeClass("current").prev("li").addClass("current");
                        !(index - 1) && that.addClass("nohover");
                        bigMove($('#taoche-details-xs-pic li.current').index());
                    }
                }
            }
        });
        //���ƶ�����¼�
        rightBtn.click(function () {
            var that = $(this);
            if (!that.hasClass("nohover") && !ul.is(":animated")) {
                $("#move_left").hasClass("nohover") && $("#move_left").removeClass("nohover"); //ȥ��nohover
                var oldCurrent = $('#taoche-details-xs-pic li.current');
                index = oldCurrent.index();
                if (bottomNow < slideCount - pageCount) {
                    if (bottomNow == 0 && index < 2) {
                        oldCurrent.removeClass("current").next("li").addClass("current");
                        bigMove($('#taoche-details-xs-pic li.current').index());
                    } else {
                        bottomNow = bottomNow + 1;
                        move(bottomNow, "right");
                    }
                } else {//�Ҳൽͷ��
                    var oldCurrent = $('#taoche-details-xs-pic li.current');
                    var index = oldCurrent.index();
                    if (index < slideCount - 1) {
                        oldCurrent.removeClass("current").next("li").addClass("current");
                        (index + 1) == (slideCount - 1) && that.addClass("nohover"); //slideCount-1 ���һ������  index+1����һ��
                        bigMove($('#taoche-details-xs-pic li.current').index());
                    }
                }
            }
        });
        /*���li�¼�*/
        liObj.click(function (ev) {
            ev.stopPropagation(); //��ֹð��
            var that = $(this);
            if (!that.hasClass("current")) {
                var current = $('#taoche-details-xs-pic li.current'),
                            oldIndex = current.index();
                var thisIndex = that.index();
                that.addClass("current").siblings().removeClass("current");
                /*
                ����¼��ƶ�������
                1��li�������� 5�� .......................slideCount > 5
                2����ǰ����ֵ����ǰ����.............thisIndex >= 2 ��������0��ʼ��
                3����ǰ����С���������...................(slideCount-1)-2   ���һ������=slideCount-1
                */
                // if (slideCount > 5) {//��������5�����ƶ�������5�����ƶ�  2
                if (thisIndex >= 1 && thisIndex <= slideCount - 2) {//1
                    var directionName = oldIndex < thisIndex ? "right" : "left";
                    if (thisIndex == slideCount - 2) {
                        bottomNow = slideCount - 5;
                        bottomNow = bottomNow < 0 ? 0 : bottomNow; //����Ϊ0
                    } else {
                        bottomNow = thisIndex - 2; //���¼�bottomNowֵ �����λ�� ��ȥ2
                        bottomNow = bottomNow < 0 ? 0 : bottomNow; //����Ϊ0
                    }
                    if (slideCount > 5) {
                        move(bottomNow, directionName, true);
                    }
                    if (thisIndex == slideCount - 1 && thisIndex != 0) {
                        disabledRightBtn_abledLeftBtn(); /*�����Ҳఴť��������ఴť*/
                    } else if (thisIndex == 0 && thisIndex != slideCount - 1) {
                        disabledLeftBtn_abledRightBtn();    /*������ఴť�������Ҳఴť*/
                    } else if (thisIndex == 0 && thisIndex == slideCount - 1) {
                        disabledAllbtn();
                    } else {
                        ableAllBtn();
                    }
                } else if (thisIndex >= slideCount - 2) {//1
                    /*�����Ҳఴť��������ఴť*/
                    thisIndex === 0 ? disabledLeftBtn_abledRightBtn() : disabledRightBtn_abledLeftBtn(); 
                } else if (thisIndex < 1) {
                    disabledLeftBtn_abledRightBtn(); /*������ఴť�������Ҳఴť*/
                }
                bigMove($('#taoche-details-xs-pic li.current').index());
            }
        });
        /*������ఴť�������Ҳఴť*/
        function disabledLeftBtn_abledRightBtn() {
            rightBtn.hasClass("nohover") && rightBtn.removeClass("nohover");
            !leftBtn.hasClass("nohover") && leftBtn.addClass("nohover");
        }
        /*�����Ҳఴť��������ఴť*/
        function disabledRightBtn_abledLeftBtn() {
            leftBtn.hasClass("nohover") && leftBtn.removeClass("nohover");
            !rightBtn.hasClass("nohover") && rightBtn.addClass("nohover");
        }
        function ableAllBtn() {
            leftBtn.hasClass("nohover") && leftBtn.removeClass("nohover");
            rightBtn.hasClass("nohover") && rightBtn.removeClass("nohover");
        }
        function disabledAllbtn() {
            !leftBtn.hasClass("nohover") && leftBtn.addClass("nohover");
            !rightBtn.hasClass("nohover") && rightBtn.addClass("nohover");
        }
        /*�������*/
        var direction = {
            "left": function (that, ele) {
                return that.prev(ele);
            },
            "right": function (that, ele) {
                return that.next(ele);
            }
        }
        /*Сͼ�ƶ�����*/
        function move(bottomNow, directionName, isClick) {
            isClick = isClick || false;
            var that = $('#taoche-details-xs-pic li').eq(bottomNow),
                        l = that.position().left; //��ȡ����Ҫչʾ��ͼƬ��ƫ����
            //����ͼʼ�����м�λ��
            if (!isClick) {//�ǵ������
                var current = direction[directionName]($('#taoche-details-xs-pic li.current'), "li");
                current.addClass("current").siblings("li.current").removeClass("current");
                var topIndex = $('#taoche-details-xs-pic li.current').index();
                bigMove(topIndex);
            }
            ul.animate({ left: -l }, timeObj["samllImg"]); //ִ�ж���
        }
        /*��ͼ�ƶ�����*/
        function bigMove(topIndex) {
            var l = $("#taoche-details-piclist  li").eq(topIndex).position().left;
            bigUL.animate({ left: -l }, timeObj["bigImg"]);
        }
    })($, window);

    myScroll(); //�����ں���

    /*��ԴͼƬ��ͼ�ֲ�չʾ*/
    var carSourceImgShow = (function () {
        var index = 0,
                    carImgShowUl = $("#carSourceImgShowUl"),
                    currentImg = $("#currentImg");

        function carSourceImgMove(index, isClick) {
            var lisObj = $("#carSourceImgShowUl li"), //li������
             slideCount = lisObj.length, //li������
              that = lisObj.eq(index),
                        l = that.position().left; //��ȡ����Ҫչʾ��ͼƬ��ƫ����
            currentImg.text(index + 1);

            if (!index) {
                $("#carSourceImgLeft").parent("div").addClass("popover-big-prev-disabled");
            } else if (index >= slideCount - 1) {
                $("#carSourceImgRight").parent("div").addClass("popover-big-next-disabled");
            } else {
                var nextDiv = $("#carSourceImgRight").parent("div"),
                prevDiv = $("#carSourceImgLeft").parent("div");
                if (nextDiv.hasClass("popover-big-next-disabled")) {
                    nextDiv.removeClass("popover-big-next-disabled");
                }
                if (prevDiv.hasClass("popover-big-prev-disabled")) {
                    prevDiv.removeClass("popover-big-prev-disabled");
                }
            }
            if (isClick) {
                carImgShowUl.css({ "left": -l }); //ִ�ж���
            } else {
                carImgShowUl.animate({ left: -l }, timeObj["carSourceImg"]); //ִ�ж���
            }
        }

        return function (clickIndex, isClick) {
            var slideCount = $("#carSourceImgShowUl li").length; //li������
            if (slideCount <= 1) {
                $("#carSourceImgLeft").parent("div").addClass("popover-big-prev-disabled");
                $("#carSourceImgRight").parent("div").addClass("popover-big-next-disabled");
            }
            index = clickIndex || 0;
            backgroundC.load("carSourceImgShow", "bgCen");
            carSourceImgMove(index, isClick);
            $("#carsourceImgCount").text(slideCount); //����
            currentImg.text(index + 1); //��ǰҳ��
            /*�Ҳఴť*/
            $("#carSourceImgRight").click(function () {
                var _me = $(this),
                _meparent = _me.parent("div");
                if (!_meparent.hasClass("popover-big-next-disabled")) {
                    if (!carImgShowUl.is(":animated")) {
                        if (index < slideCount - 1) {
                            index++;
                            carSourceImgMove(index, false);

                        }
                    }
                }
            });
            /*��ఴť*/
            $("#carSourceImgLeft").click(function () {
                var _me = $(this),
                _meparent = _me.parent("div");
                if (!_meparent.hasClass("popover-big-prev-disabled")) {
                    if (!carImgShowUl.is(":animated")) {
                        if (index > 0) {
                            index--;
                            carSourceImgMove(index, false);
                            if (index <= 0) {
                                _meparent.addClass("popover-big-prev-disabled");
                            }
                        }
                    }
                }
            });
            /*�ر�*/
            $("#carSourceImgShowClose").click(function () {
                backgroundC.close("carSourceImgShow", "bgCen");
                $("#carSourceImgRight").parent("div").removeClass("popover-big-next-disabled");
                $("#carSourceImgLeft").parent("div").removeClass("popover-big-prev-disabled");
            });
        } //function end
    })(); //carSourceImgShow end

    /*�����ԴͼƬ�鿴*/
    $(document).on("click", "#carSourceImgUl li", function () {
        var json = $.parseJSON($("#imgsJsonShow").val()),
          carImgShowUl = $("#carSourceImgShowUl");
        if (!!json) {
            if (!carImgShowUl.hasClass("isload")) {
                var liStr = "";
                for (var i = 0, len = json.length; i < len; i++) {
                    liStr += '<li data-id="' +
                        i +
                        '"  logwt="bytailsindex_cyxq_cydt"><img title="' +
                        __seo_title +
                        '" src="' +
                        json[i] +
                        '"  alt="" width="750" height="500"  /></li>';
                }
                carImgShowUl.html(liStr);

                var liObj = $("#carSourceImgShowUl li"),
                    currentImg = $("#currentImg");

                var slideCount = liObj.length, //li������
                    slideWidth = 750, //li�Ŀ��
                    slideHeight = 500; //li�ĸ߶�
                carImgShowUlWidth = slideCount * slideWidth;
                carImgShowUl.css({ "width": carImgShowUlWidth, "height": slideHeight });

                carImgShowUl.addClass("isload");
            }
            carSourceImgShow($(this).index(), true);
        }
    });
    //�����ͼ�ӳټ���
    setTimeout(function () {
        $('#taoche-details-piclist img').each(function () {
            var g = $(this), h = g.attr('data-src');
            if (h != '') {
                g.attr('src', h);
            }
        });
    }, 30);
});
