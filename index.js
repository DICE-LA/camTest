const srcImg = document.getElementById('src-image');
const hiddenImg = document.getElementById('hidden-image');
const fileInput = document.getElementById('input-file');
const canvas = document.getElementById('dest-canvas');
const hiddenCanvas = document.getElementById('hidden-canvas');
const grayScaleBtn = document.getElementById('gray-scale-btn');
const lineDrawBtn = document.getElementById('linedraw-btn');
const downloadBtn = document.getElementById('download-btn');

function convertImageToGray(img) {
    let dst = new cv.Mat();
    let rgbaPlanes = new cv.MatVector();
    let mergedPlanes = new cv.MatVector();
    cv.split(img, rgbaPlanes);
    let R = rgbaPlanes.get(0);
    let G = rgbaPlanes.get(1);
    let B = rgbaPlanes.get(2);
    mergedPlanes.push_back(G);
    mergedPlanes.push_back(B);
    mergedPlanes.push_back(B);
    cv.merge(mergedPlanes, dst);
    rgbaPlanes.delete();
    mergedPlanes.delete();
    R.delete();
    G.delete();
    B.delete();
    return dst;
}

function convertImageToLineDrawing(img) {
  let dst = new cv.Mat();
  let rgbaPlanes = new cv.MatVector();
  let mergedPlanes = new cv.MatVector();
  cv.split(img, rgbaPlanes);
  let R = rgbaPlanes.get(0);
  let G = rgbaPlanes.get(1);
  let B = rgbaPlanes.get(2);
  mergedPlanes.push_back(G);
  mergedPlanes.push_back(B);
  mergedPlanes.push_back(R);
  cv.merge(mergedPlanes, dst);
  rgbaPlanes.delete();
  mergedPlanes.delete();
  R.delete();
  G.delete();
  B.delete();
  return dst;
}

function dataUriToBlob(dataUri) {
    const b64 = atob(dataUri.split(',')[1]);
    const u8 = Uint8Array.from(b64.split(''), e => e.charCodeAt());
    return new Blob([u8], {type: 'image/png'});
}

fileInput.addEventListener('change', e => {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
    hiddenImg.src = URL.createObjectURL(e.target.files[0]);
}, false);

grayScaleBtn.addEventListener('click', e => {
    let src = cv.imread(srcImg);
    const dst = convertImageToGray(src);
    cv.imshow('dest-canvas', dst);
    src.delete();
    dst.delete();

    let hiddenSrc = cv.imread(hiddenImg);
    const hiddenDst = convertImageToGray(hiddenSrc);
    cv.imshow('hidden-canvas', hiddenDst);
    hiddenSrc.delete();
    hiddenDst.delete();
});

lineDrawBtn.addEventListener('click', e => {
    const src = cv.imread(srcImg);
    const dst = convertImageToLineDrawing(src);
    cv.imshow('dest-canvas', dst);
    src.delete();
    dst.delete();

    const hiddenSrc = cv.imread(hiddenImg);
    const hiddenDst = convertImageToLineDrawing(hiddenSrc);
    cv.imshow('hidden-canvas', hiddenDst);
    hiddenSrc.delete();
    hiddenDst.delete();
});

downloadBtn.addEventListener('click', e => {
    const data = hiddenCanvas.toDataURL();
    const url = URL.createObjectURL(dataUriToBlob(data));
    downloadBtn.href = url;
});
