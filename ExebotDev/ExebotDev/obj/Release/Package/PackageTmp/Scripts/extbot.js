angular.module('main', [])
    .controller('PortfolioController', function ($scope) {
        $scope.portfolio_headers = portfolio_headers;
        $scope.portfolio = my_portfolios;
    });

function setPositionContent() {
    $('.product-title > span').each(function (index, value) {

        var forElement = $(value).attr('for');
        //console.log(forElement);
        //console.log($(value).innerWidth());
        //console.log($(value).innerWidth());
        //console.log($('span[name="' + forElement + '"]').offset());
        var cell = $('span[name="' + forElement + '"]');
        var left = $(value).attr('left');

        if (index != 0) {
            cell.offset({
                left: first_left,
            });
            cell.css({
            });
            //console.log(left);
            //var dif = $(value).position().left - $(value).offset().left;
            //console.log(dif);
            cell.animate({
                left: left
            }, 1300, function () {
            });
        } else {
            if (cell.length > 0) {
                first_left = cell.offset().left;
            }
            //console.log(first_left);
        }
    });
}

function expandAllItem() {
    $('.survey-item').each(function (index, value) {
        //var item = $('.survey-item');
        //console.log(max_width);
        var max_width = $('.product-title').width() - 5;
        //console.log(max_width);
        //$(value).css({
        //    height: 40,
        //    width: 90
        //});

        var avv = null;

        $(value).delay(index * 100).animate({
            width: max_width
        }, {
            duration: 1300,
            specialEasing: {
                width: "swing",
                height: "easeOutBounce"
            },
            step: function (now, fx) {
                var data = fx.elem.id + " " + fx.prop + ": " + now;
                //console.log(data);

                //if (100 < now && avv == null) {
                //    // AVV
                //    avv = $(value).find('span');
                //    //console.log(avv.text());
                //    avv.animate({
                //        'opacity': 1
                //    }, 300, function () {
                //    });
                //}
            },
            complete: function () {
                $(value).css({
                    width: 'auto'
                });

                //var forElement = $(value).find('span').text();
                //console.log(forElement);

                $(value).find('span').delay(index * 10).animate({
                    'opacity': 1
                }, 1300, function () {
                });
                //showContent();
            }
        });


    });
}

function updateField(id, name, value) {
    var $elementProduct = $("#" + id);
    var $avvText = $elementProduct.find("span[name='" + name + "']");
    var oldValue = parseInt($avvText.text());
    if (oldValue != value) {
        $avvText.fadeOut(function () {
            $avvText.text(numeral(value).format('0,0'));;
            for (var i = 0; i < 5; i++) {
                $avvText.fadeToggle("slow", "linear");
            }
        });
    }
}

function simulateUpdatePortfolio() {
    setInterval(function () {
        var selectedId = Math.floor(Math.random() * my_portfolios.length + 1);
        var selectedHeader = Math.floor(Math.random() * (portfolio_headers.length - 1) + 1);
        //console.log(selectedId);
        var headerName = portfolio_headers[selectedHeader];
        var newValue = Math.floor((Math.random() * headerName.max) + headerName.min);

        updateField("product" + selectedId, headerName.forElement, newValue);

        //my_portfolios[0].ACV += 10;

        //console.log(my_portfolios[0].ACV);
    }, 5000);
}

simulateUpdatePortfolio();

var schedule_sell_list = [],
    schedule_cacle_list = [];

var max_schedule_bot_time = 1000 * 15,
    interval_schedule = 5000;

function scheduleSell() {
    setInterval(function () {
        //console.log(product_forsell.length);

        for (var i = 0; i < schedule_sell_list.length; i++) {
            var schedule_sell = schedule_sell_list[i];
            schedule_sell.remainint_time -= interval_schedule;
            //console.log(schedule_sell_list[i].remainint_time);
            if (schedule_sell.remainint_time <= 0) {
                // remove
                removeScheduleSell(schedule_sell.product_id);

                messageWithEffect("Sell Completed...");
                //setTimeout(removeExtbotSellProductInfo, botEventMessageDuration);

                schedule_sell._element.find('.survey-name').fadeOut();
                schedule_sell._element
                    .animate({ width: '200px' },
                    3000,
                    function () {
                        $(this).fadeOut();
                    });
            }
        }

        for (var i = 0; i < schedule_cacle_list.length; i++) {
            var schedule_cacle = schedule_cacle_list[i];
            schedule_cacle.remainint_time -= interval_schedule;
            //console.log(schedule_cacle.remainint_time);
            if (schedule_cacle.remainint_time <= 0) {
                // remove
                schedule_cacle._action_status_cancle.animate({
                    opacity: 0
                }, 2000, function () {
                    $(this).css({
                        background: '#f2f2f2',
                        opacity: 1
                    });
                });

                removeScheduleCancle(schedule_cacle.product_id);

                messageWithEffect("Cancle Sell Completed...");
                //setTimeout(removeExtbotSellProductInfo, botEventMessageDuration);
            }
        }

    }, interval_schedule);
}
scheduleSell();

