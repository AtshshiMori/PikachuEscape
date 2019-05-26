/********************************
  Collision
********************************/

function detectAllCollision() {
    let $enemy = $('.enemy');
    let $player = $('.player');
    let collisionFlag = 0;

    $enemy.each(function (i, enemy) {
        let collision = detectCollision($player, $(enemy));
        if (collision) {
            collisionFlag = 1; // 敵との衝突
        }
    });

    return collisionFlag; // 衝突なし
}

function detectCollision($obj1, $obj2) {
    let pos1 = $obj1.position();
    let pos2 = $obj2.position();

    let top1 = pos1.top;
    let bottom1 = top1 + $obj1.innerHeight();
    let left1 = pos1.left;
    let right1 = left1 + $obj1.innerWidth();

    let top2 = pos2.top;
    let bottom2 = top2 + $obj2.innerHeight();
    let left2 = pos2.left;
    let right2 = left2 + $obj2.innerWidth();

    let verticalCollision = (top1 < bottom2 && bottom1 > top2);
    let holizontalCollision = (left1 < right2 && right1 > left2);

    return verticalCollision && holizontalCollision;
}