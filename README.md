# leaflet-custom-div-overlay
A leaflet plugin that supports custom divs.

# install
```bash
$ npm i leaflet-custom-div-overlay
```

or
```bash
$ yarn add leaflet-custom-div-overlay
```

or
```bash
$ pnpm i leaflet-custom-div-overlay
```


# usage

## es

For example.
```js
import L from 'leaflet';
import 'leaflet-custom-div-overlay';

const customDiv = L.customDivOverlay([
  [51.7500000, 19.4666700],
  [51.7500100, 19.4666800],
], {
  zIndex: 460,
  interactive: true,
  className: 'my-custom-div-overlay',
  content: `<div>lorem</div>`,
});

customDiv.addTo(map);
```

## browser

Introduce external dependencies
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.min.css">
<script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet-src.js"></script>
```

Introduce this plugin.
```html
<script src="https://unpkg.com/leaflet-custom-div-overlay@latest"></script>
<!-- or -->
<!-- <script src="https://unpkg.com/leaflet-custom-div-overlay@1.0.0/dist/leaflet-custom-div-overlay.global.js"></script> -->
```

You can also download this plugin locally and then import it.
```html
<script src="/path/leaflet-custom-div-overlay.global.js"></script>
```


Create a dom container to load the map
```html
<div id="map" style="height: 300px;"></div>
```

Use it.
```js
const map = L.map('map', {});

map.setView(new L.LatLng(51.7500000, 19.4666700),12);

const customDiv = L.customDivOverlay([
  [51.7500000, 19.4666700],
  [51.7500100, 19.4666800],
], {
  zIndex: 460,
  interactive: true,
  className: 'my-custom-div-overlay',
  content: `<div>lorem</div>`,
});

customDiv.addTo(map);
```

# api

|Method|arguments|returns|description|
|---|---|---|---|
|`bringToFront`| - | this | Brings this overlay in front of other overlays (in the same map pane). |
|`bringToBack`| - | this | Brings this overlay to the back of other overlays (in the same map pane). |
|`setBounds`| `(<L.LatLngBounds> bounds)` | this | Update the bounds that this overlay covers |
|`setZIndex`| `(<Number> value)` | this | Changes the zIndex of the div overlay. |
|`getBounds`| - | `L.LatLngBounds` | Get the bounds that this customDivOverlay covers |
|`getElement`| - | HTMLDivElement | Returns the instance of `HTMLDivElement` used by this overlay. |
|`setContent`| `Function` or `string` or `HTMLElement` | `void` | - `Function` If it is a Function type, execute the function and add the result of the function to the overlay as a DOMString. <br/><br/> - `string` If it is a string type, it is added to the overlay as DOMString. <br /><br /> - `HTMLElement` If it is a string type, it is added to the overlay as DOMString. |
|`getCenter`| - | `L.LatLng` | Returns the center of the overlay. |
