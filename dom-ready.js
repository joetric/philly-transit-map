// when the Doc/DOM is loaded
$(document).ready(function() {
    var map = initialize();  // initialize the map
    var container = $('.container');




    // penndot camera info window hide/open
    $("#markers a").bind("click", function(){
	var i = $(this).attr("rel");
	// close any open info windows

//	$('#map_canvas').gmap('closeInfoWindow');

	for(x=0; x < arrInfoWindows.length; x++){ 
	    arrInfoWindows[x].close(map, arrMarkers[x]); 
	    alert(x);
	}
	
	arrInfoWindows[i].open(map, arrMarkers[i]);
    });





    // open sidebar
    $('#toggle_sidebar').toggle(
	function(){
	    container.addClass('open');
	    $("#map_canvas").css({height:$(".contents").height()}).css({width:$(".contents").width()});
	}, 
	// close sidebar
	function(){
	    container.removeClass('open');
	    $("#map_canvas").css({height:$(".contents").height()}).css({width:$(".contents").width()});
	});
    
    $('.sidebar input').checked = false;
    
    // changes to sidebar....ex: clicking checkboxes
    // get values from html fields and assign to 'options'
    $('.sidebar input').live("change", function(){
	var options = {
            feed: $(this).attr("data-layer-url"),
            name: $(this).attr("data-layer-name"),
            type: $(this).attr("data-layer-type")
	};

	// if a checkbox is checked....decide what to do based on 'type'
	if (this.checked) {

	    // broken
	    if (options.type === "cameras") {  
		addPennDOTCameras(map);
	    } 

	    // penndot cams
	    else if (options.type === "penndot") {
		add_penndot(map);  
	    } 

	    // adds zipcar, pcs, penndot
	    else if (options.type === "points") {
		addPointSet(options, map);  
	    } 

	    // add traffic
	    else if (options.type === "traffic") {
		add_traffic(options, map);  
	    } 

	    // adds kml layers
	    else {
		addLayer(options, map);  
	    }
	} 

	// checkbox unchecked....remove points or kml file
	else {
	    if (options.name === "penndot-cameras") {  
		removePennDOTCameras(map);
	    } 

	    else if (options.type === "penndot") {
		remove_penndot(map);
	    } 

	    else if (options.type === "points") {
		removePointSet(options, map);
	    } 

	    else if (options.type === "traffic") {
		remove_traffic(options, map);
	    } 
	    else {
		removeLayer(options, map);
	    }
	}
	
    })
    
    
});
