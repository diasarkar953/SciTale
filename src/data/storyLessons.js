// Story text for the existing lesson panels. Each age band gets a different
// story situation and reasoning challenge while keeping the same activity.
const stories = {
  food_web: {
    ages_5_7: [
      ['At Sunny Meadow, Milo the rabbit is ready for breakfast, but the grass is covered by a blanket of fallen leaves. Milo follows a trail to a clover patch. A caterpillar is nibbling there, and a little bird is watching the caterpillar.',
       'Milo eats clover for energy. The caterpillar eats plants too, and the bird can eat the caterpillar. Each living thing needs food from another part of the meadow. The arrows in a food chain point from the food to the animal that gets energy.'],
      ['A storm knocks down the old tree where the bird nests. The bird leaves, and soon the caterpillars become more common. The meadow has many connected food chains, so a change to one animal can affect others.',
       'Milo and the bird help the meadow in different ways. When you build a chain, start with a plant, then add an animal that eats it, and another animal that may eat that one.']
    ],
    ages_8_10: [
      ['At Willow Creek Reserve, young ranger Nia finds that fewer foxes are visiting the meadow. She follows tracks and sketches a chain: clover feeds rabbits, and rabbits can feed foxes. The arrows show where food energy travels.',
       'Nia notices that plants are producers: they make their own food using sunlight. Rabbits and caterpillars are consumers because they eat plants. A fox may eat a rabbit, linking the organisms into a food chain.'],
      ['Nia compares two ponds. In one, a drop in insect-eating fish lets insects increase, and the insects eat more pond plants. In the other, several predators share the food supply. A food web shows these overlapping connections and helps explain why changes can ripple through an ecosystem.',
       'Nia’s field journal asks what might happen if one species disappears. Use the food web to trace which organisms lose a food source and which may become more abundant.']
    ],
    ages_11_13: [
      ['At Lake Maren, a summer heat wave leaves the water cloudy and the fish count suddenly drops. Field researcher Imani is asked to find out what the change means for the whole ecosystem. She compares the food-web survey with last year’s records and finds that fewer fish may leave more insect larvae to feed on pond plants.',
       'Imani maps the energy pathways instead of blaming one species. Sunlight supports algae; insects eat algae; fish eat insects; birds feed on fish. The arrows reveal how a change at one level can spread through the web.'],
      ['Her team debates whether to restore fish immediately or first protect the shaded shoreline where algae is growing. Imani uses the food-web model to predict both outcomes, then recommends monitoring insects, plants, and fish together before choosing an intervention.',
       'In the cascade activity, remove a species and trace direct and indirect effects. For an older investigator, the challenge is to explain the evidence, consider uncertainty, and avoid treating one population as if it were the whole ecosystem.']
    ]
  },
  photosynthesis: {
    ages_5_7: [
      ['Milo the bean plant is growing in a sunny classroom window. One morning, its leaves droop. Jo checks the pot: the soil is dry. She gives Milo water and moves him into the sunshine.',
       'Leaves take in air, roots take in water, and sunlight helps a plant make its own food. That food gives Milo energy to grow. Plants also release oxygen into the air.'],
      ['Milo perks up, but Jo wonders what would happen in a dark cupboard. The plant would miss the light it needs to make food. In the plant lab, give the leaf sunlight, water, and carbon dioxide from the air, then watch how the plant responds.',
       'Milo’s new leaves remind Jo that plants are living food-makers. Try changing one ingredient at a time and notice which combination helps the plant grow.']
    ],
    ages_8_10: [
      ['At the school greenhouse, Leena’s sunflower seedlings stop growing. She compares two trays: one has light but dry soil; the other has water but sits in a cupboard. Neither is thriving.',
       'Leena learns that photosynthesis uses light energy, water from the roots, and carbon dioxide from the air. The plant makes sugar for growth and releases oxygen through its leaves.'],
      ['She restores light and water, then opens the greenhouse vents so fresh air can reach the leaves. The seedlings begin to grow. Leena records the inputs and outputs instead of guessing from one clue.',
       'In the lab, test the ingredients for photosynthesis. The story’s seedlings grow when the plant can use light, water, and carbon dioxide to make sugar; oxygen is released.']
    ],
    ages_11_13: [
      ['Plant scientist Ravi investigates why seedlings in a sealed, dim growth chamber have stopped gaining biomass. He checks light levels, water delivery, and carbon dioxide, then compares the plants with a healthy control group.',
       'Ravi models photosynthesis: light energy powers reactions in chloroplasts that use water and carbon dioxide to build glucose, releasing oxygen. The plant stores chemical energy in the glucose and uses it to build new tissue.'],
      ['When Ravi restores light and airflow and corrects the water supply, the seedlings resume growth. He changes one variable at a time so he can identify which resource limits the process.',
       'Run the plant lab by supplying the needed inputs. The growth response reinforces how light, water, and carbon dioxide support sugar production and oxygen release.']
    ]
  },
  human_body: {
    ages_5_7: [
      ['At the playground, Aria hears a whistle and stops her scooter. Her ears noticed the sound, and her brain helped her understand it. Her brain sent a message to her muscles to squeeze the brakes.',
       'Your senses are helpers: eyes see, ears hear, the nose smells, the tongue tastes, and skin feels. Nerves carry messages between your body and brain.'],
      ['Aria reaches for a cold water bottle and feels its chilly sides. Her skin sends a message too. In the sense game, help Aria match each clue to the body part that notices it.',
       'When Aria responds to a clue, her brain helps her choose what to do. Your senses gather information, and your nervous system helps your body respond.']
    ],
    ages_8_10: [
      ['At the science fair, Dev’s team must find a hidden bell in a busy room. Dev listens for its ring, watches for a flashing clue, and follows a peppermint smell to the display table.',
       'Each clue begins with a sense organ. Receptors in the ears, eyes, nose, tongue, and skin detect information. Nerves carry messages to the brain, which helps interpret the clues and plan a response.'],
      ['A clue is too faint to spot until Dev moves closer. His brain combines new information and tells his legs where to go. The team finds the bell by matching each clue to the sense that detected it.',
       'Try the sensory challenge as Dev’s clue partner. Identify which sense organ detected each clue, then connect the message to the brain’s response.']
    ],
    ages_11_13: [
      ['During a robotics demonstration, Sam hears an unexpected alarm and steps away from the moving arm. The sound receptors in Sam’s ears detect vibrations; nerve signals travel to the brain, where the sound is interpreted and a response is planned.',
       'The nervous system links sensory receptors, nerves, the brain, and muscles. Different receptors respond to light, sound, chemicals, pressure, or temperature, allowing the brain to build a picture of what is happening.'],
      ['Sam’s teammate tests a warm object and quickly pulls back. Receptors signal the change, and a fast reflex pathway helps protect the body before a deliberate decision is complete.',
       'In the challenge, trace each clue to the sense organ that detects it. Then consider how the nervous system carries the information and helps coordinate a response.']
    ]
  },
  solar_system: {
    ages_5_7: [
      ['Astronaut Kiko is on a pretend trip through the space neighborhood. The Sun is the bright star at the center. Kiko visits rocky Mercury, Venus, Earth, and Mars, then spots the giant planets farther away.',
       'Kiko’s map shows eight planets traveling around the Sun. Earth also spins like a top: the side facing the Sun has day, and the side turned away has night.'],
      ['Kiko watches Earth travel around the Sun while it keeps spinning. One full spin makes a day, and one trip around the Sun makes a year. Earth’s tilt helps make the seasons change.',
       'Help Kiko place the planets and explore Earth’s spin and path. A planet’s orbit is its journey around the Sun.']
    ],
    ages_8_10: [
      ['Young navigator Imani receives a distress ping from a research probe near Neptune. She plots a route from the Sun past the four rocky inner planets, the asteroid belt, and the four distant giant planets.',
       'Imani’s crew uses a model to explain Earth’s changing sky. Earth rotates once about every 24 hours, so places turn into and out of sunlight. Earth revolves around the Sun once each year.'],
      ['The probe’s seasons report seems confusing until Imani checks Earth’s tilted axis. As Earth orbits, each hemisphere receives different angles and lengths of sunlight through the year.',
       'Use the orbit lab to trace planet paths and model day, night, and seasons. Earth’s rotation explains the daily cycle; its orbit and tilt explain the yearly pattern.']
    ],
    ages_11_13: [
      ['Mission analyst Noor must plan a probe route through the solar system. The navigation chart groups Mercury through Mars as rocky inner planets, places the asteroid belt beyond Mars, and marks Jupiter through Neptune as giant outer planets.',
       'The crew tests a globe lamp model: Earth’s rotation produces the day-night cycle, while its revolution defines a year. The axial tilt changes the angle and duration of sunlight in each hemisphere.'],
      ['Noor compares two positions in Earth’s orbit. The axis points in nearly the same direction, so a hemisphere tilted toward the Sun receives more direct sunlight and longer days; six months later, the opposite hemisphere does.',
       'Model the orbit and rotation in the lab. Keep the axis tilted as Earth revolves to see why seasons are caused by sunlight angle and day length, not simply distance from the Sun.']
    ]
  },
  forces_motion: {
    ages_5_7: [
      ['Tavi’s toy wagon is stuck at the top of a little hill. Tavi gives it a push, and Earth’s pull brings it rolling down. When it reaches the grass, the rough ground rubs against the wheels and slows it.',
       'A push or pull is a force. Gravity pulls things toward Earth, and friction happens when touching surfaces rub and slow motion.'],
      ['Tavi lifts the wagon to the top again. It has stored energy because it is high up. As it rolls downhill, that stored energy becomes energy of motion.',
       'Choose the hill and track in the coaster lab. A higher start gives more stored gravitational energy, while friction can take energy from the moving cart and slow it.']
    ],
    ages_8_10: [
      ['At the park, Mateo’s marble coaster stops just before the loop. He raises the starting ramp and releases the marble. Gravity pulls it downhill, and it speeds up; a rough patch makes it slow sooner.',
       'Mateo identifies the forces: his hand pushes, gravity pulls downward, and friction between the marble and track resists sliding. These forces can change an object’s speed or direction.'],
      ['At the top of the ramp the marble has gravitational potential energy. As it descends, that stored energy changes into kinetic energy of motion. Friction transfers some mechanical energy into heat, so less remains for the loop.',
       'Test different hill heights and track friction in the coaster lab. Use the results to predict how much motion energy the cart has at the bottom.']
    ],
    ages_11_13: [
      ['Engineer Priya is debugging a model coaster that stalls before its loop. She records the cart’s starting height, track material, and motion, then changes one condition at a time.',
       'A net force changes motion: gravity accelerates the cart downhill, while friction opposes sliding and dissipates mechanical energy as heat. A push or pull is a force, and its direction matters.'],
      ['Priya tracks energy at the top and bottom. Height gives the cart gravitational potential energy; as it descends, that energy becomes kinetic energy. Friction reduces the mechanical energy available for the loop.',
       'Use the coaster lab to compare starting height and friction. Explain the outcome by tracing energy transfer and the forces acting on the cart.']
    ]
  },
  fractions: {
    ages_5_7: [
      ['At the picnic, Lila has one round flatbread to share with a friend. She cuts it into two same-size pieces. Each person gets one of the two equal parts: one half.',
       'The kitchen team cuts another flatbread into four equal pieces. The bottom number tells how many equal pieces make the whole; the top number tells how many pieces we are counting.'],
      ['More friends arrive, so Lila cuts a flatbread into eight equal pieces. Each piece is smaller than a half. She notices that two of four pieces cover the same amount as one of two.',
       'In the chef lab, make equal slices and serve the requested amount. Fair fractions need equal-sized parts.']
    ],
    ages_8_10: [
      ['Chef Asha’s lunch cart gets three orders: one half of a pizza, three quarters, and four eighths. She marks each whole pizza before slicing so every share is fair.',
       'A fraction names equal parts of one whole. The denominator counts all equal parts; the numerator counts the selected parts. Asha sees that two quarters can match one half.'],
      ['Asha compares one slice from pizzas cut into two and eight equal pieces. The eighth is smaller because the same whole was divided into more parts. She uses the markings to show that four eighths cover the same area as one half.',
       'Use the pizza lab to slice a whole and fill an order. Compare the shaded amount, not just the size of the numbers.']
    ],
    ages_11_13: [
      ['Food truck owner Ren needs to resize a recipe for a festival. The original batch uses three quarters of a cup of sauce, but the small batch uses half as much. Ren sketches equal partitions to keep the ratios clear.',
       'Ren labels the numerator as the number of selected equal parts and the denominator as the total equal parts in one whole. Equivalent fractions name the same amount, such as one half and four eighths.'],
      ['A customer argues that one eighth must be larger than one half because eight is greater than two. Ren draws equal-sized wholes split into two and eight pieces to show why increasing the denominator makes each unit fraction smaller.',
       'In the chef lab, represent the requested fraction with equal slices. Use equivalent fractions and the size of each part to check the serving.']
    ]
  },
  maths: {
    basic_algebra: {
      ages_5_7: 'At the toy shop, a mystery box and four blocks balance six blocks on the other side of a seesaw. Find how many blocks are hiding in the box. The seesaw stays level only when both sides have the same total. Take four blocks from each side: the box must hold two. Now try the balance puzzle and solve the mystery.',
      ages_8_10: 'At the museum, detective Ivo finds a balanced scale: a sealed bag plus four weights equals ten weights. He removes four from both sides so the scale stays balanced, revealing six inside the bag. An equation works the same way: do the same operation to both sides. Use the balance puzzle to uncover the unknown.',
      ages_11_13: 'An engineer’s cargo scale reports that an unknown crate plus four kilograms equals ten kilograms. Analyst Mira subtracts four from both sides to preserve equality and isolate the unknown mass. The same inverse-operation strategy solves equations; multiplication can be undone with division. Use the balance puzzle, then test the reasoning on a new equation.'
    },
    geometry_shapes: {
      ages_5_7: 'Builder Bo must fix a crooked garden gate. He checks the corner where two boards meet: a square corner is a right angle. Then he walks around a five-sided flower bed and counts its sides. Help Bo set the angle and plan the border in the geometry workshop.',
      ages_8_10: 'Architect Suri is designing a tiny park. The gate needs a 90-degree corner, the triangular pond needs three sides, and the five-sided flower bed needs a measured perimeter. She uses angle turns and side lengths to check the plan. Join her design workshop and test the shapes.',
      ages_11_13: 'Surveyor Eli discovers that a park blueprint was drawn at the wrong angles. He checks the corner measures, classifies turns as acute, right, or obtuse, and recalculates the five-sided boundary. Use the geometry workshop to verify angle size, polygon properties, and perimeter.'
    },
    patterns_logic: {
      ages_5_7: 'At the lantern festival, Nori must choose the next color in a repeating trail: red, blue, red, blue. She spots the rule and places the next lantern. Then a number trail doubles each time. Help Nori find the pattern that opens the festival gate.',
      ages_8_10: 'Codebreaker Ana finds a sequence on the library door: 2, 4, 8, 16. She tests a rule—multiply by two—and predicts the next code. A second clue decreases by five each step. Follow the evidence and explain the rule before opening the puzzle.',
      ages_11_13: 'A research station’s access code follows a hidden sequence. Mathematician Dev compares successive terms, tests whether the rule is additive or multiplicative, and checks a logical deduction against its premises. Solve the pattern and justify why the conclusion follows.'
    },
    numbers_operations: {
      ages_5_7: 'At the animal shelter, bowls are set out in equal groups. There are seven bowls on each of eight mats. Caretaker Sal counts by groups instead of one bowl at a time. Then Sal sorts number cards into ones, tens, and hundreds to pack supplies. Join the counting mission.',
      ages_8_10: 'At the supply depot, organizer Mei packs seven kits for each of eight teams. Multiplication gives the total quickly. A crate label reads 4,729, and its hundreds digit tells how many hundreds are stored. Help Mei calculate and sort the shipment.',
      ages_11_13: 'The observatory is preparing supplies for eight teams, each needing seven identical sensor packs. Analyst Ravi uses multiplication to scale the inventory, then checks a 4,729-unit shipment by place value before subtracting damaged stock from 100. Solve the calculations to release the correct equipment.'
    }
  }
};

export function getStoryLessons(adventureId, ageGroupId = 'ages_8_10', topicId = null) {
  const ageId = ['ages_5_7', 'ages_8_10', 'ages_11_13'].includes(ageGroupId) ? ageGroupId : 'ages_8_10';
  if (adventureId === 'maths') return stories.maths[topicId]?.[ageId] || stories.maths.basic_algebra[ageId];
  return stories[adventureId]?.[ageId] || null;
}
