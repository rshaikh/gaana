var gaana = namespace('gaana');

gaana.GaanaModel = Class( {
	constructor : function(ajaxUtil, suggestionHandler, scrollDetector) {
		this.scrollDetector = scrollDetector;
		this.ajaxUtil = ajaxUtil;
		this.suggestionHandler = suggestionHandler;
		this.searchQuery = ko.observable("");
		this.escapedSearchQuery = "";
		this.suggestionUrl = "../api/getsuggestions";
		this.searchSongUrl = "http://source.rashids.in/api.php?__call=search.getResults&q="
		this.xhr = null;
		this.songs = ko.observableArray([]);
		this.pageNo = 1;
		this.scrollDetector.registerScrollListener("#dataGrid", this, this.onEndOfScroll);
	},
	
	loadSuggestion: function(self) {
		self.escapedSearchQuery = self.searchQuery().replace(/ /g, ';');
		var url = this.suggestionUrl + "?query=" + self.escapedSearchQuery;
		if(this.xhr != null){
			this.xhr.abort();
		}
//		this.xhr = this.ajaxUtil.processRequest(url, "GET", {}, this.onSuggestion, this);
	},
	
	onSuggestion: function(response) {
		var suggestions = response.split(',');
		this.suggestionHandler.setSuggestion(suggestions);
		$("#searchQuery").trigger('keydown');
	},
	
	searchSongs: function() {
		this.escapedSearchQuery = $("#searchQuery").val().replace(/ /g, ';');
		var url = this.searchSongUrl +  this.escapedSearchQuery + "&p=1&_marker=0&_format=json";
		if(this.xhr != null){
			this.xhr.abort();
		}
		$(".loading").show();
		this.xhr = this.ajaxUtil.processRequest(url, "GET", {}, this.onSongSearch, this);
	},
	
	onSongSearch: function(response) {
		var parsedResponse  = jQuery.parseJSON(response);
		this.songs.removeAll();
		this.pageNo = 1;
		this.songs(parsedResponse.results);
		$(".loading").hide();
	},
	
	onEndOfScroll: function() {
		this.loadMoreSongs();
	},
	
	loadMoreSongs: function() {
		this.pageNo++;
		var url = this.searchSongUrl + "?query=" + this.escapedSearchQuery + "&p=" + this.pageNo;
		if(this.xhr != null){
			this.xhr.abort();
		}
		$(".loading").show();
		this.xhr = this.ajaxUtil.processRequest(url, "GET", {}, this.onLoadMoreSongs, this);
	},
	
	onLoadMoreSongs: function(response) {
		var parsedResponse  = jQuery.parseJSON(response);
		var results = parsedResponse.results;
		for ( var i = 0; i < results.length; i++) {
			this.songs.push(results[i]);
		}
		$(".loading").hide();
	},
	
	isFirstPageLoaded: function() {
		return (this.songs().length >= 1) ? true : false;
	},
	
	download: function(mediaUrl) {
		window.open(mediaUrl)
	},
	
	addToPlaylistAndPlay: function(index) {
//		this.gaanaplayer.addAndPlay(this.songs()[index]);
		jPlaylist.add(this.getTrack(index),true);
	},
	
	addToPlaylist: function(index) {
//		this.gaanaplayer.add(this.songs()[index]);
		jPlaylist.add(this.getTrack(index));
	},
	
	getTrack: function(index) {
		var selectedTrack = this.songs()[index];
		return {
			title : selectedTrack.song,
			artist : selectedTrack.singers,
			mp3 : selectedTrack.media_url,
			poster : selectedTrack.image
		};
	},
	
	showPlaylist: function() {
		$('.jp-playlist').slideToggle(800);
	}
	
}).create();