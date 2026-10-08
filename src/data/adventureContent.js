const card = (emoji, title, text, wrap) => ({ emoji, title, text, wrap });

export const humanBodyByAge = {
  ages_5_7: {
    banner: 'Human Body → Our 5 Senses',
    tabs: ['1. Your Brain', '2. Five Senses', '3. Sense Game', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Your Body Boss',
    part1Title: 'Your Brain Helps You Think and Move',
    next1: 'Part 2: The Five Senses!',
    lessonTextPart1: [
      'Your brain lives inside your head. It is the boss of your body.',
      'The brain helps you think, remember games, and tell your legs to run.',
      'Nerves are like tiny message wires. They carry notes from your body to your brain, and from your brain back to your muscles.'
    ],
    cardsPart1: [
      card('🧠 💭', 'Thinking Brain', 'This part helps you talk, remember, and imagine stories.', 'bg-indigo-50 border-indigo-200'),
      card('🤸 ⚖️', 'Balance Helper', 'This part helps you walk, dance, and not fall over.', 'bg-teal-50 border-teal-200'),
      card('💓 🫁', 'Always-On Helper', 'This part keeps your heart beating and your breathing going, even when you sleep!', 'bg-amber-50 border-amber-200')
    ],
    part2Badge: 'Part 2 of 3: Exploring',
    part2Title: 'Five Ways Your Body Learns About the World',
    next2: 'Part 3: Which Sense?',
    lessonTextPart2: [
      'You have five senses. They are like windows that tell your brain what is happening.',
      'Eyes help you see. Ears help you hear. Your nose helps you smell. Your tongue helps you taste. Your skin helps you feel hot, cold, or bumpy.',
      'If you touch something very hot, your body pulls your hand away fast. That quick save is called a reflex. It keeps you safe!'
    ],
    senseCards: [
      { name: 'Sight', icon: '👁️', organ: 'Eyes', desc: 'Eyes help you see colors and shapes.' },
      { name: 'Hearing', icon: '👂', organ: 'Ears', desc: 'Ears catch sounds like music and thunder.' },
      { name: 'Smell', icon: '👃', organ: 'Nose', desc: 'Your nose sniffs cookies and flowers.' },
      { name: 'Taste', icon: '👅', organ: 'Tongue', desc: 'Your tongue tastes sweet, salty, and sour.' },
      { name: 'Touch', icon: '✋', organ: 'Skin', desc: 'Skin feels soft, rough, hot, and cold.' }
    ],
    reflexNote: 'Reflex: if something is too hot, your body yanks your hand away so you do not get hurt.',
    challengeTitle: 'Which Sense Is This?',
    challengeHint: 'Read the clue. Tap the body part that found it!',
    sensoryChallenges: [
      { id: 1, prompt: 'Yum! You smell warm cookies!', answer: 'nose', organName: 'Nose (smell)', icon: '👃' },
      { id: 2, prompt: 'You see a bright rainbow!', answer: 'eyes', organName: 'Eyes (sight)', icon: '👁️' },
      { id: 3, prompt: 'You feel a cold ice cube!', answer: 'skin', organName: 'Skin (touch)', icon: '✋' },
      { id: 4, prompt: 'You taste a sour lemon!', answer: 'tongue', organName: 'Tongue (taste)', icon: '👅' },
      { id: 5, prompt: 'You hear a loud boom of thunder!', answer: 'ears', organName: 'Ears (hearing)', icon: '👂' }
    ],
    organButtons: [
      { id: 'eyes', name: 'Eyes (See)', icon: '👁️' },
      { id: 'ears', name: 'Ears (Hear)', icon: '👂' },
      { id: 'nose', name: 'Nose (Smell)', icon: '👃' },
      { id: 'tongue', name: 'Tongue (Taste)', icon: '👅' },
      { id: 'skin', name: 'Skin (Touch)', icon: '✋' }
    ],
    quizCta: 'Take the Body Quiz!',
    badge: 'Sense Explorer Badge',
    badgeBlurb: 'You know how eyes, ears, nose, tongue, and skin help your brain learn!',
    quiz: [
      { q: 'What does your brain help you do?', options: ['Only grow hair', 'Think, remember, and tell your body to move', 'Make rain', 'Shine like the Sun'], correct: 1, why: 'Your brain is the body boss for thinking and moving.' },
      { q: 'Which body part helps you see a rainbow?', options: ['Ears', 'Eyes', 'Tongue', 'Elbow'], correct: 1, why: 'Eyes are for sight.' },
      { q: 'If you touch something very hot, your body may pull away fast. What is that called?', options: ['A reflex', 'A nap', 'A song', 'A cloud'], correct: 0, why: 'A reflex is a quick safety move.' }
    ]
  },
  ages_8_10: {
    banner: 'Human Biology → Human Body & Senses',
    tabs: ['1. Brain & Nerves', '2. The 5 Senses', '3. Sensory Game', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Neural Highway',
    part1Title: 'The Brain & The Nervous System Supercomputer',
    next1: 'Part 2: The Five Senses!',
    lessonTextPart1: [
      'The Brain Supercomputer: Inside your skull sits the most advanced command center in the universe—your Brain! Your brain contains over 86 billion microscopic nerve cells called Neurons.',
      'The Neural Highway: Neurons communicate by sending rapid electrical impulses across your spinal cord and nerves. These signals travel at blazing speeds of up to 250 miles per hour!',
      'The 3 Brain Power Regions: 1. The Cerebrum (the large wrinkly top) controls conscious thinking, memory, reading, and imagination. 2. The Cerebellum (tucked at the back) coordinates your muscles and balance so you can run, dance, and ride a bike without tumbling! 3. The Brainstem (at the base) automatically controls heartbeat and breathing even while you sleep!'
    ],
    cardsPart1: [
      card('🧠 💭', '1. Cerebrum (Thinking)', 'The wrinkly outer brain. Controls speech, problem-solving, math, reading, emotions, and conscious imagination.', 'bg-indigo-50 border-indigo-200'),
      card('🤸 ⚖️', '2. Cerebellum (Balance)', 'Tucked at the back of the head. Coordinates your muscles so you can ride a bicycle, dance, and balance without falling!', 'bg-teal-50 border-teal-200'),
      card('💓 🫁', '3. Brainstem (Life Support)', 'Connects to the spinal cord. Automatically keeps your heart beating, lungs breathing, and food digesting without thinking!', 'bg-amber-50 border-amber-200')
    ],
    part2Badge: 'Part 2 of 3: Sensory Receptors',
    part2Title: 'How Your Body Senses and Responds to the World',
    next2: 'Part 3: "Which Sense?" Challenge!',
    lessonTextPart2: [
      'Your 5 Windows to the World: Your five senses gather clues about your surroundings and report back to your brain.',
      '1. Sight (Eyes & Retina): Focuses light photons into vivid color pictures. 2. Hearing (Ears & Cochlea): Catches air sound waves and turns them into pitch. 3. Smell (Nose & Olfactory Bulb): Detects airborne scent molecules. 4. Taste (Tongue & Taste Buds): Decodes sweet, salty, sour, bitter, and savory umami. 5. Touch (Skin Receptors): Senses texture, pressure, heat, and cold.',
      'Super-Fast Reflex Actions: If you accidentally touch something sharp or scorching hot, sensory nerves alert the spinal cord, which immediately commands your muscles to jerk your hand away in a split-second. This automatic survival shortcut is called a Reflex Action—it protects you before your brain even registers pain!'
    ],
    senseCards: [
      { name: '1. Sight (Vision)', icon: '👁️', organ: 'Retina & Photoreceptors', desc: 'Focuses light into vivid color pictures.' },
      { name: '2. Hearing', icon: '👂', organ: 'Eardrum & Cochlea', desc: 'Converts air sound waves into pitch pulses.' },
      { name: '3. Smell (Olfaction)', icon: '👃', organ: 'Olfactory Bulb', desc: 'Detects microscopic airborne scent molecules.' },
      { name: '4. Taste (Gustation)', icon: '👅', organ: 'Taste Buds', desc: 'Decodes sweet, salty, sour, bitter, and umami.' },
      { name: '5. Touch (Tactile)', icon: '✋', organ: 'Skin Receptors', desc: 'Senses texture, pressure, heat, and cold.' }
    ],
    reflexNote: 'Reflex Protection: Touching a hot stove causes sensory nerves to immediately tell the spinal cord to pull your hand away—protecting you before the signal even reaches your brain!',
    challengeTitle: 'Which Sense Detects This Clue?',
    challengeHint: 'Read the scenario and click the sensory organ that decodes it!',
    sensoryChallenges: [
      { id: 1, prompt: 'You smell delicious cinnamon rolls baking in the oven!', answer: 'nose', organName: 'Nose (Olfactory System)', icon: '👃' },
      { id: 2, prompt: 'You spot a bright double rainbow arching over a stormy valley!', answer: 'eyes', organName: 'Eyes (Vision & Retina)', icon: '👁️' },
      { id: 3, prompt: 'You touch a smooth, freezing ice cube and feel its cold texture!', answer: 'skin', organName: 'Skin (Touch Receptors)', icon: '✋' },
      { id: 4, prompt: 'You bite into a slice of yellow lemon and make a funny face!', answer: 'tongue', organName: 'Tongue (Taste Buds)', icon: '👅' },
      { id: 5, prompt: 'You hear a loud boom of lightning thunder echoing in the distance!', answer: 'ears', organName: 'Ears (Hearing & Cochlea)', icon: '👂' }
    ],
    organButtons: [
      { id: 'eyes', name: 'Eyes (Sight)', icon: '👁️' },
      { id: 'ears', name: 'Ears (Hearing)', icon: '👂' },
      { id: 'nose', name: 'Nose (Smell)', icon: '👃' },
      { id: 'tongue', name: 'Tongue (Taste)', icon: '👅' },
      { id: 'skin', name: 'Skin (Touch)', icon: '✋' }
    ],
    quizCta: 'Take the Neuro-Explorer Quiz!',
    badge: 'Neuro-Explorer Badge',
    badgeBlurb: 'You understand the brain, nerves, and sensory marvels keeping your body alive and curious!',
    quiz: [
      { q: 'Which incredible organ contains 86 billion neurons and controls conscious thoughts, memories, and problem-solving?', options: ['The Stomach', 'The Brain (Cerebrum)', 'The Lungs', 'The Femur bone'], correct: 1, why: 'The brain contains over 86 billion neurons, with the cerebrum managing conscious thoughts, memories, and speech!' },
      { q: 'What is an automatic survival response, such as instantly pulling your hand away from a hot surface before you even feel pain?', options: ['A slow decision made after 10 minutes of thinking', 'A Reflex Action (handled by the spinal cord reflex arc)', 'A memory from babyhood', 'An optical illusion'], correct: 1, why: 'Reflex actions bypass the thinking brain to protect your body from harm in a split second!' },
      { q: 'Which part of the brain tucked at the back coordinates muscle movements, balance, and motor skills like riding a bicycle?', options: ['The Cerebellum', 'The Taste Bud', 'The Eardrum', 'The Eyeball'], correct: 0, why: 'The Cerebellum is your balance and coordination center!' }
    ]
  },
  ages_11_13: {
    banner: 'Neurobiology → Sensory Organs',
    tabs: ['1. Neurons', '2. Receptors', '3. Reflex Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Neural Signaling',
    part1Title: 'Neurons, Regions, and the Nerve Highway',
    next1: 'Part 2: Sensory Receptors',
    lessonTextPart1: [
      'The brain is a network of about 86 billion neurons. A neuron sends an electrical impulse along its axon; at a synapse, chemical messengers (neurotransmitters) pass the signal to the next cell.',
      'The cerebrum handles conscious thought, language, and memory. The cerebellum coordinates balance and fine motor control. The brainstem autonomously regulates heartbeat and breathing.',
      'Peripheral nerves and the spinal cord form a bidirectional highway: sensory input travels inward, motor commands travel outward.'
    ],
    cardsPart1: [
      card('🧠 💭', 'Cerebrum', 'Cognition, memory, language, and voluntary planning.', 'bg-indigo-50 border-indigo-200'),
      card('🤸 ⚖️', 'Cerebellum', 'Compares intended movement with actual movement so you stay coordinated.', 'bg-teal-50 border-teal-200'),
      card('💓 🫁', 'Brainstem', 'Keeps vital autonomic functions running without conscious effort.', 'bg-amber-50 border-amber-200')
    ],
    part2Badge: 'Part 2 of 3: Transduction',
    part2Title: 'How Sensory Receptors Transduce Stimuli',
    next2: 'Part 3: Receptor Challenge',
    lessonTextPart2: [
      'A sense organ converts a physical stimulus into a neural signal. That conversion is transduction.',
      'Photoreceptors in the retina detect light. Mechanoreceptors in the cochlea detect sound-wave vibration, and others in skin detect pressure. Chemoreceptors in the olfactory epithelium and taste buds detect molecules. Thermoreceptors detect temperature.',
      'A reflex arc is a fast circuit: sensory neuron → spinal cord interneuron → motor neuron → muscle. The signal does not wait for the cerebrum, which is why you withdraw from a burn before you fully feel pain.'
    ],
    senseCards: [
      { name: 'Sight', icon: '👁️', organ: 'Photoreceptors', desc: 'Light is transduced in the retina into neural impulses.' },
      { name: 'Hearing', icon: '👂', organ: 'Cochlear mechanoreceptors', desc: 'Air pressure waves become vibration, then nerve signals.' },
      { name: 'Smell', icon: '👃', organ: 'Olfactory chemoreceptors', desc: 'Airborne molecules bind receptors in the nasal lining.' },
      { name: 'Taste', icon: '👅', organ: 'Taste-bud chemoreceptors', desc: 'Dissolved chemicals code sweet, salty, sour, bitter, umami.' },
      { name: 'Touch', icon: '✋', organ: 'Skin mechanoreceptors', desc: 'Pressure, texture, and some temperature cues are transduced in skin.' }
    ],
    reflexNote: 'Reflex arc: the spinal cord can command a muscle before the cerebrum finishes processing pain. That shorter path is why withdrawal is so fast.',
    challengeTitle: 'Match the Stimulus to the Organ',
    challengeHint: 'Use the receptor type you just learned, then pick the organ.',
    sensoryChallenges: [
      { id: 1, prompt: 'Chemoreceptors in your nasal lining bind cinnamon odor molecules.', answer: 'nose', organName: 'Nose (olfactory chemoreceptors)', icon: '👃' },
      { id: 2, prompt: 'Photoreceptors in the retina transduce photons from a rainbow.', answer: 'eyes', organName: 'Eyes (photoreceptors)', icon: '👁️' },
      { id: 3, prompt: 'Skin mechanoreceptors and thermoreceptors report a freezing ice cube.', answer: 'skin', organName: 'Skin (touch receptors)', icon: '✋' },
      { id: 4, prompt: 'Taste-bud chemoreceptors detect citric acid in lemon.', answer: 'tongue', organName: 'Tongue (gustation)', icon: '👅' },
      { id: 5, prompt: 'Cochlear mechanoreceptors convert thunder’s pressure waves into pitch signals.', answer: 'ears', organName: 'Ears (cochlea)', icon: '👂' }
    ],
    organButtons: [
      { id: 'eyes', name: 'Eyes (photo)', icon: '👁️' },
      { id: 'ears', name: 'Ears (mechano)', icon: '👂' },
      { id: 'nose', name: 'Nose (chemo)', icon: '👃' },
      { id: 'tongue', name: 'Tongue (chemo)', icon: '👅' },
      { id: 'skin', name: 'Skin (mechano)', icon: '✋' }
    ],
    quizCta: 'Take the Neurobiology Quiz!',
    badge: 'Neuro-Explorer Badge',
    badgeBlurb: 'You can explain neurons, transduction, and why a reflex arc is faster than conscious thought.',
    quiz: [
      { q: 'What happens at a synapse between neurons?', options: ['Bones grow longer', 'Neurotransmitters carry the signal to the next neuron', 'The lungs make oxygen', 'The skin photosynthesizes'], correct: 1, why: 'Electrical impulses trigger chemical messengers at synapses.' },
      { q: 'Why can a withdrawal reflex happen before you fully feel pain?', options: ['The cerebrum is skipped; the spinal cord closes a short reflex arc', 'Skin has no nerves', 'Muscles think by themselves with no nerves', 'Pain signals travel through the stomach'], correct: 0, why: 'A reflex arc is a shorter circuit through the spinal cord.' },
      { q: 'Transduction in the retina is mainly the job of:', options: ['Photoreceptors converting light into neural signals', 'Taste buds', 'The femur', 'Hair follicles'], correct: 0, why: 'Photoreceptors transduce photons into impulses the brain can interpret as vision.' }
    ]
  }
};

export const foodWebByAge = {
  ages_5_7: {
    banner: 'Plants & Animals → Who Eats What?',
    tabs: ['1. Who Makes Food?', '2. Build a Chain', '3. Missing Animals', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Who Eats What?',
    part1Title: 'Plants Make Food. Animals Eat.',
    next1: 'Build a Food Chain!',
    lessonTextPart1: [
      'In the rainforest, everyone needs energy. Energy starts with the Sun.',
      'Green plants are producers. They make their own food from sunlight.',
      'Animals are consumers. They cannot make sunlight-food, so they eat plants or other animals.',
      'When living things die, mushrooms and tiny helpers break them down. That puts goodness back in the soil for new plants.'
    ],
    cardsPart1: [
      card('🌿 ☀️', '1. Producers (Plants)', 'Trees make food from sunlight. They start the eating line!', 'bg-emerald-50/70 border-emerald-200'),
      card('🐛 🐸', '2. Consumers (Animals)', 'Bugs eat leaves. Frogs eat bugs. Animals must eat to get energy.', 'bg-amber-50/70 border-amber-200'),
      card('🐆 🍄', '3. Big Hunters & Recyclers', 'Jaguars hunt. Mushrooms recycle leftover bits into soil.', 'bg-purple-50/70 border-purple-200')
    ],
    chainTitle: 'Line Up Who Eats Whom',
    chainHint: 'Tap in order: Sun → plant → plant-eater → frog → jaguar!',
    chainEmpty: '🌱 Tap the cards to build a 5-step eating line!',
    chainSuccess: 'Yes! Sun → Tree → Caterpillar → Frog → Jaguar.',
    organisms: [
      { id: 'sun', name: 'The Sun', role: 'Energy', icon: '☀️', order: 1 },
      { id: 'fig', name: 'Tree', role: 'Producer', icon: '🌳', order: 2 },
      { id: 'caterpillar', name: 'Caterpillar', role: 'Eats plants', icon: '🐛', order: 3 },
      { id: 'frog', name: 'Frog', role: 'Eats bugs', icon: '🐸', order: 4 },
      { id: 'jaguar', name: 'Jaguar', role: 'Top hunter', icon: '🐆', order: 5 }
    ],
    part3Badge: 'Part 3 of 3: Sharing the Forest',
    part3Title: 'What If Someone Goes Missing?',
    next3: 'Food Web Play',
    lessonTextPart3: [
      'Animals do not eat just one food. Many eating lines mix together. That mix is a food web.',
      'If one animal is gone, others can get too many or too few. The forest can get messy.'
    ],
    healthyLabel: '100% Happy Forest',
    unbalancedLabel: '⚠️ The forest is mixed up',
    cascade: {
      frogs: 'Without frogs, bugs chew too many leaves. Trees get sick.',
      trees: 'Without trees, there is no plant food. Animals get hungry.',
      jaguars: 'Without jaguars, too many plant-eaters munch the forest.',
      insects: 'Without bugs, frogs miss lunch, and some flowers cannot make fruit.',
      none: 'Click an animal or plant to see what happens if it is gone!'
    },
    quizCta: 'Take the Forest Quiz!',
    badge: 'Rainforest Guardian Badge',
    badgeBlurb: 'You know plants make food and animals eat along a chain!',
    quiz: [
      { q: 'Why are green plants called producers?', options: ['They hunt jaguars', 'They make their own food from sunlight', 'They only sleep', 'They make thunder'], correct: 1, why: 'Producers make food from sunlight.' },
      { q: 'What do we call animals that must eat to get energy?', options: ['Producers', 'Rocks', 'Consumers', 'Clouds'], correct: 2, why: 'Animals are consumers because they eat food.' },
      { q: 'What can happen if frogs disappear?', options: ['Nothing ever changes', 'Bugs may eat too many leaves', 'The Sun turns off', 'Rivers flow uphill'], correct: 1, why: 'Missing frogs can let bugs chew too many leaves.' }
    ]
  },
  ages_8_10: {
    banner: 'Life Science → Rainforest Food Web',
    tabs: ['1. Producers vs Consumers', '2. Build a Chain', '3. Food Web Cascade', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Ecosystem Energy',
    part1Title: 'Producers vs. Consumers in the Rainforest',
    next1: 'Continue: Build a Food Chain!',
    lessonTextPart1: [
      'Welcome to the Amazon Rainforest! Every living creature needs energy to live, grow, and move. The Sun is the ultimate powerhouse providing solar light energy to our planet.',
      '1. The Producers: Green plants like towering kapok trees, vines, and wild orchids are called Producers because they manufacture their own sweet food using sunlight through photosynthesis. Producers are the foundation of all life!',
      '2. The Consumers: Animals cannot produce their own food from sunlight. Animals are called Consumers because they must consume (eat) other living things for energy. Primary consumers (herbivores like caterpillars) eat plants. Secondary consumers (carnivores like poison dart frogs) eat smaller animals.',
      '3. The Apex Predators & Decomposers: Jaguars are Apex Predators at the very top of the food chain with no natural predators. When organisms die, Decomposers like forest floor mushrooms and bacteria break them down, returning vital nutrients to the soil so producers can grow again!'
    ],
    cardsPart1: [
      card('🌿 ☀️', '1. Producers (Plants)', 'Trees and plants that make their own food from sunlight. The base of all food chains!', 'bg-emerald-50/70 border-emerald-200'),
      card('🐛 🐸', '2. Consumers (Animals)', 'Animals that must eat plants (herbivores) or smaller creatures (carnivores) for energy.', 'bg-amber-50/70 border-amber-200'),
      card('🐆 🍄', '3. Apex Predators & Decomposers', 'Jaguars rule the top, while mushrooms and bacteria recycle nutrients back into the soil!', 'bg-purple-50/70 border-purple-200')
    ],
    chainTitle: 'Assemble the Rainforest Energy Chain',
    chainHint: 'Click the organisms in the correct order of energy flow (from Energy Source → Producer → Consumers → Apex Predator)!',
    chainEmpty: '🌱 Click the cards below to build your 5-step energy chain!',
    chainSuccess: 'Incredible work! Energy flows directly from Sun → Tree → Caterpillar → Frog → Jaguar!',
    organisms: [
      { id: 'sun', name: 'The Sun', role: 'Energy Source', icon: '☀️', order: 1 },
      { id: 'fig', name: 'Rainforest Tree', role: 'Producer (Makes food)', icon: '🌳', order: 2 },
      { id: 'caterpillar', name: 'Caterpillar', role: 'Herbivore (Primary Consumer)', icon: '🐛', order: 3 },
      { id: 'frog', name: 'Dart Frog', role: 'Carnivore (Secondary Consumer)', icon: '🐸', order: 4 },
      { id: 'jaguar', name: 'Jaguar', role: 'Apex Predator (Top of Chain)', icon: '🐆', order: 5 }
    ],
    part3Badge: 'Part 3 of 3: Ecosystem Balance',
    part3Title: 'What Happens When One Species Disappears?',
    next3: 'Food Web Simulation!',
    lessonTextPart3: [
      'What is a Food Web? In nature, animals rarely eat just one food. Multiple overlapping food chains intertwine to create a balanced Food Web.',
      'What is a Trophic Cascade? When a key species disappears—whether from habitat loss or pollution—it triggers an ecological chain reaction called a Trophic Cascade! For example, if frogs disappear, caterpillars multiply uncontrollably and strip leaves off trees, destabilizing the entire rainforest.'
    ],
    healthyLabel: '100% Thriving',
    unbalancedLabel: '⚠️ Unbalanced (Trophic Cascade)',
    cascade: {
      frogs: '⚠️ Trophic Cascade Alert! Without frogs, insect populations explode! Swarms of caterpillars chew down all rainforest leaves, starving other plant eaters and destabilizing the forest canopy.',
      trees: '⚠️ Producer Loss! Trees produce food and oxygen. Without producers, the entire food pyramid collapses because no solar energy enters the food web!',
      jaguars: '⚠️ Predator Loss! Without apex predators, herbivores overpopulate and overgraze vegetation, leading to deforestation and soil erosion.',
      insects: '⚠️ Pollination Crisis! Without insects, flowers cannot pollinate to bear fruit, and insect-eating frogs lose their primary food supply.',
      none: '💡 Biodiversity Sturdiness: In a healthy rainforest, all species are balanced. Click any organism above to see what happens when one disappears!'
    },
    quizCta: 'Take the Rainforest Guardian Quiz!',
    badge: 'Rainforest Guardian Badge',
    badgeBlurb: 'You understand how producers and predators work together to sustain life on our planet!',
    quiz: [
      { q: 'Why are green plants and canopy trees in the rainforest called "Producers"?', options: ['Because they hunt smaller insects for energy', 'Because they produce their own food using sunlight through photosynthesis', 'Because they decompose dead leaves in the soil', 'Because they produce rain from clouds'], correct: 1, why: 'Producers harness sunlight energy to manufacture their own food through photosynthesis.' },
      { q: 'In a rainforest food chain, what role does an animal play when it eats other organisms for energy?', options: ['An energy source', 'A producer', 'A consumer', 'A mineral'], correct: 2, why: 'Animals cannot make their own food from sunlight, so they consume other organisms for energy.' },
      { q: 'What is a "Trophic Cascade" in an ecosystem?', options: ['A waterfall flowing down a mountain', 'An ecological chain reaction where removing one species disrupts the entire food web', 'A sunny day in the rainforest', 'A sleeping jaguar'], correct: 1, why: 'A trophic cascade is an ecological chain reaction that throws the food web out of balance when a key species is removed!' }
    ]
  },
  ages_11_13: {
    banner: 'Ecosystem Dynamics → Trophic Structure',
    tabs: ['1. Trophic Levels', '2. Build a Chain', '3. Cascade Model', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Energy Flow',
    part1Title: 'Producers, Consumers, and Energy Transfer',
    next1: 'Assemble a Trophic Chain',
    lessonTextPart1: [
      'Ecosystem energy originates as solar radiation. Producers convert that energy into chemical energy via photosynthesis, forming the base of every food web.',
      'Consumers obtain chemical energy by eating other organisms. Herbivores are primary consumers; carnivores that eat them are secondary (or higher) consumers. An apex predator occupies the top trophic level because nothing routinely preys on it.',
      'Decomposers recycle matter, not a new energy source from the Sun: they return nutrients to soil so producers can grow again. Only about 10% of energy typically transfers from one trophic level to the next; the rest is lost as heat and life processes. That is why food chains are short.'
    ],
    cardsPart1: [
      card('🌿 ☀️', 'Producers', 'Fix solar energy into biomass. Without them, higher trophic levels have no chemical energy.', 'bg-emerald-50/70 border-emerald-200'),
      card('🐛 🐸', 'Consumers', 'Move energy up the web by eating. Each step wastes most of the energy as heat.', 'bg-amber-50/70 border-amber-200'),
      card('🐆 🍄', 'Apex predators & decomposers', 'Top-down control vs. nutrient recycling: both stabilize the system in different ways.', 'bg-purple-50/70 border-purple-200')
    ],
    chainTitle: 'Order the Trophic Pathway',
    chainHint: 'Energy source → producer → primary consumer → secondary consumer → apex predator.',
    chainEmpty: 'Build the 5-step energy pathway.',
    chainSuccess: 'Correct pathway: Sun → Tree → Caterpillar → Frog → Jaguar. Energy moves up; most is lost at each step.',
    organisms: [
      { id: 'sun', name: 'The Sun', role: 'Radiant energy', icon: '☀️', order: 1 },
      { id: 'fig', name: 'Rainforest Tree', role: 'Producer', icon: '🌳', order: 2 },
      { id: 'caterpillar', name: 'Caterpillar', role: 'Primary consumer', icon: '🐛', order: 3 },
      { id: 'frog', name: 'Dart Frog', role: 'Secondary consumer', icon: '🐸', order: 4 },
      { id: 'jaguar', name: 'Jaguar', role: 'Apex predator', icon: '🐆', order: 5 }
    ],
    part3Badge: 'Part 3 of 3: Trophic Cascades',
    part3Title: 'Indirect Effects When a Species Is Removed',
    next3: 'Cascade Simulation',
    lessonTextPart3: [
      'A food web is a network of overlapping food chains. Removing one node changes feeding pressure on others.',
      'A trophic cascade is that chain reaction. Example: lose frogs (secondary consumers) and herbivorous insects erupt, defoliating producers. Lose an apex predator and herbivores may overgraze. Cause and effect travel through the web, not just the missing species.'
    ],
    healthyLabel: 'Web intact',
    unbalancedLabel: '⚠️ Cascade underway',
    cascade: {
      frogs: 'Trophic cascade: secondary-consumer loss → herbivore outbreak → producer damage. Indirect effect on the whole canopy.',
      trees: 'Producer collapse: solar energy never enters the chemical-energy pyramid, so every consumer level fails.',
      jaguars: 'Apex-predator loss: mesopredators or herbivores increase, vegetation is overgrazed, soils erode.',
      insects: 'Primary-consumer/pollinator loss: frogs starve and plant reproduction drops because flowers are not pollinated.',
      none: 'Click a node. Predict the indirect effect before you read the result—that is cascade reasoning.'
    },
    quizCta: 'Take the Ecosystem Dynamics Quiz!',
    badge: 'Rainforest Guardian Badge',
    badgeBlurb: 'You can reason about trophic levels, energy loss, and cascade effects.',
    quiz: [
      { q: 'Why are food chains typically short?', options: ['Animals get bored', 'Only about 10% of energy transfers to the next trophic level', 'The Sun is too close', 'Decomposers eat the Sun'], correct: 1, why: 'Most energy is lost as heat and metabolism, so little remains for the next level.' },
      { q: 'A trophic cascade is best described as:', options: ['A waterfall', 'Indirect ecosystem change after a key species is removed', 'A type of mushroom', 'A planet'], correct: 1, why: 'Effects ripple through feeding relationships, not only the missing species.' },
      { q: 'What do decomposers mainly recycle?', options: ['Brand-new sunlight', 'Nutrients in matter back to soil for producers', 'Gravity', 'Stars'], correct: 1, why: 'They return nutrients; the original energy still came from the Sun via producers.' }
    ]
  }
};

export const photosynthesisByAge = {
  ages_5_7: {
    banner: 'Plants & Trees → How Plants Make Food',
    tabs: ['1. Plant Parts', '2. Making Food', '3. Plant Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Plant Parts',
    part1Title: 'Roots, Stems, and Leaves',
    next1: 'Part 2: How Plants Make Food!',
    lessonTextPart1: [
      'Plants do not eat sandwiches. They make their own food!',
      'Roots drink water from the soil. They also hold the plant in place.',
      'The stem is like a straw. It carries water up to the leaves.',
      'Leaves are green kitchens. They catch sunlight so the plant can cook food.'
    ],
    cardsPart1: [
      card('🌱 💧', '1. Roots', 'Drink water and hold the plant in the dirt.', 'bg-amber-50/70 border-amber-200'),
      card('🎋 ⬆️', '2. Stem', 'Carries water up like a straw.', 'bg-lime-50/70 border-lime-200'),
      card('🍃 ☀️', '3. Leaves', 'Catch sunlight to make food.', 'bg-green-50/70 border-green-200'),
      card('🌸 🐝', '4. Flowers', 'Help make seeds for new plants.', 'bg-rose-50/70 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: Recipe',
    part2Title: 'The Plant Food Recipe',
    next2: 'Part 3: Plant Lab!',
    lessonTextPart2: [
      'To make food, a plant needs three things: sunlight, water, and air.',
      'The leaf uses those three things to make sugary plant food.',
      'Plants also give us oxygen, the gas we breathe. Thank you, leaves!'
    ],
    equation: {
      inputsLabel: 'What the plant needs',
      inputs: 'Sunlight + Water + Air',
      middleLabel: 'Where it happens',
      middle: 'Green leaves',
      outputsLabel: 'What the plant makes',
      outputs: 'Plant food + Oxygen'
    },
    quizCta: 'Take the Plant Quiz!',
    badge: 'Botanical Master Badge',
    badgeBlurb: 'You know plants make food from sun, water, and air, and they give us oxygen!',
    quiz: [
      { q: 'What do roots do?', options: ['Catch lightning', 'Drink water and hold the plant', 'Sing songs', 'Make clouds'], correct: 1, why: 'Roots drink water and hold the plant in the soil.' },
      { q: 'What three things does a plant need to make food?', options: ['Sunlight, water, and air', 'Cookies, milk, and nap time', 'Rocks only', 'Moonlight and socks'], correct: 0, why: 'Sun, water, and air are the plant food recipe.' },
      { q: 'What helpful gas do plants give us to breathe?', options: ['Helium balloons only', 'Smoke', 'Oxygen', 'Ketchup'], correct: 2, why: 'Plants give off oxygen that we breathe.' }
    ]
  },
  ages_8_10: {
    banner: 'Life Science → Plants & Photosynthesis',
    tabs: ['1. Plant Anatomy', '2. Solar Sugar Formula', '3. Photosynthesis Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Botanical Anatomy',
    part1Title: 'How Plants Are Built to Capture the Sun',
    next1: 'Part 2: Photosynthesis Formula!',
    lessonTextPart1: [
      "Plants are nature's solar powerhouses! Unlike animals, plants don't eat food—they make their own food through a process called Photosynthesis.",
      'The Underground Roots: Deep below the soil, roots anchor the plant in place and drink fresh water and mineral nutrients using microscopic root hairs.',
      'The Stem & Xylem Pipelines: The stem acts as a sturdy structural highway. Inside the stem are microscopic tubes called Xylem that pump water upward from the roots to the leaves like drinking straws!',
      'The Leaves & Stomata: Green leaves are broad and flat to catch sunlight. Inside leaf cells are microscopic green organelles called Chloroplasts, filled with green Chlorophyll pigments. On the underside of leaves are tiny pores called Stomata that inhale carbon dioxide from the air and release oxygen!'
    ],
    cardsPart1: [
      card('🌱 💧', '1. Roots', 'Anchor the plant and drink liquid water and essential mineral salts through root hairs.', 'bg-amber-50/70 border-amber-200'),
      card('🎋 ⬆️', '2. Stem & Xylem', 'The structural skeleton with microscopic xylem tubes that carry water up to leaves like straws.', 'bg-lime-50/70 border-lime-200'),
      card('🍃 ☀️', '3. Green Leaves', 'Contain green chloroplasts to catch sunlight, and microscopic stomata pores to exchange gases.', 'bg-green-50/70 border-green-200'),
      card('🌸 🐝', '4. Flowers & Seeds', 'Attract pollinators like bees and butterflies to produce seeds for the next generation of plants.', 'bg-rose-50/70 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: The Solar Sugar Formula',
    part2Title: 'How Light Turns Air and Water into Food!',
    next2: 'Part 3: Photosynthesis Lab!',
    lessonTextPart2: [
      "What does Photosynthesis mean? The word comes from two Greek words: 'Photo' meaning light, and 'Synthesis' meaning putting together!",
      'The 3 Essential Ingredients (Inputs): To make food, a plant must have Sunlight from the Sun, liquid Water (H₂O) from the roots, and Carbon Dioxide gas (CO₂) from the air.',
      'The 2 Marvelous Products (Outputs): Inside the leaf chloroplasts, solar energy transforms these ingredients into Glucose Sugar (plant food that builds stems, leaves, flowers, and sweet fruits) and fresh Oxygen gas (O₂) released into the atmosphere for all animals and humans to breathe!'
    ],
    equation: {
      inputsLabel: '3 Essential Inputs',
      inputs: 'Sunlight + Water + CO₂',
      middleLabel: 'Reaction Chamber',
      middle: 'Chloroplasts (Chlorophyll)',
      outputsLabel: '2 Life Products',
      outputs: 'Glucose Sugar + Oxygen (O₂)'
    },
    quizCta: 'Take the Botanical Quiz!',
    badge: 'Botanical Master Badge',
    badgeBlurb: 'You know how chloroplasts turn sunlight, water, and CO₂ into glucose and oxygen!',
    quiz: [
      { q: 'Which microscopic green organelles inside plant leaf cells capture sunlight for photosynthesis?', options: ['Root hairs', 'Chloroplasts (filled with chlorophyll)', 'Xylem drinking straws', 'Tree bark cells'], correct: 1, why: 'Chloroplasts contain green chlorophyll pigments that absorb solar photons to power photosynthesis!' },
      { q: 'What are the three essential ingredients a plant needs to perform photosynthesis?', options: ['Sunlight, Water, and Carbon Dioxide (CO₂)', 'Sugar, Salt, and Soil', 'Oxygen, Nitrogen, and Rocks', 'Moonlight, Wind, and Raincoats'], correct: 0, why: 'Sunlight + Water + Carbon Dioxide combine inside leaf chloroplasts to produce glucose and oxygen!' },
      { q: 'What life-giving gas do plants release into the atmosphere as a product of photosynthesis?', options: ['Carbon Dioxide (CO₂)', 'Helium', 'Oxygen (O₂)', 'Methane'], correct: 2, why: 'Plants release the oxygen that animals and humans breathe every single day!' }
    ]
  },
  ages_11_13: {
    banner: 'Photosynthesis → Chloroplast Chemistry',
    tabs: ['1. Plant Systems', '2. Reaction', '3. Limiting Factors', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Structure Enables Function',
    part1Title: 'Organs That Move Water, Gases, and Light',
    next1: 'Part 2: The Chemical Reaction',
    lessonTextPart1: [
      'Photosynthesis is the process that stores light energy as chemical energy in sugars. It happens in chloroplasts, which contain chlorophyll.',
      'Roots absorb water. Xylem vessels transport that water to leaves because photosynthesis needs H₂O at the chloroplast.',
      'Stomata on the leaf underside open to let carbon dioxide in and oxygen out. If stomata close too long, CO₂ supply drops and the reaction slows—even in bright light.'
    ],
    cardsPart1: [
      card('🌱 💧', 'Roots', 'Water and minerals enter; without water, the reaction cannot produce glucose.', 'bg-amber-50/70 border-amber-200'),
      card('🎋 ⬆️', 'Xylem', 'A one-way pipeline of water to the leaf. Structure exists because the chemistry needs H₂O upstairs.', 'bg-lime-50/70 border-lime-200'),
      card('🍃 ☀️', 'Chloroplasts', 'Chlorophyll absorbs light. That energy drives the conversion of CO₂ and H₂O into sugar.', 'bg-green-50/70 border-green-200'),
      card('🌸 🐝', 'Stomata', 'Gas-exchange pores. They control the CO₂ input and O₂ output of the leaf.', 'bg-rose-50/70 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: Cause and Product',
    part2Title: 'Why Light, Water, and CO₂ Must All Be Present',
    next2: 'Part 3: Limiting-Factor Lab',
    lessonTextPart2: [
      'Overall: carbon dioxide + water, with light energy absorbed by chlorophyll, yield glucose and oxygen.',
      'Each input is a limiting factor. No light: chlorophyll cannot power the reaction. No water from xylem: hydrogen and electrons for sugar-making are missing. No CO₂ through stomata: there is no carbon to build glucose.',
      'Glucose is stored chemical energy for the plant. Oxygen is the by-product released to the atmosphere—the reason animal respiration is coupled to plant photosynthesis on Earth.'
    ],
    equation: {
      inputsLabel: 'Reactants + energy',
      inputs: 'Light + H₂O + CO₂',
      middleLabel: 'Site of reaction',
      middle: 'Chloroplast / chlorophyll',
      outputsLabel: 'Products',
      outputs: 'Glucose + O₂'
    },
    quizCta: 'Take the Photosynthesis Mechanisms Quiz!',
    badge: 'Botanical Master Badge',
    badgeBlurb: 'You can explain chloroplasts, stomata, xylem, and why missing any input stops glucose production.',
    quiz: [
      { q: 'Why do stomata matter for the reaction, not just for “breathing” as a metaphor?', options: ['They let CO₂ in and O₂ out, controlling a key reactant and product', 'They store sunlight as gold', 'They are roots', 'They make xylem wood'], correct: 0, why: 'Gas exchange supplies carbon dioxide and releases oxygen.' },
      { q: 'If xylem is blocked, photosynthesis slows mainly because:', options: ['Water never reaches chloroplasts as a reactant', 'The Moon is too bright', 'Flowers eat insects', 'Soil becomes oxygen'], correct: 0, why: 'Water is an essential reactant transported by xylem.' },
      { q: 'Chlorophyll’s role is to:', options: ['Absorb light energy that drives the conversion of CO₂ and water into glucose', 'Digest meat', 'Create gravity', 'Turn oxygen into nitrogen'], correct: 0, why: 'Pigments capture photons; that energy is stored in sugar bonds.' }
    ]
  }
};

export const solarSystemByAge = {
  ages_5_7: {
    banner: 'Space & The Sun → Planets',
    tabs: ['1. Planets', '2. Day and Year', '3. Planet Peek', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Neighbors in Space',
    part1Title: 'The Sun and Eight Planets',
    next1: 'Part 2: Day and Night!',
    lessonTextPart1: [
      'The Sun is a giant hot star in the middle. Planets go around the Sun.',
      'The four closer planets are rocky: Mercury, Venus, Earth, and Mars.',
      'Farther out are four giant planets: Jupiter, Saturn, Uranus, and Neptune. Saturn has bright rings!'
    ],
    part2Badge: 'Part 2 of 3: Spin and Circle',
    part2Title: 'Why We Have Day, Night, and a Year',
    next2: 'Part 3: Planet Peek!',
    lessonTextPart2: [
      'Earth spins like a top. The side facing the Sun has day. The side facing away has night. One spin is about one day.',
      'Earth also goes in a big circle around the Sun. One full trip is one year.',
      'We live on Earth, the planet with air, water, and life!'
    ],
    orbitCards: [
      { emoji: '🔄 🌍', title: 'Spin = Day and Night', text: 'Earth turning makes day and night.', wrap: 'bg-indigo-50 border-indigo-200' },
      { emoji: '☀️ 🔄', title: 'Trip around the Sun = Year', text: 'Earth’s long path around the Sun is a year.', wrap: 'bg-amber-50 border-amber-200' }
    ],
    planets: [
      { name: 'Mercury', icon: '🌑', type: 'Rocky', dist: 'Closest', year: '88 Earth days', fact: 'Closest to the Sun. Days are very hot!' },
      { name: 'Venus', icon: '🟡', type: 'Rocky', dist: 'Near', year: '225 Earth days', fact: 'A cloudy, very hot neighbor.' },
      { name: 'Earth', icon: '🌍', type: 'Our home!', dist: 'Just right', year: '365 days', fact: 'Air, water, and living things!' },
      { name: 'Mars', icon: '🔴', type: 'Rocky', dist: 'Farther', year: '687 Earth days', fact: 'The red planet robots visit.' },
      { name: 'Jupiter', icon: '🪐', type: 'Giant', dist: 'Far', year: '12 Earth years', fact: 'The biggest planet!' },
      { name: 'Saturn', icon: '🪐', type: 'Giant', dist: 'Far', year: '29 Earth years', fact: 'Famous for beautiful rings.' },
      { name: 'Uranus', icon: '⚪', type: 'Icy giant', dist: 'Very far', year: '84 Earth years', fact: 'A pale icy world.' },
      { name: 'Neptune', icon: '🔵', type: 'Icy giant', dist: 'Farthest', year: '165 Earth years', fact: 'A windy blue giant.' }
    ],
    explorerHint: 'Tap a planet to peek at a fun fact!',
    quizCta: 'Take the Space Quiz!',
    badge: 'Cosmic Astronaut Badge',
    badgeBlurb: 'You know the Sun is in the middle, Earth spins for day and night, and a year is one trip around the Sun!',
    quiz: [
      { q: 'What sits in the middle of our solar system?', options: ['The Moon only', 'The Sun', 'A pizza', 'A cloud'], correct: 1, why: 'The Sun is the star in the middle.' },
      { q: 'What makes day and night on Earth?', options: ['Earth spinning', 'The Sun turning off', 'Fish swimming', 'Closing your eyes'], correct: 0, why: 'The side facing the Sun has day.' },
      { q: 'What is a year?', options: ['Earth going once around the Sun', 'Eating lunch', 'A rainbow', 'Saturn’s rings falling off'], correct: 0, why: 'One full trip around the Sun is a year.' }
    ]
  },
  ages_8_10: {
    banner: 'Space & Earth → Space & Solar System',
    tabs: ['1. The 8 Planets', '2. Day, Night & Orbits', '3. Orbit Explorer', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Cosmic Neighborhood',
    part1Title: 'Meet the 8 Planets of Our Solar System!',
    next1: 'Part 2: Day, Night & Orbits!',
    lessonTextPart1: [
      'Welcome to the Cosmic Neighborhood! In the center of our solar system sits our Sun—a blazing star that contains 99.8% of all the mass in the entire solar system! Its powerful gravity holds all eight planets in orbit.',
      'The 4 Rocky Inner Planets (closest to the Sun) are Mercury, Venus, Earth, and Mars. They have solid, rocky surfaces made of metals and minerals.',
      'Beyond Mars lies the Asteroid Belt—a ring of millions of rocky boulders orbiting the Sun.',
      'The 4 Outer Giants (beyond the asteroid belt) are Jupiter and Saturn (mighty Gas Giants made of hydrogen and helium), and Uranus and Neptune (freezing Ice Giants made of water, ammonia, and methane ice)!'
    ],
    part2Badge: 'Part 2 of 3: Orbital Mechanics',
    part2Title: 'Why Do We Have Day, Night, and 4 Seasons?',
    next2: 'Part 3: Planet Orbit Explorer!',
    lessonTextPart2: [
      'Why do we have Day and Night? Earth spins on its imaginary tilted axis like a spinning top once every 24 hours (1 Day). The side facing the Sun has daylight, while the side facing away experiences night!',
      'Why do we have a Year? At the same time, Earth hurtles through space, completing one giant circle (orbit) around the Sun every 365.25 days (1 Year).',
      'Why do we have 4 Seasons? Earth does not stand straight up—its axis is permanently tilted at 23.5 degrees! As Earth orbits the Sun, the hemisphere tilted toward the Sun gets direct sunlight (Summer), while the hemisphere tilted away gets indirect sunlight (Winter)!'
    ],
    orbitCards: [
      { emoji: '🔄 🌍', title: "Earth's Daily Rotation (24 Hours)", text: 'Earth rotates on its axis once every 24 hours (1 Day). This spin creates daylight when facing the Sun and nighttime when facing deep space.', wrap: 'bg-indigo-50 border-indigo-200' },
      { emoji: '☀️ 🔄', title: "Earth's Yearly Revolution (365.25 Days)", text: 'Earth travels in its orbital path around the Sun. Together with our 23.5° axial tilt, this revolution gives us Spring, Summer, Autumn, and Winter!', wrap: 'bg-amber-50 border-amber-200' }
    ],
    planets: [
      { name: 'Mercury', icon: '🌑', type: 'Rocky Inner', dist: '58M km', year: '88 Earth days', fact: 'Closest to the Sun, with extreme hot days and freezing nights!' },
      { name: 'Venus', icon: '🟡', type: 'Rocky Inner', dist: '108M km', year: '225 Earth days', fact: 'Hottest planet in the solar system due to a thick runaway greenhouse atmosphere!' },
      { name: 'Earth', icon: '🌍', type: 'Rocky Inner (Our Home!)', dist: '150M km', year: '365 days', fact: 'The only known planet in the universe with liquid oceans, oxygen, and life!' },
      { name: 'Mars', icon: '🔴', type: 'Rocky Inner', dist: '228M km', year: '687 Earth days', fact: 'The dusty Red Planet where robot rovers explore dry ancient riverbeds!' },
      { name: 'Jupiter', icon: '🪐', type: 'Gas Giant', dist: '778M km', year: '12 Earth years', fact: 'The largest planet! The famous Great Red Spot is a spinning hurricane bigger than Earth!' },
      { name: 'Saturn', icon: '🪐', type: 'Gas Giant', dist: '1.4B km', year: '29 Earth years', fact: 'Adorned with dazzling rings made of billions of shimmering ice and rock chunks!' },
      { name: 'Uranus', icon: '⚪', type: 'Ice Giant', dist: '2.9B km', year: '84 Earth years', fact: 'An icy blue-green giant that rotates on its side like a rolling bowling ball!' },
      { name: 'Neptune', icon: '🔵', type: 'Ice Giant', dist: '4.5B km', year: '165 Earth years', fact: 'The farthest planet from the Sun, with supersonic winds reaching 1,200 mph!' }
    ],
    explorerHint: 'Select any planet to inspect its distance, orbital year, and secret cosmic facts!',
    quizCta: 'Take the Cosmic Quiz!',
    badge: 'Cosmic Astronaut Badge',
    badgeBlurb: 'You can explain rotation, revolution, seasons, and the inner vs outer planets!',
    quiz: [
      { q: 'What causes day and night on Earth?', options: ['Clouds covering the sky', 'Earth spinning on its own axis every 24 hours', 'The Sun traveling around the Earth', 'The Moon turning on and off'], correct: 1, why: 'As Earth rotates on its axis once every 24 hours, the half facing the Sun experiences day!' },
      { q: 'How long does it take for Earth to complete one full revolution (orbit) around the Sun?', options: ['24 hours (1 Day)', '30 days (1 Month)', '365.25 days (1 Year)', '10 years'], correct: 2, why: 'Earth completes one full journey in 365.25 days (one year)!' },
      { q: 'Which group of planets are large gas and ice giants located beyond the asteroid belt?', options: ['Mercury, Venus, Earth, Mars', 'Jupiter, Saturn, Uranus, Neptune', 'The Moon and Asteroids', 'The Sun and Comets'], correct: 1, why: 'Jupiter and Saturn are Gas Giants, while Uranus and Neptune are Ice Giants beyond the asteroid belt!' }
    ]
  },
  ages_11_13: {
    banner: 'Astrophysics → Orbits and Seasons',
    tabs: ['1. Architecture', '2. Rotation vs Revolution', '3. Orbit Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Gravitational System',
    part1Title: 'Mass, Gravity, and Planetary Classes',
    next1: 'Part 2: Rotation, Revolution, Tilt',
    lessonTextPart1: [
      'The Sun holds about 99.8% of the solar system’s mass. That mass creates a gravitational field that keeps planets in orbit rather than flying off in a straight line.',
      'Inner planets (Mercury through Mars) are terrestrial: rocky, denser, closer in. Beyond the asteroid belt, Jupiter and Saturn are gas giants; Uranus and Neptune are ice giants with volatile ices.',
      'Orbital period increases with distance: farther planets take longer to complete one revolution because their paths are longer and orbital speed is lower.'
    ],
    part2Badge: 'Part 2 of 3: Two Motions, One Climate Pattern',
    part2Title: 'Rotation, Revolution, and Axial Tilt',
    next2: 'Part 3: Compare Orbital Periods',
    lessonTextPart2: [
      'Rotation is the spin about Earth’s axis (~24 hours). It causes the day/night cycle because only the sunlit hemisphere receives direct sunlight.',
      'Revolution is the orbit around the Sun (~365.25 days), which defines a year.',
      'Seasons are not caused by Earth getting much closer to the Sun in summer. They are caused by a 23.5° axial tilt: the hemisphere tilted toward the Sun receives more direct rays and longer days (summer); the opposite hemisphere receives less direct rays (winter).'
    ],
    orbitCards: [
      { emoji: '🔄 🌍', title: 'Rotation → photoperiod of a day', text: 'Spinning into and out of the Sun’s illumination creates day and night. It does not, by itself, create seasons.', wrap: 'bg-indigo-50 border-indigo-200' },
      { emoji: '☀️ 🔄', title: 'Revolution + 23.5° tilt → seasons', text: 'Orbit changes which hemisphere is tilted toward the Sun. Direct vs indirect sunlight is the seasonal mechanism.', wrap: 'bg-amber-50 border-amber-200' }
    ],
    planets: [
      { name: 'Mercury', icon: '🌑', type: 'Terrestrial', dist: '58M km', year: '88 Earth days', fact: 'Shortest year: closest orbit, highest orbital speed.' },
      { name: 'Venus', icon: '🟡', type: 'Terrestrial', dist: '108M km', year: '225 Earth days', fact: 'Thick CO₂ atmosphere drives a runaway greenhouse—hottest surface.' },
      { name: 'Earth', icon: '🌍', type: 'Terrestrial', dist: '150M km', year: '365.25 days', fact: 'Liquid water + oxygen atmosphere + 23.5° tilt → habitable seasons.' },
      { name: 'Mars', icon: '🔴', type: 'Terrestrial', dist: '228M km', year: '687 Earth days', fact: 'Thinner air and rust-colored dust; evidence of ancient surface water.' },
      { name: 'Jupiter', icon: '🪐', type: 'Gas giant', dist: '778M km', year: '12 Earth years', fact: 'Hydrogen–helium giant; Great Red Spot is a persistent storm larger than Earth.' },
      { name: 'Saturn', icon: '🪐', type: 'Gas giant', dist: '1.4B km', year: '29 Earth years', fact: 'Low density; rings are orbiting ice-rock particles, not a solid disk.' },
      { name: 'Uranus', icon: '⚪', type: 'Ice giant', dist: '2.9B km', year: '84 Earth years', fact: 'Extreme axial tilt: it essentially rolls along its orbit.' },
      { name: 'Neptune', icon: '🔵', type: 'Ice giant', dist: '4.5B km', year: '165 Earth years', fact: 'Farthest planet; long orbital period matches its huge path.' }
    ],
    explorerHint: 'Compare orbital years: farther from the Sun generally means a longer revolution.',
    quizCta: 'Take the Orbital Mechanics Quiz!',
    badge: 'Cosmic Astronaut Badge',
    badgeBlurb: 'You can separate rotation from revolution and explain seasons with axial tilt, not distance myths.',
    quiz: [
      { q: 'What primarily keeps planets in orbit around the Sun?', options: ['The Sun’s gravity due to its huge mass', 'A giant invisible string from Pluto', 'Earth’s oceans', 'Saturn’s rings'], correct: 0, why: 'Solar mass dominates the gravitational field of the system.' },
      { q: 'Why does Earth have seasons?', options: ['Because Earth is much closer to the Sun in July everywhere on Earth', 'Because the axis is tilted 23.5°, changing how directly sunlight hits each hemisphere', 'Because clouds turn off the Sun', 'Because the Moon blocks heat for six months'], correct: 1, why: 'Tilt plus revolution change solar angle and day length by hemisphere.' },
      { q: 'Why does Neptune take much longer than Mercury to complete one revolution?', options: ['Its orbital path is far longer and it orbits more slowly', 'It is made of cheese', 'It does not orbit', 'The asteroid belt pushes it'], correct: 0, why: 'Distance increases path length and typically decreases orbital speed.' }
    ]
  }
};

export const forcesByAge = {
  ages_5_7: {
    banner: 'Pushes & Pulls → Motion',
    tabs: ['1. Pushes & Pulls', '2. Fast and Slow', '3. Coaster Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Moving Things',
    part1Title: 'Pushes, Pulls, Gravity, and Rubbing',
    next1: 'Part 2: Waiting Energy and Moving Energy',
    lessonTextPart1: [
      'A force is a push or a pull. You push a swing. You pull a wagon.',
      'Gravity is Earth’s pull. It makes a dropped ball fall down, not up.',
      'Friction is rubbing when two things slide. Ice has little friction so you slide. A rough mat has lots of friction so you slow down.'
    ],
    cardsPart1: [
      card('🚪 ⚽', '1. A Force', 'A push or a pull that can start, stop, or turn something.', 'bg-orange-50 border-orange-200'),
      card('🌍 ⬇️', '2. Gravity', 'The pull that makes things fall down.', 'bg-sky-50 border-sky-200'),
      card('⛸️ 🛞', '3. Friction', 'Rubbing that slows sliding things.', 'bg-rose-50 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: Energy',
    part2Title: 'Energy Waiting at the Top vs Energy of Moving',
    next2: 'Part 3: Coaster Lab!',
    lessonTextPart2: [
      'A coaster car at the top of a tall hill has energy waiting. Scientists call waiting energy potential energy.',
      'When the car zooms down, that waiting energy turns into moving energy. Scientists call moving energy kinetic energy.',
      'A taller hill stores more waiting energy. Rough tracks add friction and steal moving energy as heat, so the car may not finish the loop.'
    ],
    energyCards: [
      { emoji: '🏔️ 🔋', title: 'Potential Energy (Waiting)', text: 'Stored at the top of the hill, ready to go.', wrap: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300' },
      { emoji: '🎢 ⚡', title: 'Kinetic Energy (Moving)', text: 'The energy of zooming down the track.', wrap: 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300' }
    ],
    labSuccess: 'Whee! The tall hill and smooth track let the car finish the loop!',
    labLowHill: 'Oh no! The small hill did not give enough waiting energy.',
    labFriction: 'Too much rubbing! The rough track slowed the car.',
    quizCta: 'Take the Forces Quiz!',
    badge: 'Physics Coaster Engineer Badge',
    badgeBlurb: 'You know pushes, gravity, friction, and why a tall smooth hill helps a coaster!',
    quiz: [
      { q: 'What is a force?', options: ['A push or a pull', 'A bedtime story', 'Only a color', 'A cloud'], correct: 0, why: 'A force is a push or a pull.' },
      { q: 'What does gravity do?', options: ['Makes things fall down toward Earth', 'Turns water into juice', 'Makes ice creamy', 'Stops the Sun'], correct: 0, why: 'Gravity pulls things downward.' },
      { q: 'What does friction do on a rough track?', options: ['It slows the car by rubbing', 'It makes the car invisible', 'It turns the car into a bird', 'It removes gravity'], correct: 0, why: 'Friction is rubbing that slows moving things.' }
    ]
  },
  ages_8_10: {
    banner: 'Forces, Energy & Motion → Rollercoaster Physics',
    tabs: ['1. Forces & Friction', '2. Potential & Kinetic', '3. Coaster Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Physics Basics',
    part1Title: 'Forces, Gravity, and Friction Explained',
    next1: 'Part 2: Potential vs. Kinetic Energy!',
    lessonTextPart1: [
      'What is a Force? A force is simply a push or a pull! Every time you kick a soccer ball, open a door, or pull a wagon, you are applying a force. Forces can make stationary objects move, speed up, slow down, stop, or change direction.',
      "The Invisible Pull of Gravity: Why does a dropped pencil always fall to the floor instead of floating to the ceiling? Gravity is the invisible pulling force from Earth that pulls all objects downward toward the center of the planet!",
      'The Slowing Power of Friction: Friction is the rubbing resistance force created when two surfaces touch and slide past each other. Smooth ice has very low friction (so you glide easily), while rough sandpaper or gravel has high friction (which slows you down and produces heat)!'
    ],
    cardsPart1: [
      card('🚪 ⚽', '1. A Force', "A push or a pull that changes how an object moves.", 'bg-orange-50 border-orange-200'),
      card('🌍 ⬇️', '2. Gravity', "The downward pulling force toward Earth's center.", 'bg-sky-50 border-sky-200'),
      card('⛸️ 🛞', '3. Friction', 'The rubbing resistance that slows sliding objects down.', 'bg-rose-50 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: Energy Transformations',
    part2Title: 'Potential Energy vs. Kinetic Energy',
    next2: 'Part 3: Coaster Lab!',
    lessonTextPart2: [
      'What is Potential Energy? Potential energy is energy that is stored and waiting to be released. Think of a stretched rubber band or a heavy rollercoaster car sitting at the very peak of a steep hill. Because it is up high against gravity, it stores gravitational potential energy!',
      'What is Kinetic Energy? Kinetic energy is the energy of motion! As soon as the coaster car plunges over the edge, gravity pulls it downward, converting all that stored potential energy into zooming, roaring kinetic energy!',
      'The Energy Trade-Off: As the coaster climbs up a hill, kinetic energy transforms back into potential energy. As it swoops down, potential energy turns back into kinetic energy!'
    ],
    energyCards: [
      { emoji: '🏔️ 🔋', title: 'Potential Energy (Stored)', text: 'Energy stored due to position. Higher hill = larger stored potential energy!', wrap: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300' },
      { emoji: '🎢 ⚡', title: 'Kinetic Energy (Motion)', text: 'Energy of speed and motion! As gravity pulls the coaster downward, potential energy becomes kinetic energy!', wrap: 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300' }
    ],
    labSuccess: 'Success! High potential energy converted into enough kinetic energy to clear the giant loop-de-loop!',
    labLowHill: 'Stuck! The low hill did not store enough potential energy to reach the top of the loop!',
    labFriction: 'Slowed down! High friction from the rough track drained too much kinetic energy as heat!',
    quizCta: 'Take the Physics Quiz!',
    badge: 'Physics Coaster Engineer Badge',
    badgeBlurb: 'You can explain forces, friction, and the potential–kinetic energy trade-off!',
    quiz: [
      { q: 'In physical science, what is a "force"?', options: ['A magical superpower', "A push or a pull that can change an object's motion", 'Only electricity', 'The sound of a loud engine'], correct: 1, why: 'A force is a push or a pull that can make objects move, stop, speed up, or change direction!' },
      { q: 'What kind of energy is stored in a rollercoaster car perched at the very top of a steep hill before it drops?', options: ['Potential Energy (Stored Energy)', 'Kinetic Energy (Motion Energy)', 'Nuclear Energy', 'Solar Energy'], correct: 0, why: 'Potential energy is stored energy waiting to be released as the cart drops!' },
      { q: 'Which rubbing force occurs when two touching surfaces slide against each other, slowing down moving objects?', options: ['Magnetism', 'Gravity', 'Friction', 'Evaporation'], correct: 2, why: 'Friction is the resistance force between touching surfaces that slows moving objects down!' }
    ]
  },
  ages_11_13: {
    banner: 'Classical Mechanics → Energy and Forces',
    tabs: ['1. Forces', '2. Energy Conversion', '3. Design Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Changing Motion',
    part1Title: 'Force, Gravity, and Friction as Causes',
    next1: 'Part 2: GPE and KE',
    lessonTextPart1: [
      'A force is an interaction that can change an object’s velocity: start, stop, speed up, slow down, or change direction. Push and pull are everyday names for that interaction.',
      'Gravity is the attractive force toward Earth’s center. It does work on a falling coaster, transferring energy into motion.',
      'Friction opposes sliding. It converts useful mechanical energy into thermal energy (heat). High-friction track therefore steals kinetic energy that the loop needs.'
    ],
    cardsPart1: [
      card('🚪 ⚽', 'Force', 'A cause of acceleration (a change in velocity), not a substance inside the object.', 'bg-orange-50 border-orange-200'),
      card('🌍 ⬇️', 'Gravity', 'Does work as the car loses height, feeding kinetic energy.', 'bg-sky-50 border-sky-200'),
      card('⛸️ 🛞', 'Friction', 'A non-conservative force: mechanical energy is dissipated as heat.', 'bg-rose-50 border-rose-200')
    ],
    part2Badge: 'Part 2 of 3: Mechanism of the Trade-Off',
    part2Title: 'Gravitational Potential Energy ⇄ Kinetic Energy',
    next2: 'Part 3: Engineer the Loop',
    lessonTextPart2: [
      'Gravitational potential energy (GPE) is stored because of position in a gravitational field. Greater height means greater GPE for the same mass.',
      'Kinetic energy (KE) depends on motion. On the drop, gravity converts GPE into KE. On the next climb, KE converts back into GPE.',
      'A loop needs enough KE at the bottom to reach the top against gravity. If the first hill is too low, GPE was never large enough. If friction is high, KE is drained as heat before the loop.'
    ],
    energyCards: [
      { emoji: '🏔️ 🔋', title: 'GPE ∝ height', text: 'Raising the car stores energy. That is why the first hill must be high.', wrap: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300' },
      { emoji: '🎢 ⚡', title: 'KE of motion', text: 'Speed at the bottom is the converted GPE, minus whatever friction already stole.', wrap: 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-300' }
    ],
    labSuccess: 'Loop cleared: sufficient GPE converted to KE, and friction losses stayed small.',
    labLowHill: 'Failure mode: insufficient GPE (low hill) so KE never reaches the loop top.',
    labFriction: 'Failure mode: friction dissipated KE as heat before the car finished the loop.',
    quizCta: 'Take the Mechanics Quiz!',
    badge: 'Physics Coaster Engineer Badge',
    badgeBlurb: 'You can reason about GPE–KE conversion and friction as energy dissipation.',
    quiz: [
      { q: 'Why does a higher first hill help a coaster complete a loop?', options: ['It stores more gravitational potential energy that can become kinetic energy', 'It paints the rails blue', 'It removes gravity', 'It creates new mass'], correct: 0, why: 'Height stores GPE; the drop converts it to the KE the loop requires.' },
      { q: 'How does high friction change the energy story?', options: ['It converts mechanical energy into heat, leaving less KE for the loop', 'It increases GPE magically', 'It turns the car into a gas', 'It stops Earth’s gravity'], correct: 0, why: 'Friction is dissipative: useful motion energy becomes thermal energy.' },
      { q: 'A force is best described as:', options: ['An interaction that can change velocity', 'A type of food', 'Only a sound', 'A planet'], correct: 0, why: 'Forces cause changes in motion, not a fuel stored in the object.' }
    ]
  }
};

export const fractionsByAge = {
  ages_5_7: {
    banner: 'Halves & Quarters → Sharing',
    tabs: ['1. Fair Shares', '2. Bigger Pieces', '3. Pizza Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Sharing',
    part1Title: 'A Fraction Is a Fair Share',
    next1: 'Part 2: Which Piece Is Bigger?',
    lessonTextPart1: [
      'A fraction is a fair piece of a whole. If two friends share one cookie the same way, each gets one half.',
      'The bottom number tells how many equal pieces the whole was cut into. For one half, the bottom number is 2.',
      'The top number tells how many of those pieces you have. For one half, the top number is 1. We write 1/2.'
    ],
    anatomyCaption: 'One-half (1 out of 2 equal pieces)',
    topLabel: 'Top number (1)',
    topText: 'How many pieces you have.',
    bottomLabel: 'Bottom number (2)',
    bottomText: 'How many equal pieces the whole was cut into.',
    anatomyNum: '1',
    anatomyDen: '2',
    part2Badge: 'Part 2 of 3: Size',
    part2Title: 'Halves Are Bigger Than Quarters',
    next2: 'Part 3: Pizza Lab!',
    lessonTextPart2: [
      'If you cut a pizza into 2 equal pieces, each piece is a half. That is a big piece!',
      'If you cut the same pizza into 4 equal pieces, each piece is a quarter. A quarter is smaller than a half.',
      'Two quarters together make one half. Four quarters make a whole pizza.'
    ],
    compareCards: [
      { emoji: '🍕', title: '1/2 One half', note: '2 equal pieces', text: 'A big share!' },
      { emoji: '🍕', title: '1/4 One quarter', note: '4 equal pieces', text: 'A smaller share. Two quarters = one half.' },
      { emoji: '🍕', title: '4/4 Whole', note: 'All the pieces', text: 'If you have every piece, you have the whole pizza.' }
    ],
    sliceOptions: [2, 4],
    defaultSlices: 2,
    defaultSelected: [0],
    targets: {
      2: { num: 1, den: 2, label: '1/2' },
      4: { num: 1, den: 4, label: '1/4' }
    },
    labPrompt: 'Cut the pizza into 2 or 4 equal pieces. Serve the order shown!',
    quizCta: 'Take the Sharing Quiz!',
    badge: 'Fraction Master Chef Badge',
    badgeBlurb: 'You can share halves and quarters fairly!',
    quiz: [
      { q: 'If a pizza is cut into 2 equal pieces, what is each piece called?', options: ['A half (1/2)', 'A whole elephant', 'A thousand', 'Zero'], correct: 0, why: 'Two equal pieces are halves.' },
      { q: 'Which piece is bigger: one half or one quarter?', options: ['One half (1/2)', 'One quarter (1/4)', 'They are always the same', 'A quarter because 4 is bigger'], correct: 0, why: 'Fewer cuts mean bigger pieces. A half is bigger than a quarter.' },
      { q: 'What do 4/4 pieces of a pizza make?', options: ['The whole pizza', 'Nothing', 'Only a crumb', 'Two suns'], correct: 0, why: 'All the equal pieces together make the whole.' }
    ]
  },
  ages_8_10: {
    banner: 'Maths & Logic → Fractions in the Real World',
    tabs: ['1. What is a Fraction?', '2. Real World Slicing', '3. Pizza Chef Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Math Fundamentals',
    part1Title: 'What is a Fraction? (Numerator & Denominator)',
    next1: 'Part 2: Real World Slicing!',
    lessonTextPart1: [
      'Welcome to the Pizza Kitchen! A fraction is simply a fair way to represent a part of an equal whole. Whenever you share a treat equally with friends, you are using fractions!',
      'Look at any fraction: it has two numbers separated by a fraction bar line. The bottom number is called the Denominator. The Denominator tells you the total number of equal slices the entire whole pizza was cut into!',
      'The top number is called the Numerator. The Numerator counts how many of those equal slices you have, took, or ate! For example, in 3/4, 4 is the total slices in the whole, and 3 is the slices you get!'
    ],
    anatomyCaption: 'Three-Fourths (3 out of 4 equal slices)',
    topLabel: 'Top Number: The Numerator (3)',
    topText: 'Counts how many equal parts you have, ate, or selected!',
    bottomLabel: 'Bottom Number: The Denominator (4)',
    bottomText: 'Tells you the total number of equal parts the whole was divided into!',
    anatomyNum: '3',
    anatomyDen: '4',
    part2Badge: 'Part 2 of 3: Real World Fractions',
    part2Title: 'Why 1/2 is Bigger Than 1/8 (Fraction Size Secret!)',
    next2: 'Part 3: Pizza Chef Lab!',
    lessonTextPart2: [
      'Here is a big fraction secret: You might think that 8 is bigger than 2, so 1/8 must be bigger than 1/2, right? Nope! In fractions, it is the opposite!',
      'Imagine a fresh, warm pizza. If you slice it between only 2 people (1/2 each), each person gets a huge half-pizza slice!',
      'If you slice that exact same pizza into 8 slices (1/8 each) to share with 8 friends, each slice is much smaller! The bigger the denominator gets, the smaller each individual slice becomes!',
      'Equivalent Fractions: Notice that 2 out of 4 slices (2/4) or 4 out of 8 slices (4/8) covers the exact same amount of pizza as 1 out of 2 slices (1/2)!'
    ],
    compareCards: [
      { emoji: '🍕', title: '1/2 (One Half)', note: 'Cut into 2 large slices', text: 'Each piece is 50% of the entire pizza. Huge, hearty slice!' },
      { emoji: '🍕', title: '1/4 (One Quarter)', note: 'Cut into 4 equal slices', text: 'Medium slices! Two quarters (2/4) equal exactly one half (1/2)!' },
      { emoji: '🍕', title: '1/8 (One Eighth)', note: 'Cut into 8 thin slices', text: 'Tiny slices. Four eighths (4/8) also equal one half.' }
    ],
    sliceOptions: [2, 4, 8],
    defaultSlices: 4,
    defaultSelected: [0, 1],
    targets: {
      2: { num: 1, den: 2, label: '1/2' },
      4: { num: 3, den: 4, label: '3/4' },
      8: { num: 5, den: 8, label: '5/8' }
    },
    labPrompt: 'Match the customer order by choosing cuts and selecting slices.',
    quizCta: 'Take the Fraction Quiz!',
    badge: 'Fraction Master Chef Badge',
    badgeBlurb: 'You can read numerators, compare unit fractions, and spot equivalents!',
    quiz: [
      { q: 'In the fraction 3/4, what does the top number (the Numerator) tell us?', options: ['The total number of slices in the whole pizza', 'How many slices we have, took, or selected', 'How hot the oven is in degrees', 'The price of the pizza in dollars'], correct: 1, why: 'The Numerator counts equal parts you have; the Denominator is the total equal parts!' },
      { q: 'If you cut one whole pizza into 2 equal slices, and another pizza into 8 equal slices, which individual slice is BIGGER?', options: ['The 1/8 slice', 'The 1/2 slice', 'They are exactly the same size', 'The 1/8 slice because 8 is bigger than 2'], correct: 1, why: 'The more pieces a whole is divided into (larger denominator), the smaller each slice becomes!' },
      { q: 'If Chef Luigi bakes a pizza cut into 8 equal slices, and you eat 4 slices (4/8), what simplified fraction of the pizza did you eat?', options: ['1/4 of the pizza', '1/2 of the pizza (one half!)', 'The whole pizza', '3/8 of the pizza'], correct: 1, why: '4/8 is an equivalent fraction equal to exactly one half (1/2)!' },
      { q: 'Which of the following fractions represents one whole pizza?', options: ['4/4', '1/4', '3/4', '0/4'], correct: 0, why: 'Whenever the numerator equals the denominator, it represents the complete whole (1)!' }
    ]
  },
  ages_11_13: {
    banner: 'Fractions, Decimals & Percentages',
    tabs: ['1. Structure', '2. Equivalence', '3. Chef Lab', '4. Quiz & Badge'],
    part1Badge: 'Part 1 of 3: Rational Parts',
    part1Title: 'Numerator, Denominator, and the Whole',
    next1: 'Part 2: Equivalence and Percent',
    lessonTextPart1: [
      'A fraction a/b (b ≠ 0) names a rational number: a parts of a whole partitioned into b equal parts. The numerator a counts selected parts; the denominator b is the partition size.',
      'If a = b, the fraction equals 1 (the whole). If a > b, you have an improper fraction, which can be written as a mixed number.',
      'The same quantity has many names: 3/4 = 0.75 = 75%. Converting is a change of representation, not a change of amount.'
    ],
    anatomyCaption: '3/4 = 0.75 = 75% of one whole',
    topLabel: 'Numerator (3)',
    topText: 'Count of equal parts taken. In 3/4 you have three of the four partitions.',
    bottomLabel: 'Denominator (4)',
    bottomText: 'Size of the equal partition. Larger denominator → smaller unit fraction 1/b.',
    anatomyNum: '3',
    anatomyDen: '4',
    part2Badge: 'Part 2 of 3: Why Size Flips',
    part2Title: 'Unit Fractions, Equivalence, and Percent',
    next2: 'Part 3: Proportional Pizza Lab',
    lessonTextPart2: [
      'For unit fractions 1/n, increasing n makes each piece smaller because the same whole is partitioned more finely. That is why 1/2 > 1/8 even though 8 > 2.',
      'Equivalent fractions represent the same portion: multiply or divide numerator and denominator by the same non-zero number (2/4 = 1/2; 4/8 = 1/2).',
      'Percent means per hundred. 1/2 = 50/100 = 50%; 3/4 = 75%. You can reason in slices, decimals, or percentages—the quantity is identical.'
    ],
    compareCards: [
      { emoji: '🍕', title: '1/2 = 50%', note: 'Denominator 2', text: 'Largest unit share of these three.' },
      { emoji: '🍕', title: '1/4 = 25%', note: 'Denominator 4', text: 'Two of these equal 50% (equivalent to 1/2).' },
      { emoji: '🍕', title: '1/8 = 12.5%', note: 'Denominator 8', text: 'Four of these equal 50%. Same amount, finer partition.' }
    ],
    sliceOptions: [2, 4, 8],
    defaultSlices: 8,
    defaultSelected: [0, 1, 2, 3],
    targets: {
      2: { num: 1, den: 2, label: '1/2 = 50%' },
      4: { num: 3, den: 4, label: '3/4 = 75%' },
      8: { num: 6, den: 8, label: '6/8 = 3/4 = 75%' }
    },
    labPrompt: 'Hit the target amount. Think in fractions and in percent.',
    quizCta: 'Take the Rational-Number Quiz!',
    badge: 'Fraction Master Chef Badge',
    badgeBlurb: 'You can convert among fractions, equivalents, decimals, and percents.',
    quiz: [
      { q: 'Why is 1/2 larger than 1/8?', options: ['Because a whole cut into 2 equal parts yields larger pieces than one cut into 8', 'Because 2 is smaller so it loses', 'Because 8 is a lucky number', 'Because decimals are illegal'], correct: 0, why: 'Unit fraction 1/n shrinks as n grows.' },
      { q: '3/4 as a percent is:', options: ['34%', '75%', '3%', '400%'], correct: 1, why: '3/4 = 0.75 = 75 per 100.' },
      { q: 'Which pair is equivalent?', options: ['4/8 and 1/2', '1/8 and 1/2', '3/4 and 1/8', '0/4 and 1'], correct: 0, why: 'Divide 4 and 8 by 4 to get 1/2.' },
      { q: 'If numerator equals denominator (8/8), the value is:', options: ['1 (the whole)', '0', '8%', 'Infinity'], correct: 0, why: 'a/a = 1 for a ≠ 0.' }
    ]
  }
};

