// Static challenge templates targeting Year 5 students (Ages 9-10)
// Emphasizing fundamental movement skills, coordination, and agility.
// CRITICAL RULE: Every challenge has a baseline duration of AT LEAST 60 seconds.
export const CHALLENGES = [
  // ================= ARMS =================
  { 
    id: "arms_1", name: "Shadow Boxing Quest", body_part: "arms", emoji: "🥊", 
    description: "Throw lightning-fast air punches to clear out imaginary pixel bosses until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand with feet shoulder-width apart, fists raised to chin height. Alternate punching forward into space with control, keeping your core tight.",
    tips: ["Keep your elbows close to your ribs", "Exhale lightly with each punch", "Switch to a boxing bounce on your toes if you feel confident!"] 
  },
  { 
    id: "arms_2", name: "Fortress Wall Push-ups", body_part: "arms", emoji: "💪", 
    description: "Build upper body arm armor by pressing against the fortress wall until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand arm's length from a solid wall. Place your hands flat against the surface at chest height. Bend your elbows to lower your nose near the wall, then push back up.",
    tips: ["Keep your body as straight as a ruler", "Do not let your lower back or hips sag", "Press through your entire palm"] 
  },
  { 
    id: "arms_3", name: "Kraken Arm Circles", body_part: "arms", emoji: "🔄", 
    description: "Spin giant sea monster circles in the air to test your shoulder stamina until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand tall with both arms stretched completely out to your sides like an airplane. Make large, steady circles forward for half the time, then switch backwards.",
    tips: ["Keep your arms straight and level with your shoulders", "Don't hunch your neck or tighten your shoulders up to your ears", "Focus on a steady, smooth speed"] 
  },
  { 
    id: "arms_4", name: "Stealth Plank Shoulder Taps", body_part: "arms", emoji: "👋", 
    description: "Balance carefully on your hands and tap your shoulders silently until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 75, reps: "75 seconds",
    how_to: "Get into a high push-up plank position with your hands under your shoulders. Slowly lift your right hand to tap your left shoulder, return it, then switch hands.",
    tips: ["Squeeze your tummy and glutes tight to stay balanced", "Try to keep your hips from rocking side to side", "Widen your feet to make a sturdier base"] 
  },
  { 
    id: "arms_5", name: "Bench Warrior Tricep Dips", body_part: "arms", emoji: "🪑", 
    description: "Lower and raise your weight using a stable chair or step edge until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Sit on the edge of a sturdy chair or step, gripping the border next to your hips. Slide your bottom forward off the seat and bend your elbows to 90 degrees, then push up.",
    tips: ["Keep your back skimming close to the chair edge", "Look straight ahead to keep your neck comfortable", "Don't let your shoulders shrug up toward your ears"] 
  },
  { 
    id: "arms_6", name: "Gorilla Ground Pound Taps", body_part: "arms", emoji: "🦍", 
    description: "Squat down and alternate rapid open-palm light floor taps to build arm power until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Get into a low, comfortable wide squat. Alternately tap the floor quickly in front of you with your hands, shifting your weight like a powerful gorilla.",
    tips: ["Keep your head up and back flat while squatting", "Breathe smoothly through your nose", "Go for a steady drumbeat rhythm"] 
  },
  { 
    id: "arms_7", name: "Arm Crawl Hold", body_part: "arms", emoji: "🤚", 
    description: "Hold a low quadruped hover position to test your forearm strength until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Get on your hands and knees, keeping hands directly under shoulders. Hover your knees slightly off the floor and hold.",
    tips: ["Keep your gaze right between your hands", "Brace your core tight", "Keep your back level like a tabletop"] 
  },
  { 
    id: "arms_8", name: "Incline Push-ups", body_part: "arms", emoji: "🪵", 
    description: "Place your hands safely on an elevated step or bench and push up until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Place your hands flat on a stable bench or step. Keep a rigid straight line from your head to your heels, lower your chest, and push up.",
    tips: ["Keep your elbows tracking back at a 45-degree angle", "Keep your neck in a neutral line", "Squeeze your glutes"] 
  },
  { 
    id: "arms_9", name: "Plank Jacks", body_part: "arms", emoji: "🏃", 
    description: "Hold a push-up position while jumping your feet in and out until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 75, reps: "75 seconds",
    how_to: "Start in a high plank position with hands under shoulders. Jump your feet out wide, then jump them back together continuously.",
    tips: ["Keep your hands firmly planted", "Try not to let your hips bounce up into the air", "Land lightly on your toes"] 
  },

  // ================= LEGS =================
  { 
    id: "legs_1", name: "Star Burst Jumping Jacks", body_part: "legs", emoji: "⭐", 
    description: "Explode into a bright star shape over and over until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Start standing tall with feet together and arms at your sides. Jump your feet wide apart while sweeping your arms over your head, then jump back to the start.",
    tips: ["Land softly on the balls of your feet with slightly bent knees", "Keep a steady jumping rhythm", "Reach your hands all the way to the top"] 
  },
  { 
    id: "legs_2", name: "Leaping Frog Jumps", body_part: "legs", emoji: "🐸", 
    description: "Drop low and spring up across the lilypads until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Squat down deeply, keeping your feet wide and bringing your hands near the floor. Explode upwards into the air, extending your hips, then land softly back in a squat.",
    tips: ["Swing your arms forward and up to help lift you higher", "Always land with soft knees to absorb the impact smoothly", "Keep your chest pointing forward, not down"] 
  },
  { 
    id: "legs_3", name: "High Knees Power Sprint", body_part: "legs", emoji: "🦵", 
    description: "Drive your knees high into the air on the spot until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Run in place as fast as you can, driving your knees up to waist height with every single stride. Pump your arms to match your pace.",
    tips: ["Keep your chest upright—don't lean backward", "Land lightly on your toes", "Hold your hands out at your waist and try to tap them with your knees"] 
  },
  { 
    id: "legs_4", name: "Power Glute Bridge Holds", body_part: "legs", emoji: "🍑", 
    description: "Lie back and lift your hips high to build awesome running speed until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie on your back with your knees bent and feet flat on the floor. Squeeze your bottom and push through your heels to lift your hips up into a straight line.",
    tips: ["Don't arch your lower back too high; push from your hips", "Keep your shoulders resting flat against the ground", "Squeeze your muscles tight at the very top"] 
  },
  { 
    id: "legs_5", name: "Walking Knight Lunges", body_part: "legs", emoji: "🚶", 
    description: "Take big, majestic steps forward to strengthen your leg muscles until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Step forward with one foot and lower your back knee toward the ground until it almost touches. Push off that front foot to step forward with the other leg.",
    tips: ["Keep your front knee directly over your ankle, not shooting past your toes", "Keep your body tall and proud like a knight", "Take steps wide enough to keep your balance easily"] 
  },
  { 
    id: "legs_6", name: "Rocket Launch Calf Raises", body_part: "legs", emoji: "👟", 
    description: "Rise up onto your tiptoes to power up your rocket thrusters until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand tall with your feet close together. Lift up onto the very balls of your feet as high as you can go, hold for a second, then lower down slowly.",
    tips: ["Control your descent—don't just drop your heels down hard", "Keep your body tracking straight up without swaying forward", "Squeeze your calf muscles at the peak"] 
  },
  { 
    id: "legs_7", name: "Lateral Lunges", body_part: "legs", emoji: "🛹", 
    description: "Step directly out to the side to work your hip stability until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Start with feet together. Take a large step to the side, bending that knee and keeping your other leg completely straight. Push off the bent foot to return.",
    tips: ["Keep your trailing leg completely extended", "Keep both feet pointing forward", "Sit your hips back as you step out"] 
  },
  { 
    id: "legs_8", name: "Wall Sit Hold", body_part: "legs", emoji: "🧱", 
    description: "Press your back flat against a wall and hold a seated stance until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lean your back against a flat wall. Slide down until your knees form a 90-degree angle, keeping your thighs parallel to the floor.",
    tips: ["Keep your feet flat on the floor", "Do not use your hands to rest on your thighs", "Breathe slowly and steadily"] 
  },
  { 
    id: "legs_9", name: "Bodyweight Squats", body_part: "legs", emoji: "🏋️", 
    description: "Lower your hips down parallel to the floor and return to standing until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Stand with feet shoulder-width apart. Lower your hips back and down while keeping your chest upright, then drive through your heels to stand up.",
    tips: ["Keep your knees tracking over your toes", "Don't let your knees cower inward", "Keep your body weight centered in your heels"] 
  },

  // ================= CORE =================
  { 
    id: "core_1", name: "Dragon's Hold Forearm Plank", body_part: "core", emoji: "🧱", 
    description: "Protect your core fortress by holding a perfectly straight plank until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 75, reps: "75 seconds",
    how_to: "Rest your weight on your forearms and toes, elevating your entire body off the floor. Keep a perfectly straight line from head to heels.",
    tips: ["Squeeze your stomach like someone is about to tickle you", "Keep your eyes looking at the floor between your hands", "Don't let your lower back loop or sag"] 
  },
  { 
    id: "core_2", name: "Supersonic Bicycle Kicks", body_part: "core", emoji: "🚴", 
    description: "Lie on your back and pedal your imaginary rocket bike until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie flat on your back with your hands touching your ears. Lift your shoulders slightly, and pedal your legs while rotating your opposite elbow to your opposite knee.",
    tips: ["Don't pull on your neck with your hands", "Keep your lower back pressed firmly into the ground", "Slower, smoother movements make it work even harder!"] 
  },
  { 
    id: "core_3", name: "Abdominal Crunch Quest", body_part: "core", emoji: "🧘", 
    description: "Slide your hands up your legs to wake up your abdominal core until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie on your back with your knees bent and feet flat. Look up at the ceiling, lift your head and shoulders off the floor, sliding your hands to your knees.",
    tips: ["Exhale as you lift your upper body up", "Keep your lower back flat on the floor", "Do not pull your chin into your chest"] 
  },
  { 
    id: "core_4", name: "Dead Bug Matrix Hold", body_part: "core", emoji: "🐛", 
    description: "Keep your balance completely locked while alternate arms and legs lower until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie on your back with arms pointing to the sky and knees bent at 90 degrees in the air. Slowly lower one arm overhead while extending the opposite leg flat.",
    tips: ["Your lower back must stay completely glued to the floor", "Move slow like a video game in slow-motion", "Keep the non-moving limb perfectly still"] 
  },
  { 
    id: "core_5", name: "Superhero Flight Hold", body_part: "core", emoji: "🦸", 
    description: "Fly high through space by lifting your arms and legs off the mat until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie flat on your stomach. Reach your arms forward and legs back. At the same time, gently lift your chest, arms, and thighs off the floor and hold.",
    tips: ["Squeeze your back and glute muscles to lift higher", "Keep looking down at the mat so your neck stays comfortable", "Keep breathing smoothly—don't hold your breath!"] 
  },
  { 
    id: "core_6", name: "Astronaut Seated Twists", body_part: "core", emoji: "🌀", 
    description: "Balance on your tailbone and rotate from side to side until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Sit with your knees bent and feet flat or slightly hovering. Lean back slightly, clasp your hands, and rotate your upper shoulders to tap the floor on each side.",
    tips: ["Keep your chest lifted up high—don't slouch your back", "Follow your hands with your eyes to get a full twist", "Try lifting your feet off the floor for a legendary challenge!"] 
  },
  { 
    id: "core_7", name: "Side Plank Hold", body_part: "core", emoji: "📐", 
    description: "Prop yourself up on one elbow to challenge your obliques until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 75, reps: "75 seconds",
    how_to: "Lie on your side with feet stacked. Lift your hips up using your forearm as a base, keeping a straight body line. Switch sides halfway.",
    tips: ["Keep your elbow stacked under your shoulder", "Keep your hips lifted high away from the mat", "Engage your side torso muscles"] 
  },
  { 
    id: "core_8", name: "Flutter Kicks", body_part: "core", emoji: "🩲", 
    description: "Lie flat and toggle your legs up and down quickly until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie on your back, hands under your hips for support. Raise your feet slightly off the ground and alternate kicking them up and down in short, controlled motions.",
    tips: ["Keep your lower back flat on the ground", "Keep your legs straight", "Breathe smoothly"] 
  },
  { 
    id: "core_9", name: "Bird Dog", body_part: "core", emoji: "🐕", 
    description: "Extend opposite arms and legs out balanced on your knees until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Start on all fours. Extend your right arm straight forward while extending your left leg straight back at the same time. Alternate sides.",
    tips: ["Keep your torso flat and square to the floor", "Move with control", "Don't lift your leg higher than your hips"] 
  },

  // ================= FULL BODY =================
  { 
    id: "full_1", name: "Bear Crawl Adventure", body_part: "full_body", emoji: "🐻", 
    description: "Crawl smoothly across the room and back on your hands and toes until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Get on your hands and knees, then hover your knees just 2 centimeters off the ground. Move forward and backward by stepping with opposite hands and feet.",
    tips: ["Keep your knees very low to the ground", "Keep your hips flat and level like a table", "Look slightly forward, not down at your feet"] 
  },
  { 
    id: "full_2", name: "Burpee Blast Challenge", body_part: "full_body", emoji: "🔥", 
    description: "Drop, jump, and sky-leap as fast as you can to build full-body endurance until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Stand tall, squat down to place your hands on the floor, jump your feet back into a plank, jump your feet back in, then explode up with hands in the air.",
    tips: ["Land with soft knees when jumping up", "Keep your tummy muscles tight when your feet go back into the plank", "Find a matching rhythm you can keep up the whole time"] 
  },
  { 
    id: "full_3", name: "Supernova Star Jumps", body_part: "full_body", emoji: "🌟", 
    description: "Crouch low, then burst out into a huge mid-air star shape until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Start in a slight squat position with your hands tucked in. Spring explosively into the air, extending your arms and legs wide, snapping back together to land.",
    tips: ["Bend your knees generously as you land to protect your joints", "Try to jump as high as you can every single time", "Use your arms to help lift you up"] 
  },
  { 
    id: "full_4", name: "Inchworm Crawler", body_part: "full_body", emoji: "🐛", 
    description: "Hinge forward and walk your hands out into a plank, then back up until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Stand straight, reach down to touch the floor (bend knees slightly if needed). Walk your hands forward into a high plank, then walk your feet up to meet your hands.",
    tips: ["Take small, steady steps with your hands", "Keep your core solid when you reach the flat plank position", "Feel the excellent stretch in the back of your legs"] 
  },
  { 
    id: "full_5", name: "Mountain Climber Race", body_part: "full_body", emoji: "🧗", 
    description: "Drive your knees into your chest inside a plank position until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Get into a high plank position on your hands. Rapidly drive one knee up toward your chest, then switch legs back and forth like you are running up a mountain.",
    tips: ["Keep your shoulders directly over your wrists", "Keep your bottom down—don't let your hips form a mountain shape", "Breathe consistently through the movement"] 
  },
  { 
    id: "full_6", name: "Crab Scuttle Quest", body_part: "full_body", emoji: "🦀", 
    description: "Lift your hips up and scuttle around the floor like an agile beach crab until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Sit on the floor with knees bent and feet flat. Place your hands behind you and lift your bottom up into the air. Walk around using your hands and feet.",
    tips: ["Keep your hips pushed up high toward the roof", "Try moving sideways and backwards to test your coordination", "Keep your weight spread evenly between hands and feet"] 
  },
  { 
    id: "full_7", name: "Squat Thrusts", body_part: "full_body", emoji: "🐸", 
    description: "Jump your legs back and forward from a low squat position until the timer runs out!", 
    xp: 40, coins: 15, difficulty: "Hard", duration: 90, reps: "90 seconds",
    how_to: "Start in a low squat, hands planted flat on the floor. Jump your feet out back into a straight plank position, then instantly jump them back to your hands.",
    tips: ["Keep your shoulders stable and locked over your wrists", "Land flat on your feet during the forward jump", "Engage your core"] 
  },
  { 
    id: "full_8", name: "Plank to Downward Dog", body_part: "full_body", emoji: "🧘", 
    description: "Transition your body from a straight plank to an inverted V-shape stretch until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Start in a high plank. Push your hips back and up toward the ceiling, creating an inverted V-shape, then slide back out into a plank.",
    tips: ["Press through your palms firmly", "Let your neck relax between your shoulders", "Move slowly and fluidly"] 
  },
  { 
    id: "full_9", name: "Single-Leg Glute Bridges", body_part: "full_body", emoji: "🦵", 
    description: "Lift your hips up high using only one foot planted on the floor until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Lie on your back with knees bent. Lift one leg straight into the air and press through the opposite heel to elevate your hips. Switch halfway.",
    tips: ["Keep your lifted knee fully extended", "Keep your pelvis square and balanced", "Squeeze your bottom at the top"] 
  },

  // ================= CARDIO =================
  { 
    id: "cardio_1", name: "Speed Run Hyperdrive", body_part: "cardio", emoji: "🏃", 
    description: "Sprint on the spot at maximum turbo speed until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Run as fast as you can right on the spot. Tap your feet rapidly off the ground and pump your arms forward and back.",
    tips: ["Stay right on the springy balls of your feet", "Pump your arms fast—fast arms mean fast legs!", "Keep your eyes looking forward"] 
  },
  { 
    id: "cardio_2", name: "Emote Dance Party", body_part: "cardio", emoji: "🎶", 
    description: "Show off your favorite gaming victory dances completely free until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Put on an upbeat song or imagine your favorite beat. Jump, twist, move your arms, and dance around dynamically with full energy.",
    tips: ["There are no wrong moves—just keep your body moving!", "Try jumping and changing directions", "The sillier and more energetic the dance, the better the cardio"] 
  },
  { 
    id: "cardio_3", name: "Kangaroo Skip & Hop", body_part: "cardio", emoji: "🐰", 
    description: "Hop and skip around your workout area to build springy coordination until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Skip dynamically forward and backward around your space, bouncing off alternating feet, or try double hops on a single leg.",
    tips: ["Swing your arms forward to help you stay light", "Land quietly without making a loud sound on the floor", "Switch which foot leads to train your brain"] 
  },
  { 
    id: "cardio_4", name: "Floor Lava Agility Shuffles", body_part: "cardio", emoji: "📦", 
    description: "Step rapidly side-to-side to avoid the imaginary hot lava tiles until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Bend your knees slightly into an athletic stance. Take two quick side-steps to the right, touch the floor, then shuffle two quick steps to the left and touch.",
    tips: ["Keep your center of gravity low to the ground", "Don't cross your feet over each other while shuffling", "Move as quickly as your feet allow safely"] 
  },
  { 
    id: "cardio_5", name: "Invisible Jump Rope Arena", body_part: "cardio", emoji: "🪢", 
    description: "Spin an imaginary jump rope with your wrists and jump along until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Hold your hands out and rotate your wrists as if turning a real skipping rope. Jump continuously on the balls of your feet as the imaginary rope passes.",
    tips: ["Keep your jumps small—just a few centimeters off the floor", "Keep your elbows tucked into your sides; spin from your wrists", "Try hopping on one foot or criss-crossing your feet for bonus fun"] 
  },
  { 
    id: "cardio_6", name: "Ice Skater Lateral Leaps", body_part: "cardio", emoji: "⛸️", 
    description: "Leap gracefully side-to-side like a speedy winter athlete until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Leap sideways to the right, landing softly on your right foot while sweeping your left foot behind you, then leap back to the left foot.",
    tips: ["Swing your arms across your body to help drive your jump sideways", "Bend your landing knee to stay steady and absorb the impact", "Keep your chest up throughout the leap"] 
  },
  { 
    id: "cardio_7", name: "Line Hops", body_part: "cardio", emoji: "➖", 
    description: "Hop quickly back and forth over an imaginary line on the ground until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Find or imagine a straight line on the floor. Keep your feet close together and jump forward and backward over the line rapidly.",
    tips: ["Keep your knees flexible and soft", "Stay on your tiptoes for quick transitions", "Pump your arms to stay balanced"] 
  },
  { 
    id: "cardio_8", name: "Butt Kicks", body_part: "cardio", emoji: "🏃‍♀️", 
    description: "Jog in place while kicking your heels up backwards until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Run in place, but shift your focus to bringing your heels directly up toward your bottom with each step.",
    tips: ["Keep your posture tall", "Pump your arms in a natural running motion", "Land softly on the balls of your feet"] 
  },
  { 
    id: "cardio_9", name: "Shadow Jumping", body_part: "cardio", emoji: "👥", 
    description: "Follow a rhythmic rapid side-to-side standard pattern skip until the timer runs out!", 
    xp: 25, coins: 10, difficulty: "Medium", duration: 75, reps: "75 seconds",
    how_to: "Keep feet hip-width apart. Jump continuously from side to side over a wide imaginary space as quickly and safely as you can.",
    tips: ["Keep the contact time with the floor minimal", "Use your arms for lateral lift", "Breathe smoothly"] 
  },

  // ================= FLEXIBILITY =================
  { 
    id: "flex_1", name: "Flamingo Balance Quest", body_part: "flexibility", emoji: "🦩", 
    description: "Stand tall on one leg to test your balance focus until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand up straight. Lift one foot off the ground, bending your knee, and balance perfectly. Hold for 30 seconds, then switch legs when you hit halfway.",
    tips: ["Stare at a completely still spot on the floor or wall to keep steady", "Squeeze your tummy muscles to hold your center", "Keep a very tiny, soft bend in your standing knee"] 
  },
  { 
    id: "flex_2", name: "Reach for Stars Fold", body_part: "flexibility", emoji: "✨", 
    description: "Stretch up to the clouds, then fold forward to touch your sneakers until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand up straight, reach both arms up as high as possible. Slowly bend forward at your hips, reaching your hands down toward your toes. Rise up slowly and repeat.",
    tips: ["Move slowly—don't bounce up and down at the bottom", "Exhale fully as you reach toward the floor", "Bend your knees slightly if your leg muscles feel too tight"] 
  },
  { 
    id: "flex_3", name: "Cat & Cow Spine Stretch", body_part: "flexibility", emoji: "🐱", 
    description: "Move your back smoothly up and down to relax your spine until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Get onto your hands and knees on a comfortable mat. Arch your back up high like a scary cat, then gently drop your tummy down toward the floor like a heavy cow.",
    tips: ["Breathe out when you arch up; breathe in when you drop down", "Move slowly and feel each part of your back moving", "Keep your arms straight under your shoulders"] 
  },
  { 
    id: "flex_4", name: "Hula Hoop Hip Circles", body_part: "flexibility", emoji: "⭕", 
    description: "Make giant circles with your hips to unlock flexibility until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Stand with your feet wide apart and place your hands on your hips. Rotate your hips in a large circle. Switch directions halfway through.",
    tips: ["Make the circles as big as you can comfort-wise", "Keep your shoulders mostly still; only move from your waist down", "Imagine you are trying to spin a giant hula hoop"] 
  },
  { 
    id: "flex_5", name: "Butterfly Wing Stretch", body_part: "flexibility", emoji: "🦋", 
    description: "Sit down, bring your feet together, and stretch your leg muscles until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Sit flat on the floor, bring the soles of your shoes together, and let your knees fall out wide. Hold your ankles and gently sit tall.",
    tips: ["Sit up as tall as an upright arrow—don't slouch your shoulders", "Gently pull your chest forward slightly to feel a deeper stretch", "Never bounce your knees hard; treat them gently"] 
  },
  { 
    id: "flex_6", name: "Cobra Sun Salutation", body_part: "flexibility", emoji: "🐍", 
    description: "Lie down and look up to the sky to open up your chest and tummy until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Lie face down on your belly. Place your hands flat on the floor right under your shoulders. Gently press through your palms to lift your chest off the mat.",
    tips: ["Keep your hips resting on the floor", "Keep your shoulders down away from your ears", "Look slightly upward and breathe deeply through your nose"] 
  },
  { 
    id: "flex_7", name: "Seated Torso Twist", body_part: "flexibility", emoji: "🪑", 
    description: "Sit with legs extended straight and turn your chest right and left until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Sit upright with your legs pointing forward. Cross one foot over the opposite knee, hug that knee with your arm, and rotate your upper body backward.",
    tips: ["Keep your spine tall and straight", "Breathe out as you twist further into the stretch", "Don't force the joint"] 
  },
  { 
    id: "flex_8", name: "Overhead Arm Stretch", body_part: "flexibility", emoji: "🧣", 
    description: "Pull your elbow gently behind your head to stretch your arms until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Raise one arm overhead, bend the elbow to drop your hand behind your neck, and use your opposite hand to pull the elbow gently. Switch arms halfway.",
    tips: ["Keep your head looking forward, don't press your chin down", "Breathe normally", "Keep your shoulders down"] 
  },
  { 
    id: "flex_9", name: "Child's Pose", body_part: "flexibility", emoji: "🧎", 
    description: "Kneel and reach your hands out forward on the ground to relax until the timer runs out!", 
    xp: 15, coins: 5, difficulty: "Easy", duration: 60, reps: "60 seconds",
    how_to: "Kneel on the floor, sit your hips back onto your heels, and reach your arms straight forward along the mat, resting your forehead down.",
    tips: ["Sink your hips heavily into your heels", "Exhale and let your shoulders melt into the ground", "Deep abdominal breathing works best"] 
  }
];

