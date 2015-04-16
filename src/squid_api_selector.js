(function (root, factory) {
    root.squid_api.view.Selector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_selector);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        onChange : null,
        configName : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.onChange) {
                this.onChange = options.onChange;
            }
            
            if (options.configName) {
                this.configName = options.configName;
                // listen to config update
                this.listenTo(squid_api.model.config, "change:"+this.configName, this.render);
            } else {
                console.error("No options.configName defined : selection will not work");
            }

            this.listenTo(this.model, "change", this.render);
        },

        events: {
            "change .sq-select": function(event) {
                var selectedOid = event.target.value;
                if (this.onChange) {
                    // call the onChange function
                    this.onChange(event);
                } else {
                    // update the current selection
                    squid_api.model.config.set(this.configName,selectedOid);
                }
            }
        },

        render: function() {
            var items,item, selected, selectedItem, jsonData = {"selAvailable" : true, "options" : []};
            items = this.model.get("items");
            selectedItem = squid_api.model.config.get(this.configName);

            for (var i=0; i<items.length; i++) {
                item = items[i];
                if (item) {
                    selected = false;
                    if (item.oid === selectedItem) {
                        selected = true;
                    }
                    var option = {"label" : item.name, "value" : item.oid, "selected" : selected};
                    jsonData.options.push(option);
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            return this;
        }

    });

    return View;
}));
