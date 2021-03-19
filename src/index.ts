import { Recorder } from "./recorder";
import { BrowserStorage } from "./storage";

export type Config = {
  apiUrl: string;
};

export class Jornada {
  static init(config: Config): Recorder {
    return new Recorder(
      config.apiUrl,
      new BrowserStorage(config.apiUrl, window.sessionStorage)
    );
  }
}

export { Recorder, BrowserStorage };
