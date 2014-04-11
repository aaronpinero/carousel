//	AUTHORED BY:
//	Aaron Pinero
//	Director, Web Design & Development,
//	CCIT, Columbia University
//		
//	USAGE:
//	The Carousel class takes 3 arguments:
//	- the class name (with .) of the html elements that are the items in the carousel -> item_class
//	- the id name (with #) of the html element that contains the items -> element_id
//	- the id name (with #) of the html element that contains the carousel -> container_id
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
//  Because of the quirkiness of inline block rendering, there can be no whitespace in the HTML code between the item elements

function Carousel(container_id,element_id,item_class) {
	this.id = container_id.substr(1);
	this.container = jQuery(container_id);
	this.element = jQuery(container_id).find(element_id).eq(0);
	this.items = jQuery(container_id).find(item_class);
	this.count = this.items.length; console.log('Item Count: '+this.count);
	this.element_width = undefined;
	this.item_width = undefined;
	this.visible_count = undefined;
	this.step_position = 0;
	this.overflow = undefined;
	this.UI = false;
	
	// method determines how many items in the carousel are not shown at any one time
	this.CheckOverflow = function() {
		if (this.count > 1) {
			this.element_width = this.element.outerWidth(); //console.log('Element width: '+this.element_width);
			this.item_width = this.items.eq(0).outerWidth(); //console.log('Item width: '+this.item_width);
			this.visible_count = Math.round(this.element_width/this.item_width); //console.log('Visible count: '+this.visible_count);
			if (this.visible_count != 0) {
				this.overflow = Math.ceil(this.count / this.visible_count) - 1 ;  //console.log('Overflow: '+this.overflow);
			}
		}
	};
	
	// method to create the UI elements and apply event handlers to them
	this.InitUI = function() {
		this.CheckOverflow();
		if (this.overflow != undefined && this.overflow > 0) {
			if (this.UI) {
				this.SetPosition(this.step_position);
			}
			else {
				this.container.addClass('UIenabled');
				this.container.append('<ul id="'+this.id+'_nav"></ul>');
				var x;
				for (x=0;x<=this.overflow;x++) { jQuery('#'+this.id+'_nav').append('<li class="item"></li>'); }
				this.SetIndicator();
				this.UI = true;
				
				jQuery('#'+this.id+'_nav').prepend('<li class="switch prev"></li>');
				jQuery('#'+this.id+'_nav .prev').bind('click',{ob:this},function(e){
					var s = e.data.ob.step_position - 1;
					if (s < 0) { s = e.data.ob.overflow; }
					e.data.ob.SetPosition(s);
				});
				
				jQuery('#'+this.id+'_nav').append('<li class="switch next"></li>');
				jQuery('#'+this.id+'_nav .next').bind('click',{ob:this},function(e){
					var s = e.data.ob.step_position + 1;
					if (s > e.data.ob.overflow) { s = 0; }
					e.data.ob.SetPosition(s);
				});
				
				var x;
				for (x=0;x<=this.overflow;x++) {
					jQuery('#'+this.id+'_nav .item').eq(x).bind('click',{ob:this,index:x},function(e){
						e.data.ob.SetPosition(e.data.index);
					});
				}
			}
		}
		else {
			if (this.UI) {
				this.container.removeClass('UIenabled');
				this.container.remove(this.id+'_nav');
				this.UI = false;
			}
		}
	};
	
	// method to set the position of the carousel
	this.SetPosition = function(i) {
		var indent = 0;
		if (this.count < ((i + 1)*this.visible_count)) { indent = (this.count - this.visible_count) * this.item_width; }
		else { indent = i * this.visible_count * this.item_width; }
		this.element.css('textIndent','-'+(indent)+'px');
		this.step_position = i;
		this.SetIndicator();
	};
	
	// method to set the indicator to show which carousel items are visible
	this.SetIndicator = function() {
		for (x=0;x<=this.overflow;x++) {
			if (x == this.step_position){
				jQuery('#'+this.id+'_nav .item').eq(x).addClass('showing').removeClass('notshowing');
			}
			else {
				jQuery('#'+this.id+'_nav .item').eq(x).addClass('notshowing').removeClass('showing');
			}
		}
	};
}
