declare const _default: {
    CORSORIGIN: string;
    PORT: string | number;
    HOST: string;
    PASSWORD: string;
    MONGO_URI: string;
    secret: string;
    mongoOpt: {
        autoIndex: boolean;
        maxPoolSize: number;
        serverSelectionTimeoutMS: number;
        socketTimeoutMS: number;
        family: number;
    };
    config: {
        authRequired: boolean;
        auth0Logout: boolean;
        secret: string;
        clientID: string;
        issuerBaseURL: string;
    };
};
export default _default;
