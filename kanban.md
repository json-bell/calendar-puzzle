# IN DEV

CAL-16: Create function that checks for a win for a specific date

# Backlog

CAL-?: Deselect all pieces - button & dispatch

CAL-?: Style controls menu

## Epic - good vs bad win

Render when a piece has been flipped over, and mark win accordingly

## Epic - Detecting Win and choosing date

CAL-?: Date selection - 3 fields Num/Day/Month? Or calendar? Both?

## Epic - Solutions and hints - needs to be able to detect win

CAL-?: Create function that trial-and-error builds grid for a specific date

CAL-?: Adds hints: clicking hint & selecting a piece correctly places it

## Epic - Progress saving - blocked by Detecting Win

CAL-?: Create backend that saves when you win, mb saves your solution?

## Epic - Controls

CAL-?: Icons for flipping/rotating according to what's happening next, (along top-left to bottom-right diagonal)

CAL-?

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

CAL-?: See panels with multiple pieces placed
? not sure what this means

### Epic - Increase Coverage

Reducer, mb just one big snapshot with specific state

---

# DONE

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
