declare const EVENTS: {
    connection: string;
    disconnection: string;
    CLIENT: {
        CONNECTED: string;
        DISCONNECTED: string;
        USER: string;
        CREATE_ROOM: string;
        SEND_MSG: string;
        JOIN_ROOM: string;
        LEFT_ROOM: string;
    };
    SERVER: {
        CONNECTED: string;
        USER: string;
        CREATED_ROOM: string;
        ROOM_MSG: string;
        JOINED_ROOM: string;
        LEFT_ROOM: string;
    };
};
export default EVENTS;
