////////////////////////////////////////////////////////////////////////////////
/*各ID割り当て*/
  let home = document.getElementById('Home');//開始ボタン
  let start = document.getElementById('Start');//開始ボタン
  let input = document.getElementById('Input'); //入力ボタン

  let conv = document.getElementById('Conv');//開始ボタン
  let srcimg = document.getElementById('SrcImg');//開始ボタン
  let canvas = document.getElementById('Canvas');//開始ボタン
  let tohome = document.getElementById('ToHome'); //ホームボタン
////////////////////////////////////////////////////////////////////////////////
/*変更の必要なし*/
  window.addEventListener('load', () => {
    console.log('Window Loaded');
    onReady();
  });
////////////////////////////////////////////////////////////////////////////////
  function onReady() {
    console.log('On Ready');
    start.disabled = false;
    input.addEventListener("change",onStart,false);
    tohome.addEventListener('click', onHome);
    console.log('onReady : Success');
  };
////////////////////////////////////////////////////////////////////////////////
  function onStart() {
    let srcMat = new cv.Mat(srcimg.height, srcimg.width, cv.CV_8UC4);

    start.disabled = true;
    tohome.disabled  = false;
    srcimg.src = URL.createObjectURL(input.files[0]);//file の受け渡し
    console.log('On Start : Success');
    srcMat = cv.imread(srcimg);
    process();
  }

  function onHome() {
    console.log('homeed processing');
    Init();
  }

  function process() {
    try{
      console.log('processing: Start');
      let rgbElem = new cv.MatVector();
      let cvtImg = new cv.Mat(srcimg.height, srcimg.width, cv.CV_8UC4);
      rgbElem = cv.split(srcMat);

      let chR = 0;
      let chG = 1;
      let chB = 2;

      cvtImg = cv.merge(rgbElem.get(2), rgbElem.get(0), rgbElem.get(0))
      cv.imshow('canvas', cvtImg);
    } catch (err) {
          console.log('error');
      }
  }

function Init(){
  srcMat.delete();
  rgbElem.delete();
  cvtImg.delete();
  start.disabled = false;
  home.disabled  = true;
  console.log('setting-initialized');
}
