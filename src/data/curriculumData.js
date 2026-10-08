// SciTale Curriculum Hierarchy Data: Subject -> Grade/Age -> Topic -> Subtopic
// 100% playable adventures with strict educational Story -> Activity -> Quiz consistency

export const subjects = [
  {
    id: 'science',
    title: 'Science & Nature',
    icon: '🧪',
    color: 'from-sky-500 to-indigo-600',
    borderColor: 'border-sky-300',
    tagline: 'Discover how the universe, molecules, ecosystems, and human bodies work!',
    mascotEmoji: '🔬',
    themeLight: 'bg-sky-50 text-sky-900'
  },
  {
    id: 'maths',
    title: 'Maths & Logic',
    icon: '🔢',
    color: 'from-amber-500 to-rose-600',
    borderColor: 'border-amber-300',
    tagline: 'Master numbers, pizza fractions, shapes, and secret logical puzzle codes!',
    mascotEmoji: '📐',
    themeLight: 'bg-amber-50 text-amber-900'
  }
];

export const ageGroups = [
  {
    id: 'ages_5_7',
    label: 'Ages 5–7',
    subtitle: 'Early Explorers (Grades K–2)',
    icon: '🌱',
    desc: 'Big visual wonders, curious everyday questions, and friendly storybooks.',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'ages_8_10',
    label: 'Ages 8–10',
    subtitle: 'Junior Scientists (Grades 3–5)',
    icon: '💧',
    desc: 'Interactive experiments, molecular mysteries, and exciting quests!',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'ages_11_13',
    label: 'Ages 11–13',
    subtitle: 'Master Investigators (Grades 6–8)',
    icon: '☄️',
    desc: 'Deeper principles, logical puzzles, and cosmic adventures.',
    color: 'from-purple-500 to-indigo-700'
  }
];

