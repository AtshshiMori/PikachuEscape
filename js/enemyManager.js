/********************************
         Enemy Manager
********************************/
let enemyCount = 0;

let imgArray = [
    "./img/ball01.png",
    "./img/ball02.png",
    "./img/ball03.png",
    "./img/ball04.png"
];

function enemyManager() {

    let rand = Math.random(); //0~1の乱数
    if (rand < generateRate) {
        createEnemy();
    }

    deleteEnemy(); // 画面外の敵を消す
    moveEnemy(speed); // 敵の移動
}

function createEnemy() {
    // typeを決める（0:モンスターボール, 1:スーパーボール, 2:ハイパーボール, 3:マスターボール）
    let rand = Math.floor(Math.random() * 100);
    let type;
    if (rand < 50) {
        type = 0;
    } else if (rand >= 50 && rand < 75) {
        type = 1;
    } else if (rand >= 75 && rand < 90) {
        type = 2;
    } else if (rand >= 90) {
        type = 3;
    }

    // 位置を決める
    let pos = Math.floor(Math.random() * 90);

    //画面に生成
    id = ++enemyCount;
    img = imgArray[type];
    enemy = `<div class="enemy" data-type="` + type + `" id="enemy` + id + `"><img src="` + img + `" alt="enemy "></div>`;
    $('.stage').append(enemy);
    $('#enemy' + id).css({
        top: 0,
        left: pos + "%"
    });


}

function deleteEnemy() {
    $('.enemy').each(function (i, enemy) {
        let top = $(enemy).position().top;
        if (top > 600) {
            $(enemy).remove();
        }

    })
}

// enemyを移動
function moveEnemy(speed) {
    $('.enemy').each(function (i, enemy) {
        let pos_top = $(enemy).position().top;
        $(enemy).css({
            top: pos_top + speed
        });
    });
}