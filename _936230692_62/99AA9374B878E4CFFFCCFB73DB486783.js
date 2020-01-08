Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.create = function(e) {
    e.props && (e.properties = e.props, delete e.props);
    e.mixins && (e.behaviors = e.mixins, delete e.mixins);
    e.externalClasses = e.classes || [], delete e.classes, e.externalClasses.push("custom-class"), 
    e.behaviors = e.behaviors || [], e.behaviors.push(s.basic), e.options = e.options || {}, 
    e.options.multipleSlots = !0, e.options.addGlobalClass = !0, e.field && e.behaviors.push("wx://form-field");
    Component(e);
};

var s = require("CA59C213B878E4CFAC3FAA140E586783.js");