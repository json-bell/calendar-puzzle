# IN DEV

CAL-8: Style piece selection area

Making area scrollable for all the tiles, and rotateable, selectable, etc. within the piece selection area

# Backlog

## Story - Add rotations - clicking the selected cell should rotate the piece

CAL-SOON:

CAL-?: See panels with multiple pieces placed

CAL-?: rotate pieces in the selection

CAL-?: Create util that checks borders of a cell in a piece OR GENERALLY make border of partial grid
-> MAKE BORDERS IN THE PLACED COLOUR OF ALL THE PIECES SO YOU CAN SEE WHEN THEY OVERLAP

CAL-?: add Icons for Flip (along top-left to bottom-right diagonal) & Clockwise-rotation

CAL-FAR?: Add 2 choices of controls: Dragging or Clicking
-> Drag start is selection, and then previewing happens when dragging over

CAL-?: Add ability to throw panel away

---

### Story - Increase Coverage

Reducer, mb just one big snapshot with specific state

---

### Story - Date selection and completion

---

---

# DONE

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
