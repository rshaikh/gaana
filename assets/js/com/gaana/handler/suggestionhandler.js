var gaana = namespace('gaana');

gaana.SuggestionHandler = Class( {
	constructor : function() {
		this.suggestions = [];
	},
	
	setSuggestion: function(suggestions) {
		$("#searchQuery").autocomplete({
			source : suggestions
		},"minLength", 0);
	}
}).create();