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

this["squid_api"]["template"]["squid_api_status"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <div class='status-wait label label-warning'>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n	<div class='status-error label label-danger'>";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.running), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.failed), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
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
            window.location = url + "redirect_uri=" + redirectUri;
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
