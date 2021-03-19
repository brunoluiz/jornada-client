import { Recorder } from "./recorder";
import { BrowserStorage } from "./storage";

/**
 * Jornada required configuration
 * @param apiUrl - Jornada server instance URL
 */
export type Config = {
  apiUrl: string;
};

export class Jornada {
  /**
   * Returns an instance of Jornada recorder, using window.sessionStorage by default. For each new tab/session,
   * the sessionStorage is renewed, differently to what happens with localStorage
   *
   * @param config - Jornada configuration
   * @returns Recorder instance
   */
  static init(config: Config): Recorder {
    return new Recorder(
      config.apiUrl,
      new BrowserStorage(config.apiUrl, window.sessionStorage)
    );
  }
}

export { Recorder, BrowserStorage };
