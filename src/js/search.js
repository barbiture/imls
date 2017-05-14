var flagSuppressCheckboxes = false;
var rc_autofilterTimeout = null;


function changeRadio(_event) {
	var $radio = jQuery(this);
	var $select = $radio.parents('.rent-form-select:eq(0)');

	$select.find('.fiction .text').html($radio.next('label').text()).attr('title', $radio.next('label').text()).removeClass('disabled');
	$select.removeClass('open').addClass('full');
}

function rc_closeOpenedSelects() {
	jQuery('.rent-form-select.open').each(function() {
		var $select = jQuery(this);

		if ($select.hasClass('autofilter')) {
			$select.find('.contain > .search > .list input[type="checkbox"]:checked, .contain > .search > .list input[type="checkbox"].backup').each(function() {
				var $INPUT = jQuery(this);

				if ($INPUT.hasClass('backup')) {
					if (!$INPUT.prop('checked')) {
						$INPUT.prop('checked', true).attr('checked', 'checked');
					}

					$INPUT.removeClass('backup');
				} else {
					$INPUT.prop('checked', false).removeAttr('checked');
				}
			});
			$select.find('.contain > .selected > .list > ul').empty();
		}

		$select.toggleClass('open');
	});
}

function rc_updateSelectedList($_select, _flagOnOpen) {
	var $list_selected = $_select.find('.contain > .selected > .list');
	if ($list_selected.length == 0) {
		return false;
	}
	$list_selected.empty();

	if (typeof(_flagOnOpen) === 'undefined') {
		_flagOnOpen = false;
	}

	var $list_filtered = $_select.find('.contain > .search > .list > ul').clone();

	var $filter = $list_filtered.find('li').filter(function() {
		return (jQuery(this).find('div.element > input[type="checkbox"]:checked').length ? true : false);
	});

	jQuery('li', $list_filtered).not($filter).each(function() {
		jQuery(this).remove();
	});

	$list_filtered.find('li').each(function() {
		var $LI = jQuery(this).show();
		var $INPUT = $LI.find('> .element input[type="checkbox"]');

		$LI.data('id', $INPUT.val());

		if (_flagOnOpen) {
			$_select.find('.contain > .search > .list > ul input[value=' + $INPUT.val() + ']').addClass('backup');
		}

		$INPUT.remove();

		$LI.find('div.switch').addClass('expanded disabled');
		$LI.find('ul').show();

		$LI.find('> .element').append('<a class="remove" href="#" title="Убрать"></a>');
	});

	$list_selected.append($list_filtered);
}

