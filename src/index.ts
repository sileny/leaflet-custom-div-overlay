import L, { LatLngExpression, LeafletEventHandlerFnMap, ZoomAnimEvent } from 'leaflet';

const DivOverlay = L.Layer.extend({
  // @section
  // @aka DivOverlay options
  options: {
    opacity: 1,

    // @option interactive: Boolean = false
    // If `true`, the div overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
    interactive: false,

    // @option zIndex: Number = 1
    // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
    zIndex: 1,

    // @option className: String = ''
    // A custom class name to assign to the div. Empty by default.
    className: '',

    // @option pane: String = 'markerPane'
    pane: 'markerPane',
  },

  initialize(bounds: LatLngExpression[], options: object) { // (LatLngBounds, Object)
    this._bounds = L.latLngBounds(bounds);

    L.setOptions(this, options);
  },

  onAdd() {
    if (!this._div) {
      this._initDiv();

      if (this.options.opacity < 1) {
        this._updateOpacity();
      }
    }

    if (this.options.interactive) {
      L.DomUtil.addClass(this._div, 'leaflet-interactive');
      this.addInteractiveTarget(this._div);
    }

    this.getPane(this.options.pane).appendChild(this._div);
    this._reset();
  },

  onRemove() {
    L.DomUtil.remove(this._div);
    if (this.options.interactive) {
      this.removeInteractiveTarget(this._div);
    }
  },

  // @method bringToFront(): this
  // Brings the layer to the top of all overlays.
  bringToFront() {
    if (this._map) {
      L.DomUtil.toFront(this._div);
    }
    return this;
  },

  // @method bringToBack(): this
  // Brings the layer to the bottom of all overlays.
  bringToBack() {
    if (this._map) {
      L.DomUtil.toBack(this._div);
    }
    return this;
  },

  // @method setBounds(bounds: LatLngBounds): this
  // Update the bounds that this DivOverlay covers
  setBounds(bounds: LatLngExpression[]) {
    this._bounds = L.latLngBounds(bounds);

    if (this._map) {
      this._reset();
    }
    return this;
  },

  getEvents() {
    const events: LeafletEventHandlerFnMap = {
      zoom: this._reset,
      viewreset: this._reset
    };

    // @event zoomanim: ZoomAnimEvent
    // Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
    if (this._zoomAnimated) {
      events.zoomanim = this._animateZoom;
    }

    return events;
  },

  // @method setZIndex(value: Number): this
  // Changes the [zIndex](#DivOverlay-zindex) of the div overlay.
  setZIndex(value: number) {
    this.options.zIndex = value;
    this._updateZIndex();
    return this;
  },

  // @method getBounds(): LatLngBounds
  // Get the bounds that this DivOverlay covers
  getBounds() {
    return this._bounds;
  },

  // @method getElement(): HTMLElement
  // Returns the instance of [`HTMLDivElement`](https://developer.mozilla.org/docs/Web/API/HTMLDivElement)
  // used by this overlay.
  getElement() {
    return this._div;
  },

  _initDiv() {
    const div = L.DomUtil.create('div');
    this._div = div;

    L.DomUtil.addClass(div, 'leaflet-custom-div-layer');
    if (this._zoomAnimated) { L.DomUtil.addClass(div, 'leaflet-zoom-animated'); }
    if (this.options.className) { L.DomUtil.addClass(div, this.options.className); }

    if (this.options.zIndex) {
      this._updateZIndex();
    }

    this.setContent(this.options.content);
  },

  // @method setContent(content: Function | string | HTMLElement): this
  // - `Function` If it is a Function type, execute the function and add the result of the function to the overlay as a DOMString.
  // - `string` If it is a string type, it is added to the overlay as DOMString.
  // - `HTMLElement` If it is a string type, it is added to the overlay as DOMString.
  setContent(content: Function | string | HTMLElement) {
    content = (typeof content === 'function') ? content(this) : content;
    if (!content) { return this; }
    if (!this._div) { return this; }

    if (typeof content === 'string') {
      this._div.innerHTML = content;
    } else {
      while (this._div.hasChildNodes()) {
        this._div.removeChild(this._div.firstChild);
      }
      this._div.appendChild(content);
    }

    return this;
  },

  _animateZoom(e: ZoomAnimEvent) {
    const scale = this._map.getZoomScale(e.zoom);
    const offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

    L.DomUtil.setTransform(this._div, offset, scale);
  },

  _reset() {
    const div = this._div;
    const bounds = new L.Bounds(
      this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
      this._map.latLngToLayerPoint(this._bounds.getSouthEast())
    );
    const size = bounds.getSize();

    // non-null assertion
    L.DomUtil.setPosition(div, bounds.min!);

    div.style.width  = size.x + 'px';
    div.style.height = size.y + 'px';
  },

  _updateOpacity() {
    L.DomUtil.setOpacity(this._div, this.options.opacity);
  },

  _updateZIndex() {
    if (this._div && this.options.zIndex !== undefined && this.options.zIndex !== null) {
      this._div.style.zIndex = this.options.zIndex;
    }
  },

  // @method getCenter(): LatLng
  // Returns the center of the DivOverlay.
  getCenter() {
    return this._bounds.getCenter();
  }
});

// @ts-ignore
L.customDivOverlay = function (bounds: LatLngExpression[], options: object) {
  // @ts-ignore
  return new DivOverlay(bounds, options);
};
