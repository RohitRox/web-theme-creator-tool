## Roxit Labs Web Theme Creator Tool


``` bash
  yarn install
  yarn build # outputs to build folder
```

## Development

#### Creating new theme

``` bash
  make theme name=theme-name
```
- creates `src/js/theme-name.js`
- creates `src/css/theme-name.scss`


Themes are indexed and linked at `build/index.html`
`build/theme-name.html` is also generated when running `yarn build`
Edit `src/layout.html` to edit layout markup.

#### Adding fonts

- Add font to `src/fonts`
- Use the font
     ``` css
  @font-face {
    font-family: FontName;
    src: url("../fonts/font-file.otf") format("opentype");
  }

  .wedding-title {
    font-family: FontName;
  }
    ```
- Fonts are automatically converted to base64 data uri and included in stylesheet.

#### Removing theme

``` bash
  make remove name=theme-name
```
