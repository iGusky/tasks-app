# tasks-app

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