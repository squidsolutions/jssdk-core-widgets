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
            var me = this;
            this.model.on('change:status', this.renderDelayed, this);
            this.model.on('change:error', this.render, this);
            this.model.on('change:message', this.renderDelayed, this);
            
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
            var error = this.model.get("error");
            var status = this.model.get("status");
            var message = this.model.get("message");
            var running = ((status === this.model.STATUS_RUNNING) || (status === this.model.STATUS_PENDING));
            var failed = false;
            
            if (error) {
                failed = true;
            }

            if ((!running) && (!failed) && (!message)) {
                // hide
                this.$el.hide(); 
            } else {
                var jsonData = this.model.toJSON();
                
                if (running) {
                    message = this.runningMessage;
                } else if (jsonData.error) {
                    message = '';
                    
                    if (jsonData.error.message) {
                        message = jsonData.error.message;
                    } else if (jsonData.error.responseJSON) {
                        message = jsonData.error.responseJSON.error;
                    } else if (jsonData.error.reason) {
                        message = jsonData.error.reason;
                    } else if (jsonData.error.statusText) {
                        message = jsonData.error.statusText;
                    } else {
                        message = "An error has occurred";
                    }
                }
                    
                var html = this.template({"running" : running, "failed" : failed, "message" : message});

                // Message to null after being displayed
                this.model.set({message : null}, {silent : true});

                this.$el.html(html);
                this.$el.show();
            }
            return this;
        }

    });

    return View;
}));
