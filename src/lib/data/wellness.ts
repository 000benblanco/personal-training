import type { WellnessPractice } from '@/types';

export const wellnessPractices: WellnessPractice[] = [
  // MEDITACIONES
  {
    id: 'meditation-body-scan',
    name: 'Body Scan',
    description: 'Escaneo guiado del cuerpo para aumentar la conciencia somática',
    type: 'meditation',
    duration: 5,
    content: `Bienvenido/a a este ejercicio de body scan.

Encuentra una posición cómoda, sentado/a o tumbado/a. Cierra los ojos si te sientes cómodo/a.

Comenzamos enfocándonos en los pies. Nota las sensaciones... la temperatura... el contacto con el suelo o la colchoneta.

Poco a poco, mueve tu atención hacia las espinillas... las pantorrillas... notando cualquier tensión acumulada.

Continúa subiendo hacia las rodillas. Aquí es donde tu cuerpo puede tener tensiones específicas... permítele suavidad a esta zona.

Ahora enfócate en los muslos y la cadera. Estos músculos sostienen gran parte de nuestro peso y suelen acumular tensión.

Nota la zona del abdomen... el pecho subiendo y bajando con cada respiración.

Los hombros son un lugar común de tensión. Permíteles soltarse y descender.

Brazos, codos, antebrazos, manos... notando las sensaciones una por una.

Finalmente, el cuello, la mandíbula, el rostro... relaja los músculos de la cara.

Quando termines, toma una respiración profunda y abre los ojos lentamente.`,
    instructions: [
      'Encuentra una posición cómoda',
      'Cierra los ojos si es comfortable',
      'Mueve la atención de forma медленно de los pies a la cabeza',
      'No juzgues las sensaciones, simplemente obsérvalas',
    ],
  },
  {
    id: 'meditation-box-breathing',
    name: 'Meditación de Atención Plena',
    description: 'Combina respiración cuadrada con meditación de atención plena',
    type: 'meditation',
    duration: 10,
    content: `Esta práctica combina la respiración cuadrada con la atención plena.

Siéntate con la espalda recta pero relajada. Cierra los ojos.

Comenzamos con la respiración cuadrada:

Inhala... mantenlo... exhala... mantenlo.
Inhala... mantenlo... exhala... mantenlo.

Ahora, mantén la atención en la respiración sin modificarla. Nota cómo el aire entra y sale. La sensación de expansión y contracción.

Cuando sobrevenga un pensamiento, no te preocupes. Simplemente reconócelo y vuelve a la respiración.

Esta práctica no se trata de vaciar la mente. Se trata de observar sin apego.

Cada vez que regresas a la respiración después de perderte en pensamientos, estás entrenando la atención plena.

Continúa respirando de forma natural y observando... durante los próximos minutos.

Cuando estés listo/a, toma una respiración profunda y abre los ojos.`,
    instructions: [
      'Siéntate con la espalda recta',
      'Practica respiración cuadrada (4-4-4-4)',
      'Mantén atención en la respiración',
      'Cuando vengan pensamientos, simplemente obsérvalos y vuelve a la respiración',
    ],
  },
  
  // GROUNDING
  {
    id: 'grounding-5-4-3-2-1',
    name: '5-4-3-2-1 Grounding',
    description: 'Técnica de anclaje para momentos de ansiedad aguda',
    type: 'grounding',
    duration: 5,
    content: `Esta técnica se llama 5-4-3-2-1 y te ayuda a Anclarte en el momento presente cuando sientes ansiedad o disociación.

Ahora mismo, mira a tu alrededor y nombra:

5 cosas que puedes VER... busca detalles... colores, formas, texturas.

4 cosas que puedes TOCAR... siente la temperatura, la textura, el peso.

3 cosas que puedes OÍR... sonidos cercanos y lejanos.

2 cosas que puedes OLER... si no hueles nada, nombra 2 cosas que te gustaría oler.

1 cosa que puedes SABOREAR... o el sabor que tienes ahora en la boca.

¿Cóomo te sientes ahora? Tu sistema nervioso debería estar más calmeado.

Esta técnica funciona porque involucra los cinco sentidos y el movimiento, lo que activa el sistema nervioso y te ancla al presente.`,
    instructions: [
      'Úsalo cuando sientas ansiedad, pánico o disociación',
      'Nombra 5 cosas que ves',
      'Luego 4 que puedes tocar',
      '3 que puedes oír',
      '2 que puedes oler',
      '1 que puedes saborear',
    ],
  },
  {
    id: 'grounding-present-moment',
    name: 'Anclaje en el Presente',
    description: 'Trae tu atención al momento presente usando tus sentidos',
    type: 'grounding',
    duration: 3,
    content: `Cuando la mente va hacia el futuro o el pasado, podemos perder el contacto con el presente momento.

Practiquemos el anclaje:

Observa 5 detalles de tu entorno... quizás la luz en la habitación... un patrón en la pared... la sombra de un objeto.

Pon atención a 4 cosas que puedes sentir físicamente... el peso de tu cuerpo en la silla... el aire en tu piel... la textura de tu ropa.

Nota 3 sonidos que ocurren ahora mismo... quizás el silencio relativo... sonidos distantes... tu propia respiración.

Concéntrate en 2 cosas que puedes oler... o simplemente el aroma del aire.

Finalmente, observa tu respiración... el aire entrando y saliendo... la sensación de estar vivo/a en este momento.

El pasado ya no existe. El futuro aún no ha llegado. Solo existe ESTE momento.`,
    instructions: [
      'Practica cuando notes que tu mente divaga',
      'Usa los sentidos para Anclarte',
      'El objetivo es estar completamente presente',
    ],
  },
  
  // VISUALIZACIÓN
  {
    id: 'visualization-boxing',
    name: 'Visualización Deportiva - Boxeo',
    description: 'Imagina movimientos perfectos de boxeo para mejorar la técnica',
    type: 'visualization',
    duration: 5,
    content: `Esta visualización está diseñada para reforzar tu práctica de boxeo.

Cierra los ojos y entra en un estado de relajación suave.

Imagínate de pie frente al saco. Estás en guardia, postura estable con el peso distribuido principalmente en tu pierna derecha.

Observa tus manos protegidas por guantes imaginarys. Los codos cerca del cuerpo.

El saco está frente a ti, ligeramente por debajo de la altura de tu hombro.

Ahora,imagínate throwing un jab perfeito. El brazo se extiende desde la guardia... el puño golpea el centro del saco... el impacto resuena... y el brazo vuelve a la guardia inmediatamente.

Observa cómo tu pie derecho pivota ligeramente para generar potencia.

Ahora el cross con la derecha. La cadera rota... el hombro derecho avanza... el brazo se extiende completamente... el impacto es firme... y vuelves a guardia.

Practica ahora la combinación 1-2-3... jab... cross... hook... fluidez... control... potencia.

Cada golpe que imaginas es un refuerzo positivo para tu técnica. Tu cuerpo está "recordando" el movimiento perfecto.

Trae confianza a tu práctica real. Abre los ojos.`,
    instructions: [
      'Cierra los ojos y relájate',
      'Imagina el movimiento con detalle sensory',
      'Siente cómo sería el movimiento perfecto',
      'Imagina el sonido del impacto',
      'Visualiza la sensación de ejecutarlo bien',
    ],
  },
  {
    id: 'visualization-strength',
    name: 'Visualización de Fuerza',
    description: 'Imagina tus músculos fuertes y capaces para reforzar la intención de entrenamiento',
    type: 'visualization',
    duration: 5,
    content: `Esta visualización está enfocada en fortalecer la conexión mente-músculo.

Cierra los ojos y conecta con tu cuerpo.

Imagina tu pierna izquierda. A pesar de los desafíos que presenta, está haciendo todo lo posible por soportar y mover tu cuerpo.

Imagina los músculos que SÍ funcionan: el glúteo izquierdo, los isquiotibiales, el gastrocnemio. Cada uno de ellos trabajando en conjunto para compensar y estabilizar.

Imagina tu férula como un soporte externo que te da confianza. No es una debilidad, es una herramienta que te permite entrenar.

Ahora imagina tu Training de hoy. Cada ejercicio que harás... viendo mentalmente cómo lo ejecutas con control y seguridad.

Imagina cómo se sentirán tus músculos después del entrenamiento: cansados pero satisfechos, más fuertes que ayer.

Tu cuerpo es capaz de lo que le pidas, dentro de parámetros seguros. Confía en el proceso.

Abre los ojos y lleva esa intención de fuerza al entrenamiento.`,
    instructions: [
      'Conecta con tu cuerpo sin juzgar',
      'Visualiza los músculos que funcionan bien',
      'Imagina la férula como aliada',
      'Crea una intención positiva para el entrenamiento',
    ],
  },
  
  // LECTURAS MOTIVACIONALES
  {
    id: 'reading-commitment',
    name: 'El Poder de la Consistenciapor',
    description: 'Reflexión sobre por qué los pequeños pasos importan',
    type: 'reading',
    duration: 2,
    content: `"No necesitas ser perfecto/a para empezar. Necesitas empezar para ser perfecto/a."

La consistencia supera a la perfección. Cada vez que eliges moverte, estás construyendo algo que nadie puede destruir: tu autoconfianza.

Un estudio de la Universidad de Hertfordshire encontró que las personas que hacían ejercicio regularmente eran 20% más felices que aquellas que no lo hacían. La clave no era la duración ni la intensidad, sino simplemente el hecho de hacer ejercicio.

Cada sesión que completas es un voto por la persona que quieres ser. Y esos votos se acumulan.

Hoy has elegido mostrarte. Eso ya te hace diferente de quien eras ayer.

El único fracaso real es no intentarlo.`,
  },
  {
    id: 'reading-compassion',
    name: 'Autocompasión en el Entrenamiento',
    description: 'Por qué es importante tratarse con amabilidad durante el proceso',
    type: 'reading',
    duration: 2,
    content: `"Sé amable contigo mismo/a. El entrenamiento no es un castigo por lo que comiste. Es un acto de amor hacia tu cuerpo."

 Muchas personas se acercan al ejercicio con una mentalidad punitiva. "Necesito quemarlo" o "Me lo merezco".

El ejercicio verdaderamente transformador viene de la autocompasión. Se trata de hacer algo bueno por tu cuerpo, no de castigarlo.

La Dra. Kristin Neff, researcher de la Universidad de Texas, ha demostrado que las personas que practicaban autocompasión tenían menos ansiedad y depresión, y más motivación para mejorarcompared a quienes se criticaban duramente.

Hoy, cuando entrenes, hazlo desde el amor propio. Tu cuerpo te lleva a donde necesitas ir. Trátalo con la amabilidad que merece.`,
  },
  {
    id: 'reading-process',
    name: 'El Proceso es el Producto',
    description: 'Por qué disfrutar el camino es tan importante como el destino',
    type: 'reading',
    duration: 2,
    content: `"El objetivo no es ser mejor que otros. El objetivo es ser mejor que quien fuiste ayer."

Cuando nos enfocamos solo en resultados (perder 15kg, estar en forma), perdemos de vista el proceso que nos trae esos resultados.

La investigación en psicología del deporte muestra que los atletas que se enfocaban en el proceso (técnica, esfuerzo, consistencia) tenían mejor rendimiento y mayor satisfacciónque aquellos enfocados solo en resultados.

Cada vez que entrenas, estás haciendo exactamente lo que necesitas hacer en este momento. No importa si hoy es un día "bueno" o "malo". Lo que importa es que apareciste.

El proceso de mostrarte, de intentarlo, de hacer el esfuerzo... eso YA es el producto que buscas.

Celebra el proceso tanto como los resultados.`,
  },
];

export function getWellnessPracticeById(id: string): WellnessPractice | undefined {
  return wellnessPractices.find((p) => p.id === id);
}

export function getWellnessPracticesByType(type: string): WellnessPractice[] {
  return wellnessPractices.filter((p) => p.type === type);
}

export function getRandomReading(): WellnessPractice {
  const readings = wellnessPractices.filter((p) => p.type === 'reading');
  return readings[Math.floor(Math.random() * readings.length)];
}
