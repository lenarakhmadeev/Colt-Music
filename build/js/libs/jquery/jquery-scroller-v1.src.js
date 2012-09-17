/*

	jQuery Scroller v.1.0
	http://www.maxvergelli.com/jquery-scroller/
	
	Copyright (c) 2012 Max Vergelli
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

*/

(function ($) {
	$.fn.PlayScroller = function(){
		this.children().stop();
		this.children().trigger('marquee',['resume']);
	};
	$.fn.PauseScroller = function(){
		this.children().stop();
	};
	$.fn.ResetScroller = function(options){
		this.children().stop();
		this.children().unbind('marquee');
		options = $.extend(this.data(), options);
		this.SetScroller(options);
	};
	$.fn.RemoveScroller = function(){
		this.children().stop();
		this.children().css({ top:0, left:0 });
		this.children().unbind('marquee');
	};
	$.fn.SetScroller = function (options) {
		var _ = { me: this };
		options = $.extend({ 
								velocity: 50,
								direction: 'horizontal',
								startfrom: 'right',
								loop: 'infinite',
								movetype: 'linear',
								onmouseover: 'pause',
								onmouseout: 'play',
								onstartup: 'play',
								cursor: 'pointer'
							}, 
							options);
		var velocity = typeof options.velocity == 'number' ? parseInt(options.velocity) : 50;
		var direction = options.direction.toLowerCase();
		var startfrom = options.startfrom.toLowerCase();
		var loop = typeof options.loop == 'number' && options.loop > 0 ? parseInt(options.loop) : -1; 
		var movetype = options.movetype.toLowerCase(); //TODO: 'linear' or 'pingpong'
		var onmouseover = options.onmouseover.toLowerCase();
		var onmouseout = options.onmouseout.toLowerCase();
		var onstartup = options.onstartup.toLowerCase();
		var cursor = options.cursor.toLowerCase();
		_.me.data(options);
		main();
		function main() {
			_.me.css('cursor',cursor);
			if(direction=='horizontal'){
				if(startfrom!='right' && startfrom!='left'){ startfrom='right'; };
				scrollHorizontal();
			}else{
				if(startfrom!='bottom' && startfrom!='top'){ startfrom='bottom'; };
				scrollVertical();
			};
			if(onmouseover=='play'){
				_.me.mouseover(function(){
					$(this).children().stop();
					$(this).children().trigger('marquee',['resume']);
				});
			}else{
				_.me.mouseover(function(){
					$(this).children().stop();
				});
			};
			if(onmouseout=='play'){
				_.me.mouseout(function(){
					$(this).children().stop();
					$(this).children().trigger('marquee',['resume']);
				});
			}else{
				_.me.mouseout(function(){
					$(this).children().stop();
				});
			};
			if(onstartup!='play'){
				_.me.children().stop();
			};
		};

		function scrollVertical(){
			_.me.children().bind('marquee', function(event,c) {
				var ob = $(this);
				var sh = parseInt(ob.parent().height());
				var th = parseInt(ob.height());
				var tt = parseInt(ob.position().top);
				var v  = velocity>0 && velocity<100 ? (100-velocity)*100 : 5000;
				var dr = parseInt(v*th/100)+v;
				if(movetype=='pingpong'){
					switch(startfrom){
					case 'bottom':
						if(typeof c == 'undefined'){ob.css({ top: sh-th });};
						sh = tt - (th + sh);
						break;
					default:
						if(typeof c == 'undefined'){ob.css({ top: 0 });};
						sh += tt + th;
					};
				}else{
					switch(startfrom){
					case 'bottom':
						if(typeof c == 'undefined'){
							ob.css({ top: sh });
							sh = -th;
						}else{
							sh = tt - (th + sh);
						};
						break;
					default:
						if(typeof c == 'undefined'){
							ob.css({ top: -th });
						}else{
							sh += tt + th;
						};
					};
				};
				if(loop<0 || loop>0){
					if(loop>0){loop--;};
					ob.animate(	{top:sh},
							{	duration:dr,
								easing:'linear',
								complete:function(){ob.trigger('marquee');},
								step:function(){
									switch(movetype){
									case 'pingpong':
										if(startfrom == 'bottom'){
											if(parseInt(ob.position().top) <= 0){
												startfrom='top';
												ob.stop();
												ob.trigger('marquee');
											};
										}else{
											if(parseInt(ob.position().top)+parseInt(ob.height()) >= parseInt(ob.parent().height())){
												startfrom='bottom';
												ob.stop();
												ob.trigger('marquee');
											};
										};
										break;
									default:
										if(startfrom == 'bottom'){
											if(parseInt(ob.position().top) < -parseInt(ob.height())){
												ob.stop();
												ob.trigger('marquee');
											};
										}else{
											if(parseInt(ob.position().top) > parseInt(ob.parent().height())){
												ob.stop();
												ob.trigger('marquee');
											};
										};
									};
								}
							});
				};
			}).trigger('marquee');
		};
		
		function scrollHorizontal(){
			_.me.children().bind('marquee', function(event,c) {
				var ob = $(this);
				var sw = parseInt(ob.parent().width());
				var tw = parseInt(ob.width());
				var tl = parseInt(ob.position().left);
				var v  = velocity>0 && velocity<100 ? (100-velocity)*100 : 5000;
				var dr = parseInt(v*tw/100)+v;				
				if(movetype=='pingpong'){
					switch(startfrom){
					case 'right':
						if(typeof c == 'undefined'){ob.css({ left: sw-tw });};
						sw = tl - (tw + sw);
						break;
					default:
						if(typeof c == 'undefined'){ob.css({ left: 0 });};
						sw += tl + tw;
					};
				}else{
					switch(startfrom){
					case 'right':
						if(typeof c == 'undefined'){	
							ob.css({ left: sw });
							sw = -tw;
						}else{
							sw = tl - (tw + sw);
						};
						break;
					default:
						if(typeof c == 'undefined'){						
							ob.css({ left: -tw });
						}else{
							sw += tl + tw;
						};
					};
				};
				if(loop<0 || loop>0){
					if(loop>0){loop--;};
					ob.animate(	{left:sw},
							{	duration:dr,
								easing:'linear',
								complete:function(){ob.trigger('marquee');},
								step:function(){
									switch(movetype){
									case 'pingpong':
										if(startfrom == 'right'){
											if(parseInt(ob.position().left) <= 0){
												startfrom='left';
												ob.stop();
												ob.trigger('marquee');
											};
										}else{
											if(parseInt(ob.position().left)+parseInt(ob.width()) >= parseInt(ob.parent().width())){
												startfrom='right';
												ob.stop();
												ob.trigger('marquee');
											};
										};
										break;
									default:
										if(startfrom == 'right'){
											if(parseInt(ob.position().left) < -parseInt(ob.width())){
												ob.stop();
												ob.trigger('marquee');
											};
										}else{
											if(parseInt(ob.position().left) > parseInt(ob.parent().width())){
												ob.stop();
												ob.trigger('marquee');
											};
										};
									};
								}
							});					
				};
			}).trigger('marquee');
		};

		return this;
	};
})(jQuery);
