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
  }
];
