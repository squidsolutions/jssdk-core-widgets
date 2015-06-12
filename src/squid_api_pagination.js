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
            "click li.clickable" : function(event) {
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
                var firstPageToDisplay = currentPageId - this.pagesRangeSize + 1;
                if (firstPageToDisplay<0) {
                    firstPageToDisplay = 0;
                }
                    
                var pages = [];
                var pageId = firstPageToDisplay;
                var selected = (pageId == currentPageId);

                // prev
                var prev;
                if (currentPageId>0) {
                    prev = { "id" : currentPageId-1};
                }

                // first page
                var firstPage = { "id" : 0, "label" : 1, "selected" :  selected};

                // last page
                selected = (totalPages-1 == currentPageId);
                var lastPage = { "id" : totalPages-1, "label" : totalPages, "selected" :  selected};

                // Spacers
                var startSpacers, endSpacers;
                if (totalPages > 2) {
                    endSpacers = true;
                } else if (totalPages !== 2) {
                    lastPage = null;
                }

                // pages
                var pageAfterStart = 0;
                for (var i=1; ((i<this.pagesRangeSize) && (i<totalPages)); i++) {
                    pageId = firstPageToDisplay+i;
                    selected = (pageId == currentPageId);
                    if (pageId !== totalPages-1) {
                        if (pageId !== pageAfterStart + 1) {
                            startSpacers = true;
                        } else if (pageId === totalPages - 2) {
                            endSpacers = false;
                        }
                        pages.push({ "id" : pageId, "label" : (pageId+1), "selected" :  selected});
                        pageAfterStart = pageId;
                    }
                }

                // next
                var next;
                if (currentPageId<totalPages-1) {
                    next = { "id" : currentPageId+1};
                }

                var html = squid_api.template.squid_api_pagination({
                    "prev" : prev,
                    "firstPage" : firstPage,
                    "startSpacers" : startSpacers,
                    "pages" : pages,
                    "endSpacers" : endSpacers,
                    "lastPage" : lastPage,
                    "next" : next
                });

                // CurrentPage ID Check
                if (currentPageId > totalPages - 1) {
                    this.config.set("startIndex", 0);
                }
                    
                this.$el.html(html);
            }

        }
    });

    return View;
}));
