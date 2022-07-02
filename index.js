#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const Compass = require("./compass");

const validateRegex = /[^WRL\d]/gi;

const argv = yargs(hideBin(process.argv))
  .usage("Usage: maqe <walking command> [options]")
  .usage(
    "walking command => \n R = turn right 90 degree \n L = turn left 90 degree \n W = walk N step"
  )
  .command("maqe", "<walking command>")
  .example("$0 maqe W5RW5RW2RW1R", "Walking to the direction")
  .help("h")
  .alias("h", "help")
  .check((argv) => {
    const walkingSteps = argv._;
    if (walkingSteps.length > 1) {
      throw new Error("Only 1 command without spaces may be passed.");
    } else if (validateRegex.test(walkingSteps[0])) {
      throw new Error("Invalid command.");
    } else {
      return true; // tell Yargs that the arguments passed the check
    }
  }).argv;

const groupingCommandRegex = new RegExp("[W]\\d+|[RL]", "gi");
const commands = argv._[0].toUpperCase().match(groupingCommandRegex);

const compass = new Compass({ commands });
compass.execute()

const [x,y] = compass.position;

console.log(`X: ${x}, Y: ${y}, Direction: ${compass.direction}`);