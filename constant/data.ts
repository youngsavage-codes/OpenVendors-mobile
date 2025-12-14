import { images } from "./images";

  export const cards = [
    {
      title: "Christmas Sale",
      description: "Celebrate the season with up to 50% off on all items!",
      imageUrl: images.ads1,
      discount: "50% OFF",
    },
    {
      title: "Winter Wig Wonderland",
      description:
        "Get the perfect winter look with our exclusive wig collection at 30% OFF!",
      imageUrl: images.ads2,
      discount: "30% OFF",
    },
    {
      title: "Flag Sale Frenzy",
      description:
        "Fly your pride high with 40% off on all flags! Perfect for any occasion.",
      imageUrl: images.ads3,
      discount: "40% OFF",
    },
    {
      title: "Black Friday Blowout",
      description:
        "Unbelievable deals across all categories! Don't miss out on our biggest sale of the year.",
      imageUrl: images.ads3,
      discount: "Up to 70% OFF",
    },
  ];

  export const vendorData = [
    {
      imageUrl: images.ads1,
      vendorName: "Jane Hairpire",
      location: "New York, USA",
      status: "Open",
      price: "49.99",
      imageStack: [images.ads2, images.ads3, images.ads2, images.ads2],
      isVerified: true,
    },
    {
      imageUrl: images.ads3,
      vendorName: "Glamour Styles",
      location: "Los Angeles, USA",
      status: "Closed",
      price: "39.99",
      imageStack: [images.ads3, images.ads2, images.ads1, images.ads2],
      isVerified: false,
    },
    {
      imageUrl: images.ads2,
      vendorName: "Glamour Styles",
      location: "Los Angeles, USA",
      status: "Open",
      price: "39.99",
      imageStack: [images.ads3, images.ads2, images.ads1, images.ads2],
      isVerified: true
    },
  ];

  export const myVendorData = [
  {
    id: 1,
    name: "Jane's Hairpire",
    services: ["Haircut", "Braiding"],
    image: images.ads1,
    rating: 4.5,
    fee: 50,
    verified: true,
  },
  {
    id: 2,
    name: "Beauty Lounge",
    services: ["Facial", "Massage"],
    image: images.ads2,
    rating: 4.2,
    fee: 70,
    verified: false,
  },
  {
    id: 3,
    name: "Glow Nails Studio",
    services: ["Manicure", "Pedicure"],
    image: images.ads3,
    rating: 4.8,
    fee: 60,
    verified: false,
  },
  {
    id: 4,
    name: "Fresh Cuts Barbershop",
    services: ["Haircut", "Shave"],
    image: images.hero2,
    rating: 4.0,
    fee: 45,
    verified: true,
  },
  {
    id: 5,
    name: "Elite Hair Studio",
    services: ["Haircut", "Hair Coloring"],
    image: images.hero,
    rating: 4.6,
    fee: 65,
    verified: true,
  },
  {
    id: 6,
    name: "Royal Spa Lounge",
    services: ["Facial", "Deep Massage"],
    image: images.hero1,
    rating: 4.3,
    fee: 80,
    verified: false,
  },
];

