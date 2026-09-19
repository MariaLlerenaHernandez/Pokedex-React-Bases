# Pokedex React Bases

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19+-339933?style=flat&logo=nodedotjs&logoColor=white)
![PokeAPI](https://img.shields.io/badge/API-PokeAPI-EF5350?style=flat&logo=pokemon&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

Práctica de fundamentos de React (hooks, props, estado y consumo de APIs) construida con **React 19 + TypeScript + Vite + Tailwind CSS**. Incluye una demo de consumo básico de una API y una **Pokédex** conectada a [PokeAPI](https://pokeapi.co/) con filtros, ordenamiento y favoritos.

## Funcionalidades

- **Menú principal** con fondo estilo Pokébola para navegar entre las dos demos.
- **Demo Fetch Usuario:** consumo básico de una API (`jsonplaceholder`) con `useState`, estado de carga y manejo de errores.
- **Pokédex** con los 151 Pokémon originales:
  - Lista y vista de detalle (imagen, tipos, habilidades, altura, peso, experiencia y estadísticas base).
  - **Búsqueda** por nombre en tiempo real.
  - **Filtro por tipo** con selección múltiple (rejilla responsive de 3 columnas con iconos).
  - **Ordenar y filtrar por estadística** (Velocidad, Ataque, Defensa, Ataque especial, Defensa especial y HP) con comparador (mayor o igual / menor o igual) y umbral editable.
  - **Favoritos** con estrella en la lista y en el detalle, pestaña Todos / Favoritos y persistencia en `localStorage`.
  - Botón **Restablecer** para limpiar los filtros.
  - Diseño responsive con degradados y brillo en tonos rojos.

## API utilizada

La lista se obtiene de:

```
https://pokeapi.co/api/v2/pokemon?limit=151
```

y, con las URLs que devuelve, se pide el detalle de cada Pokémon en paralelo (`Promise.all`) para poder ordenar y filtrar por estadísticas sin esperas al seleccionar.

## Requisitos

- [Node.js](https://nodejs.org/) **20.19 o superior** (probado con 24.x)
- npm (incluido con Node.js)
- Git

## Cómo levantar el proyecto en local

```bash
git clone https://github.com/MariaLlerenaHernandez/Pokedex-React-Bases.git
cd Pokedex-React-Bases
npm install
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

### Otros scripts

```bash
npm run build     # Compila TypeScript y genera el build de producción en /dist
npm run preview   # Sirve el build de producción localmente
npm run lint      # Corre ESLint sobre el proyecto
```

## Estructura del proyecto

```
src/
├── assets/                       # Imágenes e íconos
├── components/
│   ├── TarjetaUsuario.tsx        # Tarjeta de la demo de usuario
│   └── pokedex/
│       ├── ListaPokemon.tsx      # Lista con valor de estadística y favoritos
│       ├── DetallePokemon.tsx    # Panel de detalle
│       ├── FiltroTipo.tsx        # Filtro por tipo (selección múltiple)
│       └── FiltroEstadistica.tsx # Estadística, comparador y umbral
├── lib/
│   └── pokeapi.ts                # Funciones de consumo de PokeAPI
├── pages/
│   ├── Menu.tsx                  # Pantalla principal
│   ├── DemoUsuario.tsx           # Demo de fetch básico
│   └── Pokedex.tsx               # Pantalla de la Pokédex
├── types/
│   └── pokemon.ts                # Tipos de datos de Pokémon
├── App.tsx                       # Navegación simple entre vistas (useState)
├── index.css                     # Tailwind y paleta de colores
└── main.tsx                      # Punto de entrada
```

## Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Interfaz y estado (`useState`, `useEffect`, `useMemo`) |
| [TypeScript](https://www.typescriptlang.org/) | Tipado de props, estado y respuestas de la API |
| [Vite](https://vite.dev/) | Servidor de desarrollo y build |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos y diseño responsive |
| [PokeAPI](https://pokeapi.co/) | Fuente de datos de los Pokémon |

## Autor

Práctica de Desarrollo Web / Frameworks Web, realizada por [@MariaLlerenaHernandez](https://github.com/MariaLlerenaHernandez).
