Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VantComponent = function(a) {
    void 0 === a && (a = {});
    var r = {};
    t = a, o = r, i = {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        relations: "relations",
        destroyed: "detached",
        classes: "externalClasses"
    }, Object.keys(i).forEach(function(e) {
        t[e] && (o[i[e]] = t[e]);
    });
    var t, o, i;
    var n = a.relation;
    n && (r.relations = Object.assign(r.relations || {}, {
        ["../" + n.name + "/index"]: n
    }));
    r.externalClasses = r.externalClasses || [], r.externalClasses.push("custom-class"), 
    r.behaviors = r.behaviors || [], r.behaviors.push(e.basic), a.field && r.behaviors.push("wx://form-field");
    r.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, (0, s.observe)(a, r), Component(r);
};

var e = require("CA59C213B878E4CFAC3FAA140E586783.js"), s = require("25145661B878E4CF43723E6613986783.js");