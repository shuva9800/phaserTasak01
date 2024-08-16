

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.sessions = [];
        this.sessionId = 0;
        this.isSessionActive = false;
    }

    preload() {
        this.load.image('ball', 'assets/images/ball.svg');
        this.load.audio('clock', 'assets/music/clock.mp3');
    }

    create() {
        this.cameras.main.setBackgroundColor('#87CEEB');

        this.ball = this.physics.add.sprite(400, 300, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);

        this.clockSound = this.sound.add('clock');

        this.ball.setVelocity(0, 0);

        this.startButton = document.getElementById('start-session-button');
        this.timerText = document.getElementById('timer-text');
        this.startButton.addEventListener('click', this.handleStartSession.bind(this));
    }

    handleStartSession() {
        if (this.isSessionActive) return;

        this.isSessionActive = true;
        this.currentTimer = Phaser.Math.Between(20, 95); // Random number between 20 and 95

        const sessionId = `SessionID-${Date.now()}`;
        const startTime = new Date().toLocaleTimeString();

        this.clockSound.play({ loop: true });
        this.timerText.innerText = `Time: ${this.currentTimer}`;

        this.startButton.disabled = true; // Disable the start button

        const timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.currentTimer--;
                this.timerText.innerText = `Time: ${this.currentTimer}`;

                if (this.currentTimer === 0) {
                    this.clockSound.stop();
                    this.ball.setVelocity(0);
                    const endTime = new Date().toLocaleTimeString();
                    this.sessions.push({ sessionId, startTime, endTime });
                    this.updateSessionList();
                    this.isSessionActive = false;
                    this.startButton.disabled = false; // Re-enable the start button
                }
            },
            repeat: this.currentTimer - 1,
        });

        const minSpeed = 400;
        const maxSpeed = 500;
        const xSpeed = Phaser.Math.Between(minSpeed, maxSpeed) * Phaser.Math.RND.sign();
        const ySpeed = Phaser.Math.Between(minSpeed, maxSpeed) * Phaser.Math.RND.sign();
        this.ball.setVelocity(xSpeed, ySpeed);
    }

    updateSessionList() {
        const sessionList = document.getElementById('session-list');
        sessionList.innerHTML = '';
        this.sessions.forEach((session) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${session.sessionId}: ${session.startTime} - ${session.endTime}`;
            sessionList.appendChild(listItem);
        });
    }
}
