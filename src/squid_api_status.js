/*! Squid Core Widget */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['Backbone', 'squid_api'], factory);
    } else {
        root.squid_api.view.StatusView = factory(root.Backbone, root.squid_api);
    }
}(this, function (Backbone, squid_api) {

    /*
     * Widget which displays the global status set in it model (typically squid_api.model.status)
     */
    var View = Backbone.View.extend({

        viewInitialized : false,
        template : null,
        format : null,
        runningMessage : "Computing in progress",
        failedMessage : "An error has occurred",

        initialize: function(options) {
            if (!this.model) {
                this.model = squid_api.model.status;
            }
            
            this.model.on('change:status', this.render, this);
            this.model.on('change:error', this.render, this);
            
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_status;
            }
            if (options.runningMessage) {
                this.runningMessage = options.runningMessage;
            }
            if (options.failedMessage) {
                this.failedMessage = options.failedMessage;
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        render: function() {
            var error = this.model.get("error");
            var status = this.model.get("status");
            var running = (status != this.model.STATUS_DONE);
            var failed = false;
            if (error) {
                failed = true;
            }

            if ((!running) && (!failed)) {
                // hide
                this.$el.hide();
            } else {
                // display
                var jsonData = this.model.toJSON();
                var message;
                if (jsonData.message) {
                    message = jsonData.message;
                } else {
                    if (running) {
                        message = this.runningMessage;
                    } else {
                        message = this.failedMessage;
                    }
                }
                var html = this.template({"running" : running, "failed" : failed, "message" : message});
                this.$el.html(html);
                this.$el.show();

            }
            return this;
        }

    });

    return View;
}));