export const topicsMap = {
  // SCIENCE TOPICS
  'science:ages_8_10': [
    {
      id: 'earth_environment',
      title: 'Earth & Environment',
      icon: '🌍',
      desc: 'The Water Cycle, oceans, clouds, and aquifers.',
      featured: true
    },
    {
      id: 'space_earth',
      title: 'Space & Solar System',
      icon: '🚀',
      desc: 'The 8 planets, orbits, day & night, and planetary exploration.'
    },
    {
      id: 'forces_motion',
      title: 'Forces, Energy & Motion',
      icon: '⚡',
      desc: 'Gravity, friction, pushes and pulls, and rollercoaster potential energy!'
    },
    {
      id: 'life_science',
      title: 'The Living World & Ecosystems',
      icon: '🌿',
      desc: 'Rainforest food webs, predators, producers, and leaf photosynthesis.'
    },
    {
      id: 'human_biology',
      title: 'Human Biology & Senses',
      icon: '🧠',
      desc: 'The brain supercomputer, nervous system highway, and our 5 senses.'
    }
  ],

  'science:ages_5_7': [
    {
      id: 'earth_environment',
      title: 'Earth & Environment',
      icon: '🌍',
      desc: 'Pip the Water Droplet and how rain happens!'
    },
    {
      id: 'space_earth',
      title: 'Space & The Sun',
      icon: '☀️',
      desc: 'Our daytime Sun, glowing Moon, and sparkling planets.'
    },
    {
      id: 'forces_motion',
      title: 'Pushes, Pulls & Motion',
      icon: '⚡',
      desc: 'How things roll, bounce, slide, and zoom!'
    },
    {
      id: 'life_science',
      title: 'Plants, Trees & Animals',
      icon: '🦁',
      desc: 'How plants make food and what animals eat.'
    },
    {
      id: 'human_biology',
      title: 'Human Body & Our 5 Senses',
      icon: '👁️',
      desc: 'How our eyes, ears, nose, tongue, and skin explore!'
    }
  ],

  'science:ages_11_13': [
    {
      id: 'earth_environment',
      title: 'Earth & Environment',
      icon: '🌍',
      desc: 'Hydrology, global atmospheric cycles, and groundwater systems.'
    },
    {
      id: 'space_earth',
      title: 'Astrophysics & Solar System',
      icon: '🌌',
      desc: 'Gravitational orbits, planetary geology, and Keplerian mechanics.'
    },
    {
      id: 'forces_motion',
      title: 'Kinetic Energy & Classical Mechanics',
      icon: '⚡',
      desc: 'Gravitational potential energy, friction resistance, and vectors.'
    },
    {
      id: 'life_science',
      title: 'Ecosystem Dynamics & Photosynthesis',
      icon: '🧬',
      desc: 'Trophic cascades, 10% energy transfer, and chloroplast chemistry.'
    },
    {
      id: 'human_biology',
      title: 'Neurobiology & Sensory Organs',
      icon: '🧠',
      desc: 'Neurons, synaptic signaling, reflex arcs, and sensory receptors.'
    }
  ],

  // MATHS TOPICS
  'maths:ages_8_10': [
    {
      id: 'fractions_decimals',
      title: 'Fractions & Decimals',
      icon: '🍕',
      desc: 'Real-world pizza slicing, numerators, denominators, and parts of a whole.',
      featured: true
    },
    {
      id: 'numbers_operations',
      title: 'Numbers & Operations',
      icon: '🔢',
      desc: 'Multiplication kingdoms, rapid mental math, and place value quests.'
    },
    {
      id: 'geometry_shapes',
      title: 'Geometry & Angles',
      icon: '📐',
      desc: 'Secret angles (acute/right/obtuse), 2D polygons, and perimeter.'
    },
    {
      id: 'patterns_logic',
      title: 'Patterns & Logic',
      icon: '🧩',
      desc: 'Number sequences, secret detective codes, and reasoning puzzles.'
    },
    {
      id: 'basic_algebra',
      title: 'Basic Algebra & Equations',
      icon: '⚖️',
      desc: 'Balancing equation scales to solve for the secret variable X!'
    }
  ],

  'maths:ages_5_7': [
    {
      id: 'fractions_decimals',
      title: 'Fractions: Halves & Quarters',
      icon: '🍕',
      desc: 'Sharing cookies and cutting pizzas equally with friends.'
    },
    {
      id: 'numbers_operations',
      title: 'Counting & Number Buddies',
      icon: '🔢',
      desc: 'Counting to 100, number bonds, and cheerful addition.'
    },
    {
      id: 'geometry_shapes',
      title: 'Magic Shapes',
      icon: '🔺',
      desc: 'Circles, squares, triangles, and everyday shapes around us.'
    },
    {
      id: 'patterns_logic',
      title: 'Colors & Shape Patterns',
      icon: '🎨',
      desc: 'Spotting pattern sequences and predicting what comes next.'
    },
    {
      id: 'basic_algebra',
      title: 'Balancing Scales',
      icon: '⚖️',
      desc: 'Making both sides of a scale balance with wooden blocks.'
    }
  ],

  'maths:ages_11_13': [
    {
      id: 'fractions_decimals',
      title: 'Fractions, Decimals & Percentages',
      icon: '🍕',
      desc: 'Converting fractions to decimals, proportions, and mixed numbers.'
    },
    {
      id: 'numbers_operations',
      title: 'Integers & Order of Operations',
      icon: '🔢',
      desc: 'PEMDAS rules, negative numbers, and exponents.'
    },
    {
      id: 'geometry_shapes',
      title: 'Geometric Area & Angles',
      icon: '📐',
      desc: 'Interior angle sums, Pythagorean theorem, and coordinate geometry.'
    },
    {
      id: 'patterns_logic',
      title: 'Sequences & Logical Deduction',
      icon: '🧩',
      desc: 'Arithmetic and geometric progressions with deductive logic.'
    },
    {
      id: 'basic_algebra',
      title: 'Linear Equations & Systems',
      icon: '⚖️',
      desc: 'Multi-step equations, isolating variables, and algebraic balancing.'
    }
  ]
};

