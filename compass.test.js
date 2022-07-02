const Compass = require("./compass");

describe("Compass", () => {
  test("should walk to the North 1 pace", () => {
    const compass = new Compass({ commands: ["W1"] });
    compass.execute();

    expect(compass.direction).toBe("North");
    expect(compass.position).toEqual([0, 1]);
  });

  test("should walk to the South 1 pace", () => {
    const compass = new Compass({ commands: ["R", "W1"] });
    compass.execute();

    expect(compass.direction).toBe("East");
    expect(compass.position).toEqual([1, 0]);
  });

  test("should walk to the East 1 pace", () => {
    const compass = new Compass({ commands: ["R", "R", "W1"] });
    compass.execute();

    expect(compass.direction).toBe("South");
    expect(compass.position).toEqual([0, -1]);
  });

  test("should walk to the West 1 pace", () => {
    const compass = new Compass({ commands: ["R", "R", "R", "W1"] });
    compass.execute();

    expect(compass.direction).toBe("West");
    expect(compass.position).toEqual([-1, 0]);
  });

  test("should not walk with T", () => {
    const compass = new Compass({ commands: ["T"] });
    compass.execute();

    expect(compass.direction).toBe("North");
    expect(compass.position).toEqual([0, 0]);
  });

  test("should not walk with WT33", () => {
    const compass = new Compass({ commands: ["WT33"] });
    compass.execute();

    expect(compass.direction).toBe("North");
    expect(compass.position).toEqual([0, 0]);
  });

  test("should not walk walk with W", () => {
    const compass = new Compass({ commands: ["W"] });
    compass.execute();

    expect(compass.direction).toBe("North");
    expect(compass.position).toEqual([0, 0]);
  });
});
