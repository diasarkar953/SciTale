const challenges = {
  water_cycle: {
    ages_5_7: {
      type: 'sequence', task: 'Put the water’s trip in order',
      prompt: 'Help Pip travel from the ocean back to the ground.',
      steps: ['The Sun warms ocean water.', 'Water rises as invisible vapor.', 'The vapor cools and makes clouds.', 'Water falls as rain.'],
      choices: ['Water falls as rain.', 'The vapor cools and makes clouds.', 'The Sun warms ocean water.', 'Water rises as invisible vapor.'],
      concept: 'the water cycle', demonstrated: 'You put warming, rising, cloud-making, and rain in the right order.', practice: 'Practice naming what happens when water cools in the sky.', hint: 'The Sun warms the ocean first.', nextAdventure: 'Photosynthesis',
    },
    ages_8_10: {
      type: 'scenario', task: 'Predict what happens next',
      prompt: 'Cloud droplets join together and grow too heavy to stay in the air. What happens next?',
      options: ['They fall to Earth as precipitation.', 'They turn into sunlight.', 'They sink into the ocean without falling.'], correctIndex: 0,
      concept: 'precipitation and cloud formation', demonstrated: 'You predicted that heavy cloud water falls back to Earth.', practice: 'Practice explaining how cooling helps clouds form before rain.', hint: 'Think about what gravity does to heavy drops.', nextAdventure: 'Photosynthesis',
    },
    ages_11_13: {
      type: 'scenario', task: 'Trace a mountain raindrop',
      prompt: 'After rain on a mountain, some water flows over the land into a stream. Which return path is this?',
      options: ['Runoff across the surface.', 'Condensation into a cloud.', 'Evaporation into vapor.'], correctIndex: 0,
      concept: 'water-cycle pathways', demonstrated: 'You identified surface runoff as one way water returns to rivers and oceans.', practice: 'Practice distinguishing surface runoff from water soaking into the ground.', hint: 'The water is moving over the land’s surface.', nextAdventure: 'Photosynthesis',
    },
  },
  food_web: {
    ages_5_7: {
      type: 'sequence', task: 'Build a meadow food chain',
      prompt: 'Put these meadow neighbors in the order that food energy travels.',
      steps: ['Clover grows in the meadow.', 'A caterpillar eats the clover.', 'A bird eats the caterpillar.'],
      choices: ['A bird eats the caterpillar.', 'Clover grows in the meadow.', 'A caterpillar eats the clover.'],
      concept: 'food chains', demonstrated: 'You showed how energy moves from a plant to animals that eat it.', practice: 'Practice starting a food chain with a plant.', hint: 'Begin with the living thing that makes its own food.', nextAdventure: 'Photosynthesis',
    },
    ages_8_10: {
      type: 'scenario', task: 'Predict a meadow change',
      prompt: 'Fewer foxes visit Willow Creek. What may happen to the rabbit population at first?',
      options: ['It may grow because fewer rabbits are eaten.', 'It must disappear immediately.', 'It changes the Sun into a producer.'], correctIndex: 0,
      concept: 'predator-prey connections', demonstrated: 'You used a food-web connection to predict how one population can affect another.', practice: 'Practice tracing what may happen to the plants rabbits eat.', hint: 'Foxes are predators that can eat rabbits.', nextAdventure: 'Photosynthesis',
    },
    ages_11_13: {
      type: 'scenario', task: 'Predict a lake food-web ripple',
      prompt: 'Fish numbers fall at Lake Maren. If fish eat insect larvae, what may happen next?',
      options: ['More insect larvae may survive and eat more pond plants.', 'All pond plants instantly become fish.', 'The Sun stops supplying energy to algae.'], correctIndex: 0,
      concept: 'food-web ripple effects', demonstrated: 'You traced a change from fish to insect larvae and then to pond plants.', practice: 'Practice considering more than one pathway before predicting an ecosystem change.', hint: 'Think about what happens to prey when fewer predators remain.', nextAdventure: 'Photosynthesis',
    },
  },
  photosynthesis: {
    ages_5_7: {
      type: 'scenario', task: 'Help a droopy plant',
      prompt: 'A plant has water but stays in a dark cupboard. What should you give it so it can make food?',
      options: ['Move it into sunlight.', 'Cover its leaves with a blanket.', 'Take away all its water.'], correctIndex: 0,
      concept: 'the inputs plants need to make food', demonstrated: 'You recognized that plants need sunlight, along with water and air, to make food.', practice: 'Practice naming the three things the plant uses to make food.', hint: 'The plant is missing the bright ingredient from the story.', nextAdventure: 'Food Web',
    },
    ages_8_10: {
      type: 'scenario', task: 'Solve the greenhouse mystery',
      prompt: 'Leena’s seedlings have light and water, but the greenhouse vents are closed. What should she restore?',
      options: ['Fresh air containing carbon dioxide.', 'More darkness.', 'Friction on the leaves.'], correctIndex: 0,
      concept: 'photosynthesis inputs and outputs', demonstrated: 'You identified carbon dioxide as a needed input for photosynthesis.', practice: 'Practice naming what photosynthesis makes from light, water, and carbon dioxide.', hint: 'Plants take this gas from the air through their leaves.', nextAdventure: 'Food Web',
    },
    ages_11_13: {
      type: 'scenario', task: 'Choose the next investigation step',
      prompt: 'Ravi’s growth chamber has enough water and carbon dioxide, but light is too low. What should he test first?',
      options: ['Increase light while keeping the other conditions the same.', 'Change water and carbon dioxide at the same time.', 'Block the remaining light.'], correctIndex: 0,
      concept: 'photosynthesis inputs and fair testing', demonstrated: 'You chose to restore a missing input while keeping other conditions steady.', practice: 'Practice explaining how light energy helps plants build glucose.', hint: 'Ravi changes one condition at a time to find the limiting resource.', nextAdventure: 'Food Web',
    },
  },
  human_body: {
    ages_5_7: {
      type: 'scenario', task: 'Match a clue to a sense',
      prompt: 'Aria smells peppermint near the science fair. Which body part notices that clue?',
      options: ['Her nose.', 'Her knees.', 'Her elbow.'], correctIndex: 0,
      concept: 'senses and body responses', demonstrated: 'You matched a smell clue to the nose.', practice: 'Practice matching sounds, sights, and textures to the sense that notices them.', hint: 'The clue is a smell.', nextAdventure: 'Solar System',
    },
    ages_8_10: {
      type: 'sequence', task: 'Trace Dev’s hidden-bell clue',
      prompt: 'Put the steps in order from hearing the bell to responding.',
      steps: ['The ears detect the bell’s sound.', 'Nerves carry a message to the brain.', 'The brain interprets the clue.', 'The body moves toward the bell.'],
      choices: ['The body moves toward the bell.', 'The ears detect the bell’s sound.', 'The brain interprets the clue.', 'Nerves carry a message to the brain.'],
      concept: 'how senses and the nervous system work together', demonstrated: 'You traced a clue from a sense organ through the brain to a response.', practice: 'Practice naming the role of nerves between sense organs and the brain.', hint: 'Start with the body part that detects the sound.', nextAdventure: 'Solar System',
    },
    ages_11_13: {
      type: 'scenario', task: 'Predict Sam’s quick response',
      prompt: 'Sam touches something unexpectedly hot. Which response helps protect the body quickly?',
      options: ['A fast reflex pathway helps pull the hand away.', 'The eyes turn the heat into light.', 'The muscles wait until the next day.'], correctIndex: 0,
      concept: 'sensory signals and reflexes', demonstrated: 'You connected a temperature clue to a fast protective response.', practice: 'Practice tracing how receptors, nerves, and muscles work together.', hint: 'The story’s warm-object clue triggers a quick protective action.', nextAdventure: 'Solar System',
    },
  },
  solar_system: {
    ages_5_7: {
      type: 'sequence', task: 'Explain day and night',
      prompt: 'Put these pieces together to show why Earth has day and night.',
      steps: ['Earth spins like a top.', 'One side faces the Sun.', 'That side has daytime.'],
      choices: ['That side has daytime.', 'Earth spins like a top.', 'One side faces the Sun.'],
      concept: 'Earth’s rotation and the day-night cycle', demonstrated: 'You connected Earth’s spin and sunlight to daytime.', practice: 'Practice explaining what happens to places turned away from the Sun.', hint: 'The spinning Earth turns different places toward the Sun.', nextAdventure: 'Forces & Motion',
    },
    ages_8_10: {
      type: 'scenario', task: 'Solve the navigator’s day-night puzzle',
      prompt: 'A place on Earth moves from darkness into sunlight as Earth turns. What causes this daily change?',
      options: ['Earth’s rotation.', 'Earth’s year-long revolution.', 'The Moon pushing the Sun.'], correctIndex: 0,
      concept: 'rotation versus revolution', demonstrated: 'You used Earth’s rotation to explain the daily cycle of day and night.', practice: 'Practice distinguishing a daily rotation from a yearly orbit around the Sun.', hint: 'Which motion is Earth’s spin?', nextAdventure: 'Forces & Motion',
    },
    ages_11_13: {
      type: 'scenario', task: 'Explain a season on Noor’s route',
      prompt: 'A hemisphere tilts toward the Sun during part of Earth’s orbit. What changes there?',
      options: ['It receives more direct sunlight and longer days.', 'It moves much closer to the Sun each day.', 'Earth stops rotating.'], correctIndex: 0,
      concept: 'Earth’s tilt and seasons', demonstrated: 'You connected axial tilt to sunlight angle and day length.', practice: 'Practice explaining why seasons are not simply caused by distance from the Sun.', hint: 'Think about the angle and duration of sunlight.', nextAdventure: 'Forces & Motion',
    },
  },
  fractions: {
    ages_5_7: {
      type: 'sequence', task: 'Share Lila’s flatbread fairly',
      prompt: 'Put the steps in order to give two friends fair halves.',
      steps: ['Cut one whole flatbread into two equal pieces.', 'Give one equal piece to each friend.', 'Each friend has one half.'],
      choices: ['Each friend has one half.', 'Give one equal piece to each friend.', 'Cut one whole flatbread into two equal pieces.'],
      concept: 'equal parts and halves', demonstrated: 'You used equal parts to show what one half means.', practice: 'Practice checking that parts are equal before naming a fraction.', hint: 'First split the whole into two same-size pieces.', nextAdventure: 'Maths Mini: Patterns & Logic',
    },
    ages_8_10: {
      type: 'scenario', task: 'Fill Asha’s pizza order',
      prompt: 'Asha cuts a pizza into eight equal slices. Which serving covers the same amount as one half?',
      options: ['Four of the eight slices.', 'One of the eight slices.', 'All eight slices.'], correctIndex: 0,
      concept: 'equivalent fractions', demonstrated: 'You recognized that four eighths covers the same amount as one half.', practice: 'Practice comparing shaded parts of equal-sized wholes.', hint: 'One half is half of eight equal pieces.', nextAdventure: 'Maths Mini: Patterns & Logic',
    },
    ages_11_13: {
      type: 'scenario', task: 'Help Ren check the recipe sketch',
      prompt: 'A sketch shows one half of a cup using eight equal marks. How many marks should Ren shade?',
      options: ['Four marks.', 'One mark.', 'Eight marks.'], correctIndex: 0,
      concept: 'equivalent fractions and equal partitions', demonstrated: 'You represented one half as four eighths.', practice: 'Practice checking that the whole is split into equal parts before comparing fractions.', hint: 'Half of eight equal marks is four.', nextAdventure: 'Maths Mini: Patterns & Logic',
    },
  },
  forces_motion: {
    ages_5_7: {
      type: 'scenario', task: 'Help Tavi’s wagon roll',
      prompt: 'Tavi’s wagon rolls downhill, then slows on rough grass. What is rubbing against the wheels?',
      options: ['Friction between touching surfaces.', 'The Sun’s light.', 'A food chain.'], correctIndex: 0,
      concept: 'forces, gravity, and friction', demonstrated: 'You identified friction as the rubbing force that slows the wagon.', practice: 'Practice spotting pushes, pulls, and rubbing surfaces in a new example.', hint: 'The rough grass touches the moving wheels.', nextAdventure: 'Solar System',
    },
    ages_8_10: {
      type: 'scenario', task: 'Rescue Mateo’s marble coaster',
      prompt: 'The marble has a tall starting ramp but stalls on a rough patch. What would most likely help it reach the loop?',
      options: ['Use a smoother track so less motion energy is lost to friction.', 'Make the track rougher.', 'Start the marble lower.'], correctIndex: 0,
      concept: 'potential energy, kinetic energy, and friction', demonstrated: 'You predicted that reducing friction leaves more motion energy for the loop.', practice: 'Practice explaining how height and track surface affect a ride.', hint: 'The rough patch rubs against the marble and slows it.', nextAdventure: 'Solar System',
    },
    ages_11_13: {
      type: 'scenario', task: 'Plan Priya’s fair coaster test',
      prompt: 'Priya wants to test how track material affects the cart. Which test is fairest?',
      options: ['Keep starting height the same and change only track material.', 'Change height and track material together.', 'Use a different cart every time.'], correctIndex: 0,
      concept: 'forces, friction, energy, and controlled comparisons', demonstrated: 'You chose to change one condition while keeping the starting height fixed.', practice: 'Practice explaining how friction transfers some mechanical energy into heat.', hint: 'Priya changes one condition at a time to identify its effect.', nextAdventure: 'Solar System',
    },
  },
};