export const servicesData = [
  {
    category: "Hair Style",
    items: [
      {
        name: "African Braiding with Extensions",
        duration: "90 Min",
        price: "NGN 5,000",
        description: "Neat and long-lasting African braids done with quality extensions."
      },
      {
        name: "Full Weaving and Styling",
        duration: "120 Min",
        price: "NGN 7,000",
        description: "Professional weaving with a styled finish for a polished look."
      },
      {
        name: "Professional Hair Coloring & Highlights",
        duration: "150 Min",
        price: "NGN 6,000",
        description: "Vibrant hair coloring with highlights to enhance your beauty."
      },
      {
        name: "Precision Haircut & Blow Dry",
        duration: "60 Min",
        price: "NGN 3,500",
        description: "A stylish haircut followed by a smooth and bouncy blow dry."
      },
      {
        name: "Hair Relaxing & Straightening Treatment",
        duration: "180 Min",
        price: "NGN 8,000",
        description: "Chemical relaxing treatment for silky, straight hair."
      },
      {
        name: "Hair Treatment & Scalp Massage",
        duration: "75 Min",
        price: "NGN 4,000",
        description: "Deep treatment and relaxing scalp massage to restore hair health."
      }
    ]
  },

  {
    category: "Nails",
    items: [
      {
        name: "Classic Manicure with Nail Care",
        duration: "40 Min",
        price: "NGN 2,000",
        description: "Gentle nail cleaning, shaping, and polish application."
      },
      {
        name: "Deluxe Pedicure with Spa Treatment",
        duration: "60 Min",
        price: "NGN 2,500",
        description: "Foot soak, exfoliation, massage, and premium polish finish."
      },
      {
        name: "Gel Nail Art & Design",
        duration: "75 Min",
        price: "NGN 3,500",
        description: "Custom gel nail designs with long-lasting shine."
      },
      {
        name: "French Tip Manicure & Nail Polish",
        duration: "50 Min",
        price: "NGN 2,200",
        description: "Classic French tips with smooth and elegant polish."
      },
      {
        name: "Acrylic Nail Extensions with Design",
        duration: "90 Min",
        price: "NGN 4,000",
        description: "Durable acrylic extensions with optional nail art."
      },
      {
        name: "Nail Repair & Strengthening Treatment",
        duration: "30 Min",
        price: "NGN 1,500",
        description: "Nail repair session with strengthening serum treatment."
      }
    ]
  },

  {
    category: "Skincare",
    items: [
      {
        name: "Deep Cleansing Facial Treatment",
        duration: "60 Min",
        price: "NGN 4,000",
        description: "Removes impurities and revitalizes dull skin."
      },
      {
        name: "Aromatherapy Full Body Massage",
        duration: "90 Min",
        price: "NGN 6,500",
        description: "Relaxing massage using scented essential oils."
      },
      {
        name: "Full Body Waxing & Hair Removal",
        duration: "75 Min",
        price: "NGN 5,000",
        description: "Smooth full-body waxing using gentle techniques."
      },
      {
        name: "Hydrating Anti-Aging Facial",
        duration: "60 Min",
        price: "NGN 4,500",
        description: "Hydrating facial that reduces fine lines and boosts glow."
      },
      {
        name: "Detoxifying Mud & Scrub Body Treatment",
        duration: "90 Min",
        price: "NGN 6,000",
        description: "Mud mask and body scrub to cleanse and rejuvenate skin."
      },
      {
        name: "Skin Brightening & Rejuvenation Facial",
        duration: "60 Min",
        price: "NGN 4,800",
        description: "Brightening facial to improve tone and skin radiance."
      }
    ]
  }
];

