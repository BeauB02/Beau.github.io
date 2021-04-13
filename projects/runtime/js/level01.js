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
                { "type": "sawblade", "x": 400, "y": groundY},
                { "type": "sawblade", "x": 700, "y": groundY},
                { "type": "sawblade", "x": 1000, "y": groundY},
                { "type": "bread", "x": 1500, "y": groundY-50},
                { "type": "enemy", "x": 1200, "y": groundY-50},
                { "type": "reward", "x": 1100, "y": groundY-50},
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
            } else if(objType === 'reward'){
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
            var bread = game.createGameItem('bread',25);
            var breadImage = draw.bitmap('img/bread.png');
            breadImage.x = -50;
            breadImage.y = -50;
            bread.addChild(breadImage);
            bread.x = x;
            bread.y = y;
            game.addGameItem(bread);
            bread.velocityX = -1;
            rotationVelocity = 10;

            bread.onPlayerCollision = function() {
                game.changeIntegrity(-25);
            };
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
        
     
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
