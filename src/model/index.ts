export type User = {
  id: string;
  name: string;
  email: string;
};

export type Meta = { [k: string]: number | string };

export type Session = {
  id: string;
  clientId: string;
  user: User;
  meta: Meta;
};
