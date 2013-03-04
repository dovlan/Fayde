﻿/// <reference path="../Primitives.js"/>

var Fayde;
(function (Fayde) {
    function UIElementMetrics() {
        this.Extents = new rect();
        this.Bounds = new rect();
        this.Global = new rect();
        this.Surface = new rect();
        this.EffectPadding = new Thickness();
        this.ClipBounds = new rect(); //TODO: Update ClipBounds from UIElement

        this.SubtreeExtents = this.Extents;
        this.SubtreeBounds = this.Surface;
        this.GlobalBounds = this.Global;
    }
    UIElementMetrics.prototype.ComputeBounds = function (uie) { };
    UIElementMetrics.prototype.ComputeSurfaceBounds = function (absoluteXform) {
        this._IntersectBoundsWithClipPath(this.Surface, absoluteXform);
    };
    UIElementMetrics.prototype.ComputeGlobalBounds = function (localXform) {
        this._IntersectBoundsWithClipPath(this.Global, localXform);
    };
    UIElementMetrics.prototype.ComputeEffectPadding = function (effect) {
        if (!effect)
            return false;
        return effect.GetPadding(this.EffectPadding);
    };
    UIElementMetrics.prototype._IntersectBoundsWithClipPath = function (dest, xform) {
        var isClipEmpty = rect.isEmpty(this.ClipBounds);

        if (!isClipEmpty && !this._GetRenderVisible()) {
            rect.clear(dest);
            return;
        }

        rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, xform);
        if (isClipEmpty)
            return;

        rect.intersection(dest, this.ClipBounds);
    };
    Fayde.UIElementMetrics = UIElementMetrics;
})(Fayde || (Fayde = {}));