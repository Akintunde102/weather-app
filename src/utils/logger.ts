enum LogLevel {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

class Logger {
    static info(message: string, data?: unknown): void {
        Logger.log(LogLevel.INFO, message, data);
    }

    static warn(message: string, data?: unknown): void {
        Logger.log(LogLevel.WARNING, message, data);
    }

    static error(message: string, data?: unknown): void {
        Logger.log(LogLevel.ERROR, message, data);
    }

    private static log(level: LogLevel, message: string, data?: unknown): void {
        console.log(`[${level}] ${message}`, data ? { data } : undefined);
    }
}

export default Logger;