function removeScheduleCancle(product_id) {
    var startIndex = 0;
    for (var i = 0; i < schedule_cacle_list.length; i++) {
        if (schedule_cacle_list[i].product_id == product_id) {
            startIndex = i;
            break;
        }
    }
    schedule_cacle_list.splice(startIndex, 1);
}

function removeScheduleSell(product_id) {
    var startIndex = 0;
    for (var i = 0; i < schedule_sell_list.length; i++) {
        if (schedule_sell_list[i].product_id == product_id) {
            startIndex = i;
            break;
        }
    }
    schedule_sell_list.splice(startIndex, 1);
}

var $extbot_container = $("#extbot_container"),
    $effectContainer = $("#extbot_effect_container"),
    $extbot_sell_product_info = $("#extbot_sell_product_info"),
    $extbot_sell_product_container = $("#extbot_sell_product_container"),
    isFriendTyping = false,
    bleeding = 88,
    $input = $("#extbot_sell_product");

var $my_portfolio = $('#my-portfolio'),
    $extbot_container = $("#extbot_container");

var $bot_message = $('#bot_message'),
    botEventMessageDuration = 3000;

function setFilter(value) {
    $effectContainer.css({
        webkitFilter: value,
        mozFilter: value,
        filter: value,
    });
}
function beginNewProductEffect() {
    //botEventMessage("Your friend is typing...");

    isFriendTyping = false;
    friendIsTyping();
    setTimeout(friendStoppedTyping, 5000);
}

function messageWithEffect(message) {
    isFriendTyping = false;
    friendIsTyping(message);
    setTimeout(friendStoppedTyping, 5000);
}

function gooOn() {
    setFilter('url(#goo)');
}
function gooOff() {
    setFilter('none');
}

function friendIsTyping(messge) {
    if (isFriendTyping) return;

    isFriendTyping = true;

    var $dots = $("<div/>")
        .addClass('chat-effect-dots')
        .css({
            top: -30 + bleeding,
            left: 30
        })
        .appendTo($effectContainer)
    ;

    for (var i = 0; i < 3; i++) {
        var $dot = $("<div/>")
            .addClass("chat-effect-dot")
            .css({
                left: i * 20
            })
            .appendTo($dots)
        ;
        TweenMax.to($dot, 0.3, {
            delay: -i * 0.1,
            y: 30,
            yoyo: true,
            repeat: -1,
            ease: Quad.easeInOut
        })
    };

    botEventMessage(messge);

    gooOn();
}

function friendStoppedTyping() {
    if (!isFriendTyping) return

    isFriendTyping = false;

    var $dots = $effectContainer.find(".chat-effect-dots");
    TweenMax.to($dots, 0.3, {
        y: 40,
        force3D: true,
        ease: Quad.easeIn,
    });

    var $info = $extbot_sell_product_info.find(".chat-info-typing");
    TweenMax.to($info, 0.3, {
        y: 30,
        force3D: true,
        ease: Quad.easeIn,
        onComplete: function () {
            $dots.remove();
            $info.remove();
            gooOff();
        }
    });
}

//isFriendTyping = false;
//friendIsTyping("Hello");

function removeExtbotSellProductInfo() {
    var $info = $extbot_sell_product_info.find(".chat-info-typing");
    TweenMax.to($info, 0.3, {
        y: 30,
        force3D: true,
        ease: Quad.easeIn,
        onComplete: function () {
            $info.remove();
        }
    });
}

function botEventMessage(message) {
    $extbot_sell_product_info.find('.chat-info-typing').remove();
    var $info = $("<div/>")
    .addClass("chat-info-typing")
    .text(message)
    .css({
        transform: "translate3d(0,30px,0)"
    })
    .appendTo($extbot_sell_product_info)

    TweenMax.to($info, 0.3, {
        y: 0,
        force3D: true
    });
}

function botMessage(message) {

    $bot_message.find('.chat-info-typing').remove();

    var $info = $("<div/>")
    .addClass("chat-info-typing")
    .text(message)
    .css({
        transform: "translate3d(0, 30px, 0)"
    })
    .appendTo($bot_message)

    TweenMax.to($info, 0.3, {
        y: 0,
        force3D: true
    });
}

var bot_messages = [
    "This time " + new Date(),
    "SET +0.34",
    "INTOUCH -0.5",
    "SMART +1.9"];
function simBotMessage() {
    setInterval(function () {
        var msg_indx = Math.floor(Math.random() * bot_messages.length);
        //console.log(msg_indx);
        var random_message = bot_messages[msg_indx];
        botMessage(random_message);
    },
    5000);
}

