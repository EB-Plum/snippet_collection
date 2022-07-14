# Issue: Printing html to pdf in chrome makes some wrong styles
## Reasons
- When printing background colors may discarded,
- Using css with `text-shadow` or `box-shadow`, It seems chrome's skia engine make pdf with wrong render shadow info(?). 
it shows grey box when using pdf viewer other than chrome;

> may related issues: links in pdf not click properly?

## Solutions
- just remove problematic styles on print.(simple, but not elegant)
```css
@media print {
  * {
    text-shadow: none !important;
    box-shadow: none !important;
  }
}
```

- check this : https://caniuse.com/?search=print-color-adjust
```css
html,body {
    -webkit-print-color-adjust:exact;
    -webkit-filter:opacity(1);
}
```

- when links in pdf not clcik properly, try this.
```css
html,body {
    -webkit-print-color-adjust: exact;
    -webkit-filter: blur(0);
}
```
