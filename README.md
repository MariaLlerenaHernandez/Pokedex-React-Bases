# Pokedex React Bases

Práctica de fundamentos de React (hooks, props, estado, consumo de APIs) construida con **React 19 + TypeScript + Vite + Tailwind CSS**. Incluye una demo de consumo básico de API y una Pokédex funcional conectada a [PokeAPI](https://pokeapi.co/).

## Vista previa de funcionalidades

- **Menú principal**: navegación entre las dos demos de la práctica.
- **Demo Fetch Usuario**: consumo básico de una API (`jsonplaceholder`) usando `useState` para manejar datos y estado de carga.
- **Pokédex**:
  - Listado de los 151 Pokémon originales obtenidos desde PokeAPI.
  - Buscador en tiempo real por nombre (`useMemo` para filtrar sin recalcular de más).
  - Vista de detalle con imagen, tipos, habilidades y estadísticas base.
  - Cache en memoria de los detalles ya consultados para evitar llamadas repetidas a la API.
  - Manejo de estados de carga independientes para la lista y el detalle.

## Tecnologías

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [PokeAPI](https://pokeapi.co/)

## Estructura del proyecto

```
src/
├── assets/                  # Imágenes e íconos
├── components/
│   ├── TarjetaUsuario.tsx   # Tarjeta de la demo de usuario
│   └── pokedex/
│       ├── ListaPokemon.tsx     # Lista/buscador de Pokémon
│       └── DetallePokemon.tsx   # Panel de detalle
├── lib/
│   └── pokeapi.ts           # Funciones de consumo de PokeAPI
├── pages/
│   ├── Menu.tsx             # Pantalla de selección de demo
│   ├── DemoUsuario.tsx      # Demo de fetch básico
│   └── Pokedex.tsx          # Pantalla principal de la Pokédex
├── types/
│   └── pokemon.ts           # Tipos de datos de Pokémon
├── App.tsx                  # Enrutado simple entre vistas (useState)
└── main.tsx                 # Punto de entrada
```

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

### Otros scripts

```bash
npm run build     # Compila TypeScript y genera el build de producción
npm run preview   # Sirve el build de producción localmente
npm run lint      # Corre ESLint sobre el proyecto
```

## Autor

Práctica desarrollada como parte del curso de Desarrollo Web / Frameworks Web.
