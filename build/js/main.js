
jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-modal").is(":hidden");
        e(".button-dropdown .dropdown-modal").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-modal").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(".subm_btn, .close-tooltip ").click(function () {
    	e(".button-dropdown .dropdown-modal").hide();
    	e(".button-dropdown .dropdown-toggle").removeClass("active");
    });
});

/*styled scroll*/
$(function() {
	$('.scroll-pane').each(
		function()
		{
			$(this).jScrollPane(
				{
					showArrows: $(this).is('.arrow')
				}
			);
			var api = $(this).data('jsp');
			var throttleTimeout;
			$(window).bind(
				'resize',
				function()
				{
					// IE fires multiple resize events while you are dragging the browser window which
					// causes it to crash if you try to update the scrollpane on every one. So we need
					// to throttle it to fire a maximum of once every 50 milliseconds...
					if (!throttleTimeout) {
						throttleTimeout = setTimeout(
							function()
							{
								api.reinitialise();
								throttleTimeout = null;
							},
							50
						);
					}
				}
			);
		}
	)

});
/*color-picker*/
$(function() { 
	$('#cp').colorpicker({
		color: '#0371ad',
		container: true,
		inline: true
	}); 
}); 
$( document ).ready(function() {

	if ( $(".overlay").hasClass("active") ) {
		$('body, html').addClass('fixed')
	}
	// корректировка на прокрутку
	var div = document.createElement('div');
	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	var scrollWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);

	$('body.fixed').css('margin-right', scrollWidth);
	$('body.fixed .top-bar').css('margin-left', -scrollWidth/2);

	/*хак для правильного отрабатывания ховера на гаджетах*/
	$('.q_info').on('click', function() { });
	$('.stat-ico').on('click', function() { });
	$('body').on('click', function() { });
	$('.field-validation-error').on('click', function() { });
	$('.error').on('click', function() { });
	$('.search-result-item_aside .ico_group a').on('click', function() { });

	//показ скрытого номер телефона//
	$(".link-tooltip").click(function() {
		$(this).toggleClass('hide');
	});
	//показ скрытого номер телефона - новая кнопка//
	$('.phone .no-border_btn').click(function() {
		$(this).toggleClass('open');
		$('.show-phone').is(":visible") ? $(this).text("Показать телефон") : $(this).text("Скрыть телефон");
		$(this).siblings('.show-phone').slideToggle();
	});
	//показ скрытого номер телефона на рекламном слайдере//
	$('.tel-toggle').click(function() {
		$(this).hide();
		$(this).siblings('.hidden').removeClass('hidden');
	});

	//открытие верхнего меню//
	$(document).click( function(event){
		if( $(event.target).closest(".top-bar_menu-content").length ) 
		return;
		$(".top-bar_menu-content").slideUp("fast");
		$(".top-bar_menu").removeClass("active");
		event.stopPropagation();
	});
	$('.menu-toggle').click( function() {
		$(this).parents(".top-bar_menu").toggleClass("active");
		$(this).siblings(".top-bar_menu-content").slideToggle("fast");
		return false;
	});
	//больше фильтров//
	$(".search-more").click(function () {
		$(this).toggleClass('click');
		$(this).siblings(".search-full").slideToggle("fast");
	});
	$('.fix_menu li').on('click', function(){
        if($(".wrong input").prop('checked')) {
            $('.wrong ul').slideDown("fast");
            $('.form-complaint ul').addClass("active");
        } else {
        	$('.wrong ul').slideUp("fast");
        	$('.form-complaint ul').removeClass("active");
        }
    });
    $('.search-result-item_aside .form-complaint li, .chat-profile .form-complaint li').on('click', function(){
        if($(this).hasClass("wrong")) {
            $(this).find('ul').slideDown("fast");
            $(this).parents('.form-complaint ul').addClass("active");
        } else {
        	$(this).siblings(".wrong").find('ul').slideUp("fast");
        	$(this).parents('.form-complaint ul').removeClass("active");
        }
    });

    //открытие панели Написать письмо//
    $(".mail_ico a").click(function () {
    	$(this).siblings(".form-share").slideToggle("fast");
    });
    //закрытие панели Написать письмо//
    $(".form-share .close-tooltip").click(function () {
    	$(this).parents(".form-share").slideUp("fast");
    });

    //открытие "Поделиться" в промо-материалах//
    $(".ico-share").click(function () {
    	$(".ico-share").not(this).removeClass('active');
    	$(this).toggleClass('active');
    	$(".ico-share").not(this).siblings(".form-share").slideUp("fast")
    	$(this).siblings(".form-share").slideToggle("fast");
    });
    //закрытие "Поделиться" в промо-материалах//
    $(".form-share .close-tooltip").click(function () {
    	$(this).parents(".form-share").slideUp("fast");
    	$(".ico-share").removeClass('active');
    });

    //открытие окна-подсказки//
    $('.tooltip-toggle').click(function (e) {
    	e.preventDefault();
    	$(".tooltip-click").hide();
    	$(".price-block").removeClass('open');
    	$(this).siblings(".tooltip-click").show();
    	if( $(this).hasClass('total_cost')) {
    		$(this).parents(".price-block").addClass('open');
    	}
    });
    //закрытие окна-подсказки//
	$('.close-tooltip').click(function () {
		$(this).parents(".tooltip-click").hide();
		$(".price-block").removeClass('open');
	});

	//открытие меню второго уровня на главной на плитках//
	$('.link-toggle').click(function () {
		$('.link-toggle').not(this).parent('.color-block').removeClass('open');
		$('.link-toggle').not(this).siblings('.more-links').slideUp('');
		$(this).parent('.color-block').toggleClass('open');
		$(this).siblings('.more-links').slideToggle('');
	});
	$('.link_color').mouseleave(function(){
		$('.color-block').removeClass('open');
		$('.more-links').slideUp('');
	});

  // выравнивание z-index
    $('.search-result-item_aside .ico_group a').on('click', function(){
        if($(this).parents(".ico_group").children('a').not('.ico_star').hasClass('active')) {
            $(this).parents(".ico_group").addClass('z-top');
        } else {
        	$(this).parents(".ico_group").removeClass('z-top');
        }
    });

    $('.time-check').on('click', function(){
    	$(this).toggleClass('checks');
    });

	//Открытие панели поиска//
	$('.my_obj .no-border_btn.btn_blue').click(function(){
		$(this).hide();
		$('.my_obj .btn_red').show();
		$('.my_obj .btn_grey').show();
		$('.my_obj .tab-content').show();
	});

	//Закрытие панели поиска//
	$('.tab-content .close').click(function(){
		$('.tab-content').hide();
		$('.my_obj .btn_red').hide();
		$('.my_obj .btn_grey').hide();
		$('.my_obj .no-border_btn.btn_blue').show();
	});

	//Открытие изменений в учетно записи//
	$('.change-btn').click(function(){
		$(this).hide();
		$(this).siblings('.change-block').show();
	});

	//Закрытие изменений в учетно записи//
	$('.change-block .btn_grey').click(function(){
		$(this).parents('.change-block').hide();
		$(this).parents('.change-block').siblings('.change-btn').show();
	});

	// F.A.Q.
	$('.faq-inner dt > a').click(function(_event) {
		_event.preventDefault();
		var $el = $(this).parents('dl:eq(0)');
		if (!$el.hasClass('open')) {
			$('.faq-inner dl.open').removeClass('open');
			$('.faq-inner dl dd').slideUp();
			$el.addClass('open');
			$el.children('dl dd').slideDown();
		} else {
			$el.removeClass('open');
			$('.faq-inner dl dd').slideUp();
		}
	});

	// Больше-меньше комментарии
	$('.expand_ico').click(function () {
		if ($(this).hasClass('open')) {
			$(this).addClass('close').removeClass('open');
			(this).innerHTML = 'меньше';
			$(this).parents('.box').find('span.hidden').removeClass('hidden').addClass('visible');
			$(this).parents('.box').find('.dot').addClass('hidden');
		}
		else {
			$(this).removeClass('close').addClass('open');
			(this).innerHTML = 'больше';
			$(this).parents('.box').find('span.visible').addClass('hidden').removeClass('visible');
			$(this).parents('.box').find('.dot').removeClass('hidden');
		}
	});

	//share button MAIN page
	$('.share-toggle').click(function () {
		$(this).siblings('.form-share').toggle();
	});
	$('.close-tooltip').click(function () {
		$(this).parents('.form-share').hide();
	});

	//карусель с превью// 
	$("#owl-demo").owlCarousel({
		navigation : true,
		navigationText : false,
		pagination:true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
	});
	var sync1 = $(".sync1");
	var sync2 = $(".sync2");
	sync1.owlCarousel({
		singleItem : true,
		navigationText : false,
		slideSpeed : 150,
		navigation: true,
		pagination:false,
		afterAction : syncPosition,
		responsiveRefreshRate : 200,
	});
	sync2.owlCarousel({
		items : 4,
		pagination: false,
		navigation: true,
		scrollPerPage : true,
		responsiveRefreshRate : 100,
		afterInit : function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});
	function syncPosition(el){
		var current = this.currentItem;
		$(".sync2")
		.find(".owl-item")
		.removeClass("synced")
		.eq(current)
		.addClass("synced")
		if($(".sync2").data("owlCarousel") !== undefined){
		center(current)
		}
	}
	$(".sync2").on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	});
	function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
		if(num === sync2visible[i]){
			var found = true;
		}
	}
	if(found===false){
	if(num>sync2visible[sync2visible.length-1]){
		sync2.trigger("owl.goTo", num - sync2visible.length+2)
	}else{
		if(num - 1 === -1){
		num = 0;
		}
		sync2.trigger("owl.goTo", num);
	}
	} else if(num === sync2visible[sync2visible.length-1]){
		sync2.trigger("owl.goTo", sync2visible[1])
		} else if(num === sync2visible[0]){
			sync2.trigger("owl.goTo", num-1)
		}
	}
	
	setTimeout(function() { $('.carousel-btn > div').height($('.owl-item').height()); }, 100);

	// слайдер партнеры
	$('.owl-partner').owlCarousel({
		navigation : true,
		navigationText : false,
		pagination:false,
		slideSpeed : 300,
		paginationSpeed : 400,
		scrollPerPage: true,
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,3],
		itemsMobile : [479,3],
		singleItem : false
	});


	// рекламные слайдеры
	var time = 10; // time in seconds
	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;
	$("#owl-main").owlCarousel({
		singleItem : true,
		navigation : true,
		navigationText : false,
		pagination: false,
		afterInit : progressBar,
		afterMove : moved,
		mouseDrag: false
	});
	//Init progressBar where elem is $("#owl-main")
	function progressBar(elem){
	  $elem = elem;
	  //build progress bar elements
	  buildProgressBar();
	  //start counting
	  start();
	}
	//create div#progressBar and div#bar then prepend to $("#owl-main")
	function buildProgressBar(){
	  $progressBar = $("<div>",{
	    id:"progressBar"
	  });
	  $bar = $("<div>",{
	    id:"bar"
	  });
	  $progressBar.append($bar).appendTo($elem);
	}
	function start() {
	  //reset timer
	  percentTime = 0;
	  isPause = false;
	  //run interval every 0.01 second
	  tick = setInterval(interval, 10);
	};
	
	function interval() {
	  if(isPause === false){
	    percentTime += 1 / time;
	    $bar.css({
	       width: percentTime+"%"
	     });
	    //if percentTime is equal or greater than 100
	    if(percentTime >= 100){
	      //slide to next item 
	      $elem.trigger('owl.next')
	    }
	  }
	}
	//pause while dragging 
	function pauseOnDragging(){
	  isPause = true;
	}    //moved callback
	function moved(){
	  //clear interval
	  clearTimeout(tick);
	  //start again
	  start();
	}


	//фиксированное меню карточки объекта//
	$('.fix_menu').affix({
		offset: {
			top: $('.header').height() + $('.top-bar').height() + 50
		}
	});

	//скролл вверх//
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 100) {
	        $('.up').fadeIn();
	    } else {
	        $('.up').fadeOut();
	    }
	});
	$('.up').click(function () {
	    $("html, body").animate({
	        scrollTop: 0
	    }, 600);
	    return false;
	});

	$('.scroller').click(function(){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 300);
		return false;
	});

	// лайк-дизлайк //
	$('.raitng .like').click(function () {
	    $(this).toggleClass('active');
	    $('.raitng .dislike').removeClass('active');
	});
	$('.raitng .dislike').click(function () {
	    $(this).toggleClass('active');
	    $('.raitng .like').removeClass('active');
	});

	// Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
	function getInternetExplorerVersion(){
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer'){
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
		}
		else if (navigator.appName == 'Netscape'){
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
		}
		return rv;
	};
	if (getInternetExplorerVersion() >= 10){
		$('.partners .item img').each(function(){
			var el = $(this);
			el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"5","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height});
				el.dequeue();
			});
			this.src = grayscaleIE10(this.src);
		});
		
		// Quick animation on IE10+ 
		$('.partners .item img').hover(
			function () {
				$(this).parent().find('img:first').stop().animate({opacity:1}, 200);
			}, 
			function () {
				$('.img_grayscale').stop().animate({opacity:0}, 200);
			}
		);
		
		function grayscaleIE10(src){
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			var imgObj = new Image();
			imgObj.src = src;
			canvas.width = imgObj.width;
			canvas.height = imgObj.height; 
			ctx.drawImage(imgObj, 0, 0); 
			var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
			for(var y = 0; y < imgPixels.height; y++){
				for(var x = 0; x < imgPixels.width; x++){
					var i = (y * 4) * imgPixels.width + x * 4;
					var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
					imgPixels.data[i] = avg; 
					imgPixels.data[i + 1] = avg; 
					imgPixels.data[i + 2] = avg;
				}
			}
			ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
			return canvas.toDataURL();
		};
	};

	/*склейка объявлений*/
	$('.more-result-item').click( function(){
		$(this).parents('.search-result-item').next('.search-result_hidden').show();
		$(this).hide();
	});

	/*Быстрые фильтры - Выбор*/
	$('.catalog-tag').click( function(){
		$(this).toggleClass('active');
	});

	/*collapse-block*/
	$('.collapse-toggle').click(function () {
		$(this).parent('.collapse-block').toggleClass('open');
		$(this).parent('.collapse-block').find('.collapse-hidden').slideToggle('');
	});

	// выравнивание при добавлении баннера сверху
	var topBanner = $('.top-banner-place').height();
	$('.top-banner .top-bar').affix({
		offset: {
			top: topBanner + 1
		}
	});

	/* boostro js, tutorial*/
	var selector = ".bootstro";
	var options = {
		nextButtonText : 'Далее',
		prevButtonText: 'Назад',
		finishButtonText: 'Закончить'
	};
	$('.tips').click(function(){
		bootstro.start(selector, options);
	});

	// перетаскивание элементов
	$(function  () {
		var adjustment;

		$(".sortable").sortable({
		  group: 'simple_with_animation',
		  pullPlaceholder: false,
		  handle: 'i.icon-move',
		  // animation on drop
		  onDrop: function  ($item, container, _super) {
		    var $clonedItem = $('<li/>').css({height: 0});
		    $item.before($clonedItem);
		    $clonedItem.animate({'height': $item.height()});

		    $item.animate($clonedItem.position(), function  () {
		      $clonedItem.detach();
		      _super($item, container);
		    });
		  },

		  // set $item relative to cursor position
		  onDragStart: function ($item, container, _super) {
		  	// Duplicate items of the no drop area
		  	if(!container.options.drop)
		  	  $item.clone().insertAfter($item);
		  	_super($item, container);

		    var offset = $item.offset(),
		        pointer = container.rootGroup.pointer;

		    adjustment = {
		      left: pointer.left - offset.left,
		      top: pointer.top - offset.top
		    };

		    _super($item, container);
		  },
		  onDrag: function ($item, position) {
		    $item.css({
		      left: position.left - adjustment.left,
		      top: position.top - adjustment.top
		    });
		  }
		});
	});

	/*закрытие доп окон на поиске с картой*/
	$('.map-modal_close').click(function () {
		$(this).parents('.map-js').hide();
	});

	/*переключение и закрытие окон чата*/
	$('.chat-button').click(function () {
		$(this).hide();
		$('.chat-wrap').show();
		$('.chat-st1').show();
		$('.scroll-pane').jScrollPane();
	});
	$('.chat .s-history').click(function () {
		$(this).parents('.chat').hide();
		$('.chat-st2').show();
		$('.scroll-pane').jScrollPane();
	});
	$('.chat .s-back').click(function () {
		$(this).parents('.chat').hide();
		$('.chat-st1').show();
		$('.scroll-pane').jScrollPane();
	});
	$('.chat .chat_w').click(function () {
		$(this).parents('.chat').hide();
		$(this).parents('div').find('.chat-st3').show();
		$('.scroll-pane').jScrollPane();
	});
	$('.chat .s-close').click(function () {
		$(this).parents('.chat').hide();
		$('.chat-button').show();
	});
	
	$('.chat .back-dialogs').click(function () {
		$(this).parents('.chat').hide();
		$('.all-dialogs').show();
		$('.scroll-pane').jScrollPane();
	});
	/*Шаблоны ответов*/
	$('.chat .s-template').click(function () {
		$(this).toggleClass('active');
		$('.chat-template').slideToggle();
	});
	//открытие меню смайлов//
	$(".emojionearea").emojioneArea({
		pickerPosition: "top",
		tones: false,
		autocomplete: false
	});
	$('.note-item_close').click(function () {
		$(this).parent('div').hide();
	});
	$('.chat-more').click(function () {
		$(this).hide();
		$(this).siblings('.hidden_chat-item').slideDown(function () {
			$('.scroll-pane').jScrollPane();
		});
	});

	// отзывы
	$('.review-action_answer').click(function () {
		$(this).hide();
		$(this).siblings('.review-action_form').slideDown();
	});
	$('.review-action_form .cancel').click(function () {
		$(this).parents('.review-action_form').hide();
		$(this).parents('.review-action_form').siblings('.review-action_answer').show();
	});

	// универсальное закрытие
	$('.js-close').click(function () {
		$(this).parents('.js-parent').hide();
	});

});
/*new bootstrap date- & time-picker*/
$(function () {
    $('.datetimepicker').datetimepicker({
        locale: 'ru',
        sideBySide: true
    });
    $('.datepicker1').datetimepicker({
        locale: 'ru',
        format: 'L'
    });
});

