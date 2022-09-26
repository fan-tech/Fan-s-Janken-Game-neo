'use strict';
{
  const startBtn = document.getElementById('startBtn');
  const npcTarget = document.getElementById('nTarget');
  const target = document.getElementById('target');

  const gooBtn = document.getElementById('gooBtn');
  const chokiBtn = document.getElementById('chokiBtn');
  const paaBtn = document.getElementById('paaBtn');

  const goo = document.getElementById('goo');
  const choki = document.getElementById('choki');
  const paa = document.getElementById('paa');

  const nowResult = document.getElementById('nowResult');
  const pResults = document.getElementById('pResults');
  const nResults = document.getElementById('nResults');

  const resetBtn = document.getElementById('resetBtn');
  const result = document.getElementById('result');
  const resultComment = document.getElementById('resultComment');



  // じゃんけんらんだむ
  let npcJanken;

  // 勝利数管理変数
  let myWin = 0;
  let npcWin = 0;

  // 「ぐー」「ちょき」「ぱー」の中から何か選ばれた時に
  // ランダムでNPCがぐーちょきぱーを選ぶ関数

  function npcChoice() {
    npcJanken = Math.floor(Math.random() * 3 + 1);
    if (npcJanken === 1) {
      target.textContent = 'ぐー';
      nTarget.style.background = '#eea85f';
      nTarget.style.opacity = '1.0';
      nTarget.style.fontSize = '40px';
    } else if (npcJanken === 2) {
      target.textContent = 'ちょき';
      nTarget.style.background = '#f18f65';
      nTarget.style.opacity = '1.0';
      nTarget.style.fontSize = '40px';
    } else {
      target.textContent = 'ぱー';
      nTarget.style.background = '#ab785a';
      nTarget.style.opacity = '1.0';
      nTarget.style.fontSize = '40px';
    }
  }

  // 「ちょき」ボタン無効
  function chokiOff() {
    choki.textContent = '';
    chokiBtn.style.background = 'gray';
    chokiBtn.style.cursor = 'auto';
    chokiBtn.style.pointerEvents = 'none';
  }
  // 「ちょき」ボタン有効
  function chokiOn() {
    choki.textContent = 'ちょき';
    chokiBtn.style.background = '#f18f65';
    chokiBtn.style.cursor = 'pointer';
    chokiBtn.style.pointerEvents = 'auto';
  }

  // 「ぱー」ボタン無効
  function paaOff() {
    paa.textContent = '';
    paaBtn.style.background = 'gray';
    paaBtn.style.cursor = 'auto';
    paaBtn.style.pointerEvents = 'none';
  }

  // 「ぱー」ボタン有効
  function paaOn() {
    paa.textContent = 'ぱー';
    paaBtn.style.background = '#ab785a';
    paaBtn.style.cursor = 'poiter';
    paaBtn.style.pointerEvents = 'auto';
  }
  // 「ぐー」ボタン無効
  function gooOff() {
    goo.textContent = '';
    gooBtn.style.background = 'gray';
    gooBtn.style.cursor = 'auto';
    gooBtn.style.pointerEvents = 'none';
  }

  // 「ぐー」ボタン有効
  function gooOn() {
    goo.textContent = 'ぐー';
    gooBtn.style.background = '#eea85f';
    gooBtn.style.cursor = 'poiter';
    gooBtn.style.pointerEvents = 'auto';
  }

  // 「じゃんけん」ボタンに戻す。
  function jankenReset() {
    target.textContent = 'じゃんけん';
    npcTarget.style.background = 'gray';
    npcTarget.style.fontSize = '25px';
    npcTarget.style.opacity = '0.7';
  }

  // 「勝ち」！
  function youWin() {
    nowResult.textContent = 'かち！';
    nowResult.style.backgroundColor = 'red';
    myWin++;
  }

  // 「負け！」
  function youLose() {
    nowResult.textContent = 'まけ！';
    nowResult.style.backgroundColor = 'blue';
    npcWin++;
  }

  // 「あいこ！」
  function aiko() {
    nowResult.textContent = 'あいこ！';
  }
  // 結果画面初期値
  function nowResultReset() {
    nowResult.textContent = '↑選んでね！↑';
    nowResult.style.backgroundColor = 'gray';
  }
  // 結果を更新する

  function nowResultUpdate() {
    pResults.textContent = myWin;
    nResults.textContent = npcWin;
  }

  //画面操作有効/無効化関数
  function btnOff() {
    chokiBtn.style.pointerEvents = 'none';
    gooBtn.style.pointerEvents = 'none';
    paaBtn.style.pointerEvents = 'none';
  }

  function btnOn() {
    chokiBtn.style.pointerEvents = 'auto';
    gooBtn.style.pointerEvents = 'auto';
    paaBtn.style.pointerEvents = 'auto';
  }

  // 終了条件分岐
  function resultCheck() {
    if (myWin === 3) {
      result.style.animationName = 'upToDown';
      result.style.animationDuration = '3s';
      result.style.display = 'block';
      resultComment.textContent = 'あなたの勝ちです！';
    } else if (npcWin === 3) {
      result.style.animationName = 'upToDown';
      result.style.animationDuration = '3s';
      result.style.display = 'block';
      resultComment.textContent = 'あなたの負けです！';
    } else {
      setTimeout(function () {
        jankenReset();
        gooOn();
        paaOn();
        chokiOn();

        nowResultReset();
      }, 4000);
    }
  }

  // ここからはじまる！
  btnOff();

  function setCookie(key, value) {
    document.cookie = key + '=' + value + ';';
  }

  function getCookie(key) {
    const cookies = document.cookie;
    const cookiesAry = cookies.split(';');

    for (let i = 0; i < cookiesAry.length; i++) {
      let cookie = cookiesAry[i].split('=');
      if (cookie[0] === key) {
        return cookie;
      }
    }
  }

  const keyName = 'visited';
  const keyValue = true;
  const cookie = getCookie(keyName);

  if (typeof cookie === 'undefined' || cookie[1] !== keyValue) {
    //Cookieをセットする
    setCookie(keyName, keyValue);

    //ここに初回アクセス時の処理
    // ルール説明画面をスタートを押したら消す。
    // ゲームスタート。
    startBtn.addEventListener('click', () => {
      document.getElementById('startArea').style.display = 'none';
      btnOn();
    });
  } else {
    //ここに通常アクセス時の処理
    console.log('訪問済みです');
  }

  // 「ぐー」を押した時の挙動
  gooBtn.addEventListener('click', () => {
    const myGoo = 1;
    chokiOff();
    paaOff();

    gooBtn.style.cursor = 'auto';
    gooBtn.style.pointerEvents = 'none';

    if (data === 1) {
      aiko();
    } else if (data === 2) {
      youWin();
    } else {
      youLose();
    }

    nowResultUpdate();

    resultCheck();

    npcJanken = 0;
  });
  // 「ちょき」ボタン押したときの動き
  chokiBtn.addEventListener('click', () => {
    const mychoki = 2;

    gooOff();
    paaOff();

    chokiBtn.style.cursor = 'auto';
    chokiBtn.style.pointerEvents = 'none';

    npcChoice();

    if (npcJanken === 1) {
      youLose();
    } else if (npcJanken === 2) {
      aiko();
    } else {
      youWin();
    }

    nowResultUpdate();

    resultCheck();
    npcJanken = 0;
  });

  // 「ぱー」ボタンを押した時の挙動
  paaBtn.addEventListener('click', () => {
    const myPaa = 3;

    chokiOff();
    gooOff();

    paaBtn.style.cursor = 'auto';
    paaBtn.style.pointerEvents = 'none';

    npcChoice();
    if (npcJanken === 1) {
      youWin();
    } else if (npcJanken === 2) {
      youLose();
    } else {
      aiko();
    }
    nowResultUpdate();
    resultCheck();
    npcJanken = 0;
  });

  // リセットボタン押した時のアレ
  resetBtn.addEventListener('click', () => {
    result.style.display = 'none';
    myWin = 0;
    npcWin = 0;
    nowResultUpdate();
    btnOn();
    gooOn();
    chokiOn();
    paaOn();
    jankenReset();
    nowResultReset();
  });
}
