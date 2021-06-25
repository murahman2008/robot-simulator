# The Robot Simulator Challenge #

### PLEASE NOTE, I have comleted the challenge using nodejs. I have also tried to use ES6 anywhere possible ###

To run the simulator, please run index.js

If you want to import the simulator in another file, you can use the main.js file. Sample code below:
```
const WalkingRobot = require('./main');

const wr = new WalkingRobot('path to the txt file with instructions');
wr.walk();
```

To change the instructions given to the function / class, please edit the pathway.txt file.