//Валидация форм
function showError(container, errorMessage) {
  container.className = 'error-field';
  var msgElem = document.createElement('span');
  msgElem.className = "hint";
  msgElem.innerHTML = errorMessage;
  container.appendChild(msgElem);
}

function resetError(container) {
  container.className = 'register-form_field';
  if (container.lastChild.className == "hint") {
    container.removeChild(container.lastChild);
  }
}

function validate(form) {
  var elems = form.elements;

  resetError(elems.company.parentNode);
  if (!elems.company.value) {
    showError(elems.company.parentNode, 'Это поле заполненно неверно. Оно должно содержать действительное название Вашей компании.');
  }

  resetError(elems.names.parentNode);
  if (!elems.names.value) {
    showError(elems.names.parentNode, 'Это поле заполненно неверно. Оно должно содержать Ваше имя.');
  }

   resetError(elems.secondname.parentNode);
  if (!elems.secondname.value) {
    showError(elems.secondname.parentNode, 'Это поле заполненно неверно. Оно должно содержать Вашу Фамилию.');
  }

  resetError(elems.phone.parentNode);
  if (!elems.phone.value) {
    showError(elems.phone.parentNode, 'Это поле заполненно неверно. Оно должно содержать действительный номер Вашего телефона.');
  }

  resetError(elems.mail.parentNode);
  if (!elems.mail.value) {
    showError(elems.mail.parentNode, 'Это поле заполненно неверно. Оно должно содержать действительный адрес Вашей электронной почты.');
  }

  resetError(elems.codes.parentNode);
  if (!elems.codes.value) {
    showError(elems.codes.parentNode, 'Это поле заполненно неверно. Оно должно содержать полученный в смс-сообщении четырехзначный код.');
  }
}

