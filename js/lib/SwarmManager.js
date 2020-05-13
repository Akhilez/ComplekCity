class SwarmManager {
  constructor(game) {
    this.game = game;
    this.params = game.paramsInjector.params;

    this.citizens = [];
    this.hotSpots = [];

  }

  update() {
    this.citizens.forEach(agent=>agent.update());
  }

  finishEpisode() {

  }

  initEpisode() {
    this.populateWithAgents();
  }

  populateWithAgents() {

    if (this.citizens.length === 0) {
      for (let i = 0; i < this.params.nCitizens; i++) {
        this.citizens.push(new Citizen(this.game));
      }

      for (let i = 0; i < this.params.nHotSpots; i++)
        this.hotSpots.push(new HotSpot(this.citizens[i],))

    }

  }

  displayAll() {
    this.citizens.forEach(agent=>agent.display());
    this.hotSpots.forEach(agent=>agent.display());
  }


}
