# g-i-s

Another Google Image Search Node module. The nature of these things is that they eventually break as GIS changes, but this one works as of 2023-03-31.

## Usage

```js
const gis = require("g-i-s")
try {
  const images = await gis("cats")
  console.log(images)
} catch (err) { /* error handling */ }

/*
[
  {
    url: "https://https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/1920px-Felis_catus-cat_on_snow.jpg",
    width: 3000,
    height: 2000
  }
]
*/
```