var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/Expression.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    /// <reference path="Binding.ts" />
    (function (Data) {
        var BindingExpressionBase = (function (_super) {
            __extends(BindingExpressionBase, _super);
            function BindingExpressionBase(binding, target, propd) {
                        _super.call(this);
                this._Binding = binding;
                this.Target = target;
                this.Property = propd;
            }
            Object.defineProperty(BindingExpressionBase.prototype, "Binding", {
                get: function () {
                    return this._Binding;
                },
                enumerable: true,
                configurable: true
            });
            BindingExpressionBase.prototype._TryUpdateSourceObject = function (value) {
            };
            return BindingExpressionBase;
        })(Fayde.Expression);
        Data.BindingExpressionBase = BindingExpressionBase;        
        Nullstone.RegisterType(BindingExpressionBase, "BindingExpressionBase");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BindingExpressionBase.js.map
