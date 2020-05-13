class EpisodeManager {

  constructor(game) {
    this.game = game;
    this.params = this.game.paramsInjector.params;

    this.episode = -1;
    this.timeStep = -1;
    this.frame = -1;
    this.totalEpisodes = this.params.totalEpisodes;
    this.framesPerTimeStep = this.params.framesPerTimeStep;
    this.timeStepsPerEpisode = this.params.timeStepsPerEpisode;

  }

  isNewEpisode() {
    return this.timeStep === 1 && this.frame === 1;
  }

  isNewTimeStep() {
    return this.frame % this.framesPerTimeStep === 0;
  }

  update() {
    this.frame++;
    if (this.frame % this.framesPerTimeStep === 0) { // New time step starts
      this.timeStep++;
      if (this.timeStep >= this.timeStepsPerEpisode) {  // New episode starts
        this.episode++;
        this.timeStep = 0;

        if (this.episode > this.totalEpisodes)
          this.game.running = false;
      }
    }
  }

  reset() {
    this.episode = 1;
    this.timeStep = 1;
    this.frame = 1;
  }
}
