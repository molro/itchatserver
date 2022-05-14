import { Server } from "socket.io";
declare function socket({ io }: {
    io: Server;
}): void;
export default socket;
