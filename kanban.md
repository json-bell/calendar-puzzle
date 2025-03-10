# IN DEV

CAL-7: Create Basic Controls

# Backlog

## Story - Add rotations - clicking the selected cell should rotate the piece

CAL-SOON

CAL-?: rotate hovered placement preview

CAL-?: Create util that checks borders of a cell

CAL-?: add Icons for Flip (along top-left to bottom-right diagonal) & Clockwise-rotation

CAL-FAR?: Add 2 choices of controls: Dragging or Clicking
-> Drag start is selection, and then previewing happens when dragging over

CAL-?: Add _unused panels_ as a scrollable track underneath

CAL-?: Add ability to throw panel away

#### Consider how a piece will be FLIPPED over (mirrored)

8 ROTATIONS! 0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,0 -> 1,1 -> 1,2 -> 1,3 -> 0,0 ...

With reduced cycles for things that don't go that far so that positions <-> placements are bijective

---

### Story - Increase Coverage

Reducer, mb just one big snapshot with specific state

---

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
