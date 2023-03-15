import { IRoundProps } from "react-brackets"

export const mockTeams = [
    { team_id: 333, team_slot: 0, team_name: 'Alabama', team_region: 'South', team_rating: 92.24 },
    { team_id: 357, team_slot: 2, team_name: 'Texas A&M-Corpus Christi', team_region: 'South', team_rating: 69.92 },
    { team_id: 2546, team_slot: 3, team_name: 'Southeast Missouri State', team_region: 'South', team_rating: 67.7 },
    { team_id: 120, team_slot: 4, team_name: 'Maryland', team_region: 'South', team_rating: 84.48 },
    { team_id: 277, team_slot: 6, team_name: 'West Virginia', team_region: 'South', team_rating: 84.14 },
    { team_id: 21, team_slot: 8, team_name: 'San Diego State', team_region: 'South', team_rating: 86.07 },
    { team_id: 232, team_slot: 10, team_name: 'College of Charleston', team_region: 'South', team_rating: 79.76 },
    { team_id: 258, team_slot: 12, team_name: 'Virginia', team_region: 'South', team_rating: 83.81 },
    { team_id: 231, team_slot: 14, team_name: 'Furman', team_region: 'South', team_rating: 78.22 },
    { team_id: 156, team_slot: 16, team_name: 'Creighton', team_region: 'South', team_rating: 87.54 },
    { team_id: 152, team_slot: 18, team_name: 'North Carolina State', team_region: 'South', team_rating: 81.44 },
    { team_id: 239, team_slot: 20, team_name: 'Baylor', team_region: 'South', team_rating: 87.12 },
    { team_id: 2540, team_slot: 22, team_name: 'UC-Santa Barbara', team_region: 'South', team_rating: 75.51 },
    { team_id: 142, team_slot: 24, team_name: 'Missouri', team_region: 'South', team_rating: 81.39 },
    { team_id: 328, team_slot: 26, team_name: 'Utah State', team_region: 'South', team_rating: 83.49 },
    { team_id: 12, team_slot: 28, team_name: 'Arizona', team_region: 'South', team_rating: 88.98 },
    { team_id: 163, team_slot: 30, team_name: 'Princeton', team_region: 'South', team_rating: 74.83 },
    { team_id: 2509, team_slot: 32, team_name: 'Purdue', team_region: 'East', team_rating: 89.6 },
    { team_id: 2640, team_slot: 34, team_name: 'Texas Southern', team_region: 'East', team_rating: 66.56 },
    { team_id: 161, team_slot: 35, team_name: 'Fairleigh Dickinson', team_region: 'East', team_rating: 64.39 },
    { team_id: 235, team_slot: 36, team_name: 'Memphis', team_region: 'East', team_rating: 84.18 },
    { team_id: 2226, team_slot: 38, team_name: 'Florida Atlantic', team_region: 'East', team_rating: 82.56 },
    { team_id: 150, team_slot: 40, team_name: 'Duke', team_region: 'East', team_rating: 87.13 },
    { team_id: 198, team_slot: 42, team_name: 'Oral Roberts', team_region: 'East', team_rating: 79.18 },
    { team_id: 2633, team_slot: 44, team_name: 'Tennessee', team_region: 'East', team_rating: 86.87 },
    { team_id: 309, team_slot: 46, team_name: 'Louisiana-Lafayette', team_region: 'East', team_rating: 76.36 },
    { team_id: 96, team_slot: 48, team_name: 'Kentucky', team_region: 'East', team_rating: 86.03 },
    { team_id: 2507, team_slot: 50, team_name: 'Providence', team_region: 'East', team_rating: 82.78 },
    { team_id: 2306, team_slot: 52, team_name: 'Kansas State', team_region: 'East', team_rating: 84.46 },
    { team_id: 147, team_slot: 54, team_name: 'Montana State', team_region: 'East', team_rating: 75.32 },
    { team_id: 127, team_slot: 56, team_name: 'Michigan State', team_region: 'East', team_rating: 83.82 },
    { team_id: 30, team_slot: 58, team_name: 'Southern California', team_region: 'East', team_rating: 83.05 },
    { team_id: 269, team_slot: 60, team_name: 'Marquette', team_region: 'East', team_rating: 87.59 },
    { team_id: 261, team_slot: 62, team_name: 'Vermont', team_region: 'East', team_rating: 76.24 },
    { team_id: 2305, team_slot: 64, team_name: 'Kansas', team_region: 'West', team_rating: 89.61 },
    { team_id: 47, team_slot: 66, team_name: 'Howard', team_region: 'West', team_rating: 69.29 },
    { team_id: 8, team_slot: 68, team_name: 'Arkansas', team_region: 'West', team_rating: 85.12 },
    { team_id: 356, team_slot: 70, team_name: 'Illinois', team_region: 'West', team_rating: 84.54 },
    { team_id: 2608, team_slot: 72, team_name: 'Saint Marys (CA)', team_region: 'West', team_rating: 85.87 },
    { team_id: 2670, team_slot: 74, team_name: 'Virginia Commonwealth', team_region: 'West', team_rating: 81.35 },
    { team_id: 41, team_slot: 76, team_name: 'Connecticut', team_region: 'West', team_rating: 89.23 },
    { team_id: 314, team_slot: 78, team_name: 'Iona', team_region: 'West', team_rating: 79.58 },
    { team_id: 2628, team_slot: 80, team_name: 'Texas Christian', team_region: 'West', team_rating: 85.42 },
    { team_id: 9, team_slot: 82, team_name: 'Arizona State', team_region: 'West', team_rating: 80.36 },
    { team_id: 2440, team_slot: 83, team_name: 'Nevada', team_region: 'West', team_rating: 79.6 },
    { team_id: 2250, team_slot: 84, team_name: 'Gonzaga', team_region: 'West', team_rating: 89.9 },
    { team_id: 2253, team_slot: 86, team_name: 'Grand Canyon', team_region: 'West', team_rating: 75.91 },
    { team_id: 77, team_slot: 88, team_name: 'Northwestern', team_region: 'West', team_rating: 82.24 },
    { team_id: 68, team_slot: 90, team_name: 'Boise State', team_region: 'West', team_rating: 82.62 },
    { team_id: 26, team_slot: 92, team_name: 'UCLA', team_region: 'West', team_rating: 88.26 },
    { team_id: 2427, team_slot: 94, team_name: 'North Carolina-Asheville', team_region: 'West', team_rating: 73.02 },
    { team_id: 248, team_slot: 96, team_name: 'Houston', team_region: 'Midwest', team_rating: 93.84 },
    { team_id: 94, team_slot: 98, team_name: 'Northern Kentucky', team_region: 'Midwest', team_rating: 72.87 },
    { team_id: 2294, team_slot: 100, team_name: 'Iowa', team_region: 'Midwest', team_rating: 84.47 },
    { team_id: 2, team_slot: 102, team_name: 'Auburn', team_region: 'Midwest', team_rating: 84.86 },
    { team_id: 2390, team_slot: 104, team_name: 'Miami (FL)', team_region: 'Midwest', team_rating: 83.6 },
    { team_id: 2181, team_slot: 106, team_name: 'Drake', team_region: 'Midwest', team_rating: 81.17 },
    { team_id: 84, team_slot: 108, team_name: 'Indiana', team_region: 'Midwest', team_rating: 85.8 },
    { team_id: 2309, team_slot: 110, team_name: 'Kent State', team_region: 'Midwest', team_rating: 79.37 },
    { team_id: 66, team_slot: 112, team_name: 'Iowa State', team_region: 'Midwest', team_rating: 84.54 },
    { team_id: 344, team_slot: 114, team_name: 'Mississippi State', team_region: 'Midwest', team_rating: 81.84 },
    { team_id: 221, team_slot: 115, team_name: 'Pittsburgh', team_region: 'Midwest', team_rating: 79.64 },
    { team_id: 2752, team_slot: 116, team_name: 'Xavier', team_region: 'Midwest', team_rating: 84.35 },
    { team_id: 338, team_slot: 118, team_name: 'Kennesaw State', team_region: 'Midwest', team_rating: 73.28 },
    { team_id: 245, team_slot: 120, team_name: 'Texas A&M', team_region: 'Midwest', team_rating: 85.51 },
    { team_id: 213, team_slot: 122, team_name: 'Penn State', team_region: 'Midwest', team_rating: 82.66 },
    { team_id: 251, team_slot: 124, team_name: 'Texas', team_region: 'Midwest', team_rating: 90.07 },
    { team_id: 2142, team_slot: 126, team_name: 'Colgate', team_region: 'Midwest', team_rating: 76.17 },
]

export const emptyRegionProps: IRoundProps[] = [
  {
    title: 'Round 1',
    seeds: [
      {
        id: 1,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 2,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 3,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 4,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 5,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 6,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 7,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 8,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: 'Round 2',
    seeds: [
      {
        id: 1,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 2,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 3,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 4,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: 'Sweet 16',
    seeds: [
      {
        id: 1,
        teams: [{ name: '' }, { name: '' }],
      },
      {
        id: 2,
        teams: [{ name: '' }, { name: '' }],
      },
    ],
  },
  {
    title: 'Elite 8',
    seeds: [
      {
        id: 1,
        teams: [{name: ''}, {name: ''}]
      }
    ]
  }
];