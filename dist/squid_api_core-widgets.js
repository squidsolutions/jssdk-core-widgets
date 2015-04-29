this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\nWelcome <span class='sq-login'>";
  if (helper = helpers.login) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.login); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> <a href=\"#\" class=\"sq-logout\">logout</a>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n<a href=\"#\" class=\"sq-signin\">sign-in</a>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.login), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["squid_api"]["template"]["squid_api_selector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiple), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </select>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "multiple";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </option>\r\n        ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "selected";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_status"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"status-error alert alert-warning\">";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.failed), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n<div class=\"status-error alert alert-info alert-dismissible\">\r\n	<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n	";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n</div>\r\n";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class=\"status-error alert alert-danger alert-dismissible\">\r\n		<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\r\n		";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n	</div>\r\n";
  return buffer;
  }

  buffer += "<div class='squid-api-core-widgets-status'>\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.running), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.failed), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n";
  return buffer;
  });
/*! Squid Core Widget */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['Backbone', 'squid_api'], factory);
    } else {
        root.squid_api.view.LoginView = factory(root.Backbone, root.squid_api);
    }
}(this, function (Backbone, squid_api) {

    var LoginView = Backbone.View.extend({

        redirectUri: null,

        autoShow: true,

        template: null,

        initialize: function(options) {
            if (!this.model) {
                this.model = squid_api.model.login;
            }
            this.model.on("change:login", this.render, this);

            if (typeof options.autoShow !== "undefined") {
                this.autoShow = options.autoShow;
            }
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_login;
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();
        },

        setRedirectUri: function(d) {
            this.redirectUri = d;
            return this;
        },

        events: {
            "click .sq-signin": "login",
            "click .sq-logout": "logout"
        },

        render: function() {
            if (this.model) {
                var userLogin = this.model.get("login");
                if (userLogin && userLogin !== "") {
                    // logged in
                } else {
                    if (this.autoShow) {
                        this.login();
                    }
                }
                var html = this.template(this.model.toJSON());
                this.$el.html(html);
            }

            return this;
        },

        login: function() {
            var redirectUri;
            if (!this.redirectUri) {
                // use the current location stripping token or code parameters
                var rurl;
                rurl = this.removeURLParameter(""+window.location, "access_token");
                rurl = this.removeURLParameter(rurl, "code");
                redirectUri = encodeURIComponent(rurl);
            }

            // redirection mode
            var url = squid_api.loginURL;
            if (url.indexOf("?") > 0) {
                url += "&";
            }
            else {
                url += "?";
            }
            url = url + "redirect_uri=" + redirectUri;
            if (!squid_api.debug) {
                window.location = url;
            } else {
                // bypass redirection
                console.log("redirection : "+url);
            }
        },

        logout: function(event) {
            event.preventDefault();
            this.model.logout();
        },
        
        setLogoutFunction : function(f) {
            this.logout = f;
        },

        removeURLParameter : function(url, parameter) {
            //prefer to use l.search if you have a location/link object
            var urlparts= url.split('?');   
            if (urlparts.length>=2) {

                var prefix= encodeURIComponent(parameter)+'=';
                var pars= urlparts[1].split(/[&;]/g);

                //reverse iteration as may be destructive
                for (var i= pars.length; i-- > 0;) {    
                    //idiom for string.startsWith
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                        pars.splice(i, 1);
                    }
                }

                url= urlparts[0]+'?'+pars.join('&');
                return url;
            } else {
                return url;
            }
        }
    });

    return LoginView;
}));

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
                    if (jsonData.error.responseJSON) {
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
