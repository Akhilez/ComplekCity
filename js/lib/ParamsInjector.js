class ParamsInjector {
  constructor() {
    this.params = ParamsInjector.params1;
  }

  static params1 = {
    fps: 5,
    side: 800,
    rows: 0.05,  // For every % width/height, there will be a road.
    roadClosures: 0.15,  // % of roads b/w two intersections is closed.
    nAgents: 50,
    framesPerTimeStep: 10,
    timeStepsPerEpisode: 100,
    totalEpisodes: 10,
  }
}
