class IntervalManager {
  constructor() {
    this.intervals = new Map();
  }

  addUser(userId, callback, timestamp) {
    if (this.intervals.has(userId)) {
      console.error('중복된 인터벌 확인');
    }

    this.intervals.set(userId, setInterval(callback, timestamp));
  }

  removeUser(userId) {
    if (!this.intervals.has(userId)) {
      return;
    }

    clearInterval(this.intervals.get(userId));
  }

  clearAll() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals.clear();
  }
}

export default IntervalManager;