export const vendors = [
  {
    id: 1,
    name: "Jane's Hairpire",
    about: "Jane's Hairpire offers premium hair styling services with a focus on quality and customer satisfaction.",
    image: images.ads1,
    categories: ["Spa", "Massage",],
    rating: 4.5,
    verified: true,
    imageUrl: images.ads1,
    vendorName: "Jane Hairpire",
    location: "New York, USA",
    status: "Open",
    price: "300",
    imageStack: [images.ads2, images.ads3, images.hero, images.hero2],
    isVerified: true,
    openingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    openingTime: "09:00 AM",
    closingTime: "08:00 PM",
    team: [
      { id: 1, name: "Jane Savage", role: "Stylist", image: images.hero2 },
      { id: 2, name: "John Daniel", role: "Assistant", image: images.hero1 },
    ],
    reviews: [
      { id: 1, user: "Alice", rating: 5, comment: "Amazing service!", image: images.ads1, date: "2025-12-01" },
      { id: 2, user: "Bob", rating: 4, comment: "Great experience.", image: images.ads3, date: "2025-12-03" },
    ],
    services: [
      {
        categoryId: 1,
        categoryName: "Hair Style",
        items: [
          {
            serviceId: 101,
            name: "African Braiding with Extensions",
            duration: "90 Min",
            price: "NGN 5,000",
            description: "Neat and long-lasting African braids done with quality extensions.",
          },
          {
            serviceId: 102,
            name: "Full Weaving and Styling",
            duration: "120 Min",
            price: "NGN 7,000",
            description: "Professional weaving with a styled finish for a polished look.",
          },
        ],
      },
      {
        categoryId: 2,
        categoryName: "Skincare",
        items: [
          {
            serviceId: 103,
            name: "Hydrating Anti-Aging Facial",
            duration: "60 Min",
            price: "NGN 4,500",
            description: "Hydrating facial that reduces fine lines and boosts glow.",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Glow Nails Studio",
    about: "Glow Nails Studio specializes in professional nail care, custom designs, and premium manicure/pedicure services.",
    image: images.ads3,
    categories: ["Salon", "Makeup"],
    rating: 4.8,
    verified: true,
    imageUrl: images.ads3,
    vendorName: "Glow Nails Studio",
    location: "Los Angeles, USA",
    status: "Open",
    price: "500.89",
    imageStack: [images.ads3, images.ads2, images.ads1, images.ads2],
    isVerified: true,
    openingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    openingTime: "10:00 AM",
    closingTime: "07:00 PM",
    team: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Nail Artist",
        image: images.ads2,

        rating: 4.9,
        yearsOfExperience: 6,

        address: "Glow Nails Studio, Los Angeles, USA",

        languages: ["English", "Spanish"],

        appointmentsCompleted: 1240,
        clientsServed: 980,

        availability: {
          status: "Available",
          workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          workingHours: {
            start: "10:00 AM",
            end: "07:00 PM",
          },
        },

        specialties: [
          "Gel Nail Art",
          "French Manicure",
          "Pedicure & Spa",
        ],

        reviews: [
          {
            id: 1,
            user: "Catherine",
            rating: 5,
            comment: "Perfect nails! Sarah is very detailed and friendly.",
            image: images.hero3,
            date: "2025-12-05",
          },
          {
            id: 2,
            user: "Daniel",
            rating: 4,
            comment: "Great experience, clean work and calm environment.",
            image: images.hero,
            date: "2025-12-07",
          },
        ],
      },

      {
        id: 2,
        name: "Emma Williams",
        role: "Nail Technician",
        image: images.ads3,

        rating: 4.6,
        yearsOfExperience: 3,

        address: "Glow Nails Studio, Los Angeles, USA",

        languages: ["English"],

        appointmentsCompleted: 620,
        clientsServed: 540,

        availability: {
          status: "Busy",
          workingDays: ["Mon", "Tue", "Thu", "Fri", "Sat"],
          workingHours: {
            start: "11:00 AM",
            end: "06:00 PM",
          },
        },

        specialties: [
          "Classic Manicure",
          "Nail Repair",
          "Polish & Care",
        ],

        reviews: [
          {
            id: 1,
            user: "Linda",
            rating: 5,
            comment: "Emma was gentle and very professional.",
            image: images.ads1,
            date: "2025-12-10",
          },
          {
            id: 2,
            user: "Mark",
            rating: 4,
            comment: "Good service, will book again.",
            image: images.ads2,
            date: "2025-12-12",
          },
        ],
      },
    ],
    reviews: [
      { id: 1, user: "Catherine", rating: 5, comment: "Perfect nails!", image: images.hero3, date: "2025-12-05" },
      { id: 2, user: "Daniel", rating: 4, comment: "Nice ambiance.", image: images.hero, date: "2025-12-07" },
    ],
    services: [
      {
        categoryId: 3,
        categoryName: "Nails",
        items: [
          {
            serviceId: 201,
            name: "Classic Manicure with Nail Care",
            duration: "40 Min",
            price: "NGN 2,000",
            description: "Gentle nail cleaning, shaping, and polish application.",
          },
          {
            serviceId: 202,
            name: "Gel Nail Art & Design",
            duration: "75 Min",
            price: "NGN 3,500",
            description: "Custom gel nail designs with long-lasting shine.",
          },
        ],
      },
    ],
  },
];
