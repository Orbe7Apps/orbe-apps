// Datos del negocio. Es lo único que cambia de una página de reservas a otra.
window.NEGOCIO = {
  id: 'barberia-el-filo',
  nombre: 'Barbería El Filo',
  rubro: 'Barbería',
  ciudad: 'Maracaibo',
  iniciales: 'EF',
  logo: '',                       // enlace a la imagen del logo; vacío = iniciales
  color: '#d6a24e',               // color de la marca
  whatsapp: '',                   // número con código de país, solo dígitos (ej. 584141234567); vacío = muestra
  direccion: 'Av. 5 de Julio con calle 72, local 3',
  aviso: 'Llega 5 minutos antes. Si no puedes venir, avísanos por WhatsApp.',
  moneda: { simbolo: '$', decimales: 0 },
  intervalo: 30,                  // cada cuántos minutos empieza una cita
  // Horario por día (0 = domingo … 6 = sábado). null = cerrado
  horario: {
    0: null,
    1: ['09:00', '19:00'],
    2: ['09:00', '19:00'],
    3: ['09:00', '19:00'],
    4: ['09:00', '20:00'],
    5: ['09:00', '20:00'],
    6: ['08:00', '17:00'],
  },
  barberos: [
    { id: 'carlos', nombre: 'Carlos', especialidad: 'Fades y diseños', color: '#d6a24e' },
    { id: 'andres', nombre: 'Andrés', especialidad: 'Cortes clásicos y barba', color: '#7fb4d9' },
    { id: 'luis', nombre: 'Luis', especialidad: 'Cortes de niños', color: '#9fd39a' },
  ],
  servicios: [
    { nombre: 'Corte clásico', categoria: 'Cortes', minutos: 30, precio: 6, descripcion: 'Tijera y máquina, con lavado' },
    { nombre: 'Fade / degradado', categoria: 'Cortes', minutos: 45, precio: 8, descripcion: 'Bajo, medio o alto, con perfilado' },
    { nombre: 'Corte de niño', categoria: 'Cortes', minutos: 30, precio: 5, descripcion: 'Hasta 12 años' },
    { nombre: 'Arreglo de barba', categoria: 'Barba', minutos: 30, precio: 4, descripcion: 'Perfilado con navaja y toalla caliente' },
    { nombre: 'Afeitado clásico', categoria: 'Barba', minutos: 30, precio: 5, descripcion: 'Navaja, espuma y bálsamo' },
    { nombre: 'Corte + barba', categoria: 'Combos', minutos: 60, precio: 11, descripcion: 'El favorito de la casa', destacado: true },
    { nombre: 'Combo completo', categoria: 'Combos', minutos: 90, precio: 15, descripcion: 'Corte, barba, cejas y mascarilla' },
    { nombre: 'Diseño o rayitas', categoria: 'Extras', minutos: 0, precio: 2, descripcion: 'Se suma a tu corte' },
    { nombre: 'Perfilado de cejas', categoria: 'Extras', minutos: 0, precio: 2, descripcion: 'Se suma a tu servicio' },
    { nombre: 'Tinte de barba', categoria: 'Extras', minutos: 30, precio: 5, descripcion: 'Color natural, dura 3 a 4 semanas' },
  ],
  pagos: ['Efectivo', 'Pago móvil', 'Zelle'],
};
