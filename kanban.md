# IN DEV

CAL-11: Reorganise window for mobile: board, menu (possibly v small with bin icon), piece list

Bin icon: in bottom right of screen on the "wall" cell

# Backlog

## Story - Add rotations - clicking the selected cell should rotate the piece

CAL-?: See panels with multiple pieces placed

CAL-?: Continue piece selection area styling -> rotatable & flippable, deselect by clicking in it, ...

CAL-?: rotate pieces in the selection? Tbh mb not even

CAL-?: add Icons for Flip (along top-left to bottom-right diagonal) & Clockwise-rotation, & hovering piece changes its colour? & Selecting changes border mb - or the other way around

CAL-?: Generate Solutions

CAL-?: Adds hints: clicking hint & selecting a piece correctly places it

CAL-FAR: Add keyboard controls: 1 to 0 for piece selection

CAL-FAR?: Add 2 choices of controls: Dragging or Clicking
-> Drag start is selection, and then previewing happens when dragging over

---

### Story - Increase Coverage

Reducer, mb just one big snapshot with specific state

---

### Story - Date selection and completion

---

---

# DONE

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
