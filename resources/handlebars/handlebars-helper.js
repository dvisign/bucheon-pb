Handlebars.registerHelper('ifCond', function(a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
});
Handlebars.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
});
Handlebars.registerHelper('case', function(value, options) {
	if (value == this.switch_value) {
      return options.fn(this);
    }
});