// enum型定義
let State = {
    "nomal": 0,
    "damaged": 1,
};

// グローバル変数
let startTime = new Date().getTime();
let onesec = new Date().getTime();
let score = 0;
let requestId;
let played = false;
let speed = 3;
let generateRate = 1 / 60; //敵の発生率（60fpsごとに呼ばれ何%で発生するか：1/60で平均1秒に1体）
let life = 100; // 体力（%）
let state = State.nomal;
let damageCounter = 0;



$(function () {
    // ブラウザ毎にrequestAnimationFrame()が使えるように設定。
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozcancelAnimationFrame ||
        window.webkitcancelAnimationFrame ||
        window.mscancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;


    // 初回のupdate呼び出し
    $(".player").on("dragstart", function (event, ui) {
        //play済みの場合はキャンセル
        if (played) return;

        played = true;
        $('.startMsg').remove();
        requestId = requestAnimationFrame(update);
    });

    // 1秒に60回実行される　（60fps）
    function update() {

        // 1秒に１回の処理
        now = new Date().getTime();
        if (now - onesec > 500) {
            onesec = new Date().getTime();

            score = updateScore(score); // スコアの更新
            speed += 0.1; //スピードをだんだん早く
            generateRate += 0.0001; //敵の発生率をだんだん高く
            updateDamageCounter(); //ダメージ状態のカウント
        }

        // 毎フレームの処理
        enemyManager(); // 敵の生成
        let collisionType = collisionManager(); //衝突判定
        updateState(collisionType); // ダメージ状態の更新

        if (life <= 0) {

            $('.player').removeClass("damaged");
            $('.player img').attr('src', 'img/pika_die.png');

            //アニメーションのストップ
            window.cancelAnimationFrame(requestId);
            //ゲームオーバー表示
            $('.stage').append('<div class="gameover">Game Over</div>');
            $('.player img').width(200);
            return;
        }

        // 次のフレーム呼び出し
        requestId = window.requestAnimationFrame(update);


    };
});

/********************************
  スコア
********************************/
function updateScore(score) {
    score += 100;
    $('.score').text("Score:" + score);

    return score;
}

/********************************
  体力
********************************/
function updateLife(collisionType) {
    // 衝突に応じて処理

    switch (collisionType) {
        case -1:
            break;
        case 0:
            life -= 10;
            break;
        case 1:
            life -= 20;
            break;
        case 2:
            life -= 50;
            break;
        case 3:
            life -= 100;
            break;
        default:
            break;
    }

    $('.life .life_gauge').width(life + "%");
}

/********************************
  状態
********************************/
function updateState(collisionType) {
    if (damageCounter > 0) {
        return;
    }

    if (collisionType != -1) {
        state = State.damaged;
        damageCounter = 3;
        updateLife(collisionType); // 体力の更新
        $('.player').addClass('damaged');

    } else {
        if (state == State.damaged) {
            state = State.nomal;
            $('.player').removeClass('damaged');
        }
    }
}

function updateDamageCounter() {
    if (damageCounter > 0) {
        damageCounter--;
    }
}