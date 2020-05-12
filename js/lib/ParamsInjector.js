class ParamsInjector {
  constructor() {
    this.params = ParamsInjector.params1;
  }

  static params1 = {
    fps: 5,
    side: 500,
    scale: 1,
    rows: 0.1,  // For every % width/height, there will be a road.
    roadClosures: 0  // % of roads b/w two intersections is closed.
  }
}
