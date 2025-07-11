# IN DEV

NOTE TO SELF AS POSSIBLE ROUTE: Start from corners / where the days are? So that if there's a tight squeeze it gets delt with first, since that's the strength of this search method

instead of e.g. Thurs 26th June where there's a zigzag in the bottom right, and it's rly hard to fill, but it's gonna deal with that with literally the last piece, instead of right at the start as a human would tbh

## CAL-21: Solution building: UI, Early Loading of solution after any placement, "enable cheats" menu or smth

I want the "show solution" to be quicker

- This could in part be done with: Allowing easier solutions (e.g. with several buttons: "generate 3 star sol", "generate 2 star sol" etc.)

- Early Loading: whenever a new piece is placed, start a new process finding the current solution
  -> create a `solver` class, with a `stop` method, so that we don't have a bunch of processes all running in the background for no reason :D

- Sad path: Asking to be shown a solution without one being available

# Backlog

## Epic - Choosing date

CAL-?: Date selection - 3 fields Num/Day/Month? Or calendar? Both?

Add date to querystring too?

## CAL-?: Make Grid solution solving more efficient

See comments in `generateSolution.ts`: plans how to target the smallest spaces first, so that solution spaces are more quickly eliminated (checks e.g. if a 5-panel gap CAN be filled, before trying all the different ways of filling the 35 panel gap)

## Epic - Solutions and hints - needs to be able to detect win

CAL-?: Adds hints: clicking hint & selecting a piece correctly places it

## Epic - Progress saving

CAL-?: Very basic login - enough to then integrate a backend storing what solutions are done
-> NoSQL seems very promising - Obj with Keys corresponding to dates, no relation between users, no relation between dates, no relation between pieces rly except mb dates, but storing solutions as a date-user-piecePosition join or smth seems like hell (esp if date is day / month / date)

CAL-?: Create backend that saves when you win, mb saves your solution

CAL-?: Login? Solution backend would seem v much like a NoSQL

## Epic - Controls & Accessibility

CAL-?: Icons for flipping/rotating according to what's happening next, (along top-left to bottom-right diagonal)

CAL-?: e.g. Toaster never fading

## Epic - Styling

CAL-?:

And maybe make the other colours neutral / consistent e.g make the menu background from a linear gradient or pattern in the greys and not a random purple, same with the red border of the playable pieces & brown action buttons (although a bit of colour there is also fun/useful to see what buttons are active)

# Story - Dragging Controls

-> Drag start is selection, and then previewing happens when dragging over

# Story - Keyboard Controls

CAL-FAR: Add keyboard controls:

- 1,2,3...,9,0 for piece selection
- arrow keys/WASD for moving
- R / F for rotating/flipping?
- Add context for if keyboard's being used, and then toggle some NUMBERS on the pieces

## Epic-less

CAL-?: Accessibility: Colours currently determining a lot of the stuff

### Epic - Increase Coverage

Reducer, mb just one big snapshot with specific state

---

# DONE

## CAL-20 Generate Solution from a filling-panels approach (as opposed to a placing-pieces)

- This should be more efficient: while deving piece-first, realised gaps of size 5 are very hard to fill
- needing to search the whole tree before realising that the gap-5 can't actually be filled
- could possibly do a mix where small gaps are targetted first
- that involves rewriting the whole thing entirely for those cases

From this, I realised it's easier to just take a panel-first approach anyway:

- try to fill a panel first
- can possibly suggest which panel to fill from previous iteration (e.g. start with a piece from a small gap)
- And then go over each panel
- It may initially seem like this is more iterations: to the scale of n^50 as opposed to n^10 (piece count vs panel count)
- but for every panel filled appropriately, 4 others are filled
- -> each iteration places a piece, so you get to the same thing
- -> but it'll be easier to immediately say "use one of these 6 unplaced pieces" instead of like before where we test every panel
- feeling good abt this one tbh, I think it could really speed things up

## CAL-19: Create function that trial-and-error builds grid for a specific date

Takes a date / checkIsWin & current gamePiece positions, and builds a solution according to that

--> might need a nice way of storing gamePiecePositions?

## CAL-18: Good vs Bad win

Render when a piece has been flipped over, and count flipped pieces in WinDetails in game state

## CAL-17: Colours, styling and hover effects and consistency

Improve the colour consistency (e.g. have the tile be the same colour in the selection as when played)

And so sync hovers (e.g. light fading to white as opposed to red -> orange etc)

## CAL-16: Check for a win for a specific date

Implements checkWin function to check for wins, and integrates this into the reducer updates and state.

## CAL-15: Modify rotation order

Right now the rotations look odd, with flipping along an odd choice of diagonal.

Modify the rotation/flipping cycle to be less intuitive

## CAL-14: Display a specific target date

Visually display a specific date, and set up before / after buttons to change the date visually

## CAL-13: compact layout and style other layouts

Adds layout for compact (smallest size) and adjusts other layouts

## CAL-12: add icon indicating flipping or rotating a piece

When a piece is placed and selected, you can rotate / flip it - make this visible on the selected cell.

## CAL-11: Adapt layout for mobile

Board, piece list, menu (w/ small with bin icon)

Defines sizing.md sizes (large 1140px+, medium 832px+, small 584px+, compact underneath that)

lays out sizings & tweaks styles appropriately: panel, padding, and font sizes

Bin icon: in bottom right of screen on the "wall" cell

## CAL-10: Layout for desktop: board, menu, piece list

From 1140px: Board takes whole left side
Scrolling track for pieces on the right
Menu on the bottom

## CAL-9: Piece borders

Goal: Have piece borders always visible on the board, even with overlaying tiles, so that you can see what is placed where when several pieces are there, as well as customisable coloring when it's selected (black when selected, piece colour when not)

Possible solutions:

- util at the board level that renders borders when necessary
- util at the cell level that checks if a border is necessary
- util at the global level, lookup object checking for borders, and then some extra stuff for the rendering whenever panels appear
  -> I prefer this in a lot of ways
  -> top left, top right, bottom left, bottom right for the

e.g. `pieceBorderLookup({rotation,flipped,pieceId,cellId})[top,bottom,left,right,TL,TR,BL,BR]`

-> TWO LAYERS

one for getting the NEIGHBOURS that's almost a lookup object

one for getting the CSS for the cell: b
----> need a NEW DIV bc the border radiuses will be _different_

## CAL-8: Create piece selection area

Making area scrollable for all the tiles, and distinguish between placed and remaining tiles

---

## CAL-7: basic menu with remove piece

Makes a menu for the game with a "remove piece" option

---

## CAL-6 apply rotations

Applies pieces rotations to puzzle - first functional version of puzzle

---

## CAL-5 Limit piece rotation

Limit rotation & mirroring of pieces (e.g. `|` shape only has rotation:0,1 and no flip)

---

## CAL-4 Add Flipped to Game & State

Add the tracking of whether the piece is mirrored - this is the first ticket, in charge of updating types & game state with mirror: 0 set for now

---

## CAL-3 Make clicking a piece with placed overlay select that piece

Clicking a placed cell on any piece should select that piece and that cell - the preview from hovering panels should reflect this change

---

## CAL-2 Make placed overlays called at individual Panel level

Right now the overlays from a placed piece are called only at the panel where the cell is placed - change this to be from each covered panel

---

## CAL-1 Make Preview component

Make the overlay when hovering a no-pointer-events visual-only distinct component to the puzzle piece

---
