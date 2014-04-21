var gaana = namespace('gaana');

gaana.AjaxUtil = Class({

    constructor:function () {
    	
    },

    processRequest: function(url, method, requestData, fHandler, objectContext ){
        var iframe = $("#cross-domain-hook");
        iframe.attr("src", url);
        iframe.load(function() {
            alert(iframe.contents());
        });

        /*var xhr = jQuery.ajax({
			  type: method,
			  url: url,
			  data: requestData,
              dataType: "jsonp",
			  error: function(error){
//				  console.log(error);
			  }
    	
			}).done(function( msg ) {
				fHandler.call(objectContext, msg);
			});
    	return xhr;*/
    }
}).create();
