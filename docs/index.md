## Classes

<dl>
<dt><a href="#PixelDiff">PixelDiff</a></dt>
<dd><p>PixelDiff</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#runWithPromise">runWithPromise()</a> ⇒ <code>Promise</code></dt>
<dd><p>Runs the comparison with a promise</p>
</dd>
<dt><a href="#run">run(fn)</a></dt>
<dd><p>Runs the comparison in node-style</p>
</dd>
<dt><a href="#runSync">runSync()</a> ⇒ <code>Object</code></dt>
<dd><p>Runs the comparison synchronously</p>
</dd>
<dt><a href="#isAboveThreshold">isAboveThreshold(items, [total])</a> ⇒ <code>boolean</code></dt>
<dd><p>Is the difference above the set threshold?</p>
</dd>
<dt><a href="#log">log(text)</a></dt>
<dd><p>Log method that can be overwritten to modify the logging behavior.</p>
</dd>
<dt><a href="#hasPassed">hasPassed(result)</a> ⇒ <code>boolean</code></dt>
<dd><p>Has comparison passed?</p>
</dd>
</dl>

<a name="PixelDiff"></a>

## PixelDiff
PixelDiff

**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| _imageA | <code>PNGImage</code> | 
| _imageACompare | <code>PNGImage</code> | 
| _imageAPath | <code>string</code> | 
| _imageB | <code>PNGImage</code> | 
| _imageBCompare | <code>PNGImage</code> | 
| _imageBPath | <code>string</code> | 
| _imageOutput | <code>PNGImage</code> | 
| _imageOutputPath | <code>string</code> | 
| _imageOutputLimit | <code>int</code> | 
| _thresholdType | <code>string</code> | 
| _threshold | <code>int</code> | 
| _delta | <code>number</code> | 
| _outputMaskRed | <code>int</code> | 
| _outputMaskGreen | <code>int</code> | 
| _outputMaskBlue | <code>int</code> | 
| _outputMaskAlpha | <code>int</code> | 
| _outputMaskOpacity | <code>float</code> | 
| _outputShiftRed | <code>int</code> | 
| _outputShiftGreen | <code>int</code> | 
| _outputShiftBlue | <code>int</code> | 
| _outputShiftAlpha | <code>int</code> | 
| _outputShiftOpacity | <code>float</code> | 
| _outputBackgroundRed | <code>int</code> | 
| _outputBackgroundGreen | <code>int</code> | 
| _outputBackgroundBlue | <code>int</code> | 
| _outputBackgroundAlpha | <code>int</code> | 
| _outputBackgroundOpacity | <code>float</code> | 
| _blockOut | <code>Array.&lt;object&gt;</code> | 
| _blockOutRed | <code>int</code> | 
| _blockOutGreen | <code>int</code> | 
| _blockOutBlue | <code>int</code> | 
| _blockOutAlpha | <code>int</code> | 
| _blockOutOpacity | <code>float</code> | 
| _copyImageAToOutput | <code>boolean</code> | 
| _copyImageBToOutput | <code>boolean</code> | 
| _filter | <code>Array.&lt;string&gt;</code> | 
| _debug | <code>boolean</code> | 
| _composition | <code>boolean</code> | 
| _composeLeftToRight | <code>boolean</code> | 
| _composeTopToBottom | <code>boolean</code> | 
| _hShift | <code>int</code> | 
| _vShift | <code>int</code> | 
| _cropImageA | <code>object</code> | 
| _cropImageA.x | <code>int</code> | 
| _cropImageA.y | <code>int</code> | 
| _cropImageA.width | <code>int</code> | 
| _cropImageA.height | <code>int</code> | 
| _cropImageB | <code>object</code> | 
| _cropImageB.x | <code>int</code> | 
| _cropImageB.y | <code>int</code> | 
| _cropImageB.width | <code>int</code> | 
| _cropImageB.height | <code>int</code> | 
| _refWhite | <code>object</code> | 
| _perceptual | <code>boolean</code> | 
| _gamma | <code>float</code> | 
| _gammaR | <code>float</code> | 
| _gammaG | <code>float</code> | 
| _gammaB | <code>float</code> | 


