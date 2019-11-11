import { solve } from "./escape-the-mines"

test("A simple map. (2x2)", () => {
  expect(solve([[true, false], [true, true]], [0, 0], [1, 0])) //
    .toMatchObject(["right"])
})

test("A linear map. (1x4)", () => {
  expect(solve([[true], [true], [true], [true]], [0, 0], [3, 0])) //
    .toMatchObject(["right", "right", "right"])
})

test("Walk around an obstacle (3x3)", () => {
  expect(
    solve(
      [
        [true, true, true], //
        [false, false, true], //
        [true, true, true]
      ],
      [0, 0],
      [2, 0]
    )
  ) //
    .toMatchObject(["down", "down", "right", "right", "up", "up"])
})

test("Change directions several times (5x5)", () => {
  expect(
    solve(
      [
        [true, true, false, false, false],
        [false, true, true, false, false],
        [false, false, true, true, false],
        [false, false, false, true, true],
        [false, false, false, false, true]
      ],
      [0, 0],
      [4, 4]
    )
  ) //
    .toMatchObject(["down", "right", "down", "right", "down", "right", "down", "right"])
})
