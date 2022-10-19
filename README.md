# appeltaartimperium.github.io

## Web Component Directory Structure

* each directory in ``/components/rt-order`` is a web component
* each web component has a ``README.md`` file
* source code references ``index.j``
* which loads the component file (or overruled file)
* that way any developer can work on different versions of the same component

### Overruled files

A ``?dev-order-item=FILENAME`` in the URL **OR** localStorage setting can be used to overrule the component file.

## Documentation Web Components

### <order-form>

Container for all order form

### <order-item-container>

### <order-item>

### <order-button>

## Style Guide

* prefix HTML strings in JavaScript: 
    ```
    /* html */ `<div>` +
    /* html */ `<p>hello world</p>` +
    /* html */ `</div>`
    ```
