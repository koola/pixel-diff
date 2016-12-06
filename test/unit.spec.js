'use strict';

const PixelDiff = require('../'),
    PNGImage = require('pngjs-image'),
    Promise = require('promise'),
    fs = require('fs'),
    expect = require('chai').expect;

function generateImage(type) {
    let image;

    switch (type) {
        case 'small-1':
            image = PNGImage.createImage(2, 2);
            image.setAt(0, 0, {red: 10, green: 20, blue: 30, alpha: 40});
            image.setAt(0, 1, {red: 50, green: 60, blue: 70, alpha: 80});
            image.setAt(1, 0, {red: 90, green: 100, blue: 110, alpha: 120});
            image.setAt(1, 1, {red: 130, green: 140, blue: 150, alpha: 160});
            break;

        case 'small-2':
            image = PNGImage.createImage(2, 2);
            image.setAt(0, 0, {red: 210, green: 220, blue: 230, alpha: 240});
            image.setAt(0, 1, {red: 10, green: 20, blue: 30, alpha: 40});
            image.setAt(1, 0, {red: 50, green: 60, blue: 70, alpha: 80});
            image.setAt(1, 1, {red: 15, green: 25, blue: 35, alpha: 45});
            break;

        case 'small-3':
            image = PNGImage.createImage(2, 2);
            break;

        case 'medium-1':
            image = PNGImage.createImage(3, 3);
            image.setAt(0, 0, {red: 130, green: 140, blue: 150, alpha: 160});
            image.setAt(0, 1, {red: 170, green: 180, blue: 190, alpha: 200});
            image.setAt(0, 2, {red: 210, green: 220, blue: 230, alpha: 240});
            image.setAt(1, 0, {red: 15, green: 25, blue: 35, alpha: 45});
            image.setAt(1, 1, {red: 55, green: 65, blue: 75, alpha: 85});
            image.setAt(1, 2, {red: 95, green: 105, blue: 115, alpha: 125});
            image.setAt(2, 0, {red: 10, green: 20, blue: 30, alpha: 40});
            image.setAt(2, 1, {red: 50, green: 60, blue: 70, alpha: 80});
            image.setAt(2, 2, {red: 90, green: 100, blue: 110, alpha: 120});
            break;

        case 'medium-2':
            image = PNGImage.createImage(3, 3);
            image.setAt(0, 0, {red: 95, green: 15, blue: 165, alpha: 26});
            image.setAt(0, 1, {red: 15, green: 225, blue: 135, alpha: 144});
            image.setAt(0, 2, {red: 170, green: 80, blue: 210, alpha: 2});
            image.setAt(1, 0, {red: 50, green: 66, blue: 23, alpha: 188});
            image.setAt(1, 1, {red: 110, green: 120, blue: 63, alpha: 147});
            image.setAt(1, 2, {red: 30, green: 110, blue: 10, alpha: 61});
            image.setAt(2, 0, {red: 190, green: 130, blue: 180, alpha: 29});
            image.setAt(2, 1, {red: 10, green: 120, blue: 31, alpha: 143});
            image.setAt(2, 2, {red: 155, green: 165, blue: 15, alpha: 185});
            break;

        case 'slim-1':
            image = PNGImage.createImage(1, 3);
            image.setAt(0, 0, {red: 15, green: 225, blue: 135, alpha: 144});
            image.setAt(0, 1, {red: 170, green: 80, blue: 210, alpha: 2});
            image.setAt(0, 2, {red: 50, green: 66, blue: 23, alpha: 188});
            break;

        case 'slim-2':
            image = PNGImage.createImage(3, 1);
            image.setAt(0, 0, {red: 15, green: 225, blue: 135, alpha: 144});
            image.setAt(1, 0, {red: 170, green: 80, blue: 210, alpha: 2});
            image.setAt(2, 0, {red: 50, green: 66, blue: 23, alpha: 188});
            break;
    }

    return image;
}

function compareBuffer(buf1, buf2) {

    if (buf1.length !== buf2.length) {
        return false;
    }

    for (let i = 0, len = buf1.length; i < len; i++) {
        if (buf1[i] !== buf2[i]) {
            return false;
        }
    }

    return true;
}

