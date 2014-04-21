var gaana = namespace('gaana');

gaana.StubAjaxUtil = Class({

    constructor:function () {
    	
    },

    processRequest: function(url, method, requestData, fHandler, objectContext ){
    	if(url == "suggestion"){
    		var msg = "kishore kumar,kishori balal,kishore sahu,kishor nadalskar,kishori amonkar,kishore kumar romantic hits"
    		fHandler.call(objectContext, msg);
    	}
    }
}).create();
