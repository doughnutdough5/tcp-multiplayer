import {
  PACKET_TYPE,
  PACKET_TYPE_LENGTH,
  TOTAL_LENGTH,
} from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import { getProtoMessages } from '../init/loadProto.js';
import { getUserBySocket } from '../sessions/user.session.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length > totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    if (socket.buffer.length < length) {
      break;
    }

    const packet = socket.buffer.subarray(totalHeaderLength, length);
    socket.buffer = socket.buffer.subarray(length);

    try {
      switch (packetType) {
        case PACKET_TYPE.PING:
          {
            const protoMessages = getProtoMessages();
            const Ping = protoMessages.common.Ping;
            const pingPacket = Ping.decode(packet);
            const user = getUserBySocket(socket);
            user.handlePong(pingPacket);
          }
          break;
        case PACKET_TYPE.NORMAL: {
          const { handlerId, userId, payload } = packetParser(packet);
          const handler = getHandlerById(handlerId);

          handler({ socket, userId, payload });
        }
      }
    } catch (err) {
      console.error(`${err}`);
    }
  }
};
