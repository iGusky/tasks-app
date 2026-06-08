# tasks-app
This app is an implementation of authentication and authorization service done with NodeJS and Express. The focus of this project is to build a JWT service that allow a user to login, logout and validate the current session of the user if it exist.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Contruir imagen de docker
Para generar la imagen de docker ejecutar el siguiente comando en el directorio raiz de proyecto.
```bash
docker build -t tasks-server .
```
