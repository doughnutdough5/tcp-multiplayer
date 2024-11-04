import { createLocationPacket } from '../../utils/notification/game.notification.js';
import IntervalManager from '../managers/interval.manager.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManager = new IntervalManager();
  }

  addUser(user) {
    this.users.push(user);

    this.intervalManager.addUser(user.id, user.ping.bind(user), 1000);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index != -1) {
      if (this.users.length === 1) {
        this.intervalManager.clearAll();
      }

      this.intervalManager.removeUser(this.users[index].id);
      return this.users.splice(index, 1)[0];
    }
  }

  getAllLocations(userId) {
    const maxLatency = this.getMaxLatency();

    // 제외할 유저(본인)
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.calculatePosition(maxLatency);
        return { id: user.id, playerId: user.playerId, x: x, y: y };
      });

    return createLocationPacket(locationData);
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency;
  }
}

export default Game;