const mathsChallenges = {
  basic_algebra: {
    ages_5_7: { type: 'scenario', task: 'Balance a new toy-shop seesaw', prompt: 'A mystery box plus 3 blocks balances 8 blocks. How many blocks are in the box?', options: ['5 blocks.', '3 blocks.', '11 blocks.'], correctIndex: 0, concept: 'keeping both sides of a balance equal', demonstrated: 'You found the hidden amount by taking the known blocks away from both sides.', practice: 'Practice checking that both sides still have the same total.', hint: 'Take 3 blocks away from the side with 8.', nextAdventure: 'Fractions in the Real World' },
    ages_8_10: { type: 'scenario', task: 'Open Ivo’s museum bag', prompt: 'A bag plus 6 weights balances 15 weights. What is inside the bag?', options: ['9 weights.', '6 weights.', '21 weights.'], correctIndex: 0, concept: 'solving a balanced equation', demonstrated: 'You used the same subtraction on both sides to find the unknown.', practice: 'Practice explaining why both sides must stay equal.', hint: 'Remove the 6 known weights from both sides.', nextAdventure: 'Fractions in the Real World' },
    ages_11_13: { type: 'scenario', task: 'Check Mira’s cargo scale', prompt: 'An unknown crate plus 7 kg balances 20 kg. What is the crate’s mass?', options: ['13 kg.', '27 kg.', '7 kg.'], correctIndex: 0, concept: 'isolating an unknown while preserving equality', demonstrated: 'You used an inverse operation to find the unknown mass.', practice: 'Practice checking your result by substituting it back into the equation.', hint: 'Subtract 7 kg from both sides.', nextAdventure: 'Fractions in the Real World' },
  },
  geometry_shapes: {
    ages_5_7: { type: 'scenario', task: 'Fix Bo’s garden gate', prompt: 'Bo wants the gate to have a square corner. Which angle should he use?', options: ['A right angle.', 'A tiny acute angle.', 'A wide obtuse angle.'], correctIndex: 0, concept: 'right angles and shape sides', demonstrated: 'You matched a square corner to a right angle.', practice: 'Practice spotting right angles in familiar objects.', hint: 'A square corner measures 90 degrees.', nextAdventure: 'Solar System' },
    ages_8_10: { type: 'scenario', task: 'Check Suri’s park plan', prompt: 'The park gate needs a perfect square corner. What angle measure should Suri draw?', options: ['90 degrees.', '45 degrees.', '135 degrees.'], correctIndex: 0, concept: 'measuring and classifying angles', demonstrated: 'You applied the 90-degree measure of a right angle.', practice: 'Practice comparing acute, right, and obtuse angles.', hint: 'Think of the corner of a book.', nextAdventure: 'Solar System' },
    ages_11_13: { type: 'scenario', task: 'Correct Eli’s blueprint', prompt: 'A park path turns through 120 degrees. How should Eli classify the angle?', options: ['Obtuse.', 'Acute.', 'Right.'], correctIndex: 0, concept: 'classifying angles by their measure', demonstrated: 'You recognized that an angle greater than 90 degrees is obtuse.', practice: 'Practice comparing angle measures to 90 degrees.', hint: '120 degrees is wider than a square corner.', nextAdventure: 'Solar System' },
  },
  patterns_logic: {
    ages_5_7: { type: 'scenario', task: 'Light Nori’s next lantern', prompt: 'The lantern trail goes red, blue, red, blue. What color comes next?', options: ['Red.', 'Blue.', 'Green.'], correctIndex: 0, concept: 'repeating patterns', demonstrated: 'You spotted the repeating red-blue rule.', practice: 'Practice saying the rule before choosing the next item.', hint: 'The colors take turns.', nextAdventure: 'Fractions in the Real World' },
    ages_8_10: { type: 'scenario', task: 'Crack Ana’s door code', prompt: 'The code doubles each time: 3, 6, 12, 24, ___. What comes next?', options: ['48.', '30.', '27.'], correctIndex: 0, concept: 'multiplicative patterns', demonstrated: 'You applied the doubling rule to predict the next term.', practice: 'Practice stating the rule and checking it at every step.', hint: 'Multiply the last number by two.', nextAdventure: 'Fractions in the Real World' },
    ages_11_13: { type: 'scenario', task: 'Predict the research-station code', prompt: 'The code decreases by 5 each time: 75, 70, 65, 60, ___. What comes next?', options: ['55.', '50.', '65.'], correctIndex: 0, concept: 'additive sequence rules', demonstrated: 'You used the constant change of minus five to continue the sequence.', practice: 'Practice checking the difference between each pair of terms.', hint: 'Subtract five from the last term.', nextAdventure: 'Fractions in the Real World' },
  },
  numbers_operations: {
    ages_5_7: { type: 'scenario', task: 'Pack Sal’s animal-shelter bowls', prompt: 'There are 5 bowls on each of 4 mats. How many bowls are there altogether?', options: ['20 bowls.', '9 bowls.', '45 bowls.'], correctIndex: 0, concept: 'multiplication as equal groups', demonstrated: 'You counted equal groups by multiplying the number in each group by the number of groups.', practice: 'Practice drawing equal groups before multiplying.', hint: 'Add five four times, or multiply 5 by 4.', nextAdventure: 'Fractions in the Real World' },
    ages_8_10: { type: 'scenario', task: 'Pack Mei’s team kits', prompt: 'Mei packs 9 kits for each of 6 tables. How many kits does she need?', options: ['54 kits.', '15 kits.', '96 kits.'], correctIndex: 0, concept: 'multiplication for equal groups', demonstrated: 'You multiplied the number of kits per table by the number of tables.', practice: 'Practice checking a multiplication answer with repeated addition.', hint: 'Find 9 groups of 6.', nextAdventure: 'Fractions in the Real World' },
    ages_11_13: { type: 'scenario', task: 'Check Ravi’s shipment label', prompt: 'In 8,642, what amount does the digit 6 represent?', options: ['600.', '60.', '6,000.'], correctIndex: 0, concept: 'place value', demonstrated: 'You used the hundreds position to identify the digit’s value.', practice: 'Practice reading a digit’s value from its position in a number.', hint: 'Count from the right: ones, tens, hundreds.', nextAdventure: 'Fractions in the Real World' },
  },
};

export function getTeachItBackChallenge(adventureId, ageGroupId, topicId) {
  const age = ['ages_5_7', 'ages_8_10', 'ages_11_13'].includes(ageGroupId) ? ageGroupId : 'ages_8_10';
  if (adventureId === 'maths_mini') return mathsChallenges[topicId]?.[age] || mathsChallenges.basic_algebra[age];
  return challenges[adventureId]?.[age] || challenges.water_cycle.ages_8_10;
}