export const subtopicsMap = {
  // Earth & Environment -> Water Cycle
  'earth_environment': [
    {
      id: 'water_cycle',
      title: 'The Water Cycle: Pip’s Epic Journey',
      icon: '💧',
      status: 'ready',
      duration: '10–15 mins',
      chaptersCount: 5,
      hasQuiz: true,
      badgeReward: 'Master Hydrologist Badge',
      desc: 'Join Pip the water molecule through evaporation, transpiration, cloud condensation, rain skydives, and aquifers!'
    }
  ],

  // Space & Solar System
  'space_earth': [
    {
      id: 'solar_system',
      title: 'Space & Solar System: Cosmic Orbital Explorer',
      icon: '🚀',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Cosmic Astronaut Badge',
      desc: 'Explore the 8 planets, why Earth has day & night, and test your planetary orbit piloting skills!'
    }
  ],

  // Forces, Energy & Motion
  'forces_motion': [
    {
      id: 'forces_motion_adventure',
      title: 'Forces, Energy & Motion: Rollercoaster Physics',
      icon: '🎢',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Physics Coaster Engineer Badge',
      desc: 'Master pushes, pulls, gravity, and friction, and engineer a high-speed loop-de-loop rollercoaster!'
    }
  ],

  // Life Science -> 2 adventures!
  'life_science': [
    {
      id: 'food_web',
      title: 'Predators & Producers: The Rainforest Food Web',
      icon: '🐆',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Rainforest Guardian Badge',
      desc: 'Explore producers vs consumers, assemble a rainforest food chain, and simulate what happens when one species disappears!'
    },
    {
      id: 'photosynthesis',
      title: 'The Living World & Cells: Plants & Photosynthesis',
      icon: '🍃',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Botanical Master Badge',
      desc: 'Discover plant anatomy, chloroplast solar engines, and interactive photosynthesis: turn sunlight, water, and CO₂ into oxygen and sweet glucose!'
    }
  ],

  // Human Biology -> Human Body & Senses
  'human_biology': [
    {
      id: 'human_body_senses',
      title: 'Human Body & Senses: The Brain Supercomputer',
      icon: '🧠',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Neuro-Explorer Badge',
      desc: 'Journey through the brain, nervous system highway, and test your five senses in an interactive sensory challenge!'
    }
  ],

  // MATHS: Fractions & Decimals -> Real World Pizza Fractions
  'fractions_decimals': [
    {
      id: 'fractions_real_world',
      title: 'Fractions in the Real World: Pizza Chef Adventure',
      icon: '🍕',
      status: 'ready',
      duration: '8–10 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Fraction Master Chef Badge',
      desc: 'Master numerators and denominators by slicing pizzas, sharing slices equally, and solving tasty real-world fraction challenges!'
    }
  ],

  // MATHS: Numbers & Operations
  'numbers_operations': [
    {
      id: 'numbers_operations_quest',
      title: 'Numbers & Operations: The Calculation Castle',
      icon: '🔢',
      status: 'ready',
      duration: '6–8 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Maths Math-Wiz Badge',
      desc: 'Crack fast multiplication codes, place-value secrets, and mental arithmetic puzzles in the royal castle!'
    }
  ],

  // MATHS: Geometry
  'geometry_shapes': [
    {
      id: 'geometry_quest',
      title: 'Geometry & Angles: Secret Polygon Builder',
      icon: '📐',
      status: 'ready',
      duration: '6–8 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Geometry Architect Badge',
      desc: 'Measure acute and obtuse angles, calculate perimeters, and build 2D & 3D geometric shapes!'
    }
  ],

  // MATHS: Patterns & Logic
  'patterns_logic': [
    {
      id: 'patterns_logic_quest',
      title: 'Patterns & Logic: The Codebreaker’s Guild',
      icon: '🧩',
      status: 'ready',
      duration: '6–8 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Master Detective Badge',
      desc: 'Spot number sequence rules, crack encrypted pattern locks, and train your deductive brain!'
    }
  ],

  // MATHS: Basic Algebra
  'basic_algebra': [
    {
      id: 'basic_algebra_quest',
      title: 'Basic Algebra: Balancing the Secret Variable X',
      icon: '⚖️',
      status: 'ready',
      duration: '6–8 mins',
      chaptersCount: 3,
      hasQuiz: true,
      badgeReward: 'Equation Balancer Badge',
      desc: 'Balance the scales of justice! Add and subtract equal weights to uncover the secret value of Mystery X!'
    }
  ]
};

// Helper function to resolve subtopics for any topic ID
export function getSubtopicsForTopic(topicId) {
  if (subtopicsMap[topicId]) {
    return subtopicsMap[topicId];
  }
  return subtopicsMap['earth_environment'];
}