var li_product_tmp =
    '<li class="survey-item" ng-repeat="product in portfolio" id="${id}">' +
    '</li>';

var li_product_content_tmp =
    '<span class="survey-country tooltip" title="Sysmbol" name="SYSMBOL">${Symbol}</span>' +
        '<div class="pull-right">' +
            '<span class="survey-name hide tooltip" title="Available Volume" name="AVV">${AVV}</span>' +
            '<span class="survey-name hide tooltip" title="Actual Volume" name="ACV">${ACV}</span>' +
            '<span class="survey-name hide tooltip" title="Average Cost" name="AVC">${AVC}</span>' +
            '<span class="survey-name hide tooltip" title="Market Price" name="MP">${MP}</span>' +
            '<span class="survey-name hide tooltip" title="Amount (Price)" name="AP">${AP}</span>' +
            '<span class="survey-name hide tooltip" title="Market Value" name="MV">${MV}</span>' +
            '<span class="survey-name hide tooltip" title="Unrealized P/L" name="UPL">${UPL}</span>' +
            '<span class="survey-name hide tooltip" title="% Unrealized P/L" name="PUPL">${PUPL}</span>' +
            '<span class="survey-name hide tooltip" title="Realized P/L" name="RPL">${RPL}</span>' +
            '<span class="survey-stage hide tooltip">' +
                '<span class="stage live tooltip" title="Sell" name="bot-action-sell">Live</span>' +
                '<span class="stage ended tooltip" title="Cancle" name="bot-action-cancle">Ended</span>' +
            '</span>' +
        '</div>';

$.template("li_product_tmp", li_product_tmp);
$.template("li_product_content_tmp", li_product_content_tmp);

function newProduct(productJson) {
    var $messageContainer = $.tmpl("li_product_tmp", productJson)
        .appendTo($my_portfolio);

    //console.log($messageContainer);
    //addDragble($messageContainer.find('.survey-item'));

    var $messageBubble = $.tmpl("li_product_content_tmp", productJson)
        .appendTo($messageContainer);

    var max_width = $('.product-title').width() - 10;
    $messageContainer.css({
        top: 200,
        opacity: 0
    });

    $messageContainer.animate({
        top: 0,
        opacity: 1
    }, 2000, function () {
        adjustH();
        $messageContainer.animate({
            width: max_width
        }, 2000, function () {
            $messageContainer.css({
                width: 'auto'
            });

            $messageBubble.find('span').animate({
                'opacity': 1
            }, 1300, function () {

            });
        });
    });
    
}

function addProduct(productJson, self) {

    var $messageContainer =
        $.tmpl("li_product_tmp", productJson)
        .appendTo($my_portfolio)
    ;

    var $messageBubble = $.tmpl("li_product_content_tmp", productJson)
        .appendTo($messageContainer)
    ;

    var oldScroll = $extbot_container.scrollTop();
    $extbot_container.scrollTop(9999999);
    var newScroll = $extbot_container.scrollTop();
    var scrollDiff = newScroll - oldScroll;
    TweenMax.fromTo(
        $my_portfolio, 0.4, {
            y: scrollDiff
        }, {
            y: 0,
            ease: Quint.easeOut
        }
    );

    adjustH();

    return {
        $container: $messageContainer,
        $bubble: $messageBubble
    };
}

function adjustH() {
    var robotH = parseInt($extbot_container.css("height")),
        productH = parseInt($my_portfolio.css("height")) + 50;

    //console.log(robotH);
    //console.log(productH);
    if (robotH <= productH) {
        $extbot_container.animate(
            {
                height: robotH + 100
            },
            1200,
            function () {

            }
        );
    }
}

