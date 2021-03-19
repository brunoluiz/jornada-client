import { Session } from "./model";

/**
 * Defines a Storage interface
 * Allows developers to get, save and delete Session data. If implemented, allow syncing
 * back to a remote storage.
 */
export interface Storage {
  get(): Session;
  save(data: Session): this;
  clear(): this;
  sync(): Promise<void>;
}

/**
 * Defines a BrowserStorage storage implementation
 * Uses local or session storage and syncs back to Jornada server instance
 */
export class BrowserStorage implements Storage {
  private readonly key = "jornada";
  private synced = false;

  constructor(
    private apiUrl: string,
    private storage = window.sessionStorage
  ) {}

  get(): Session {
    const session = this.storage.getItem(this.key);
    const out = session
      ? JSON.parse(session)
      : {
          user: {},
          clientId: "",
        };
    return out;
  }

  save(data: Session): this {
    const session = Object.assign({}, this.get(), data);
    this.storage.setItem(this.key, JSON.stringify(session));
    this.synced = false;
    return this;
  }

  clear(): this {
    window.sessionStorage.removeItem(this.key);
    return this;
  }

  async sync(): Promise<void> {
    if (this.synced) return Promise.resolve();

    const res: Session = await fetch(`${this.apiUrl}/api/v1/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.get()),
    }).then((r) => r.json());
    this.save(res);
    this.synced = true;
  }
}
