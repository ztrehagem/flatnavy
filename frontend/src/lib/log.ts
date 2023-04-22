const t = () => `[${new Date().toLocaleTimeString()}]`;

export const logDebug = (...messages: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.debug(t(), "DEBUG", ...messages);
};

export const logInfo = (...messages: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.info(t(), "INFO", ...messages);
};

export const logWarn = (...messages: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.warn(t(), "WARN", ...messages);
};

export const logError = (...messages: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.error(t(), "ERROR", ...messages);
};
