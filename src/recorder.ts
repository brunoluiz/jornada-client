import { Storage } from "./storage";
import { User, Meta } from "./model";
import { record } from "rrweb";
import { eventWithTime } from "rrweb/typings/types";

export class Recorder {
  public user: User = { id: "", name: "", email: "" };
  public meta: Meta = {};
  public clientId = "";
  public events: eventWithTime[] = [];

  private runner: ReturnType<typeof setInterval>;
  private recorder: ReturnType<typeof record>;

  constructor(private apiUrl: string, private storage: Storage) {
    this.runner = 0;
  }

  setUser(user: User): this {
    this.storage.save({ ...this.storage.get(), user });
    this.user = user;
    return this;
  }

  setMeta(meta: Meta = {}): this {
    this.storage.save({ ...this.storage.get(), meta });
    this.meta = meta;
    return this;
  }

  setClientId(clientId: string): this {
    this.storage.save({ ...this.storage.get(), clientId });
    this.clientId = clientId;
    return this;
  }

  async sync(): Promise<void> {
    if (!this.events.length) return;

    const session = this.storage.get();
    await fetch(`${this.apiUrl}/api/v1/sessions/${session.id}/events`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.events),
    });
    this.events = []; // cleans-up events for next cycle
  }

  start(): this {
    if (this.runner) return this;

    this.runner = setInterval(async () => {
      await this.storage.sync();
      await this.sync();
    }, 1000);

    this.recorder = record({
      emit: (event) => {
        this.events.push(event);
      },
      collectFonts: true,
      slimDOMOptions: {
        script: true,
        comment: true,
        headFavicon: true,
        headWhitespace: true,
        headMetaDescKeywords: true,
        headMetaSocial: true,
        headMetaRobots: true,
        headMetaHttpEquiv: true,
        headMetaAuthorship: true,
        headMetaVerification: true,
      },
    });

    this.sync();
    return this;
  }

  close(): void {
    clearInterval(this.runner);
    if (this.recorder) this.recorder();
    this.storage.clear();
  }
}
