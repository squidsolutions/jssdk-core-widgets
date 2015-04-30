(function (root, factory) {
    root.squid_api.view.PaginationView = factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    var View = Backbone.View.extend({

        config : null,
        
        pagesRangeSize : 10,

        initialize : function(options) {
            this.config = options.config || squid_api.model.config;
            this.config.on("change:startIndex", this.render, this);
            this.config.on("change:pageLength", this.render, this);
            this.model.on("change:results", this.render, this);
        },
        
        events : { 
            "click li" : function(event) {
                event.preventDefault();
                var pageId = $(event.currentTarget).data("id");
                var pageSize = this.config.get("maxResults");
                this.config.set("startIndex", pageId * pageSize);
            }
        },

        render : function() {
            var pageSize = this.config.get("maxResults");
            var startIndex = this.config.get("startIndex");
            var results = this.model.get("results");
            
            if (results) {
                var totalSize = results.totalSize;
                var currentPageId = Math.floor(startIndex/pageSize);
                var totalPages = Math.ceil(totalSize/pageSize);
                var firstPageToDisplay = Math.ceil(currentPageId / this.pagesRangeSize);
                    
                var pages = [];
                // prev
                var prev;
                if (firstPageToDisplay>0) {
                    prev = { "id" : firstPageToDisplay-1};
                }
                // pages
                var pageId = 0;
                for (var i=0; ((i<this.pagesRangeSize) && (i<totalPages)); i++) {
                    pageId = firstPageToDisplay+i;
                    if (pageId == currentPageId) {
                        selected = true;
                    }
                    pages.push({ "id" : pageId, "selected" :  selected});
                }
                // next
                var next;
                if (pageId<totalPages) {
                    next = { "id" : pageId+1};
                }
                
                var html = squid_api.template.squid_api_pagination({
                    "prev" : prev,
                    "pages" : pages,
                    "next" : next
                });
                    
                this.$el.html(html);
            }

        }
    });

    return View;
}));
