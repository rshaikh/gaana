var gaana = namespace('gaana');

gaana.GaanaPlayer = Class({
	constructor : function() {
		this.sound = null;
		this.playlist = ko.observableArray();
		this.currentTrackNo = ko.observable(0);
		this.audio = $('#audio_core')[0];
		this.totalDuration = ko.observable('0:00');
		this.currentDuration=ko.observable('0:00');
		var self = this;
		$(this.audio).bind("ended", function() {
			self.onSongEnded(self)
		});
		$(this.audio).bind("timeupdate", function() {
			self.onTimeUpdate(self)
		});
		
		$(this.audio).bind("playing", function() {
			self.updateTotalDuration(self)
		});
	},

	play : function() {
		var src = this.playlist()[this.currentTrackNo()].media_url;
		$(this.audio).attr('src', src);
		this.audio.play();
	},

	getTime : function(seconds) {
		var minute = Math.floor(seconds / 60);
		var usedSeconds = minute * 60;
		var remainingSeconds = seconds - usedSeconds;
		return minute + ":" + Math.round(remainingSeconds);
	},
	
	updateTotalDuration: function(self) {
		self.totalDuration(self.getTime(self.audio.duration));
		
	},

	onSongEnded : function(self) {
		self.next();
	},

	onTimeUpdate : function(self) {
		self.currentDuration(self.getTime(self.audio.currentTime));
	},

	toggle : function() {
		if (this.audio.paused && this.audio.src != "") {
			this.audio.play();
		} else if (!this.audio.paused && this.audio.src != "") {
			this.audio.pause();
		} else if (this.audio.paused && this.audio.src == "") {
			if (this.playlist().length > 0) {
				this.play();
			}
		}
	},

	next : function() {
		if (this.currentTrackNo() < this.playlist().length - 1) {
			this.currentTrackNo(this.currentTrackNo() + 1);
			this.play();
		} else {
			alert('last song in the list');
		}
	},

	prev : function() {
		if (this.currentTrackNo() > 0) {
			this.currentTrackNo(this.currentTrackNo() - 1);
			this.play();
		} else {
			alert('first song in the list');
		}
	},

	addAndPlay : function(song) {
		this.playlist.push(song);
		this.currentTrackNo(this.playlist().length - 1);
		this.play();
	},

	add : function(song) {
		this.playlist.push(song);
	},

	remove : function() {

	},

	clear : function() {
		this.playlist.removeAll();
		this.currentTrackNo(0);
		this.audio.pause();
		this.audio.src = "";
	},

	getPlaylist : function() {
		return this.playlist();
	},

	playSelectedTrack : function(index) {
		this.currentTrackNo(index);
		this.play();
	}

}).create();