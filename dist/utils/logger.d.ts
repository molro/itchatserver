declare const log: import("pino").Logger<{
    prettyPrint: true;
    base: {
        pid: boolean;
    };
    timestamp: () => string;
}>;
export default log;
