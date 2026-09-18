import { useState } from 'react';
import Menu from './pages/Menu';
import DemoUsuario from './pages/DemoUsuario';
import Pokedex from './pages/Pokedex';

type Vista = 'menu' | 'usuario' | 'pokedex';

export default function App() {
  const [vista, setVista] = useState<Vista>('menu');

  if (vista === 'usuario') return <DemoUsuario onRegresar={() => setVista('menu')} />;
  if (vista === 'pokedex') return <Pokedex onRegresar={() => setVista('menu')} />;
  return <Menu onSeleccionar={setVista} />;
}
