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

        el : "#status",
        viewInitialized : false,
        template : squid_api.template.squid_api_status,
        format : null,
        runningMessage : "Computing in progress",
        failedMessage : "An error has occurred",

        initialize: function(options) {
            if (!this.model) {
                this.model = squid_api.model.status;
            }
            var me = this;
            this.model.on('change:status', this.renderDelayed, this);
            this.model.on('change:error', this.render, this);
            this.model.on('change:message', this.renderDelayed, this);

            if (options) {
                if (options.template) {
                    this.template = options.template;
                }
                if (options.runningMessage) {
                    this.runningMessage = options.runningMessage;
                }
                if (options.failedMessage) {
                    this.failedMessage = options.failedMessage;
                }
            }
        },

        events: {
            'click .status-error .close' : 'removeError'
        },

        removeError: function(item) {
            this.model.set({'error' : null}, {'silent' : true});
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        renderDelayed: function() {
            // just slightly delay rendering (to avoid flickering when action is very short)
            var me = this;
            setTimeout(function() {
                me.render();
            }, 300);
        },

        render: function() {
            var me = this;
            
            // init viewport
            if (this.$el.html() === "") {
                this.$el.html("<div class='squid-api-core-widgets-status'></div>");
            }

            var error = this.model.get("error");
            var status = this.model.get("status");
            var message = this.model.get("message");
            var running = ((status === this.model.STATUS_RUNNING) || (status === this.model.STATUS_PENDING));
            var failed = false;
            var level = "info", dismissible = true;

            if (error) {
                failed = true;
                level = "danger";
            }

            if ((!running) && (!failed) && (!message)) {
                // hide
                this.$el.hide();
            } else {
                var jsonData = this.model.toJSON();
                var errorData = null;
                if (running) {
                    message = this.runningMessage;
                    level = "warning";
                    dismissible = false;
                } else if (jsonData.error) {
                    if (jsonData.message !== null && jsonData.message !=="") {
                        message = jsonData.message;
                    } else if (jsonData.error.responseJSON && jsonData.error.responseJSON.error) {
                        message = jsonData.error.responseJSON.error;
                    } else {
                        errorData = jsonData.error;
                    }
                    if (jsonData.error.dismissible === false) {
                        dismissible = false;
                    } else {
                        dismissible = true;
                    }
                }
                
                if (message) {
                	message = message.replace("\n","<br>");
                } else if (!errorData){
                	message = "An error has occurred (sorry we can't give you more details)";
                }

                var html = this.template({"level" : level, "dismissible" : dismissible, "message" : message, "errorData" : errorData});

                // Message to null after being displayed
                this.model.set({message : null}, {silent : true});

                this.$el.find(".squid-api-core-widgets-status").html(html);
                this.$el.show();

                // view message for 10 seconds unless it is an error
                if (! error && ! running) {
                    setTimeout(function() {
                        var me1 = me;
                        me.$el.find(".status-error").fadeOut(function() {
                            me1.$el.empty();
                        });
                    }, 15000);
                }
            }
            return this;
        }

    });

    return View;
}));