* [PixelDiff](#PixelDiff)
    * [new PixelDiff(options)](#new_PixelDiff_new)
    * [.version](#PixelDiff.version) : <code>string</code>
    * [.THRESHOLD_PIXEL](#PixelDiff.THRESHOLD_PIXEL) : <code>string</code>
    * [.THRESHOLD_PERCENT](#PixelDiff.THRESHOLD_PERCENT) : <code>string</code>
    * [.RESULT_UNKNOWN](#PixelDiff.RESULT_UNKNOWN) : <code>int</code>
    * [.RESULT_DIFFERENT](#PixelDiff.RESULT_DIFFERENT) : <code>int</code>
    * [.RESULT_SIMILAR](#PixelDiff.RESULT_SIMILAR) : <code>int</code>
    * [.RESULT_IDENTICAL](#PixelDiff.RESULT_IDENTICAL) : <code>int</code>
    * [.OUTPUT_DIFFERENT](#PixelDiff.OUTPUT_DIFFERENT) : <code>int</code>
    * [.OUTPUT_SIMILAR](#PixelDiff.OUTPUT_SIMILAR) : <code>int</code>
    * [.OUTPUT_ALL](#PixelDiff.OUTPUT_ALL) : <code>int</code>

<a name="new_PixelDiff_new"></a>

### new PixelDiff(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| options.imageA | <code>PNGImage</code> &#124; <code>Buffer</code> |  | Image object of first image |
| options.imageAPath | <code>string</code> |  | Path to first image |
| options.imageB | <code>PNGImage</code> &#124; <code>Buffer</code> |  | Image object of second image |
| options.imageBPath | <code>string</code> |  | Path to second image |
| [options.imageOutputPath] | <code>string</code> |  | Path to output image file |
| [options.imageOutputLimit] | <code>int</code> | <code>PixelDiff.OUTPUT_ALL</code> | Determines when an image output is created |
| [options.thresholdType] | <code>string</code> | <code>&quot;PixelDiff.THRESHOLD_PIXEL&quot;</code> | Defines the threshold of the comparison |
| [options.threshold] | <code>int</code> | <code>500</code> | Threshold limit according to the comparison limit. |
| [options.delta] | <code>number</code> | <code>20</code> | Distance between the color coordinates in the 4 dimensional color-space that will not trigger a difference. |
| [options.outputMaskRed] | <code>int</code> | <code>255</code> | Value to set for red on difference pixel. 'Undefined' will not change the value. |
| [options.outputMaskGreen] | <code>int</code> | <code>0</code> | Value to set for green on difference pixel. 'Undefined' will not change the value. |
| [options.outputMaskBlue] | <code>int</code> | <code>0</code> | Value to set for blue on difference pixel. 'Undefined' will not change the value. |
| [options.outputMaskAlpha] | <code>int</code> | <code>255</code> | Value to set for the alpha channel on difference pixel. 'Undefined' will not change the value. |
| [options.outputMaskOpacity] | <code>float</code> | <code>0.7</code> | Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel. |
| [options.outputShiftRed] | <code>int</code> | <code>255</code> | Value to set for red on shifted pixel. 'Undefined' will not change the value. |
| [options.outputShiftGreen] | <code>int</code> | <code>165</code> | Value to set for green on shifted pixel. 'Undefined' will not change the value. |
| [options.outputShiftBlue] | <code>int</code> | <code>0</code> | Value to set for blue on shifted pixel. 'Undefined' will not change the value. |
| [options.outputShiftAlpha] | <code>int</code> | <code>255</code> | Value to set for the alpha channel on shifted pixel. 'Undefined' will not change the value. |
| [options.outputShiftOpacity] | <code>float</code> | <code>0.7</code> | Strength of masking the shifted pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel. |
| [options.outputBackgroundRed] | <code>int</code> | <code>0</code> | Value to set for red as background. 'Undefined' will not change the value. |
| [options.outputBackgroundGreen] | <code>int</code> | <code>0</code> | Value to set for green as background. 'Undefined' will not change the value. |
| [options.outputBackgroundBlue] | <code>int</code> | <code>0</code> | Value to set for blue as background. 'Undefined' will not change the value. |
| [options.outputBackgroundAlpha] | <code>int</code> |  | Value to set for the alpha channel as background. 'Undefined' will not change the value. |
| [options.outputBackgroundOpacity] | <code>float</code> | <code>0.6</code> | Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel. |
| [options.blockOut] | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> |  | Object or list of objects with coordinates of blocked-out areas. |
| [options.blockOutRed] | <code>int</code> | <code>0</code> | Value to set for red on blocked-out pixel. 'Undefined' will not change the value. |
| [options.blockOutGreen] | <code>int</code> | <code>0</code> | Value to set for green on blocked-out pixel. 'Undefined' will not change the value. |
| [options.blockOutBlue] | <code>int</code> | <code>0</code> | Value to set for blue on blocked-out pixel. 'Undefined' will not change the value. |
| [options.blockOutAlpha] | <code>int</code> | <code>255</code> | Value to set for the alpha channel on blocked-out pixel. 'Undefined' will not change the value. |
| [options.blockOutOpacity] | <code>float</code> | <code>1.0</code> | Strength of masking the blocked-out pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel. |
| [options.copyImageAToOutput] | <code>boolean</code> | <code>true</code> | Copies the first image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the first image. |
| [options.copyImageBToOutput] | <code>boolean</code> | <code>false</code> | Copies the second image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the second image. |
| [options.filter] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Filters that will be applied before the comparison. Available filters are: blur, grayScale, lightness, luma, luminosity, sepia |
| [options.debug] | <code>boolean</code> | <code>false</code> | When set, then the applied filters will be shown on the output image. |
| [options.composition] | <code>boolean</code> | <code>true</code> | Should a composition be created to compare? |
| [options.composeLeftToRight] | <code>boolean</code> | <code>false</code> | Create composition from left to right, otherwise let it decide on its own whats best |
| [options.composeTopToBottom] | <code>boolean</code> | <code>false</code> | Create composition from top to bottom, otherwise let it decide on its own whats best |
| [options.hideShift] | <code>boolean</code> | <code>false</code> | Hides shift highlighting by using the background color instead |
| [options.hShift] | <code>int</code> | <code>2</code> | Horizontal shift for possible antialiasing |
| [options.vShift] | <code>int</code> | <code>2</code> | Vertical shift for possible antialiasing |
| [options.cropImageA] | <code>object</code> | <code></code> | Cropping for first image (default: no cropping) |
| [options.cropImageA.x] | <code>int</code> | <code>0</code> | Coordinate for left corner of cropping region |
| [options.cropImageA.y] | <code>int</code> | <code>0</code> | Coordinate for top corner of cropping region |
| [options.cropImageA.width] | <code>int</code> |  | Width of cropping region (default: Width that is left) |
| [options.cropImageA.height] | <code>int</code> |  | Height of cropping region (default: Height that is left) |
| [options.cropImageB] | <code>object</code> | <code></code> | Cropping for second image (default: no cropping) |
| [options.cropImageB.x] | <code>int</code> | <code>0</code> | Coordinate for left corner of cropping region |
| [options.cropImageB.y] | <code>int</code> | <code>0</code> | Coordinate for top corner of cropping region |
| [options.cropImageB.width] | <code>int</code> |  | Width of cropping region (default: Width that is left) |
| [options.cropImageB.height] | <code>int</code> |  | Height of cropping region (default: Height that is left) |
| [options.perceptual] | <code>boolean</code> | <code>false</code> | Turns perceptual comparison on |
| [options.gamma] | <code>float</code> |  | Gamma correction for all colors |
| [options.gammaR] | <code>float</code> |  | Gamma correction for red |
| [options.gammaG] | <code>float</code> |  | Gamma correction for green |
| [options.gammaB] | <code>float</code> |  | Gamma correction for blue |

<a name="PixelDiff.version"></a>

### PixelDiff.version : <code>string</code>
Version of class

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| version | 

<a name="PixelDiff.THRESHOLD_PIXEL"></a>

### PixelDiff.THRESHOLD_PIXEL : <code>string</code>
Threshold-type for pixel

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| THRESHOLD_PIXEL | 

<a name="PixelDiff.THRESHOLD_PERCENT"></a>

### PixelDiff.THRESHOLD_PERCENT : <code>string</code>
Threshold-type for percent of all pixels

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| THRESHOLD_PERCENT | 

<a name="PixelDiff.RESULT_UNKNOWN"></a>

### PixelDiff.RESULT_UNKNOWN : <code>int</code>
Unknown result of the comparison

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| RESULT_UNKNOWN | 

<a name="PixelDiff.RESULT_DIFFERENT"></a>

### PixelDiff.RESULT_DIFFERENT : <code>int</code>
The images are too different

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| RESULT_DIFFERENT | 

<a name="PixelDiff.RESULT_SIMILAR"></a>

### PixelDiff.RESULT_SIMILAR : <code>int</code>
The images are very similar, but still below the threshold

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| RESULT_SIMILAR | 

<a name="PixelDiff.RESULT_IDENTICAL"></a>

### PixelDiff.RESULT_IDENTICAL : <code>int</code>
The images are identical (or near identical)

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| RESULT_IDENTICAL | 

<a name="PixelDiff.OUTPUT_DIFFERENT"></a>

### PixelDiff.OUTPUT_DIFFERENT : <code>int</code>
Create output when images are different

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| OUTPUT_DIFFERENT | 

<a name="PixelDiff.OUTPUT_SIMILAR"></a>

### PixelDiff.OUTPUT_SIMILAR : <code>int</code>
Create output when images are similar or different

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| OUTPUT_SIMILAR | 

<a name="PixelDiff.OUTPUT_ALL"></a>

### PixelDiff.OUTPUT_ALL : <code>int</code>
Force output of all comparisons

**Kind**: static property of <code>[PixelDiff](#PixelDiff)</code>  
**Properties**

| Name |
| --- |
| OUTPUT_ALL | 

<a name="runWithPromise"></a>

## runWithPromise() ⇒ <code>Promise</code>
Runs the comparison with a promise

**Kind**: global function  
**Example**  
```js
const pixelDiff = new PixelDiff(...);
    pixelDiff.runWithPromise().then(result => {
      ...
    });
```
<a name="run"></a>

## run(fn)
Runs the comparison in node-style

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

**Example**  
```js
const pixelDiff = new PixelDiff(...);
    pixelDiff.run((err, result) => {
      if (err) {
        throw err;
      }
      ...
    });
```
<a name="runSync"></a>

## runSync() ⇒ <code>Object</code>
Runs the comparison synchronously

**Kind**: global function  
**Returns**: <code>Object</code> - Result of comparison { code, differences, dimension, width, height }  
**Example**  
```js
const pixelDiff = new PixelDiff(...);
    try {
      let result = pixelDiff.runSync();
      ...
    } catch(err) {
        throw err;
    }
```
<a name="isAboveThreshold"></a>

## isAboveThreshold(items, [total]) ⇒ <code>boolean</code>
Is the difference above the set threshold?

**Kind**: global function  

| Param | Type |
| --- | --- |
| items | <code>int</code> | 
| [total] | <code>int</code> | 

<a name="log"></a>

## log(text)
Log method that can be overwritten to modify the logging behavior.

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="hasPassed"></a>

## hasPassed(result) ⇒ <code>boolean</code>
Has comparison passed?

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>int</code> | Comparison result-code |

