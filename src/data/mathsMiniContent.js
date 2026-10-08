export const mathsMiniByAge = {
  basic_algebra: {
    ages_5_7: {
      title: 'Balancing Scales: The Missing Number',
      icon: '⚖️',
      badge: 'Equation Balancer Badge',
      color: 'from-rose-500 to-pink-600',
      themeBg: 'bg-rose-50 border-rose-200 text-rose-900',
      intro: [
        'A scale is fair when both sides match.',
        'Look at this: a mystery box plus 4 blocks equals 10 blocks.',
        'The mystery number is how many are hiding in the box. We can write a box + 4 = 10.',
        'Count up: 6 + 4 = 10, so the missing number is 6.'
      ],
      activity: {
        type: 'algebra',
        label: 'Fair scale: mystery number + 4 = 10',
        prompt: 'Which number makes both sides the same?',
        left: '? + 4',
        right: '10',
        options: [4, 5, 6, 7],
        answer: 6,
        success: 'Yes! 6 + 4 = 10. Both sides match.'
      },
      quiz: [
        { q: 'In ? + 4 = 10, what is the missing number?', options: ['5', '6', '14', '4'], correct: 1, why: '6 + 4 = 10.' },
        { q: 'What does the equals sign mean on a scale?', options: ['The right side is always bigger', 'Both sides have the same total', 'The scale is broken', 'It means take a nap'], correct: 1, why: 'Equals means both sides match.' },
        { q: 'If 2 + ? = 9, what is hiding?', options: ['7', '11', '2', '0'], correct: 0, why: '2 + 7 = 9.' }
      ]
    },
    ages_8_10: {
      title: 'Basic Algebra: Balancing the Secret Variable X',
      icon: '⚖️',
      badge: 'Equation Balancer Badge',
      color: 'from-rose-500 to-pink-600',
      themeBg: 'bg-rose-50 border-rose-200 text-rose-900',
      intro: [
        "Algebra is like being a secret detective! The letter 'X' is simply an unknown mystery number hiding in disguise.",
        'An equation is like a balanced scale. Whatever you do to one side of the equal sign, you must do to the exact other side to keep it perfectly balanced!',
        'Example: X + 4 = 10. Subtract 4 from both sides. Then X = 6.'
      ],
      activity: {
        type: 'algebra',
        label: 'Equation Scale: Mystery X + 4 = 10',
        prompt: 'What value of X balances the scale? Click a weight below:',
        left: 'X + 4',
        right: '10',
        options: [4, 5, 6, 7],
        answer: 6,
        success: 'Balanced! 6 + 4 = 10! You solved the mystery variable X!'
      },
      quiz: [
        { q: 'In the equation X + 5 = 12, what mystery number is hiding inside X?', options: ['5', '7', '17', '10'], correct: 1, why: 'If you subtract 5 from both sides, 12 - 5 = 7, so X = 7!' },
        { q: 'What does the equals sign (=) in an equation mean?', options: ['The right side is bigger than the left side', 'Both sides have the exact same total value and balance out', 'The equation is broken', 'It means subtraction'], correct: 1, why: 'The equals sign represents a balanced scale where both sides are equal.' },
        { q: 'If 2 × X = 16, what is the value of X?', options: ['8', '14', '32', '4'], correct: 0, why: '16 divided by 2 is 8, so X = 8!' }
      ]
    },
    ages_11_13: {
      title: 'Linear Equations: Isolating the Variable',
      icon: '⚖️',
      badge: 'Equation Balancer Badge',
      color: 'from-rose-500 to-pink-600',
      themeBg: 'bg-rose-50 border-rose-200 text-rose-900',
      intro: [
        'A linear equation states that two expressions are equal. Solving means isolating the variable using inverse operations on both sides so equality is preserved.',
        'For 2X + 4 = 16, first subtract 4 from both sides: 2X = 12. Then divide both sides by 2: X = 6. Each step is legal because it is done to both sides.',
        'Checking is part of the method: substitute X = 6 to get 2(6) + 4 = 16. If the check fails, an inverse step was applied incorrectly.'
      ],
      activity: {
        type: 'algebra',
        label: 'Isolate X in 2X + 4 = 16',
        prompt: 'Use inverse operations: undo +4, then undo ×2. What is X?',
        left: '2X + 4',
        right: '16',
        options: [4, 5, 6, 8],
        answer: 6,
        success: 'Check: 2(6) + 4 = 16. X is isolated correctly.'
      },
      quiz: [
        { q: 'To solve 2X + 4 = 16, which first inverse operation keeps the equation balanced?', options: ['Subtract 4 from both sides', 'Add 16 to only the left', 'Divide only the right by 2', 'Erase the 2'], correct: 0, why: 'Undo addition first; apply the same change to both sides.' },
        { q: 'Why must every step be done to both sides?', options: ['To keep the two expressions equal (preserve the equation)', 'Because pencils like symmetry', 'To make the numbers prettier only', 'Equations forbid subtraction'], correct: 0, why: 'Equality is a relation; changing one side alone breaks it.' },
        { q: 'If 3X = 21, then X is:', options: ['7', '18', '24', '3'], correct: 0, why: 'Divide both sides by 3; 21/3 = 7.' }
      ]
    }
  },

  geometry_shapes: {
    ages_5_7: {
      title: 'Magic Shapes: Corners and Sides',
      icon: '🔺',
      badge: 'Geometry Architect Badge',
      color: 'from-emerald-500 to-teal-600',
      themeBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      intro: [
        'Shapes are all around you. A circle is round. A square has 4 equal sides and 4 square corners.',
        'A triangle has 3 sides. A rectangle has 4 sides, with square corners like a door.',
        'A square corner is a right angle. A skinny sharp corner is smaller than a square corner. A wide open corner is bigger than a square corner.'
      ],
      activity: {
        type: 'geometry',
        label: 'Corner checker',
        prompt: 'Try 45°, 90°, and 135°. Watch if the corner is sharp, square, or wide.',
        angles: [45, 90, 135],
        labels: {
          acute: 'Sharp corner — smaller than a square corner!',
          right: 'Square corner — a right angle!',
          obtuse: 'Wide corner — bigger than a square corner!'
        }
      },
      quiz: [
        { q: 'How many sides does a triangle have?', options: ['2', '3', '8', '100'], correct: 1, why: 'A triangle has 3 sides.' },
        { q: 'A square corner like a book corner is called a:', options: ['Right angle', 'A circle', 'A smell', 'A year'], correct: 0, why: 'A square corner is a right angle.' },
        { q: 'How many equal sides does a square have?', options: ['4', '1', '9', '0'], correct: 0, why: 'A square has 4 equal sides.' }
      ]
    },
    ages_8_10: {
      title: 'Geometry & Angles: Secret Polygon Builder',
      icon: '📐',
      badge: 'Geometry Architect Badge',
      color: 'from-emerald-500 to-teal-600',
      themeBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      intro: [
        'Geometry is the math of shapes, spaces, and angles! An angle measures the turn between two rays meeting at a point (vertex).',
        'A 90-degree angle makes a perfect square corner called a Right Angle. Angles less than 90 degrees are Acute (sharp and cute!), and angles greater than 90 degrees (but less than 180) are Obtuse!',
        'A triangle has 3 sides. A pentagon has 5 sides (penta means five). Perimeter is the distance around a shape: add all the side lengths. A square with sides of 5 cm has perimeter 20 cm.'
      ],
      activity: {
        type: 'geometry',
        label: 'Angle Angleometer',
        prompt: 'Set 45°, 90°, and 135° to classify acute, right, and obtuse.',
        angles: [45, 90, 135],
        labels: {
          acute: 'Acute Angle (<90°) — Sharp and cute!',
          right: 'Right Angle (90°) — Perfect square corner!',
          obtuse: 'Obtuse Angle (>90°) — Wide and open!'
        }
      },
      quiz: [
        { q: 'What do mathematicians call an angle that forms a perfect 90° square corner like the corner of a book?', options: ['An acute angle', 'A right angle', 'An obtuse angle', 'A round angle'], correct: 1, why: 'Exactly 90 degrees is a Right Angle!' },
        { q: 'How many sides does a Pentagon have?', options: ['3 sides', '4 sides', '5 sides', '6 sides'], correct: 2, why: 'Penta means five, so a pentagon has 5 sides!' },
        { q: 'What is the perimeter of a square whose four sides each measure 5 cm?', options: ['10 cm', '20 cm', '25 cm', '15 cm'], correct: 1, why: '5 + 5 + 5 + 5 = 20 cm!' }
      ]
    },
    ages_11_13: {
      title: 'Geometric Area & Angle Classes',
      icon: '📐',
      badge: 'Geometry Architect Badge',
      color: 'from-emerald-500 to-teal-600',
      themeBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      intro: [
        'An angle is a measure of rotation between two rays sharing a vertex. Classification is by measure: acute if 0° < θ < 90°, right if θ = 90°, obtuse if 90° < θ < 180°.',
        'Polygons are named by side count: triangle (3), quadrilateral (4), pentagon (5). Perimeter is the sum of side lengths—a path measure around the figure.',
        'Area measures interior space. For a square of side s, area is s², so a 5 cm square has area 25 cm², while perimeter is 4s = 20 cm. Do not confuse the two quantities.'
      ],
      activity: {
        type: 'geometry',
        label: 'Classify by measure',
        prompt: 'Change the angle. Name it using the definitions you just read.',
        angles: [45, 90, 135],
        labels: {
          acute: 'Acute: measure strictly less than 90°.',
          right: 'Right: measure exactly 90°.',
          obtuse: 'Obtuse: measure greater than 90° and less than 180°.'
        }
      },
      quiz: [
        { q: 'Which statement is the definition of an obtuse angle?', options: ['Exactly 90°', 'Greater than 90° and less than 180°', 'A circle', 'Any triangle'], correct: 1, why: 'Obtuse is strictly between 90° and 180°.' },
        { q: 'A pentagon is a polygon with how many sides?', options: ['3', '4', '5', '8'], correct: 2, why: 'Penta- indicates five sides.' },
        { q: 'A square has side 5 cm. Which pair is correct?', options: ['Perimeter 20 cm and area 25 cm²', 'Perimeter 25 cm and area 20 cm²', 'Both 5 cm', 'Area 20 cm'], correct: 0, why: 'P = 4s = 20 cm; A = s² = 25 cm².' }
      ]
    }
  },

  patterns_logic: {
    ages_5_7: {
      title: 'Colors & Shape Patterns',
      icon: '🎨',
      badge: 'Master Detective Badge',
      color: 'from-purple-500 to-indigo-600',
      themeBg: 'bg-purple-50 border-purple-200 text-purple-900',
      intro: [
        'A pattern is a rule that repeats. Red, blue, red, blue... the next is red!',
        'Number patterns can add the same amount each time. 2, 4, 6, 8... we add 2.',
        'If you know the rule, you can predict what comes next. That is detective math!'
      ],
      activity: {
        type: 'pattern',
        label: 'What comes next? 2, 4, 6, 8, ___',
        prompt: 'The rule is add 2 each time.',
        options: [9, 10, 12, 7],
        answer: 10,
        success: 'Yes! Add 2: 8 + 2 = 10.'
      },
      quiz: [
        { q: 'What comes next: 1, 2, 3, 4, ___?', options: ['5', '10', '0', '100'], correct: 0, why: 'We count up by 1.' },
        { q: 'In 5, 10, 15, 20, the rule is:', options: ['Add 5 each time', 'Add 1', 'Take away 10', 'Multiply by 100'], correct: 0, why: 'Each number is 5 more.' },
        { q: 'If all birds have wings, and a robin is a bird, then:', options: ['The robin has wings', 'The robin is a fish', 'The robin is a triangle', 'The robin has no wings'], correct: 0, why: 'The rule about birds applies to the robin.' }
      ]
    },
    ages_8_10: {
      title: 'Patterns & Logic: The Codebreaker’s Guild',
      icon: '🧩',
      badge: 'Master Detective Badge',
      color: 'from-purple-500 to-indigo-600',
      themeBg: 'bg-purple-50 border-purple-200 text-purple-900',
      intro: [
        'Patterns are repeating rules that govern numbers and nature! Whether it is counting by fives, doubling numbers, or finding Fibonacci spirals in sunflower seeds, your brain was built to spot patterns!',
        'A sequence has a rule. 2, 4, 8, 16 doubles each time, so next is 32. 50, 45, 40, 35 subtracts 5 each time.',
        'Logic: if a rule is true for a whole group, it is true for each member. If all cats have whiskers and Leo is a cat, then Leo has whiskers.'
      ],
      activity: {
        type: 'pattern',
        label: 'Sequence Puzzle: 3, 6, 9, 12, ___?',
        prompt: 'Find the additive rule.',
        options: [14, 15, 16, 18],
        answer: 15,
        success: 'Correct! The pattern rule is Add 3 (+3) each step!'
      },
      quiz: [
        { q: 'What number comes next in this doubling sequence: 2, 4, 8, 16, ___?', options: ['24', '32', '20', '64'], correct: 1, why: 'The rule is multiply by 2 each time. 16 × 2 = 32!' },
        { q: 'In the sequence 50, 45, 40, 35, ___, what is the pattern rule?', options: ['Add 5 each time', 'Subtract 5 each time', 'Multiply by 5', 'Divide by 2'], correct: 1, why: 'Each number decreases by 5.' },
        { q: 'If all cats have whiskers, and Leo is a cat, what can you logically deduce?', options: ['Leo likes swimming', 'Leo has whiskers', 'Leo is a dog', 'Leo is purple'], correct: 1, why: 'Valid premises lead to a true conclusion!' }
      ]
    },
    ages_11_13: {
      title: 'Sequences & Deductive Logic',
      icon: '🧩',
      badge: 'Master Detective Badge',
      color: 'from-purple-500 to-indigo-600',
      themeBg: 'bg-purple-50 border-purple-200 text-purple-900',
      intro: [
        'An arithmetic sequence adds a constant difference d each term. A geometric sequence multiplies by a constant ratio r each term.',
        'Example: 2, 4, 8, 16 is geometric with r = 2, so the next term is 32. 50, 45, 40 is arithmetic with d = −5.',
        'Deduction applies a general rule to a particular case: All cats have whiskers; Leo is a cat; therefore Leo has whiskers. The conclusion is forced if both premises are true.'
      ],
      activity: {
        type: 'pattern',
        label: 'Geometric: 2, 4, 8, 16, ___',
        prompt: 'Identify the ratio, then find the next term.',
        options: [18, 24, 32, 20],
        answer: 32,
        success: 'Ratio r = 2, so 16 × 2 = 32. Geometric, not arithmetic.'
      },
      quiz: [
        { q: 'The sequence 2, 4, 8, 16 is:', options: ['Arithmetic with d = 2', 'Geometric with ratio 2', 'Random', 'Only even because of luck'], correct: 1, why: 'Each term is multiplied by 2.' },
        { q: 'For 50, 45, 40, 35 the common difference d is:', options: ['+5', '−5', '×5', '÷2'], correct: 1, why: 'Arithmetic sequences change by a constant difference.' },
        { q: 'Deduction from “all cats have whiskers” and “Leo is a cat” yields:', options: ['Leo has whiskers', 'Leo is not a cat', 'All dogs have whiskers', 'Nothing follows'], correct: 0, why: 'A universal rule applied to a member of the set.' }
      ]
    }
  },

  numbers_operations: {
    ages_5_7: {
      title: 'Counting & Number Buddies',
      icon: '🔢',
      badge: 'Maths Math-Wiz Badge',
      color: 'from-amber-500 to-orange-600',
      themeBg: 'bg-amber-50 border-amber-200 text-amber-900',
      intro: [
        'Numbers tell how many. 7 means seven things.',
        'Addition puts groups together. 4 + 3 = 7 because four and three more make seven.',
        'A number bond is a pair that makes a friendly total. 6 and 4 make 10. Knowing 10-pairs helps you add fast!'
      ],
      activity: {
        type: 'numbers',
        label: 'Number buddy: 6 + 4 = ___',
        prompt: 'Make 10!',
        options: [8, 9, 10, 12],
        answer: 10,
        success: 'Yes! 6 and 4 are number buddies that make 10.'
      },
      quiz: [
        { q: 'What is 5 + 2?', options: ['7', '52', '3', '10'], correct: 0, why: 'Five and two more is seven.' },
        { q: 'Which pair makes 10?', options: ['6 and 4', '2 and 2', '9 and 9', '1 and 1'], correct: 0, why: '6 + 4 = 10.' },
        { q: 'What is 10 − 1?', options: ['9', '11', '0', '101'], correct: 0, why: 'One less than ten is nine.' }
      ]
    },
    ages_8_10: {
      title: 'Numbers & Operations: The Calculation Castle',
      icon: '🔢',
      badge: 'Maths Math-Wiz Badge',
      color: 'from-amber-500 to-orange-600',
      themeBg: 'bg-amber-50 border-amber-200 text-amber-900',
      intro: [
        'Numbers are the building blocks of mathematics! Multiplication is super-fast repeated addition. Instead of adding 7 eight times, you can simply multiply: 7 × 8 = 56!',
        'Place value gives each digit superpowers depending on whether it sits in the ones, tens, hundreds, or thousands place!',
        'In 4,729 the 7 sits in the hundreds place, so it is worth 700. Subtraction undoes addition: 100 − 37 = 63.'
      ],
      activity: {
        type: 'numbers',
        label: 'Quick Arithmetic: 9 × 6 = ___?',
        prompt: 'Think 9 six times, or 10×6 minus 6.',
        options: [45, 54, 63, 56],
        answer: 54,
        success: 'Spot on! 9 × 6 = 54!'
      },
      quiz: [
        { q: 'What is the product of 7 × 8?', options: ['54', '56', '64', '48'], correct: 1, why: '7 × 8 = 56!' },
        { q: 'In the number 4,729, what is the place value of the digit 7?', options: ['7 Ones', '7 Tens', '7 Hundreds (700)', '7 Thousands'], correct: 2, why: 'The 7 is in the hundreds place, meaning it represents 700!' },
        { q: 'What is 100 − 37?', options: ['73', '63', '53', '67'], correct: 1, why: '100 − 37 = 63!' }
      ]
    },
    ages_11_13: {
      title: 'Integers & Order of Operations',
      icon: '🔢',
      badge: 'Maths Math-Wiz Badge',
      color: 'from-amber-500 to-orange-600',
      themeBg: 'bg-amber-50 border-amber-200 text-amber-900',
      intro: [
        'Place value still applies, but now operations have a required order: parentheses, exponents, multiplication/division (left to right), then addition/subtraction (left to right)—often remembered as PEMDAS.',
        'Multiplication remains repeated addition, but it binds more tightly than addition: 7 × 8 + 1 is 57, not 7 × 9. Integers include negatives: subtracting 37 from 100 is 63; 5 − 8 = −3.',
        'In 4,729, the digit 7 contributes 7 × 100 because of its place. Expanding with place value is how we compare and compute with large integers.'
      ],
      activity: {
        type: 'numbers',
        label: 'PEMDAS: 3 + 7 × 8 = ___',
        prompt: 'Multiply before you add.',
        options: [80, 59, 56, 24],
        answer: 59,
        success: '7 × 8 = 56, then 3 + 56 = 59. Order of operations matters.'
      },
      quiz: [
        { q: 'Evaluate 3 + 7 × 8.', options: ['80', '59', '24', '38'], correct: 1, why: 'PEMDAS: multiply first, then add.' },
        { q: 'In 4,729 the 7 represents:', options: ['7', '70', '700', '7000'], correct: 2, why: 'Hundreds place: 7 × 100.' },
        { q: '100 − 37 equals:', options: ['63', '137', '37', '−37'], correct: 0, why: 'Subtraction of whole numbers: 100 minus 37 is 63.' }
      ]
    }
  }
};
