var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "bread", "x": 1000, "y": groundY },
                { "type": "enemy", "x": 500, "y": groundY },
                { "type": "reward", "x": 350, "y": groundY },
            ]
        };
        for (var i = 0; i < levelData.gameItems.length; i++){
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;
            if(objType === 'sawblade') {
                createSawBlade(objX, objY);
            } else if (objType === 'bread') {
                createBread(objX, objY);
            } else if (objType === 'enemy') {
                createEnemy(objX, objY);
            } else {
                createReward(objX, objY);
            }
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -25 ;
            obstacleImage.y = -25;
            sawBladeHitZone.addChild(obstacleImage);
        }

        function createBread (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var breadHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            breadHitZone.x = x;
            breadHitZone.y = y;
            game.addGameItem(breadHitZone);    
            var obstacleImage = draw.bitmap('img/bread.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            breadHitZone.addChild(obstacleImage);
        }
        
        function createEnemy (x, y) {
            var enemy = game.createGameItem('enemy',25);
            var enemyImage = draw.bitmap('img/Baguette.png');
            enemyImage.x = -50;
            enemyImage.y = -50;
            enemy.addChild(enemyImage);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            rotationVelocity = 10;

            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function() {
                enemy.fadeOut();
                game.increaseScore(100);
            }
        }

        function createReward (x, y) {
            var reward = game.createGameItem('reward',25);
            var greenSquare = draw.rect(50,50,'green');
            greenSquare.x = -25;
            greenSquare.y = -25;
            reward.addChild(greenSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -0.75;
            rotationVelocity = 10;

            reward.onPlayerCollision = function() {
                game.changeIntegrity(10);
                game.increaseScore(100);
                reward.fadeOut();
            }
            
        }
        //functions calls
        
        createSawBlade(900, groundY);
        createSawBlade(800, groundY);
        createSawBlade(700, groundY); 

        createBread(500, groundY);

        createEnemy(500,groundY-50);
        createEnemy(1500,groundY-50);
        createEnemy(2500,groundY-50);

        createReward(450, groundY);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
