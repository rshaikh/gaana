var gaana = namespace('gaana');

gaana.ScrollDetector = Class({

    constructor:function () {
    },

	registerScrollListener: function(elementId, context, fCallback) {
		$(elementId).bind('scroll', function() {
		    var scrollPosition = $(this).scrollTop() + $(this).outerHeight();
		    var divTotalHeight = $(this)[0].scrollHeight 
		                          + parseInt($(this).css('padding-top'), 10) 
		                          + parseInt($(this).css('padding-bottom'), 10)
		                          + parseInt($(this).css('border-top-width'), 10)
		                          + parseInt($(this).css('border-bottom-width'), 10);

		    if( (divTotalHeight - scrollPosition) < 10 )
		    {
		    	fCallback.call(context);
		    }
		  });
	}

}).create();