export interface PrendaDetallada {
  id: number;
  nombre: string;
  img: string;
  // Se ha eliminado la propiedad 'precio'
  descripcion: string;
  detalles: {
    [key: string]: string;
  };
}

export const prendasCatalogo: PrendaDetallada[] = [
  {
    id: 1,
    nombre: 'Buzo con capucha',
    img: 'https://svijetmajice.com/wp-content/uploads/2022/11/cod_ghosts_hoodica-600x600.jpg',
    descripcion: 'Un buzo con capucha clásico y cómodo, perfecto para cualquier ocasión casual. El interior de felpa suave proporciona calor y confort durante todo el día.',
    detalles: {
      'Color': 'Negro',
      'Material': '80% Algodón, 20% Poliéster',
      'Bolsillos': 'Bolsillo tipo canguro frontal',
      'Corte': 'Regular Fit',
    },
  },
  {
    id: 2,
    nombre: 'Pantalón Jogger',
    img: 'https://i5.walmartimages.com/asr/16338ece-4cdb-4be2-8212-4982baf44d4c.5c7c22e5df418e2e256ac9c3c3f9862f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',
    descripcion: 'Pantalón jogger moderno y versátil, diseñado para el movimiento. Cintura elástica con cordón ajustable y puños ceñidos para un ajuste perfecto.',
    detalles: {
      'Color': 'Gris Jaspeado',
      'Material': '60% Algodón, 40% Poliéster',
      'Bolsillos': 'Dos bolsillos laterales y uno trasero',
      'Estilo': 'Deportivo / Casual',
    },
  },
  {
    id: 3,
    nombre: 'Campera de Jean',
    img: 'https://cdn.ssactivewear.com/Images/Color/19891_f_fl.jpg',
    descripcion: 'La icónica campera de jean que nunca pasa de moda. Un básico resistente y con estilo para complementar cualquier atuendo.',
    detalles: {
      'Color': 'Azul Denim Clásico',
      'Material': '100% Algodón Denim',
      'Bolsillos': 'Dos bolsillos en el pecho y dos laterales',
      'Cierre': 'Botones metálicos',
    },
  },
  {
    id: 4,
    nombre: 'Remera Tupac',
    img: 'https://media-photos.depop.com/b1/40720285/1504871696_1ce8aa9b10264d4eb29173ef197eeab6/P0.jpg',
    descripcion: 'Muestra tu aprecio por la leyenda del hip-hop con esta remera gráfica de alta calidad con un estampado vintage de Tupac Shakur.',
    detalles: {
      'Color': 'Negro Desgastado',
      'Material': '100% Algodón Peinado',
      'Estampado': 'Serigrafía de alta durabilidad',
      'Cuello': 'Redondo',
    },
  },
];