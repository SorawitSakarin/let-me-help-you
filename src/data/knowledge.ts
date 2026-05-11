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