$(document).ready(function() {

	$('body').on('click', function(_event) {
		rc_closeOpenedSelects();
	});

	// Элементы выбора вариантов
	$('body').on('click', '.rent-form-select', function(_event) {
		_event.preventDefault();
		_event.stopImmediatePropagation();

		var $select = $(this);

		if ($select.hasClass('disabled')) {
			return false;
		}

		if (!$select.hasClass('open')) {
			rc_closeOpenedSelects();

			if (!$select.hasClass('autofilter')) {
				$select.find('.contain').css('width', $select.outerWidth(true) - 10);
			}
		}

		$select.toggleClass('open');

		if ($select.hasClass('open') && $select.hasClass('autofilter')) {
			$select.find('.contain > .search > .control input[type="text"]').focus();

			rc_updateSelectedList($select, true);
		}
	}).on('focus', '.rent-form-select', function() {
		$(this).blur();
	});

	$('body').on('click', '.rent-form-select > .fiction div.clear', function(_event) {
		_event.preventDefault();
		_event.stopImmediatePropagation();

		if (flagSuppressCheckboxes) {
			return false;
		}

		flagSuppressCheckboxes = true;

		var $select = $(this).parents('.rent-form-select:eq(0)');
		var $form = $select.parents('form:eq(0)');
		var $list = $select.find('> .contain' + ($select.hasClass('autofilter') ? ' > .search > .list' : '') + ' > ul');
		var $resultField = $select.find('> div.fiction div.text');

		$list.find('input[type="checkbox"]:checked, input[type="radio"]').each(function() {
			$(this).prop('checked', false).removeAttr('checked');
		});

		$resultField.html($resultField.attr('rel')).removeAttr('title').addClass('disabled');
		$select.removeClass('full');

		if ($select.hasClass('reset-ajax_h_price_types')) {
			$form.find('.ajax_h_price_types-placeholder').removeClass('hidden');
			$form.find('.ajax_h_price_types').addClass('hidden').empty();
		}
		if ($select.hasClass('reset-ajax_h_contract_type_and_timerent')) {
			$form.find('.ajax_h_contract_type_and_timerent-placeholder').removeClass('hidden');
			$form.find('.ajax_h_contract_type_and_timerent').addClass('hidden').empty();
		}

		if ($select.hasClass('reset-ajax_c_area')) {
			$form.find('.ajax_c_area-placeholder').removeClass('hidden');
			$form.find('.ajax_c_area').addClass('hidden').empty();
		}
		if ($select.hasClass('reset-ajax_c_dogovor_view')) {
			$form.find('.ajax_c_dogovor_view-placeholder').removeClass('hidden');
			$form.find('.ajax_c_dogovor_view').addClass('hidden').empty();
		}
		if ($select.hasClass('reset-ajax_c_term_of_lease')) {
			$form.find('.ajax_c_term_of_lease-placeholder').removeClass('hidden');
			$form.find('.ajax_c_term_of_lease').addClass('hidden').empty();
		}

		if ($select.hasClass('reset-ajax_streets')) {
			$form.find('.ajax_streets-placeholder').removeClass('hidden');

			var $select_ajax = $form.find('.ajax_streets');
			$select_ajax.addClass('hidden').find('> .contain' + ($select_ajax.hasClass('autofilter') ? ' > .search > .list' : '') + ' > ul').empty();
		}

		flagSuppressCheckboxes = false;
	});

	$('body').on('click', '.rent-form-select > .contain ul.tree li > .switch', function(_event) {
		_event.preventDefault();
		_event.stopImmediatePropagation();

		var $el = $(this).parents('li:eq(0)').find('> .switch');

		if (!$el.hasClass('disabled')) {
			$el.toggleClass('expanded');

			$el.parent().find('> ul').toggle(0, function() {});
		}
	});

	$('body').on('click', '.rent-form-select > .contain', function(_event) {
		_event.stopImmediatePropagation();
	});

	$('body').on('click', '.rent-form-select > .contain label', function(_event) {
		_event.preventDefault();

		$(this).parent().find('input').click();
	});


	// обработка выбора: несколько из ...
	$('body').on('change', '.rent-form-select > .contain input[type="checkbox"]', function(_event) {
		if (flagSuppressCheckboxes) {
			return false;
		}

		flagSuppressCheckboxes = true;

		var $checkbox = $(this);
		var $contain = $checkbox.parents('div.contain:eq(0)');
		var $select = $contain.parents('.rent-form-select:eq(0)');
		var $resultField = $select.find('> div.fiction div.text');
		var $form = $select.parents('form:eq(0)');

		$checkbox.parents('li:eq(0)').find(($select.hasClass('filtered') ? 'li.by_filter ' : '') + 'input[type="checkbox"]').each(function() {
			if ($checkbox.is(':checked')) {
				$(this).prop('checked', true).attr('checked', 'checked');
			} else {
				$(this).prop('checked', false).removeAttr('checked');
			}
		});

		if ($select.hasClass('autofilter') && $select.find('> .contain > .selected').length) {
			rc_updateSelectedList($select);
		} else {
			var result = '';

			$contain.find('input[type="checkbox"]:checked').each(function() {
				result += (result.length ? ', ' : '') + $(this).next().html();
			});

			if (result.length) {
				$resultField.html(result).attr('title', result).removeClass('disabled');
				$select.addClass('full');
			} else {
				$resultField.html($resultField.attr('rel')).removeAttr('title').addClass('disabled');
				$select.removeClass('full');

				switch ($checkbox.attr('name')) {
					case 'place[]':
						$form.find('.ajax_streets-placeholder').removeClass('hidden');
						$form.find('.ajax_streets').addClass('hidden').empty();
						break;
				}
			}
		}

		flagSuppressCheckboxes = false;
	});

	$('body').on('keyup', '.rent-form-select.autofilter .contain > .search > .control input[type="text"]', function(_event) {
		if (typeof(rc_autofilterTimeout) === 'number') {
			window.clearTimeout(rc_autofilterTimeout);
			delete rc_autofilterTimeout;
		}

		var $INPUT = $(this);

		rc_autofilterTimeout = window.setTimeout(function() {

			var phrase = $INPUT.val().toUpperCase();
			var $list = $INPUT.parents('.search:eq(0)').find('> .list > ul');
			var $select = $INPUT.parents('.rent-form-select:eq(0)');

			if (phrase.length) {
				$select.addClass('filtered');

				var $list_filtered = $list.find('li').filter(function(_index) {
					var text = $(this).find('label').text();

					return (text.toUpperCase().indexOf(phrase) >= 0)
				});

				$('li', $list).not($list_filtered).each(function() {
					$(this).removeClass('by_filter').hide();
				});
				$list_filtered.each(function() {
					$(this).addClass('by_filter').show();
				});
			} else {
				$select.removeClass('filtered');

				$list.find('li').each(function() {
					$(this).removeClass('by_filter').show();
				});
			}

			delete rc_autofilterTimeout;
		}, 250);
	});

	$('body').on('click', '.rent-form-select.autofilter .contain > .selected > .list li a.remove', function(_event) {
		_event.preventDefault();

		var $LI = $(this).parents('li:eq(0)');
		var $select = $LI.parents('.rent-form-select:eq(0)');
		var $INPUT = $select.find('.contain > .search > .list .element input[value="' + $LI.data('id') + '"]');

		$INPUT.parents('li:eq(0)').find('input[type="checkbox"]:checked').each(function() {
			$(this).prop('checked', false).removeAttr('checked');
		});

		rc_updateSelectedList($select);
	});

	$('body').on('click', '.rent-form-select.autofilter .contain > .selected > .control a.clear', function(_event) {
		_event.preventDefault();

		var $select = $(this).parents('.rent-form-select:eq(0)');

		$select.find('.contain > .search > .list input[type="checkbox"]:checked').each(function() {
			var $INPUT = $(this);

			$INPUT.prop('checked', false).removeAttr('checked');
		});
		$select.find('.contain > .selected > .list > ul').empty();
	});

	$('body').on('click', '.rent-form-select.autofilter .contain > .selected > .control a.apply', function(_event) {
		_event.preventDefault();

		var $select = $(this).parents('.rent-form-select:eq(0)');
		var $resultField = $select.find('> .fiction .text');
		var $form = $select.parents('form:eq(0)');

		var result = '';
		var result_id = '';

		var flagAJAXPlaces = $select.hasClass('ajax_places');

		$select.find('.contain > .search > .list input[type="checkbox"].backup').removeClass('backup');

		$select.find('.contain > .search > .list input[type="checkbox"]:checked').each(function() {
			var $INPUT = $(this);

			result += (result.length ? ', ' : '') + $INPUT.parent().find('label').html();

			if (flagAJAXPlaces) {
				result_id += (result_id.length ? '|' : '') + $INPUT.val();
			}
		});

		if (result.length) {
			$resultField.html(result).attr('title', result).removeClass('disabled');
			$select.addClass('full');

			if (flagAJAXPlaces) {
				$.fancybox.showLoading();

				$.ajax({
					url: '/search/ajax/getByPlaceId/',
					type: 'POST',
					cache: false,
					async: true,
					data: 'id=' + result_id,
					dataType: 'html',
					error: function(_XHR, _status, _error) {
					},
					success: function(_response, _status, _XHR) {
						if (_response != null) {
							var $select_ajax = $form.find('.ajax_streets');
							var $placeholder = $form.find('.ajax_streets-placeholder');
							if (_response.length) {
								$placeholder.addClass('hidden');
								if ($select_ajax.hasClass('autofilter')) {
									$select_ajax.find('.contain > .search > .list').html(_response)
								} else {
									$select_ajax.html(_response)
								}
								$select_ajax.stop(true);
								$select_ajax.removeClass('full hidden').css({
									'boxShadow': '0 0 8px #19A6CE'
								}).animate({
									'boxShadow': '0 0 0 #F7F9FA'
								}, 2000);
							} else {
								$placeholder.removeClass('hidden');
								if ($select_ajax.hasClass('autofilter')) {
									$select_ajax.addClass('hidden').find('.contain > .search > .list').empty();
								} else {
									$select_ajax.addClass('hidden').empty();
								}
							}
							var $resultField = $select_ajax.find('> div.fiction div.text');
							$resultField.html($resultField.attr('rel')).removeAttr('title').addClass('disabled');
						}
					},
					complete: function(_event, _XHR, _options) {
						$.fancybox.hideLoading();
					}
				});
			}
		} else {
			$resultField.html($resultField.attr('rel')).removeAttr('title').addClass('disabled');
			$select.removeClass('full');

			if (flagAJAXPlaces) {
				$form.find('.ajax_streets-placeholder').removeClass('hidden');
				$form.find('.ajax_streets').addClass('hidden').empty();
			}
		}

		$select.removeClass('open');
	});
});

