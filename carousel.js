//	AUTHORED BY:
//	Aaron Pinero
//	aaronpinero@gmail.com
//		
//  DEPENDENCIES:
//	jQuery
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
//	The carousel is a block element containing one or more items.
//	The style of the carousel must include overflow:hidden; and whitespace:nowrap;
//
//	Each item in the carousel is an inline block element.
//  The width of the items is a percentage of the width of the carousel.
//	The specific percent determines the number of items displayed at one time (100% = 1 at a time; 50% = 2 at a time; etc.)
//  Because of the quirkiness of inline block rendering, there can be no whitespace in the HTML code between the item elements

function Carousel(container_id,element_id,item_class) {
	this.id = container_id.substr(1);
	this.container = jQuery(container_id);
	this.element = jQuery(container_id).find(element_id).eq(0);
	this.items = jQuery(container_id).find(item_class);
	this.count = this.items.length; // console.log('Item Count: '+this.count);
	this.element_width = undefined;
	this.item_width = undefined;
	this.visible_count = undefined;
	this.step_position = 0;
	this.overflow = undefined;
	this.UI = false;
	
	// method determines how many items in the carousel are not shown at any one time
	this.CheckOverflow = function() {
		if (this.count > 0) {
			this.element_width = this.element.outerWidth(); // console.log('Element width: '+this.element_width);
			this.item_width = this.items.eq(0).outerWidth(); // console.log('Item width: '+this.item_width);
			this.visible_count = Math.round(this.element_width/this.item_width); // console.log('Visible count: '+this.visible_count);
			this.overflow = this.count - this.visible_count; // console.log('Overflow: '+this.overflow);
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
				this.container.append('<div id="'+this.id+'_prev"></div>');
				jQuery('#'+this.id+'_prev').bind('click',{ob:this},function(e){
					var s = e.data.ob.step_position - 1;
					if (s < 0) { s = e.data.ob.overflow - 1; }
					e.data.ob.SetPosition(s);
				});
				this.container.append('<div id="'+this.id+'_next"></div>');
				jQuery('#'+this.id+'_next').bind('click',{ob:this},function(e){
					var s = e.data.ob.step_position + 1;
					if (s > e.data.ob.overflow) { s = 0; }
					e.data.ob.SetPosition(s);
				});
				this.container.append('<ul id="'+this.id+'_index"></ul>');
				var x;
				for (x=0;x<this.count;x++) { jQuery('#'+this.id+'_index').append('<li></li>'); }
				this.SetIndicator();
				this.UI = true;
			}
		}
		else {
			if (this.UI) {
				this.container.removeClass('UIenabled');
				this.container.remove(this.id+'_prev');
				this.container.remove(this.id+'_next');
				this.container.append(this.id+'_index');
				this.UI = false;
			}
		}
	};
	
	// method to set the position of the carousel
	this.SetPosition = function(i) {
		var step_size = this.items.eq(0).outerWidth();
		this.element.css('textIndent','-'+(i * step_size)+'px');
		this.step_position = i;
		this.SetIndicator();
	};
	
	// method to set the indicator to show which carousel items are visible
	this.SetIndicator = function() {
		for (x=0;x<this.count;x++) {
			if (x >= this.step_position && x < (this.visible_count+this.step_position)) {
				jQuery('#'+this.id+'_index li').eq(x).addClass('showing').removeClass('notshowing');
			}
			else {
				jQuery('#'+this.id+'_index li').eq(x).addClass('notshowing').removeClass('showing');
			}
		}
	};
}
