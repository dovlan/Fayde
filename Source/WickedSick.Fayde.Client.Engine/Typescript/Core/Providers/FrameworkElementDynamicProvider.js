var Fayde;
(function (Fayde) {
    /// <reference path="IProviderStore.ts" />
    /// <reference path="../../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        var FrameworkElementDynamicProvider = (function () {
            function FrameworkElementDynamicProvider() { }
            FrameworkElementDynamicProvider.prototype.GetPropertyValue = function (store, propd) {
                var isWidth = propd._ID === Fayde.FrameworkElement.ActualWidthProperty._ID;
                var isHeight = propd._ID === Fayde.FrameworkElement.ActualHeightProperty._ID;
                if(!isWidth && !isHeight) {
                    return undefined;
                }
                var actual = (store._Object)._ComputeActualSize();
                this._ActualWidth = actual.Width;
                this._ActualHeight = actual.Height;
                if(isWidth) {
                    return this._ActualWidth;
                }
                return this._ActualHeight;
            };
            return FrameworkElementDynamicProvider;
        })();
        Providers.FrameworkElementDynamicProvider = FrameworkElementDynamicProvider;        
        Nullstone.RegisterType(FrameworkElementDynamicProvider, "FrameworkElementDynamicProvider");
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElementDynamicProvider.js.map
