class ComplekCity {

  run() {
    this.p5 = new p5((sketch) => {
      sketch.setup = () => this.setup(sketch);
      sketch.draw = () => this.draw(sketch);
    });
  }

  setup(sketch) {
    this.sketch = sketch;

    this.paramsInjector = new ParamsInjector();
    this.cityBuilder = new CityBuilder(this);
    this.episodeManager = new EpisodeManager(this);
    this.swarmManager = new SwarmManager(this);
    this.stats = new StatsManager(this);
    this.uiManager = new UIManager(this);

    this.running = false;

    this.uiManager.setupSketch();

  }

  draw(sketch) {
    if (this.running) {

      this.episodeManager.update();

      if (this.episodeManager.isNewTimeStep()) {
        this.stats.perTimeStep();
      }

      if (this.episodeManager.isNewEpisode()) {
        this.stats.perEpisode();
        this.swarmManager.finishEpisode();
        this.swarmManager.initEpisode();
      }

      this.swarmManager.update(this.episodeManager);
    }

    sketch.background(230);
    this.uiManager.display(sketch);
  }
}

$(document).ready(function () {
  new ComplekCity().run();
});