//Переключение вкладок
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

//Центрирование модальных окон
function centerModals(){
  $('.modal').each(function(i){
    var $clone = $(this).clone().css('display', 'block').appendTo('body');
    var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
    top = top > 0 ? top : 0;
    $clone.remove();
    $(this).find('.modal-content').css("margin-top", top);
  });
}
$('.modal').on('show.bs.modal', centerModals);
$(window).on('resize', centerModals);



// маска для форм (телефон, даты)
jQuery(function($){
	var ajax = false;
	$(".phone_mask").mask("+7 (999) 999-99-99");
	$(".date_mask").mask("99.99.9999");
});

// sticky headers main page
(function() {
  var updateHeaders;

  updateHeaders = function() {
    return $('.single-item').each(function() {
      var el, hh, floatingHeader, offset, scrollTop;
      el = $(this);
      hh = $('.top-bar');
      offset = el.offset();
      scrollTop = $(window).scrollTop();
      floatingHeader = $('.floating-header', this);
      if ((scrollTop > offset.top - hh.height()) && (scrollTop < offset.top + el.height() - floatingHeader.height() - hh.height())) {
        floatingHeader.addClass('visible');
        floatingHeader.css('position', 'fixed');
        return floatingHeader.css('top', '34px'); 
      } else if (scrollTop < offset.top) {
        return floatingHeader.removeClass('visible');
      } else {
        floatingHeader.css('position', 'absolute');
        return floatingHeader.css('top', el.height() - floatingHeader.outerHeight() + 'px');
      }
    });
  };

  $(function stickyHeaders() {
    $('.single-item').each(function(i) {
      var clonedHeader, thisHeader;
      thisHeader = $('.separator', this);
      clonedHeader = thisHeader.clone();
      thisHeader.before(clonedHeader);
      clonedHeader.addClass('floating-header');
      clonedHeader.css('position', 'fixed');
      clonedHeader.css('top', '34px'); // отступ для topbar
      return clonedHeader.removeClass('visible');
    });
    updateHeaders();
    return $(window).scroll(updateHeaders);
  });

}).call(this);



/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});