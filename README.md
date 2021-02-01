# Robot Simulator

- This application is a simulation of a robot moving on a square table top, dimensions 6 x 6 units.
- There are no obstructions on the table surface.
- The robot is free to move across the table but must be prevented from falling to destruction, and movement that may lead to destruction must be prevented.

### Challenge

Create an application that can read the commands below from a file and provide the output accordingly.

#### Commands

- `PLACE X,Y,D` — where X & Y are the coordinates where 0,0 is the north-west most corner and D is the direction `NORTH`, `SOUTH`, `EAST`, `WEST`.
- `MOVE` — will move the robot one unit forward in the specified direction
- `LEFT` and `RIGHT` — will rotate the robot 90º left or right respectively
- `REPORT` — will output the current position and direction of the robot

#### Expectations

- The application should input the commands from a test file
- The output should be provided to console
- TypeScript should be used as the language of choice
- Test cases (preferrably in Jest) should be supplied

#### Example Inputs & Outputs

** Example 1 **

Input:

```
PLACE 0,0,SOUTH
MOVE
MOVE
REPORT
```

Output:

```
0,2,SOUTH
```

** Example 2 **

Input:

```
PLACE 3,3,EAST
MOVE
MOVE
MOVE
MOVE
REPORT
```

Output:

```
3,6,EAST
```

** Example 3 **

Input:

```
PLACE 2,5,EAST
MOVE
MOVE
RIGHT
MOVE
REPORT
```

Output:

```
3,6,EAST
```
