export interface KnowledgeTopic {
  id: string;
  date: string;
  title: string;
  category: string;
  content: string[];
  reference: string;
}

export const knowledgeData: KnowledgeTopic[] = [
  {
    id: "james-webb-telescope",
    date: "2024-05-20",
    title: "The James Webb Space Telescope: Seeing Back in Time",
    category: "Space",
    content: [
      "The James Webb Space Telescope (JWST) is the largest and most powerful space telescope ever built. Unlike the Hubble telescope, which mostly sees visible light, JWST sees the universe in infrared light.",
      "Because light takes time to travel through space, looking at distant stars and galaxies is like looking back in time. JWST is so powerful that it can see light from the very first galaxies that formed after the Big Bang, over 13 billion years ago!",
      "It uses a giant mirror made of 18 hexagonal pieces coated in gold, and a tennis-court-sized sunshield to keep its instruments incredibly cold. This cold is necessary to detect the faint infrared light from the distant universe without its own heat getting in the way."
    ],
    reference: "https://webb.nasa.gov/"
  },
  {
    id: "how-bees-make-honey",
    date: "2024-05-21",
    title: "How Do Bees Make Honey?",
    category: "Biology",
    content: [
      "Honey making is a fascinating team effort! It starts with forager bees visiting flowers and drinking sweet liquid called nectar. They store this nectar in a special extra stomach called a 'crop'.",
      "When the forager bee returns to the hive, it passes the nectar to a worker bee. The worker bees chew the nectar for about half an hour. During this time, enzymes in the bees' mouths break down the complex sugars in the nectar into simple sugars. This makes it easier to digest and helps prevent bacteria from growing.",
      "The bees then spread the watery nectar into the honeycomb. To turn it into thick honey, they fan the honeycomb with their wings to evaporate the water. Once it's thick enough, they seal the comb with a wax lid to store it for winter!"
    ],
    reference: "https://www.natgeokids.com/uk/discover/animals/insects/honey-bees/"
  },
  {
    id: "the-rosetta-stone",
    date: "2024-05-22",
    title: "The Rosetta Stone: Unlocking Ancient Egypt",
    category: "History",
    content: [
      "For hundreds of years, the ancient Egyptian writing system, known as hieroglyphs, was a complete mystery. Nobody knew how to read the pictures carved into the ancient temples and tombs.",
      "That changed in 1799 when French soldiers in Egypt discovered a broken slab of black rock. This rock, called the Rosetta Stone, had the exact same message carved into it in three different scripts: Ancient Egyptian hieroglyphs, Demotic (the everyday Egyptian script), and Ancient Greek.",
      "Because scholars could still read Ancient Greek, they were able to use it as a key to figure out what the hieroglyphs meant. This breakthrough finally allowed historians to understand the language and history of ancient Egypt!"
    ],
    reference: "https://www.britishmuseum.org/about-us/british-museum-story/objects-unlock-history/rosetta-stone"
  },
  {
    id: "how-do-chameleons-change-color",
    date: "2024-05-23",
    title: "How Do Chameleons Change Color?",
    category: "Biology",
    content: [
      "Many people think chameleons change color to match their surroundings, but that's actually a myth! They primarily change color to regulate their body temperature or communicate their mood to other chameleons.",
      "Chameleons have special cells in their skin called chromatophores. These cells contain different pigments. For example, xanthophores have yellow and red pigments, and melanophores contain black melanin pigment.",
      "Underneath these are iridophores, which contain transparent crystals that reflect and scatter light to create blue and white colors. By stretching or shrinking their skin, chameleons change how these crystals are spaced. This alters how light reflects off them, mixing with the other pigments to produce the vibrant colors we see in the blink of an eye!"
    ],
    reference: "https://findanexpert.unimelb.edu.au/news/2868-how-do-chameleons-and-other-creatures-change-colour%3F" 
  },
  {
    id: "ai-nobel-prize-chemistry-2024",
    date: "2024-10-09",
    title: "How AI Cracked the Code of Life's Building Blocks",
    category: "Technology",
    content: [
      "For over 50 years, scientists have been trying to solve a huge puzzle: how do proteins, the tiny machines that make our bodies work, fold into their complex 3D shapes? A protein's shape determines what it does, from building muscles to fighting diseases.",
      "In 2024, the Nobel Prize in Chemistry was awarded partly to scientists who used Artificial Intelligence (AI) to solve this puzzle. Demis Hassabis and John Jumper created an AI program called AlphaFold2.",
      "AlphaFold2 learned from known protein structures and became so smart it can now predict the 3D shape of almost all the 200 million proteins known to science! This amazing breakthrough is helping researchers design new medicines and understand diseases much faster than ever before."
    ],
    reference: "https://www.nobelprize.org/prizes/chemistry/2024/popular-information/"
  },
  {
    id: "ocean-plants-oxygen",
    date: "2026-03-04",
    title: "Where Does Earth's Oxygen Come From?",
    category: "Earth & Science",
    content: [
      "Ocean plants make about half of Earth's oxygen."
    ],
    reference: "https://www.dreambox.com/math/guides/fun-facts-for-kids"
  },
  {
    id: "what-does-space-smell-like",
    date: "2026-03-05",
    title: "What Does Outer Space Smell Like?",
    category: "Space",
    content: [
      "You might think space has no smell at all because it's a vacuum. But astronauts who have gone on spacewalks report a very distinct odor when they return to the space station.",
      "They describe the smell as being similar to hot metal, burnt steak, and welding fumes. This is because particles from space, including highly reactive atomic oxygen, cling to their spacesuits.",
      "When the astronauts repressurize the airlock and take off their helmets, these particles mix with the air and create the unique 'smell of space'. The odors are also related to dying stars called polycyclic aromatic hydrocarbons!"
    ],
    reference: "https://www.smithsonianmag.com/smart-news/what-does-space-smell-like-3457620/"
  },
  {
    id: "what-is-a-black-hole",
    date: "2026-03-19",
    title: "What is a Black Hole?",
    category: "Space",
    content: [
      "A black hole is a place in space where gravity pulls so much that even light cannot get out. The gravity is incredibly strong because a massive amount of matter has been squeezed into a tiny space. This often happens when a large star is dying.",
      "Because no light can escape them, black holes are completely invisible to us. However, scientists can find them using special space telescopes. These telescopes observe how stars and gas act differently when they are very close to a black hole.",
      "Black holes can be big or small. The smallest ones might be as tiny as a single atom, but they weigh as much as a large mountain! The biggest ones are called 'supermassive' black holes, and they are found at the center of almost every large galaxy, including our own Milky Way."
    ],
    reference: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-a-black-hole-k4.html"
    },
  {
    id: "the-mariana-trench",
    date: "2026-03-20",
    title: "How Deep is the Mariana Trench?",
    category: "Earth & Science",
    content: [
      "The Mariana Trench is the deepest known oceanic trench on Earth, located in the western Pacific Ocean. Its deepest point, called Challenger Deep, reaches a staggering depth of about 36,000 feet (11,000 meters). To put that into perspective, if you placed Mount Everest at the bottom, its peak would still be over a mile underwater!",
      "At the bottom of the trench, the conditions are extreme. The temperature is just above freezing, and the water pressure is over 1,000 times greater than the standard atmospheric pressure at sea level. That's equivalent to having the weight of about 50 jumbo jets pressing down on a person.",
      "Despite the freezing temperatures, complete darkness, and crushing pressure, life still finds a way to survive. Scientists have discovered unique creatures, including single-celled organisms, specialized fish, and even microbes that thrive near hydrothermal vents that release hot, mineral-rich water. Because of its unique environment, it was established as a US National Monument in 2009."
    ],
    reference: "https://www.fisheries.noaa.gov/pacific-islands/habitat-conservation/mariana-trench-marine-national-monument"
    },
  {
    id: "tardigrades-toughest-animals",
    date: "2026-03-21",
    title: "Tardigrades: The Toughest Animals on Earth",
    category: "Biology",
    content: [
      "Tardigrades, also known as water bears, are microscopic eight-legged animals that look like tiny, pudgy bears. Even though they are usually less than a millimeter long, they are famous for being nearly indestructible.",
      "These amazing creatures can survive in the most extreme conditions where almost nothing else can live. They can handle freezing temperatures near absolute zero, boiling heat, the crushing pressure of the deep ocean, and even the dangerous radiation of outer space!",
      "Their secret weapon is a state called 'cryptobiosis'. When their environment gets too tough, they curl up into a dry ball called a 'tun' and their metabolism slows down to almost nothing. They can stay in this suspended state for decades until conditions improve and they rehydrate and wake up."
    ],
    reference: "https://www.nationalgeographic.com/animals/invertebrates/facts/tardigrades-water-bears"
    },
  {
    id: "the-mariana-trench",
    date: "2026-03-25",
    title: "The Deepest Place on Earth: The Mariana Trench",
    category: "Earth & Science",
    content: [
      "The Mariana Trench is the deepest place in the world's oceans, located in the western Pacific Ocean. Its deepest point, called Challenger Deep, reaches down over 35,000 feet (10,500 meters) into the dark waters.",
      "To put that into perspective, if you took Mount Everest, the tallest mountain on land, and dropped it right into the Mariana Trench, the peak would still be completely covered by more than a mile of water!",
      "Even though it is pitch black, extremely cold, and the water pressure is incredibly high, life still finds a way. Scientists have discovered amazing and strange creatures living down there, like tiny crustaceans and glowing fish, that have adapted to survive in one of the most extreme environments on our planet."
    ],
    reference: "https://kids.britannica.com/students/article/Mariana-Trench/632233"
  },
  {
    id: "how-do-airplanes-fly",
    date: "2026-04-04",
    title: "How Do Airplanes Fly?",
    category: "Technology",
    content: [
      "Have you ever wondered how a huge, heavy metal airplane can stay up in the sky? It's all thanks to the special shape of its wings and a push from its engines.",
      "Airplane wings are curved on the top and flatter on the bottom. This shape is called an airfoil. When the plane moves forward, the air rushing over the top of the wing has to travel faster than the air moving under it.",
      "According to science, faster-moving air has lower pressure than slower-moving air. So, the higher pressure under the wing pushes up against the lower pressure above it. This upward push is called 'lift', and it's what keeps the airplane in the air!"
    ],
    reference: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-aerodynamics-k4.html"
    id: "how-do-birds-fly",
    date: "2026-04-05",
    title: "How Do Birds Fly?",
    category: "Biology",
    content: [
      "Birds have several special adaptations that help them fly. First, they have very light, hollow bones which make their bodies much lighter than they appear.",
      "Their wings are shaped like an airplane's wings - curved on top and flat on the bottom. As a bird flies, air moves faster over the top of the wing, which creates an upward push called 'lift'.",
      "They also have incredibly strong chest muscles to flap their wings, and an extra-large breathing system to give them the energy they need to stay in the air!"
    ],
    reference: "https://www.sciencelearn.org.nz/resources/303-how-birds-fly"  }
    id: "why-do-we-have-leap-years",
    date: "2026-04-06",
    title: "Why Do We Have Leap Years?",
    category: "Earth & Science",
    content: [
      "A normal year has 365 days, which is about the time it takes for Earth to orbit the Sun once. However, it actually takes Earth about 365.24 days—roughly 365 and a quarter days—to complete its journey around the Sun.",
      "If we didn't add an extra day every four years, our calendar would slowly fall out of sync with the seasons. After a hundred years, summer would start almost a month later than it should!",
      "To keep our calendar matched with the seasons, we add an extra day to February every four years, creating a 366-day year called a leap year. This makes sure our seasons always happen at the right time of the year."
    ],
    reference: "https://spaceplace.nasa.gov/leap-year/en/"
  }];
    id: "why-do-cats-purr",
    date: "2026-04-10",
    title: "Why Do Cats Purr?",
    category: "Biology",
    content: [
      "A purr or whirr is a tonal fluttering sound made by some species of felids, including both larger, wild cats and the domestic cat.",
      "Animals purr for a variety of reasons, including to express happiness or fear, and as a defense mechanism.",
      "It has also been shown that cats purr to manage pain and soothe themselves. It varies in loudness and tone among species and in the same animal."
    ],
    reference: "https://en.wikipedia.org/wiki/Purr"
    id: "why-flamingos-stand-on-one-leg",
    date: "2026-04-12",
    title: "Why Do Flamingos Stand on One Leg?",
    category: "Biology",
    content: [
      "Flamingos usually stand on one leg with the other tucked beneath their body. While the exact reason isn't completely known, scientists have a few good theories!",
      "One main theory is that standing on one leg helps them keep warm. Since they spend a lot of time wading in cold water, tucking one leg up helps them save body heat.",
      "Another interesting theory is that it actually takes less energy for them to stand on one leg! Studies have shown that their special joints lock into place, allowing them to balance perfectly on one leg without using their muscles much at all."
    ],
    reference: "https://en.wikipedia.org/wiki/Flamingo"  }
    id: "venus-day-longer-than-year",
    date: "2026-03-26",
    title: "A Day on Venus is Longer Than a Year",
    category: "Space",
    content: [
      "Did you know that a day on Venus lasts longer than a whole year on Venus? It sounds impossible, but it's true! This happens because Venus spins incredibly slowly.",
      "It takes Venus about 243 Earth days to spin around just one time. That is one Venusian day. However, it only takes 225 Earth days for Venus to go all the way around the Sun. That is one Venusian year.",
      "This means that Venus completes its trip around the Sun faster than it spins around on its own axis. On top of that, Venus spins backwards compared to most other planets, so the Sun rises in the west and sets in the east!"
    ],
    reference: "https://spaceplace.nasa.gov/all-about-venus/"
  }];
    id: "why-do-leaves-change-color-in-fall",
    date: "2026-03-26",
    title: "Why Do Leaves Change Color in the Fall?",
    category: "Earth & Science",
    content: [
      "The main reason for the eye-popping color change is not autumn's chilly weather but sunlight—or rather, the lack of daylight. As the autumn days shrink, the reduced daylight tells deciduous plants that it's time to stop gathering energy and get ready for the dormant season—winter.",
      "All leaves contain different types of chemicals; one of these chemicals, chlorophyll, is responsible for absorbing sunlight and giving leaves their green color. The combination of reduced light, lack of nutrients, and less water triggers the trees to start the process of breaking down the chlorophyll, and the green color fades.",
      "Once the waning hours of daylight trigger these changes and the green chlorophyll is gone, other pigments reveal their bright faces! Carotenoids give leaves their brilliant yellow and orange colors. Anthocyanins are found in deep red and purplish leaves."
    ],
    reference: "https://www.almanac.com/why-do-leaves-change-color-fall"
    id: "how-does-e-ink-work",
    date: "2026-03-26",
    title: "How Does E-Ink Work?",
    category: "Technology",
    content: [
      "Electronic paper, also known as e-ink, is the technology behind glare-free e-reader screens and digital signs. It mimics the appearance of ordinary ink on paper, making it very easy on the eyes and visible even in direct sunlight.",
      "An e-ink screen is made up of millions of tiny capsules, each about as wide as a human hair. Inside these capsules are clear fluid and tiny colored particles, usually black and white. The white particles have a positive charge, and the black particles have a negative charge.",
      "When a positive or negative electric charge is applied to the screen, the charged particles move to the top or bottom of the capsule. This makes the surface look black or white in that spot. E-ink is also bistable, meaning once the particles move, they stay there without needing power, making the screen highly energy-efficient!"
    ],
    reference: "https://www.visionect.com/blog/electronic-paper-explained-what-is-it-and-how-does-it-work/"  }
    id: "autumn-leaf-color",
    date: "2026-04-18",
    title: "Autumn leaf color",
    category: "Biology",
    content: [
      "Autumn leaf color is a phenomenon that affects the normally green leaves of many deciduous trees and shrubs by which they take on, during a few weeks in the autumn season, various shades of yellow, orange, red, purple, and brown.",
      "The phenomenon is commonly called autumn colours or autumn foliage in British English and fall colors, fall foliage, or simply foliage in American English."
    ],
    reference: "https://en.wikipedia.org/wiki/Autumn_leaf_color"
  }];
    id: "how-active-noise-cancellation-works",
    date: "2026-04-17",
    title: "How Active Noise Cancellation Works",
    category: "Technology",
    content: [
      "Active Noise Cancellation (ANC) works similarly to a game of tug of war. If two teams tug with the same force, the rope won’t move in either direction because each team’s strength is canceled out. Soundwaves work in a similar way: If one sound wave meets another soundwave that’s the same in frequency and opposite in amplitude, the two sounds will cancel each other out.",
      "Headphones with ANC use tiny microphones inside the ear cups to continuously analyze the sound of your surrounding environment.",
      "The microphones identify the frequency and amplitude of the external sounds, then ANC uses this information to create a soundwave that’s the exact opposite. This contrasting soundwave gets played through the internal drivers on your headphones and, voilà, the unwanted noise is eliminated."
    ],
    reference: "https://www.sonos.com/blog/how-does-noise-canceling-work"
    id: "the-wood-wide-web",
    date: "2026-04-19",
    title: "The Wood Wide Web: How Trees Talk to Each Other",
    category: "Biology",
    content: [
      "For centuries, forests were viewed as collections of individual trees competing for resources. However, groundbreaking research over the past few decades has revealed a complex network of communication and resource sharing among trees, dubbed the “Wood Wide Web.”",
      "At the heart of the Wood Wide Web are so-called mycorrhizal fungi, which form symbiotic relationships with tree roots. These fungi extend their thread-like hyphae, feathery filaments making up fungi, far into the soil, connecting different trees and creating a vast underground network.",
      "These fungal networks serve as conduits for the exchange of water, carbon, nitrogen, and other nutrients between trees. The symbiosis is mutually beneficial: trees provide carbohydrates to the fungi, while the fungi enhance the trees' ability to absorb water and nutrients from the soil."
    ],
    reference: "https://www.ecomatcher.com/understanding-the-wood-wide-web/"  }
    id: "fireflies",
    date: "2026-03-26",
    title: "Fireflies",
    category: "Biology",
    content: [
      "Fireflies are a family of beetles called the Lampyridae. These beetles are special in that most of them have bioluminescence, the ability to produce light.",
      "Adults use flashes of light to attract mates. Also, firefly larvae flash their lights to warn predators that they are not a tasty meal. Many predators do not like the taste of firefly larvae."
    ],
    reference: "https://simple.wikipedia.org/wiki/Firefly"
  }];
    id: "the-moon",
    date: "2026-04-22",
    title: "Moon",
    category: "Space",
    content: [
      "The Moon, also known as Luna, is Earth's only natural satellite (the only object which orbits the Earth and is not man-made). It is usually visible in the night sky, but is sometimes seen during the day.",
      "The Moon is about one-fourth of the width of Earth. Because it is so far away it looks small in the sky, about half a degree wide.",
      "The gravity on the Moon is one-sixth of the Earth's gravity. It means that an object will be one-sixth as heavy on the Moon compared to Earth. ",
      "The Moon is a rocky and dusty place. It moves slowly away from the Earth at a rate of 3.8 centimeters per year due to the effect of tidal dissipation.",
      "Some other planets also have moons or natural satellites. The giant impact hypothesis is a common explanation for how the Moon formed."
    ],
    reference: "https://simple.wikipedia.org/wiki/Moon"
    id: "solar-eclipse",
    date: "2026-03-26",
    title: "What is a Solar Eclipse?",
    category: "Space",
    content: [
      "As seen from earth, a solar eclipse /ee-klips/ happens when the moon is directly between the earth and the sun. This makes the moon fully or partially (partly) cover the sun. Solar eclipses can only happen during a new moon. Every year there are about two solar eclipses. Sometimes there are even five solar eclipses in a year. However, only two of these can be total solar eclipses, and often a year will pass without a total eclipse.",
      "The area in which an eclipse is total is only a narrow track along the earth. Totality lasts only a few minutes. Outside this path, all eclipses are partial, and places far from the track get no eclipse at all. The track can be predicted many years before it happens.",
      "A total solar eclipse is a natural phenomenon (event). Long ago, solar eclipses were thought to happen because of something supernatural or as a sign that something bad was going to happen. This is still believed in some cultures today. A total solar eclipse can frighten people who do not know what it means, because the sun seems to disappear during the day and the sky turns dark in just a few minutes. Other people like to go to the eclipse path for a good view while wearing special glasses."
    ],
    reference: "https://simple.wikipedia.org/wiki/Solar_eclipse"  }
    id: "the-platypus-mammal",
    date: "2026-03-26",
    title: "The Platypus: An Unusual Egg-Laying Mammal",
    category: "Biology",
    content: [
      "The platypus (Ornithorhynchus anatinus), sometimes referred to as the duck-billed platypus, is a small egg laying mammal.",
      "The platypus is one of the few mammals that does not have a stomach. In most animals, the stomach uses strong acids and enzymes to break down food. However, in the platypus, the esophagus connects directly to the intestines.",
      "These mammals are called monotremes because they have a common rear opening, the cloaca. Through this opening faeces and urine are voided (put out), and sexual activity takes place."
    ],
    reference: "https://simple.wikipedia.org/wiki/Platypus"
  }];
    id: "the-great-barrier-reef",
    date: "2026-03-26",
    title: "The Great Barrier Reef",
    category: "Earth & Science",
    content: [
      "The Great Barrier Reef is the world's largest coral reef stretching over 1,400 miles. It is near the coast of Queensland, Australia. It is made up of nearly 2900 coral reefs and over 600 islands.",
      "The reef is about 327,800km2 big and 2,600km long, and has been listed an important World Heritage Site by UNESCO.",
      "The Great Barrier Reef is the biggest structure made by living things. It can be seen from outer space. The Reefs are threatened.",
      "The biggest threat to the Great Barrier Reef today is coral bleaching caused by high sea water temperatures as a result of global warming.",
      "During 2016, the worst die-off ever recorded occurred, due to seas warming around the Great Barrier Reef. Two-thirds of a 700-km (435 miles) stretch of coral in nine months were killed."
    ],
    reference: "https://simple.wikipedia.org/wiki/Great_Barrier_Reef"
    id: "what-are-dinosaurs",
    date: "2026-03-26",
    title: "What are Dinosaurs?",
    category: "History",
    content: [
      "Dinosaurs are a group of Archosaur reptiles of the clade Dinosauria. Dinosaurs eventually gave rise to birds. Dinosaurs were the most powerful land animals of the Mesozoic era. Over 500 different genera of dinosaurs are known. Fossils of dinosaurs have been found on every continent.",
      "Dinosaurs evolved in the Upper Triassic, about 230 million years ago (mya). The earliest date of a fossil is that of Eoraptor and Herrerasaurus from Argentina, and Saturnalia from Brazil, 237 to 228 mya. By the early Jurassic they were the top land vertebrates, and dominated most environments on land.",
      "From the fossil record, it is known that birds are living feathered dinosaurs. They evolved from earlier theropods during the later Jurassic. They were the only line of dinosaurs to survive to the present day."
    ],
    reference: "https://simple.wikipedia.org/wiki/Dinosaur"  }
    id: "jupiter",
    date: "2026-03-26",
    title: "Jupiter",
    category: "Space",
    content: [
      "Jupiter is the largest planet in the Solar System. It is the fifth planet from the Sun. Jupiter is a gas giant because it is large and made mostly of gas.",
      "Jupiter was discovered by Galileo Galilei in 1610 with a small telescope. The planet has a Great Red Spot which is located at 22 degrees south of Jupiter's equator. The great red spot produces wind-speeds up to 432 km/h (268 mph).",
      "By mass, Jupiter's atmosphere is around 76% hydrogen and 24% helium. However, since helium atoms are larger than hydrogen molecules, Jupiter's upper atmosphere is about 90% hydrogen and 10% helium by volume."
    ],
    reference: "https://simple.wikipedia.org/wiki/Jupiter"
  }];
    id: "what-are-dinosaurs",
    date: "2026-03-26",
    title: "What are Dinosaurs?",
    category: "Biology",
    content: [
      "Dinosaurs are a group of Archosaur reptiles of the clade Dinosauria. Dinosaurs eventually gave rise to birds.",
      "Dinosaurs were the most powerful land animals of the Mesozoic era. Over 500 different genera of dinosaurs are known. Fossils of dinosaurs have been found on every continent.",
      "From the fossil record, it is known that birds are living feathered dinosaurs. They evolved from earlier theropods during the later Jurassic. They were the only line of dinosaurs to survive to the present day."
    ],
    reference: "https://simple.wikipedia.org/wiki/Dinosaur"
    id: "the-great-pyramid-of-giza",
    date: "2026-03-26",
    title: "The Great Pyramid of Giza",
    category: "History",
    content: [
      "The Great Pyramid of Giza is a huge pyramid built by the Ancient Egyptians over 4,500 years ago. It stands 18.4 km from Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain mostly intact.",
      "When it was built, the Great Pyramid was 146.5 metres (481 feet) tall. It was the tallest building in the world for over 3,800 years.  Erosion and other causes have shrunk it to 138.8 metres (455.4 feet)."
    ],
    reference: "https://simple.wikipedia.org/wiki/Great_Pyramid_of_Giza"  }
];
    id: "octopus-facts",
    date: "2026-03-26",
    title: "Octopus: The Eight-Armed Wonder",
    category: "Biology",
    content: [
      "Octopus  is a genus of cephalopod mollusc in the order Octopoda. The genus is quite typical of most octopods. They have two, large eyes and eight limbs with suckers. They have a hard beak, with the mouth at the center point of the arms.",
      "Octopods have no internal or external skeleton, allowing them to squeeze through tight places and hide. Many stays in cracks between rocks or corals when they are not hunting. They are intelligent predators with a taste for crabs.  Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.",
      "Octopods inhabit many regions of the ocean, especially coral reefs. For defense against predators, they hide, flee quickly, expel ink, or use colour-changing camouflage. They live rather short lives.",
      "An octopus trails its eight arms behind it as it swims. All octopods are venomous, but only the small blue-ringed octopus is known to be deadly to humans.",
      "There are about 300 octopod species, of which more than 100 are in the genus Octopus. Octopods make up over one-third of the total number of living cephalopods. The term 'octopus' may be used to refer to those in the genus Octopus. The term 'octopod' is correct for members of the order Octopoda in general."
    ],
    reference: "https://simple.wikipedia.org/wiki/Octopus"
  }
];