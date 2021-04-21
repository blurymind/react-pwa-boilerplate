/* global monogatari */

// Define the messages used in the game.
monogatari.action("message").messages({});

// Define the notifications used in the game
monogatari.action("notification").notifications({});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration("credits", {});

// Define the Particles JS Configurations used in the game
monogatari.action("particles").particles({});

// Define the images that will be available on your game's image gallery
monogatari.assets("gallery", {});

// Define the music used in the game.
monogatari.assets("music", {});

// Define the voice files used in the game.
monogatari.assets("voices", {});

// Define the sounds used in the game.
monogatari.assets("sounds", {});

// Define the videos used in the game.
monogatari.assets("videos", {});

// Define the images used in the game.
monogatari.assets("images", {});

// Define the backgrounds for each scene.
monogatari.assets("scenes", {
  northClosed: "facingDoorClosed.png",
  northOpen: "facingDoorOpen.png",
  east: "emptyWall.png",
  west: "emptyWall.png",
  southKey: "key.png",
  southNoKey: "emptyWall.png",
});

// Define the Characters
monogatari.characters({
  m: {
    name: "Mika",
    color: "#facade",
  },
});

monogatari.script({
  // The game starts here.
  Start: ["There's gotta be a way out of this room.", "jump North"],
  North: [
    {
      Conditional: {
        Condition: function () {
          return this.storage().doorOpen;
        },
        False: "show scene northClosed",
        True: "show scene northOpen",
      },
    },
    {
      Choice: {
        Dialog: `m Facing North.`,
        Class: "navigationBox",
        theDoorClosedNoKey: {
          Text: "The Door",
          Do: "jump lockedDoorText",
          Class: "theDoorButton",
          Condition: function () {
            return !this.storage().haveKey;
          },
        },
        theDoorClosedHaveKey: {
          Text: "The Door",
          Do: "jump unlockDoor",
          Class: "theDoorButton",
          Condition: function () {
            return this.storage().haveKey;
          },
        },
        turnLeft: {
          Text: "turnLeft",
          Do: "jump West",
          Class: "turnLeftButton",
        },
        turnRight: {
          Text: "moveRight",
          Do: "jump East",
          Class: "turnRightButton",
        },
        turnAround: {
          Text: "turnAround",
          Do: "jump South",
          Class: "turnAroundButton",
        },
      },
    },
  ],
  South: [
    {
      Conditional: {
        Condition: function () {
          return this.storage().haveKey;
        },
        True: "show scene southNoKey",
        False: "show scene southKey",
      },
    },
    {
      Choice: {
        Dialog: `m Facing South.`,
        Class: "navigationBox",
        theDoorClosedNoKey: {
          Text: "The Key",
          Do: "jump pickUpKey",
          Class: "theKeyButton",
          Condition: function () {
            return !this.storage().haveKey;
          },
        },
        turnLeft: {
          Text: "turnLeft",
          Do: "jump East",
          Class: "turnLeftButton",
        },
        turnRight: {
          Text: "moveRight",
          Do: "jump West",
          Class: "turnRightButton",
        },
        turnAround: {
          Text: "turnAround",
          Do: "jump North",
          Class: "turnAroundButton",
        },
      },
    },
  ],
  pickUpKey: [
    "You pick up the key!",
    {
      Function: {
        Apply: function () {
          //Function to apply.
          //Will be executed when progressing forward through the line.
          this.storage().haveKey = true;
          return true;
        },
        Reverse: function () {
          //Function to reverse what the apply function did.
          //Will be executed when clicking the back button through the line.
          this.storage().haveKey = false;
        },
      },
    },
    "jump South",
  ],
  East: [
    "show scene east",
    {
      Choice: {
        Dialog: `m Facing East.`,
        Class: "navigationBox",
        turnLeft: {
          Text: "turnLeft",
          Do: "jump North",
          Class: "turnLeftButton",
        },
        turnRight: {
          Text: "moveRight",
          Do: "jump South",
          Class: "turnRightButton",
        },
        turnAround: {
          Text: "turnAround",
          Do: "jump West",
          Class: "turnAroundButton",
        },
      },
    },
  ],
  West: [
    "show scene west",
    {
      Choice: {
        Dialog: `m Facing West.`,
        Class: "navigationBox",
        turnLeft: {
          Text: "turnLeft",
          Do: "jump South",
          Class: "turnLeftButton",
        },
        turnRight: {
          Text: "moveRight",
          Do: "jump North",
          Class: "turnRightButton",
        },
        turnAround: {
          Text: "turnAround",
          Do: "jump East",
          Class: "turnAroundButton",
        },
      },
    },
  ],
  lockedDoorText: ["The knob won't turn. The door's locked.", "jump North"],
  unlockDoor: [
    {
      Conditional: {
        Condition: function () {
          return this.storage().doorOpen;
        },
        False: "next",
        True: "jump Ending",
      },
    },
    "The key works! The door unlocks and opens!",
    {
      Function: {
        Apply: function () {
          //Function to apply.
          //Will be executed when progressing forward through the line.
          this.storage().doorOpen = true;
          return true;
        },
        Reverse: function () {
          //Function to reverse what the apply function did.
          //Will be executed when clicking the back button through the line.
          this.storage().doorOpen = false;
        },
      },
    },
    "jump North",
  ],
  Ending: [
    "show scene #000000",
    "I finally escaped the room.",
    "Ending 1. Escape. (There are no other endings. You did it. Good job.)",
    "end",
  ],
});
