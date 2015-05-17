$(function () {

    var $portfolioContainer = $('.portfolio'),
        $portfolioList = $(".surveys"),
        $effectContainer = $(".robot-effect-container"),
        $infoContainer = $(".robot-info-container");

    function addProduct(productJson, self) {

        var $messageContainer = $("<li/>")
			.addClass('chat-message ' + (self ? 'chat-message-self' : 'chat-message-friend'))
			.appendTo($portfolioContainer)
        ;
        var $messageBubble = $("<div/>")
			.addClass('chat-message-bubble')
			.appendTo($portfolioList)
        ;
        $messageBubble.text(productJson);

        var oldScroll = $portfolioContainer.scrollTop();
        $portfolioContainer.scrollTop(9999999);
        var newScroll = $portfolioContainer.scrollTop();
        var scrollDiff = newScroll - oldScroll;
        TweenMax.fromTo(
			$portfolioList, 0.4, {
			    y: scrollDiff
			}, {
			    y: 0,
			    ease: Quint.easeOut
			}
		);

        return {
            $container: $portfolioContainer,
            $bubble: $messageBubble
        };
    }

    function receiveProduct(productJson) {
        var messageElements = addProduct(productJson, false)
			, $messageContainer = messageElements.$container
			, $messageBubble = messageElements.$bubble
        ;

        TweenMax.set($messageBubble, {
            transformOrigin: "60px 50%"
        })
        TweenMax.from($messageBubble, 0.4, {
            scale: 0,
            force3D: true,
            ease: Back.easeOut
        })
        TweenMax.from($messageBubble, 0.4, {
            x: -100,
            force3D: true,
            ease: Quint.easeOut
        })
    }

    function simRobot() {
        var product = {
            Symbol: "Smart",

            AVV: 15,
            ACV: 15,
            AVC: "0.0000",
            MP: "0.00",
            AP: "0.0000",
            MV: "0.00",
            UPL: "0.00",
            PUPL: "0.00",
            RPL: "0.00"
        };

        receiveProduct(product);
    }
});