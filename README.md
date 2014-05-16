Angular placeholder fallback
============================

Directive to support the placeholder attribute on old browsers. No jQuery required.

## [Demo](http://crisbeto.github.io/angular-placeholder-fallback/)
## Install

* Include Angular and `placeholder.js` or `placeholder.min.js` in your page.
* Add `angular-placeholder-fallback` as a dependency

```javascript
angular.module('someModule', ['angular-placeholder-fallback'])
```

## Styling

```css
 .placeholder{
    color:#aaa;
 }
```

## Features

* Doesn't require any external dependencies(except Angular doh)
* Does nothing if the browser supports placeholders
* Placeholder value doesn't get submitted in a form