$(function () {
    simBotMessage();

    $('.tooltip').tooltipster();

    gooOn();

    var my_port = $('#my-portfolio');

    // portfolio
    $('.surveys').removeClass('grid list').addClass('list');

    var $productTitle = $('.product-title');
    //console.log($productTitle.offset());
    var base = $productTitle.position();
    var first_left = 0;

    setPositionContent();

    expandAllItem();

    var body = document.body,
            dropArea = document.getElementById('drop-area'),
            droppableArr = [],
            dropAreaTimeout;

    var arop_name = null;
    // initialize droppables
    [].slice.call(document.querySelectorAll('#drop-area .drop-area__item'))
        .forEach(function (el) {
            //console.log(el);
            droppableArr.push(new Droppable(el, {

                onDrop: function (instance, draggableEl) {
                    // show checkmark inside the droppabe element
                    classie.add(instance.el, 'drop-feedback');
                    clearTimeout(instance.checkmarkTimeout);
                    instance.checkmarkTimeout = setTimeout(function () {
                        classie.remove(instance.el, 'drop-feedback');
                    }, 800);

                    //if($(el).id())
                    arop_name = $(el).attr('name');
                    //console.log($(el).attr('id'));
                    //console.log("2");
                    if (arop_name == "ok-sell") {
                        //console.log(dropArea);
                    }
                }
            }));
        });

    // initialize draggable(s)
    [].slice.call(document.querySelectorAll('#my-portfolio .survey-item')).forEach(function (el) {

        //console.log(el);

        new Draggable(el, droppableArr, {
            draggabilly: { containment: document.body },
            onStart: function () {
                // add class 'drag-active' to body
                classie.add(body, 'drag-active');
                // clear timeout: dropAreaTimeout (toggle drop area)
                clearTimeout(dropAreaTimeout);
                // show dropArea
                classie.add(dropArea, 'show');
            },
            onEnd: function (wasDropped) {
                var afterDropFn = function () {
                    // hide dropArea
                    classie.remove(dropArea, 'show');
                    // remove class 'drag-active' from body
                    classie.remove(body, 'drag-active');
                };

                if (!wasDropped) {
                    afterDropFn();
                }
                else {
                    // after some time hide drop area and remove class 'drag-active' from body
                    clearTimeout(dropAreaTimeout);
                    dropAreaTimeout = setTimeout(afterDropFn, 400);

                    var product_id = $(el).attr('id');
                    //console.log(product_id);
                    var $action_status_sell = $(el).find("span[name='bot-action-sell']");
                    $action_status_sell.css({
                        background: '#f2f2f2'
                    });
                    var $action_status_cancle = $(el).find("span[name='bot-action-cancle']");
                    $action_status_cancle.css({
                        background: '#f2f2f2'
                    });

                    var schedule_sell_result = Enumerable.From(schedule_sell_list)
                                        .Where(function (x) { return x.product_id == product_id })
                                        .Select()
                                        .SingleOrDefault();

                    var schedule_cancle_result = Enumerable.From(schedule_cacle_list)
                                       .Where(function (x) { return x.product_id == product_id })
                                       .Select()
                                       .SingleOrDefault();

                    //console.log(queryResult);
                    if (arop_name == "ok-sell") {

                        $action_status_sell.css({
                            background: '#63BEB0'
                        });

                        // remove schedule cancle
                        removeScheduleCancle(product_id);

                        if (schedule_sell_result == null) {
                            schedule_sell_list.push({
                                product_id: product_id,
                                remainint_time: max_schedule_bot_time,
                                _element: $(el),
                                _action_status_sell: $action_status_sell,
                                _action_status_cancle: $action_status_cancle
                            });

                            messageWithEffect("Selling ...");
                            //setTimeout(removeExtbotSellProductInfo, botEventMessageDuration);
                            //beginNewProductEffect();
                        }

                    } else {
                        $action_status_cancle.css({
                            background: 'rgb(245, 89, 20)'
                        });

                        // remove schedule sell
                        removeScheduleSell(product_id);

                        //push schedule cancel
                        if (schedule_cancle_result == null) {
                            schedule_cacle_list.push({
                                product_id: product_id,
                                remainint_time: max_schedule_bot_time,
                                _element: $(el),
                                _action_status_sell: $action_status_sell,
                                _action_status_cancle: $action_status_cancle
                            });

                            messageWithEffect("Cancle ...");
                            //setTimeout(removeExtbotSellProductInfo, botEventMessageDuration);
                        }
                        //console.log(schedule_sell_list);
                    }
                    //console.log(action_status.attr("name"));
                    $(el).find('div span .stage .live').css({
                        background: '#AED3C1'
                    });
                }
            }
        });
    });

    //beginNewProductEffect();

    //setTimeout(function () {
    //    newProduct({ Symbol: "5555" });
    //}, 2000);
    //setTimeout(function () {
    //    newProduct({ Symbol: "5555" });
    //}, 3000);
    //setTimeout(function () {
    //    newProduct({ Symbol: "5555" });
    //}, 4000);
    //setTimeout(function () {
    //    newProduct({ Symbol: "5555" });
    //}, 5000);
    //setTimeout(function () {
    //    newProduct({ Symbol: "5555" });
    //}, 2000);

    botMessage("Hello. I am Exebot...");

    setTimeout(function () {
        newProduct(my_portfolios[0]);

    }, Math.random() * 2000);

    setTimeout(function () {
        newProduct(my_portfolios[2]);

    }, Math.random() * 5000);

    setTimeout(function () {
        newProduct(my_portfolios[1]);

    }, Math.random() * 10000);

    setTimeout(function () {
        newProduct(my_portfolios[3]);

    }, Math.random() * 20000);

    setTimeout(function () {
        newProduct(my_portfolios[4]);

    }, Math.random() * 40000);
});