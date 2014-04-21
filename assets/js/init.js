$(document).ready(function() {
	var suggestionHandler = new gaana.SuggestionHandler();
	var ajaxUtil = new gaana.AjaxUtil();
//	var stubAjaxUtil = new gaana.StubAjaxUtil();
//	var gaanaplayer = new gaana.GaanaPlayer();
//	var GaanaModel = new gaana.GaanaModel(ajaxUtil, suggestionHandler, gaanaplayer);
	var scrollDetector = new gaana.ScrollDetector();
	var GaanaModel = new gaana.GaanaModel(ajaxUtil, suggestionHandler, scrollDetector);
	ko.applyBindings(GaanaModel);
	
	jPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [], {
		swfPath: "assets/js/thirdparty/jQuery.jPlayer.2.3.0",
		supplied: "mp3",
		wmode: "window",
		smoothPlayBar: true,
		keyEnabled: true,
		playlistOptions: {
		    enableRemoveControls: true
		},
	});
});