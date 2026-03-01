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
    id: "the-mantis-shrimp",
    date: "2026-03-01",
    title: "The Mantis Shrimp: A Tiny Underwater Boxer",
    category: "Biology",
    content: [
      "The mantis shrimp is a small, incredibly colorful crustacean found in shallow tropical waters. But don't let its size fool you—it is one of the ocean's most formidable predators.",
      "What makes the mantis shrimp so special is its 'punch'. Its specialized front claws are spring-loaded and can strike with the speed of a .22 caliber bullet! This punch is so fast that it creates cavitation bubbles in the water, which collapse with a flash of light and intense heat, stunning or even killing its prey instantly.",
      "Besides their incredible strength, mantis shrimps also have some of the most complex eyes in the animal kingdom. While humans have three types of color-receptive cones, mantis shrimps have up to 16, allowing them to see a spectrum of light, including ultraviolet and polarized light, that we can't even imagine."
    ],
    reference: "https://oceanconservancy.org/blog/2020/01/29/mantis-shrimp/"
  }
];
