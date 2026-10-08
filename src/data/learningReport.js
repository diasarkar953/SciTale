const rules = {
  water_cycle: [
    { title: 'Solar heating and evaporation', match: /sun|heat|thermal|evapor|kinetic energy/i },
    { title: 'Clouds and condensation', match: /condens|cloud|nuclei|cooling vapor/i },
    { title: 'Precipitation', match: /precip|rain|snow|hail|heavy drops|fall from a cloud/i },
    { title: 'Plant water release', match: /transpir|stomata|plant.*vapor|leaves release/i },
    { title: 'Runoff, infiltration, and groundwater', match: /infiltrat|runoff|aquifer|groundwater|soak|stream/i },
    { title: 'Water recycling and conservation', match: /closed system|recycl|conserv|water molecule|water mass/i },
  ],
  food_web: [
    { title: 'Producers and energy sources', match: /producer|plant|sunlight|makes? (its own )?food/i },
    { title: 'Consumers and food-chain energy', match: /consumer|food chain|eat other|energy transfer|food energy/i },
    { title: 'Food-web balance and ripple effects', match: /trophic|cascade|species|decomposer|frog|disappear|population/i },
  ],
  photosynthesis: [
    { title: 'Plant structures that support photosynthesis', match: /root|stem|leaf|stomata|chloroplast|chlorophyll|organelle|xylem/i },
    { title: 'Inputs plants need to make food', match: /ingredient|need.*photosynthesis|carbon dioxide|sunlight|light|water.*plant/i },
    { title: 'Photosynthesis products', match: /oxygen|glucose|sugar|product|release.*atmosphere/i },
  ],
  human_body: [
    { title: 'Brain, neurons, and messages', match: /brain|neuron|synapse|nerve|cerebrum|cerebellum/i },
    { title: 'Senses and sensory receptors', match: /sense|sensory|retina|receptor|transduction|transduce|photoreceptor|see a rainbow/i },
    { title: 'Reflexes and protective responses', match: /reflex|withdrawal|hot surface|survival response/i },
  ],
  solar_system: [
    { title: 'The Sun, planets, and the solar system', match: /solar system|planet|sun|gas and ice|gravity|orbit/i },
    { title: 'Rotation, revolution, day, night, and seasons', match: /rotation|rotat|day and night|spin|revolution|year|season|complete one full orbit|longer than/i },
  ],
  forces_motion: [
    { title: 'Forces and changes in motion', match: /force|push|pull|motion|gravity/i },
    { title: 'Friction and surfaces', match: /friction|rough|rubbing|surfaces slide/i },
    { title: 'Potential and kinetic energy', match: /energy|coaster|hill|stored|kinetic|potential/i },
  ],
  fractions: [
    { title: 'Fraction parts and the whole', match: /numerator|denominator|equal pieces|one whole|4\/4|8\/8|fraction.*called/i },
    { title: 'Comparing and equivalent fractions', match: /bigger|larger|equivalent|simplified|percent|1\/2|1\/8|half|quarter/i },
  ],
};

const mathsRules = {
  basic_algebra: [
    { title: 'Unknown values and inverse operations', match: /unknown|mystery|variable|solve|subtract|divide|x\s*[+=]|crate|bag/i },
    { title: 'Keeping equations balanced', match: /equal|balance|both sides|equation/i },
  ],
  geometry_shapes: [
    { title: 'Angles and corners', match: /angle|corner|degrees|90/i },
    { title: 'Recognizing shapes', match: /shape|polygon|side|triangle|square/i },
  ],
  patterns_logic: [
    { title: 'Finding and applying a pattern rule', match: /pattern|sequence|next|code|rule|logic/i },
  ],
  numbers_operations: [
    { title: 'Equal groups and multiplication', match: /multiply|multiplication|groups|times|kits|bowls/i },
    { title: 'Place value and number operations', match: /place value|digit|hundreds|add|subtract|number/i },
  ],
};

const adventureLabels = {
  water_cycle: 'The Water Cycle Adventure',
  food_web: 'Rainforest Food Web',
  photosynthesis: 'Plants & Photosynthesis',
  human_body: 'Human Body & Senses',
  solar_system: 'Space & Solar System',
  fractions: 'Fractions in the Real World',
  forces_motion: 'Forces & Motion',
  maths_mini: 'Maths Mini Adventure',
};

function getRules(adventureId, topicId) {
  return adventureId === 'maths_mini' ? mathsRules[topicId] || mathsRules.basic_algebra : rules[adventureId] || [];
}

function itemText(item) {
  return `${item?.q || item?.question || ''} ${item?.why || item?.explanation || ''}`;
}

