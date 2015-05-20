(function(root, factory) {
    root.squid_api.view.Switch = factory(root.Backbone,
            squid_api.template.squid_api_switch);
}(this, function(Backbone, template) {

    var View = Backbone.View.extend({

        template : template,
        modelAttribute : null,
        label : null,

        initialize : function(options) {
            
            if (options.template) {
                this.template = options.template;
            }

            this.modelAttribute = options.modelAttribute;
            this.label = options.label;

            if (!this.model) {
                this.model = squid_api.model.config;
            }
            this.listenTo(this.model, "change:" + this.modelAttribute,
                    this.render);
            
            this.render();
        },

        events : ({
            "change input[type=checkbox]" : function(item) {
                if (item.currentTarget.checked) {
                    this.model.set(this.modelAttribute, true);
                } else {
                    this.model.set(this.modelAttribute, false);
                }
            }
        }),

        setModel : function(model) {
            this.model = model;
            this.initialize();
        },

        setTemplate : function(t) {
            if (t) {
                this.template = t;
            }
        },

        render : function() {
            var data = {
                "checked" : false,
                "label" : this.label
            };

            if (this.model) {
                data.checked = this.model.get(this.modelAttribute);
            }

            this.$el.html(this.template(data));

            return this;
        }

    });

    return View;
}));