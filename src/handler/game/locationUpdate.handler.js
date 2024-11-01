import { getGameSession } from '../../sessions/game.session.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      console.error('Game session not found');
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error('User not found');
    }

    user.updatePosition(x, y);

    const locationData = gameSession.getAllLocations(userId);

    socket.write(locationData);
  } catch (err) {
    console.error(err);
  }
};

export default locationUpdateHandler;
