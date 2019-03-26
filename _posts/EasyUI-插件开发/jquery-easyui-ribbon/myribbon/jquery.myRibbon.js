(function($){

	function buildTabs(target){
		var options = $.data(target,"ribbon").options;
		$(target).tabs(options);
	}

	function loadData(target,data){
		debugger;
		var r = $(target);
		var options = $.data(target,"ribbon").options;
		options.data = data;
		for (var i = 0; i < data.tabs.length; i++) {
			var tab = data.tabs[i];
			r.tabs("add",tab);
			var tabTarget = r.tabs("getTab",i);
			buildGroup(tab.groups,tabTarget);
		}
	}

	function buildGroup(groups,tabTarget){
		for (var i = 0; i < groups.length; i++) {
			var group = groups[i];
			var g = $('<div class="ribbon-group"></div>').appendTo(tabTarget);
		    $('div class="ribbon-toolbar"></div>').appendTo(g);
			$('<div class="ribbon-title"></div>').html(group.title).appendTo(g);
		}
	}

  	$.fn.ribbon = function(options,para){
  		debugger;
  		// if (typeof options == "string") {
  		// 	var method = $.fn.ribbon.methods[options];
  		// 	if (method) {
  		// 		return method(this,para);
  		// 	}else{

  		// 	}

  		// }
  		return this.each(function(){
  			var state = $.data(this,"ribbon");
  			if (state) {
  				$.extend(state.options,options);
  			}else{
  				state = $.data(this,"ribbon",{options:$.extend({},$.fn.ribbon.defaults,$.fn.ribbon.parseOptions(this),options)})
  			}
  			buildTabs(this);
  			if (state.options.data) {
  				loadData(this,state.options.data);
  			}
  			
  		})
  	}

  	$.fn.ribbon.methods = {
  		options:function(jq){
  			return $.data(jq[0],"ribbon").options;
  		}
  	}

  	$.fn.ribbon.parseOptions = function(target){
  		return $.extend({},$.fn.tabs.parseOptions(target),{});
  	}

  	$.fn.ribbon.defaults = $.extend({},$.fn.tabs.defaults);

	$.parser.plugins.push('ribbon');
})(jQuery);