describe('Pixel-Diff', () => {

    describe('Default values', () => {

        beforeEach(() => {
            this.instance = new PixelDiff({
                imageA: 'image-a', imageAPath: 'path to image-a', imageB: 'image-b', imageBPath: 'path to image-b',

                composition: false
            });

            this.instance.log = (text) => {
                console.log(text);
            };
        });

        it('should have the right values for imageA', () => {
            expect(this.instance._imageA).to.be.equal('image-a');
        });

        it('should have the right values for imageAPath', () => {
            expect(this.instance._imageAPath).to.be.equal('path to image-a');
        });

        it('should have the right values for imageB', () => {
            expect(this.instance._imageB).to.be.equal('image-b');
        });

        it('should have the right values for imageBPath', () => {
            expect(this.instance._imageBPath).to.be.equal('path to image-b');
        });

        it('should not have a value for imageOutputPath', () => {
            expect(this.instance._imageOutputPath).to.be.undefined;
        });

        it('should not have a value for thresholdType', () => {
            expect(this.instance._thresholdType).to.be.equal('pixel');
        });

        it('should not have a value for threshold', () => {
            expect(this.instance._threshold).to.be.equal(500);
        });

        it('should not have a value for delta', () => {
            expect(this.instance._delta).to.be.equal(20);
        });

        it('should not have a value for outputMaskRed', () => {
            expect(this.instance._outputMaskRed).to.be.equal(255);
        });

        it('should not have a value for outputMaskGreen', () => {
            expect(this.instance._outputMaskGreen).to.be.equal(0);
        });

        it('should not have a value for outputMaskBlue', () => {
            expect(this.instance._outputMaskBlue).to.be.equal(0);
        });

        it('should not have a value for outputMaskAlpha', () => {
            expect(this.instance._outputMaskAlpha).to.be.equal(255);
        });

        it('should not have a value for outputMaskOpacity', () => {
            expect(this.instance._outputMaskOpacity).to.be.equal(0.7);
        });

        it('should not have a value for outputBackgroundRed', () => {
            expect(this.instance._outputBackgroundRed).to.be.equal(0);
        });

        it('should not have a value for outputBackgroundGreen', () => {
            expect(this.instance._outputBackgroundGreen).to.be.equal(0);
        });

        it('should not have a value for outputBackgroundBlue', () => {
            expect(this.instance._outputBackgroundBlue).to.be.equal(0);
        });

        it('should not have a value for outputBackgroundAlpha', () => {
            expect(this.instance._outputBackgroundAlpha).to.be.undefined;
        });

        it('should not have a value for outputBackgroundOpacity', () => {
            expect(this.instance._outputBackgroundOpacity).to.be.equal(0.6);
        });

        it('should not have a value for copyImageAToOutput', () => {
            expect(this.instance._copyImageAToOutput).to.be.true;
        });

        it('should not have a value for copyImageBToOutput', () => {
            expect(this.instance._copyImageBToOutput).to.be.false;
        });

        it('should not have a value for filter', () => {
            expect(this.instance._filter).to.be.empty;
        });

        it('should not have a value for debug', () => {
            expect(this.instance._debug).to.be.false;
        });

        describe('Special cases', () => {

            beforeEach(() => {
                this.instance = new PixelDiff({
                    imageA: 'image-a', imageB: 'image-b'
                });
            });

            it('should have the images', () => {
                expect(this.instance._imageA).to.be.equal('image-a');
                expect(this.instance._imageB).to.be.equal('image-b');
            });
        });
    });

    describe('Methods', () => {

        beforeEach(() => {
            this.instance = new PixelDiff({
                imageA: 'image-a', imageAPath: 'path to image-a', imageB: 'image-b', imageBPath: 'path to image-b'
            });
        });

        describe('hasPassed', () => {

            it('should pass when identical', () => {
                expect(this.instance.hasPassed(PixelDiff.RESULT_IDENTICAL)).to.be.true;
            });

            it('should pass when similar', () => {
                expect(this.instance.hasPassed(PixelDiff.RESULT_SIMILAR)).to.be.true;
            });

            it('should not pass when unknown', () => {
                expect(this.instance.hasPassed(PixelDiff.RESULT_UNKNOWN)).to.be.false;
            });

            it('should not pass when different', () => {
                expect(this.instance.hasPassed(PixelDiff.RESULT_DIFFERENT)).to.be.false;
            });
        });

        describe('_colorDelta', () => {
            it('should calculate the delta', () => {
                let color1 = {
                    c1: 23, c2: 87, c3: 89, c4: 234
                }, color2 = {
                    c1: 84, c2: 92, c3: 50, c4: 21
                };

                expect(this.instance._colorDelta(color1, color2)).to.be.within(225.02, 225.03);
            });
        });

        describe('_loadImage', () => {

            beforeEach(() => {
                this.image = generateImage('medium-2');
            });

            describe('from Image', () => {

                it('should use already loaded image', () => {
                    let result = this.instance._loadImage('pathToFile', this.image);

                    expect(result).to.be.an.instanceof(PNGImage);
                    expect(result).to.be.equal(this.image);
                });
            });

            describe('from Path', () => {

                it('should load image when only path given', done => {
                    let result = this.instance._loadImage(__dirname + '/bufferImage.png');

                    expect(result).to.be.an.instanceof(Promise);

                    result.then(image => {
                        let compare = compareBuffer(image.getImage().data, this.image.getImage().data);

                        expect(compare).to.be.true;

                        done();
                    }).catch(err => done(err));
                });
            });

            describe('from Buffer', () => {

                beforeEach(() => {
                    this.buffer = fs.readFileSync(__dirname + '/bufferImage.png');
                });

                it('should load image from buffer if given', done => {
                    let result = this.instance._loadImage('pathToFile', this.buffer);

                    expect(result).to.be.an.instanceof(Promise);

                    result.then(image => {
                        let compare = compareBuffer(image.getImage().data, this.image.getImage().data);

                        expect(compare).to.be.true;

                        done();
                    }).catch(err => done(err));
                });
            });
        });

        describe('_copyImage', () => {

            it('should copy the image', () => {
                let image1 = generateImage('small-1'), image2 = generateImage('small-2');

                this.instance._copyImage(image1, image2);

                expect(image1.getAt(0, 0)).to.be.equal(image2.getAt(0, 0));
                expect(image1.getAt(0, 1)).to.be.equal(image2.getAt(0, 1));
                expect(image1.getAt(1, 0)).to.be.equal(image2.getAt(1, 0));
                expect(image1.getAt(1, 1)).to.be.equal(image2.getAt(1, 1));
            });
        });

        describe('_correctDimensions', () => {

            describe('Missing Values', () => {

                it('should correct missing x values', () => {
                    let rect = {y: 23, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(0);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct missing y values', () => {
                    let rect = {x: 10, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(0);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct missing width values', () => {
                    let rect = {x: 10, y: 23, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(290);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct missing height values', () => {
                    let rect = {x: 10, y: 23, width: 42};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(177);
                });

                it('should correct all missing values', () => {
                    let rect = {};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(0);
                    expect(rect.y).to.be.equal(0);
                    expect(rect.width).to.be.equal(300);
                    expect(rect.height).to.be.equal(200);
                });
            });

            describe('Negative Values', () => {

                it('should correct negative x values', () => {
                    let rect = {x: -10, y: 23, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(0);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct negative y values', () => {
                    let rect = {x: 10, y: -23, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(0);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct negative width values', () => {
                    let rect = {x: 10, y: 23, width: -42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(0);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct negative height values', () => {
                    let rect = {x: 10, y: 23, width: 42, height: -57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(0);
                });

                it('should correct all negative values', () => {
                    let rect = {x: -10, y: -23, width: -42, height: -57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(0);
                    expect(rect.y).to.be.equal(0);
                    expect(rect.width).to.be.equal(0);
                    expect(rect.height).to.be.equal(0);
                });
            });

            describe('Dimensions', () => {

                it('should correct too big x values', () => {
                    let rect = {x: 1000, y: 23, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(299);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(1);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct too big y values', () => {
                    let rect = {x: 10, y: 2300, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(199);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(1);
                });

                it('should correct too big width values', () => {
                    let rect = {x: 11, y: 23, width: 4200, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(11);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(289);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct too big height values', () => {
                    let rect = {x: 11, y: 23, width: 42, height: 5700};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(11);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(177);
                });

                it('should correct too big width and height values', () => {
                    let rect = {x: 11, y: 23, width: 420, height: 570};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(11);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(289);
                    expect(rect.height).to.be.equal(177);
                });
            });

            describe('Border Dimensions', () => {

                it('should correct too big x values', () => {
                    let rect = {x: 300, y: 23, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(299);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(1);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct too big y values', () => {
                    let rect = {x: 10, y: 200, width: 42, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(10);
                    expect(rect.y).to.be.equal(199);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(1);
                });

                it('should correct too big width values', () => {
                    let rect = {x: 11, y: 23, width: 289, height: 57};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(11);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(289);
                    expect(rect.height).to.be.equal(57);
                });

                it('should correct too big height values', () => {
                    let rect = {x: 11, y: 23, width: 42, height: 177};

                    this.instance._correctDimensions(300, 200, rect);

                    expect(rect.x).to.be.equal(11);
                    expect(rect.y).to.be.equal(23);
                    expect(rect.width).to.be.equal(42);
                    expect(rect.height).to.be.equal(177);
                });
            });
        });

        describe('_crop', () => {

            beforeEach(() => {
                this.croppedImage = generateImage('medium-1');
                this.expectedImage = generateImage('medium-1');
            });

            it('should crop image', () => {
                this.instance._crop('Medium-1', this.croppedImage, {x: 1, y: 2, width: 2, height: 1});

                expect(this.croppedImage.getWidth()).to.be.equal(2);
                expect(this.croppedImage.getHeight()).to.be.equal(1);

                expect(this.croppedImage.getAt(0, 0)).to.be.equal(this.expectedImage.getAt(1, 2));
                expect(this.croppedImage.getAt(1, 0)).to.be.equal(this.expectedImage.getAt(2, 2));
            });
        });

        describe('_clip', () => {

            it('should clip the image small and medium', () => {
                let image1 = generateImage('small-1'), image2 = generateImage('medium-2');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image medium and small', () => {
                let image1 = generateImage('medium-1'), image2 = generateImage('small-2');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image slim-1 and medium', () => {
                let image1 = generateImage('slim-1'), image2 = generateImage('medium-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image slim-2 and medium', () => {
                let image1 = generateImage('slim-2'), image2 = generateImage('medium-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image small and small', () => {
                let image1 = generateImage('small-2'), image2 = generateImage('small-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });
        });

        describe('isAboveThreshold', () => {

            describe('Pixel threshold', () => {

                beforeEach(() => {
                    this.instance._thresholdType = PixelDiff.THRESHOLD_PIXEL;
                    this.instance._threshold = 50;
                });

                it('should be below threshold', () => {
                    expect(this.instance.isAboveThreshold(49)).to.be.false;
                });

                it('should be above threshold on border', () => {
                    expect(this.instance.isAboveThreshold(50)).to.be.true;
                });

                it('should be above threshold', () => {
                    expect(this.instance.isAboveThreshold(51)).to.be.true;
                });
            });

            describe('Percent threshold', () => {

                beforeEach(() => {
                    this.instance._thresholdType = PixelDiff.THRESHOLD_PERCENT;
                    this.instance._threshold = 0.1;
                });

                it('should be below threshold', () => {
                    expect(this.instance.isAboveThreshold(9, 100)).to.be.false;
                });

                it('should be above threshold on border', () => {
                    expect(this.instance.isAboveThreshold(10, 100)).to.be.true;
                });

                it('should be above threshold', () => {
                    expect(this.instance.isAboveThreshold(11, 100)).to.be.true;
                });
            });
        });

        describe('Comparison', () => {

            beforeEach(() => {
                this.image1 = generateImage('small-1');
                this.image2 = generateImage('small-2');
                this.image3 = generateImage('small-3');
                this.image4 = generateImage('small-1');

                this.maskColor = {
                    red: 123, green: 124, blue: 125, alpha: 126
                };
                this.shiftColor = {
                    red: 200, green: 100, blue: 0, alpha: 113
                };
                this.backgroundMaskColor = {
                    red: 31, green: 33, blue: 35, alpha: 37
                };
            });

            describe('_pixelCompare', () => {

                it('should have no differences with a zero dimension', () => {
                    let result, deltaThreshold = 10, width = 0, height = 0, hShift = 0, vShift = 0;

                    result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.equal(0);
                });

                it('should have all differences', () => {
                    let result, deltaThreshold = 10, width = 2, height = 2, hShift = 0, vShift = 0;

                    result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.equal(4);
                });

                it('should have some differences', () => {
                    let result, deltaThreshold = 100, width = 2, height = 2, hShift = 0, vShift = 0;

                    result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.equal(2);
                });
            });

            describe('_compare', () => {

                beforeEach(() => {
                    this.instance._thresholdType = PixelDiff.THRESHOLD_PIXEL;
                    this.instance._threshold = 3;
                });

                it('should be different', () => {
                    let result, deltaThreshold = 10, hShift = 0, vShift = 0;

                    result = this.instance._compare(this.image1, this.image2, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.be.deep.equal({
                        code: PixelDiff.RESULT_DIFFERENT, differences: 4, dimension: 4, width: 2, height: 2
                    });
                });

                it('should be similar', () => {
                    let result, deltaThreshold = 100, hShift = 0, vShift = 0;

                    result = this.instance._compare(this.image1, this.image2, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.be.deep.equal({
                        code: PixelDiff.RESULT_SIMILAR, differences: 2, dimension: 4, width: 2, height: 2
                    });
                });

                it('should be identical', () => {
                    let result, deltaThreshold = 10, hShift = 0, vShift = 0;

                    result = this.instance._compare(this.image1, this.image4, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

                    expect(result).to.be.deep.equal({
                        code: PixelDiff.RESULT_IDENTICAL, differences: 0, dimension: 4, width: 2, height: 2
                    });
                });
            });
        });

        describe('Run', () => {

            beforeEach(() => {
                this.instance._imageA = generateImage('small-1');
                this.instance._imageB = generateImage('medium-1');

                this.instance._thresholdType = PixelDiff.THRESHOLD_PIXEL;
                this.instance._threshold = 3;

                this.instance._composition = false;
            });

            it('should crop image-a', done => {
                this.instance._cropImageA = {width: 1, height: 2};
                this.instance.run((err, result) => {
                    if (err) {
                        done(err);
                    }
                    expect(result.dimension).to.equal(2);

                    done();
                });
            });

            it('should crop image-b', done => {
                this.instance._cropImageB = {width: 1, height: 1};
                this.instance.run((err, result) => {
                    if (err) {
                        done(err);
                    }
                    expect(result.dimension).to.equal(1);

                    done();
                });
            });

            it('should clip image-b', done => {
                this.instance.run((err, result) => {
                    if (err) {
                        done(err);
                    }
                    expect(result.dimension).to.equal(4);

                    done();
                });
            });

            it('should crop and clip images', done => {
                this.instance._cropImageA = {width: 1, height: 2};
                this.instance._cropImageB = {width: 1, height: 1};
                this.instance.run((err, result) => {
                    if (err) {
                        done(err);
                    }
                    expect(result.dimension).to.equal(1);

                    done();
                });
            });

            it('should write output file', done => {
                this.instance._imageOutputPath = __dirname + '/tmp.png';
                this.instance.run(err => {
                    if (err) {
                        done(err);
                    }
                    expect(fs.existsSync(__dirname + '/tmp.png')).to.be.true;

                    done();
                });
            });

            it('should compare image-a to image-b', done => {
                this.instance.run((err, result) => {
                    if (err) {
                        done(err);
                    }
                    expect(result.code).to.equal(PixelDiff.RESULT_DIFFERENT);

                    done();
                });
            });

            it('should be black', done => {
                this.instance._delta = 1000;
                this.instance._copyImageAToOutput = false;
                this.instance._copyImageBToOutput = false;
                this.instance._outputBackgroundRed = 0;
                this.instance._outputBackgroundGreen = 0;
                this.instance._outputBackgroundBlue = 0;
                this.instance._outputBackgroundAlpha = 0;
                this.instance._outputBackgroundOpacity = undefined;

                this.instance.run(err => {
                    if (err) {
                        done(err);
                    }
                    expect(this.instance._imageOutput.getAt(0, 0)).to.equal(0);

                    done();
                });
            });

            it('should copy image-a to output by default', done => {
                this.instance._delta = 1000;
                this.instance._outputBackgroundRed = undefined;
                this.instance._outputBackgroundGreen = undefined;
                this.instance._outputBackgroundBlue = undefined;
                this.instance._outputBackgroundAlpha = undefined;
                this.instance._outputBackgroundOpacity = undefined;

                this.instance.run(err => {
                    if (err) {
                        done(err);
                    }
                    expect(this.instance._imageOutput.getAt(0, 0)).to.equal(this.instance._imageA.getAt(0, 0));

                    done();
                });
            });

            it('should copy image-a to output', done => {
                this.instance._delta = 1000;
                this.instance._copyImageAToOutput = true;
                this.instance._copyImageBToOutput = false;
                this.instance._outputBackgroundRed = undefined;
                this.instance._outputBackgroundGreen = undefined;
                this.instance._outputBackgroundBlue = undefined;
                this.instance._outputBackgroundAlpha = undefined;
                this.instance._outputBackgroundOpacity = undefined;

                this.instance.run(err => {
                    if (err) {
                        done(err);
                    }
                    expect(this.instance._imageOutput.getAt(0, 0)).to.equal(this.instance._imageA.getAt(0, 0));

                    done();
                });
            });

            it('should copy image-b to output', done => {
                this.instance._delta = 1000;
                this.instance._copyImageAToOutput = false;
                this.instance._copyImageBToOutput = true;
                this.instance._outputBackgroundRed = undefined;
                this.instance._outputBackgroundGreen = undefined;
                this.instance._outputBackgroundBlue = undefined;
                this.instance._outputBackgroundAlpha = undefined;
                this.instance._outputBackgroundOpacity = undefined;

                this.instance.run(err => {
                    if (err) {
                        done(err);
                    }
                    expect(this.instance._imageOutput.getAt(0, 0)).to.equal(this.instance._imageB.getAt(0, 0));

                    done();
                });
            });

            it('should run as promise', done => {
                let promise = this.instance.runWithPromise();

                expect(promise).to.instanceof(Promise);

                promise.then(result => {
                    expect(result.code).to.equal(PixelDiff.RESULT_DIFFERENT);

                    done();
                }).catch(err => done(err));
            });
        });

        describe('Color-Conversion', () => {

            it('should convert RGB to XYZ', () => {
                let color = this.instance._convertRgbToXyz({c1: 92 / 255, c2: 255 / 255, c3: 162 / 255, c4: 1});

                expect(color.c1).to.be.closeTo(0.6144431682352941, 0.0001);
                expect(color.c2).to.be.closeTo(0.8834245847058824, 0.0001);
                expect(color.c3).to.be.closeTo(0.6390158682352941, 0.0001);
                expect(color.c4).to.be.closeTo(1, 0.0001);
            });

            it('should convert RGB to XYZ', () => {
                let color = this.instance._convertXyzToCieLab({
                    c1: 0.6144431682352941, c2: 0.8834245847058824, c3: 0.6390158682352941, c4: 1
                });

                expect(color.c1).to.be.closeTo(95.30495102757038, 0.0001);
                expect(color.c2).to.be.closeTo(-54.68933740774734, 0.0001);
                expect(color.c3).to.be.closeTo(19.63870174748623, 0.0001);
                expect(color.c4).to.be.closeTo(1, 0.0001);
            });
        });
    });
});