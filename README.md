<h1 align="center">
  Jornada Browser Client
</h1>

<p align="center">
  The simplest option for recording and replaying user journeys 🎯
</p>

If you have a live website, users will be interacting with it. But recording these sessions for further analysis can be challenging.
**Jornada** makes this easy, enabling both session record and replay, allowing teams to have insights from user interactions. Some use cases:

- Debug reported issues
- User behaviour and experience analysis

This library implements Jornada's browser client, which sends data the data back to the server. For more details, please refer to the [Jornada documentation](https://github.com/brunoluiz/jornada).

## Developing

- Run `npm install`.
- Once dependencies were installed, run `npm start`. It will monitor file changes and rebuild files when required.
- When opening pull requests, run `npm run lint`.

To test this library in tandem with an application:

- `npm link` in the root of this project
- In the target application root folder, run `npm link @brunoluiz/jornada`
- The application will used a symlinked version of this library
- Refer to the [Jornada documentation](https://github.com/brunoluiz/jornada) to see an example on how to start recording a session
