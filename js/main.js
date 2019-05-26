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



    // グローバル変数
    let startTime = new Date().getTime();
    let onesec = new Date().getTime();
    let score = 0;
    let requestId;
    let played = false;
    let speed = 3;
    let generateRate = 1 / 60; //敵の発生率（60fpsごとに呼ばれ何%で発生するか：1/60で平均1秒に1体）

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
        }

        // 毎フレームの処理
        enemyManager(generateRate); // 敵の生成
        let collision = detectAllCollision(); //衝突判定
        deleteEnemy(); // 画面外の敵を消す
        moveEnemy(speed); // 敵の移動


        // 衝突していたら終了
        if (collision == 1) {
            console.log("stop");

            //アニメーションのストップ
            window.cancelAnimationFrame(requestId);
            //ゲームオーバー表示
            $('.stage').append('<div class="gameover">Game Over</div>');
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