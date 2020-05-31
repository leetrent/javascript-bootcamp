
/********************************************************************
 * Works in Chrome and Firefox
 ********************************************************************/
// class Timer {
//     constructor(durationInput, startButton, pauseButton, callbacks) {
//         this.durationInput = durationInput;
//         this.startButton = startButton;
//         this.pauseButton = pauseButton;
//         if (callbacks) {
//             this.onStart    = callbacks.onStart;
//             this.onTick     = callbacks.onTick;
//             this.onComplete = callbacks.onComplete;
//         }

//         this.startButton.addEventListener('click', this.start);
//         this.pauseButton.addEventListener('click', this.pause);
//     };

//     start = () => {
//         if (this.onStart) {
//             this.onStart(this.timeRemaining);
//         }
//         this.tick();
//         this.interval = setInterval(this.tick, 20);
//     };
    
//     pause = () => {
//         clearInterval(this.interval);
//     };

//     tick = () => {
//         if ( this.timeRemaining <= 0) {
//             this.pause();
//             if (this.onComplete) {
//                 this.onComplete();
//             }
//         } else {
//             this.timeRemaining = this.timeRemaining - 0.02;
//             if (this.onTick) {
//                 this.onTick(this.timeRemaining);
//             }
//         }
//     };

//     get timeRemaining() {
//         return parseFloat(this.durationInput.value);
//     };

//     set timeRemaining(time) {
//         this.durationInput.value = time.toFixed(2);
//     };
// };

/********************************************************************
 * Works in Chrome, Firefox, Safari (macOS)
 ********************************************************************/
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    _defineProperty(this, "start", () => {
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }

      this.tick();
      this.interval = setInterval(this.tick, 20);
    });

    _defineProperty(this, "pause", () => {
      clearInterval(this.interval);
    });

    _defineProperty(this, "tick", () => {
      if (this.timeRemaining <= 0) {
        this.pause();

        if (this.onComplete) {
          this.onComplete();
        }
      } else {
        this.timeRemaining = this.timeRemaining - 0.02;

        if (this.onTick) {
          this.onTick(this.timeRemaining);
        }
      }
    });

    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

}

;