export const BODY_PARTS = [
  { id: "arms", label: "Arms", emoji: "💪", color: "from-red-400 to-red-500" },
  { id: "legs", label: "Legs", emoji: "🦵", color: "from-blue-400 to-blue-500" },
  { id: "core", label: "Core", emoji: "🎯", color: "from-yellow-400 to-yellow-500" },
  { id: "full_body", label: "Full Body", emoji: "🏋️", color: "from-green-400 to-green-500" },
  { id: "cardio", label: "Cardio", emoji: "❤️", color: "from-pink-400 to-pink-500" },
  { id: "flexibility", label: "Flexibility", emoji: "🧘", color: "from-purple-400 to-purple-500" },
];

export const ACCESSORIES = [
  { id: "acc_crown", name: "Golden Crown", emoji: "👑", price: 50, category: "head" },
  { id: "acc_sunglasses", name: "Cool Shades", emoji: "😎", price: 30, category: "face" },
  { id: "acc_cape", name: "Super Cape", emoji: "🦸", price: 80, category: "back" },
  { id: "acc_star", name: "Star Badge", emoji: "⭐", price: 20, category: "badge" },
  { id: "acc_fire", name: "Fire Trail", emoji: "🔥", price: 100, category: "effect" },
  { id: "acc_rainbow", name: "Rainbow Aura", emoji: "🌈", price: 120, category: "effect" },
  { id: "acc_rocket", name: "Rocket Boots", emoji: "🚀", price: 90, category: "feet" },
  { id: "acc_sparkle", name: "Sparkle Wings", emoji: "✨", price: 150, category: "back" },
  { id: "acc_ninja", name: "Ninja Mask", emoji: "🥷", price: 60, category: "face" },
  { id: "acc_wizard", name: "Wizard Hat", emoji: "🧙", price: 70, category: "head" },
  { id: "acc_heart", name: "Heart Shield", emoji: "🛡️", price: 40, category: "badge" },
  { id: "acc_lightning", name: "Lightning Bolt", emoji: "⚡", price: 110, category: "effect" },
];

export function getDailyChallenges(dateStr, userEmail) {
  // Deterministic daily challenges based on date + user email for personalised randomness
  const emailSeed = (userEmail && typeof userEmail === 'string') 
    ? userEmail.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
    : 42;  
  const dateSeed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0);
  const seed = dateSeed + emailSeed;

  const shuffled = [...CHALLENGES].sort((a, b) => {
    const ha = ((seed * 31 + a.id.charCodeAt(0) * 17 + a.id.length * 7) % 100);
    const hb = ((seed * 31 + b.id.charCodeAt(0) * 17 + b.id.length * 7) % 100);
    return ha - hb;
  });

  // Return 3 challenges from different body parts
  const selected = [];
  const usedParts = new Set();
  for (const c of shuffled) {
    if (!usedParts.has(c.body_part) && selected.length < 3) {
      selected.push(c);
      usedParts.add(c.body_part);
    }
  }
  return selected;
}

export function getLevelFromXP(xp) {
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

export function getXPForLevel(level) {
  return Math.pow(level - 1, 2) * 50;
}

export function getXPForNextLevel(level) {
  return Math.pow(level, 2) * 50;
}