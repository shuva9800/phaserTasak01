

// import Phaser from 'phaser';
// import GameScene from './GameScene.js';

// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 500,
//     backgroundColor:'#FFFFFF',
//     scene: [GameScene],
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false
//         }
//     }
// };

// const game = new Phaser.Game(config);

// document.getElementById('start-button').addEventListener('click', () => {
//     game.scene.start('GameScene');
// });


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#FFFFFF',
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);

document.getElementById('start-session-button').addEventListener('click', () => {
    game.scene.start('GameScene');
});



