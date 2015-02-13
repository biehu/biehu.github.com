var number_of_pictures = 32; 

function show_pictures () {
	var while_pictures = 1;
	while(while_pictures <= number_of_pictures) {
		var new_image = new Element('img', {
			'src': 'thumbs/' + while_pictures + '.jpg',
			'id': 'image_' + while_pictures,
			'events': {
				'click': function(){
					$('display_picture_img').innerHTML = "<img src=\"" + this.src.replace('thumbs/', 'pictures/') + "\" id=\"big_picture\" class=\"" + this.id + "\" />";
					$('display_picture_container').fade(1);
					$('big_picture').fade(.999999);
					$('controls_vert').setStyle('display', 'none');
					
					if(this.id.replace('image_', '')==1) {
						$('left').set('class', 'deactivated');	
						$('right').erase('class');	
					} else if(this.id.replace('image_', '')==number_of_pictures) {
						$('left').erase('class');	
						$('right').set('class', 'deactivated');	
					} else {
						$('left').set('class', 'activated');	
						$('right').erase('class');
					}
					
					$('controls_horz').setStyle('display', 'block');
					
					if(Browser.Engine.trident4) { $('left').tween('margin-left', '143px'); } else { $('left').tween('margin-left', '286px'); }
				}
			}
		});
		
		new_image.inject($('inside'));
		
		// preload all of the images
		var preload_image = new Element('img', {
			'src': 'pictures/' + while_pictures + '.jpg',
			'class': 'hide'
			
		});
		preload_image.inject($('container'));
		
		// NOTE: I didn't create an alt attribute because it won't be seen by anyone here anyway.
		while_pictures++;
	}
	
}
window.addEvent('domready', function() {	
									 
	show_pictures();
	
	$('display_picture_container').fade('hide');
	
	var vertical_moves = 0;
	var rows = Math.ceil(number_of_pictures/5); 
	
	if(rows>5) {
	
		$('up').addEvent('click', function(event){
			if(!$('up').hasClass('deactivated')) {
				vertical_moves--;
				$('down').erase('class');
				$('inside').tween('margin-top', '-'+ (64 * vertical_moves) +'px');
				if (vertical_moves==0) {
					$('up').set('class', 'deactivated');	
				}
			}
		});
		
		
		$('down').addEvent('click', function(event){
			if(!$('down').hasClass('deactivated')) {
				vertical_moves++;
				$('up').erase('class');	
				$('inside').tween('margin-top', '-'+ (64 * vertical_moves) +'px');
				if(vertical_moves == (rows-5)) {
					$('down').set('class', 'deactivated');	
				}
			}
		});
	} else {
		$('up').set('class', 'deactivated');	
		$('down').set('class', 'deactivated');	
	}
	
	var current_id = 1;
	
	$('left').addEvent('click', function(){
		if(!$('left').hasClass('deactivated')) {
			current_id = $('big_picture').get('class').replace('image_', '');
			current_id--;
			$('big_picture').fade('hide');
			$('big_picture').set('src', 'pictures/' + current_id + '.jpg');
			$('big_picture').fade(1);
			$('big_picture').set('class', 'image_' + current_id);
			if(current_id==1) { $('left').set('class', 'deactivated'); }
			if(current_id==(number_of_pictures-1)) { $('right').erase('class');  }
		} 
	});
	
	$('right').addEvent('click', function(){
		if(!$('right').hasClass('deactivated')) {
			current_id = $('big_picture').get('class').replace('image_', '');
			current_id++;
			$('big_picture').fade('hide');
			$('big_picture').set('src', 'pictures/' + current_id + '.jpg');
			$('big_picture').fade(1);
			$('big_picture').set('class', 'image_' + current_id);
			if(current_id==2) { $('left').erase('class'); }
			if(current_id==number_of_pictures) { $('right').set('class', 'deactivated'); }
		} 
	});
	
	$('display_picture_img').addEvent('click', function(){
		$('display_picture_container').fade(0);
		$('big_picture').fade(0);
		if(Browser.Engine.trident4) { $('up').setStyle('margin-left', '143px'); } else { $('up').setStyle('margin-left', '286px'); }
		$('controls_horz').setStyle('display', 'none');
		$('controls_vert').setStyle('display', 'block');
		$('left').tween('margin-left', '7px');
		$('up').tween('margin-left', '7px');
	});

});