export function buildLearningReport({ adventureId, topicId, adventureName, quizScore, quizTotal, quizItems = [], quizErrors = {}, teachItBack }) {
  const conceptRules = getRules(adventureId, topicId);
  const concepts = conceptRules.map((rule) => {
    const questionIndexes = quizItems.reduce((indexes, item, index) => rule.match.test(itemText(item)) ? [...indexes, index] : indexes, []);
    const linkedChallenge = rule.match.test(`${teachItBack.concept || ''} ${teachItBack.evidenceText || ''}`);
    const questionRetries = questionIndexes.reduce((sum, index) => sum + (quizErrors[index] || 0), 0);
    const retries = questionRetries + (linkedChallenge ? teachItBack.mistakes : 0);
    const assisted = linkedChallenge && teachItBack.assisted;
    const hasEvidence = questionIndexes.length > 0 || linkedChallenge;
    if (!hasEvidence) return {
      title: rule.title,
      status: 'Not Assessed',
      explanation: 'This section was taught, but the quiz and Teach-It-Back did not directly assess it in this session.',
      retries: 0,
      linkedChallenge: false,
      questionIndexes: [],
      practicePrompt: `Revisit “${rule.title}” in the story or activity and explain it in your own words.`,
    };

    let status;
    if (assisted || retries >= 4) status = 'Needs Practice';
    else if (retries >= 2) status = 'Developing';
    else if (retries === 1) status = 'Strong';
    else status = 'Mastered';

    const parts = [];
    if (questionIndexes.length) {
      parts.push(`${questionIndexes.length} related quiz ${questionIndexes.length === 1 ? 'question was' : 'questions were'} answered correctly${questionRetries ? ` after ${questionRetries} ${questionRetries === 1 ? 'retry' : 'retries'}` : ' on the first try'}.`);
    }
    if (linkedChallenge) {
      parts.push(assisted ? 'The Teach-It-Back was completed with Beaky’s help.' : `The Teach-It-Back was completed ${teachItBack.mistakes ? `after ${teachItBack.mistakes} ${teachItBack.mistakes === 1 ? 'retry' : 'retries'}` : 'independently on the first try'}.`);
    }
    const explanation = status === 'Mastered'
      ? `${parts.join(' ')} The evidence shows confident understanding.`
      : status === 'Strong'
        ? `${parts.join(' ')} The child reached the correct response after a small prompt to think again.`
        : status === 'Developing'
          ? `${parts.join(' ')} More guided practice will help this idea stick.`
          : `${parts.join(' ')} Revisit this concept together using the story and activity.`;

    return { title: rule.title, status, explanation, retries, linkedChallenge, questionIndexes, practicePrompt: `Revisit “${rule.title}” in the story or activity and explain it in your own words.` };
  });

  const challengeAlreadyCovered = concepts.some((concept) => concept.linkedChallenge);
  if (!challengeAlreadyCovered) {
    const status = teachItBack.assisted || teachItBack.mistakes >= 4 ? 'Needs Practice' : teachItBack.mistakes >= 2 ? 'Developing' : teachItBack.mistakes === 1 ? 'Strong' : 'Mastered';
    concepts.push({
      title: teachItBack.concept,
      status,
      explanation: teachItBack.assisted
        ? 'The child completed the application challenge with Beaky’s help; revisit this concept in the story or activity.'
        : teachItBack.mistakes
          ? `The child completed the application challenge after ${teachItBack.mistakes} ${teachItBack.mistakes === 1 ? 'retry' : 'retries'}.`
          : 'The child applied this idea to a new challenge independently on the first try.',
      retries: teachItBack.mistakes,
      linkedChallenge: true,
      questionIndexes: [],
      practicePrompt: `Revisit “${teachItBack.concept}” in the story or activity and explain it in your own words.`,
    });
  }

  const statusValue = { 'Mastered': 4, 'Strong': 3, 'Developing': 2, 'Needs Practice': 1 };
  const assessedConcepts = concepts.filter((concept) => concept.status !== 'Not Assessed');
  const coverage = concepts.length ? assessedConcepts.length / concepts.length : 0;
  const average = assessedConcepts.length ? assessedConcepts.reduce((sum, concept) => sum + statusValue[concept.status], 0) / assessedConcepts.length : 0;
  const performanceStatus = average >= 3.6 ? 'Mastered' : average >= 2.8 ? 'Strong' : average >= 1.9 ? 'Developing' : 'Needs Practice';
  const overallStatus = coverage < 0.5 && performanceStatus === 'Mastered' ? 'Strong' : performanceStatus;
  const strengths = concepts.filter((concept) => statusValue[concept.status] >= 3);
  const practiceAreas = concepts.filter((concept) => statusValue[concept.status] < 3);
  const notAssessed = concepts.filter((concept) => concept.status === 'Not Assessed');
  const recommendedNextStep = practiceAreas.length
    ? `${practiceAreas[0].practicePrompt} Then continue to ${teachItBack.nextAdventure}.`
    : notAssessed.length
      ? `Ask the child to explain “${notAssessed[0].title}” using the existing story or activity to check this unassessed area. Then continue to ${teachItBack.nextAdventure}.`
    : `The child showed strong understanding across the assessed concepts. Continue with ${teachItBack.nextAdventure} for a fresh application challenge${overallStatus === 'Mastered' ? ' and consider a more challenging age band if available' : ''}.`;

  return {
    adventureName: adventureName || adventureLabels[adventureId] || 'SciTale Adventure',
    overallStatus,
    overallExplanation: coverage < 0.75
      ? `Performance is ${performanceStatus.toLowerCase()} in the concepts assessed; ${concepts.length - assessedConcepts.length} section${concepts.length - assessedConcepts.length === 1 ? ' was' : 's were'} not directly assessed this session.`
      : overallStatus === 'Mastered'
      ? 'Performance shows confident understanding across the assessed concepts and independent application.'
      : overallStatus === 'Strong'
        ? 'Performance shows a strong grasp overall, with a few ideas that benefit from another look.'
        : overallStatus === 'Developing'
          ? 'The child is building understanding and benefits from guided review of the listed areas.'
          : 'The child will benefit from revisiting key ideas with an adult, then trying the activity again.',
    quizScore,
    quizTotal,
    quizRetries: Object.values(quizErrors).reduce((sum, count) => sum + count, 0),
    teachResult: teachItBack.assisted ? 'Completed with Beaky’s help' : teachItBack.mistakes === 0 ? 'Completed independently on the first try' : `Completed independently after ${teachItBack.mistakes} ${teachItBack.mistakes === 1 ? 'retry' : 'retries'}`,
    concepts,
    strengths,
    practiceAreas,
    notAssessed,
    recommendedNextStep,
  };
}
