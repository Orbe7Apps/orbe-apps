# Reservas de Orbe Apps

Página para que los clientes de un negocio de citas (barberías, uñas, peluquerías, consultorios) elijan
servicio, profesional, día y hora, y pidan la cita por WhatsApp con un solo mensaje.

- `base/reservas.css` y `base/reservas.js`: la página (no se tocan por cliente).
- `barberia-el-filo/`: muestra de una barbería.

## Crear la de un negocio nuevo
1. Copia `barberia-el-filo/` con el nombre del negocio, en minúsculas y con guiones.
2. Edita `negocio.js`: nombre, rubro, ciudad, color, WhatsApp, dirección, horario por día, profesionales, servicios (minutos y precio) y formas de pago.
3. Publica. Queda en `https://orbe7apps.github.io/orbe-apps/reservas/<carpeta>/`.

Con `whatsapp` vacío funciona como muestra: trae horarios ocupados de ejemplo y, al reservar, enseña el mensaje que le llegaría al negocio en vez de abrir WhatsApp.
