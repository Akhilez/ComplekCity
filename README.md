#ComplekCity

A simple model of a city.

A city can function as an organism.
Each citizen is analogous to a cell and each business is a function of the body.\
This model attempts to create a city that can live, expand or die.\
The experiment tries to answer the question: What parameters make a city live?

---

####Rules of ComplekCity:

The city:
  - Consists of a road network, citizens and businesses.
  - 1 minute = 1 day
  - A business can mean government, restaurant or office.
  - A point can mean money, food or energy.
  - A city dies if all citizens or all businesses die.

A citizen:
  - Has points which decrease linearly with time.
  - Has eyes that can see a certain range.
  - They always maintain a distance from any object in the city, including other citizens.
  - Spawns at a random location in the city at 0 second.
  - Every second, it notes down its location. This array of location points is called a path.
  - Score of a path: max points in the day + average points in the day.
  - Has history of the previous path and its best path.
  - Visiting a business for 1 second will give him H joules.
  - Can choose to move in 3 ways:
      - Previous path location at that second.
      - Its best path location at that second.
      - New path (random exploration)
  - Choosing the path direction:
      - If points are low, high probability towards its best path
      - If points are moderate, equal probability
      - If points are high, high probability towards a new path
  - If points are > threshold, can open a business.
  - Dies if points go to 0.
  - If alive for 18 days, it makes 2 off-springs.

A business:
  - A business has an owner who is a citizen or the government.
  - When a citizen comes to a business, the citizen and the owner both get 2 points.
  - If the owner's points go < threshold, the business no longer exists and the owner becomes a free citizen.

---

Changes planned for V2:
  - Citizen moves at variable speed.
  - Points decrease non-linearly with time depending on how fast it is moving.
  - Remembers speed at the instant.
  - Day and night cycles.
  - Citizens sleep for half a day.
  - Traffic lights.
  - Multiple Lanes.
  - Biased business (Ex: bars only for adults)
  - Expand city if # of business > threshold.
