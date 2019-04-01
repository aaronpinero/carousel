//	AUTHORED BY:
//	Aaron Pinero
//		
//	USAGE:
//	The Carousel class takes 3 arguments:
//	- the selector name of the html elements that are the items in the carousel -> item_class
//	- the selector name of the html element that contains the items -> element_id
//	- the selector name of the html element that contains the carousel -> container_id
//	
//	The class establishes the Carousel but does nothing more.
//	The InitUI method actually creates the HTML elements for the carousel UI.
//	All style information needs to be provided by the CSS; there is no default styling.
//
//  EXPECTED HTML STRUCTURE
//	The carousel must be a block element containing one or more items.
//	The style of the carousel must include overflow:hidden; and whitespace:nowrap;
//
//	Each item in the carousel should be an inline block element.
//  The width of the items should be a percentage of the width of the carousel.
//	The specific percent determines the number of items displayed at one time (100% = 1 at a time; 50% = 2 at a time; etc.)

function Carousel(container,ribbon,item) {
	this.container = jQuery(container); this.container.addClass('c-container');
	this.ribbon = jQuery(container).find(ribbon).eq(0); this.ribbon.addClass('c-ribbon');
	this.items = jQuery(container).find(item); this.items.addClass('c-item');
	this.count = this.items.length; console.log('Item Count: '+this.count);
	this.container_width = undefined; // width of the carousel window
	this.item_width = undefined;      // width of an item; will be less than or equal to the element width
	this.visible_count = undefined;   // visible count is determined by dividing the element width by the item width
	this.step_position = 0;
	this.overflow = undefined;        // a count of the number of "pages" that are not visible in the window at any point
	this.UI = false;
	
	jQuery(window).bind('resize',{ob:this},function(e){
  	e.data.ob.CheckOverflow();
  	e.data.ob.step_position = 0;
  	e.data.ob.SetPosition(0);
	});
	
	// method determines how many items in the carousel are not shown at any one time
	this.CheckOverflow = function() {
		if (this.count > 1) {
			this.container_width = this.container.outerWidth(); console.log('Container width: '+this.container_width);
			this.item_width = this.items.eq(0).outerWidth(); console.log('Item width: '+this.item_width);
			this.visible_count = Math.round(this.container_width/this.item_width); console.log('Visible count: '+this.visible_count);
			if (this.visible_count != 0) {
				this.overflow = Math.ceil(this.count / this.visible_count) - 1 ;  console.log('Overflow: '+this.overflow);
			}
		}
	};
	
	// method to create the UI elements and apply event handlers to them
	this.InitUI = function() {
		this.CheckOverflow();
		if (this.UI && (this.overflow != undefined && this.overflow > 0) && (this.container.find('.c-nav ul .item').length == (this.overflow + 1))) {
			this.SetPosition(this.step_position);
		}
		else {
			if (this.UI) {
				this.container.removeClass('UIenabled');
				this.container.find('.c-nav').remove();
				this.UI = false;
			}
			this.container.addClass('UIenabled');
			this.container.append('<nav class="c-nav"><ul></ul></nav>');
			var x;
			for (x=0;x<=this.overflow;x++) { this.container.find('.c-nav ul').append('<li class="item">Page '+ (x+1) +'</li>'); }
			this.SetIndicator();
			this.UI = true;
			
			this.container.find('.c-nav ul').prepend('<li class="switch prev">Previous</li>');
			this.container.find('.c-nav ul .prev').bind('click',{ob:this},function(e){
				var s = e.data.ob.step_position - 1;
				if (s < 0) { s = e.data.ob.overflow; }
				e.data.ob.SetPosition(s);
			});
			
			this.container.find('.c-nav ul').append('<li class="switch next">Next</li>');
			this.container.find('.c-nav ul .next').bind('click',{ob:this},function(e){
				var s = e.data.ob.step_position + 1;
				if (s > e.data.ob.overflow) { s = 0; }
				e.data.ob.SetPosition(s);
			});
			
			var x;
			for (x=0;x<=this.overflow;x++) {
				this.container.find('.c-nav ul .item').eq(x).bind('click',{ob:this,index:x},function(e){
					e.data.ob.SetPosition(e.data.index);
				});
			}
		}
	};
	
	// method to set the position of the carousel
	this.SetPosition = function(i) {
		var indent = 0;
		if (this.count < ((i + 1)*this.visible_count)) { indent = (this.count - this.visible_count) * this.item_width; }
		else { indent = i * this.visible_count * this.item_width; }
    this.ribbon.css('textIndent','-'+(indent)+'px');
		this.step_position = i;
		this.SetIndicator();
	};
	
	// method to set the indicator to show which carousel items are visible
	this.SetIndicator = function() {
		for (x=0;x<=this.overflow;x++) {
			if (x == this.step_position){
				this.container.find('.c-nav ul .item').eq(x).addClass('showing').removeClass('notshowing');
			}
			else {
				this.container.find('.c-nav ul .item').eq(x).addClass('notshowing').removeClass('showing');
			}
		}
	};
}
