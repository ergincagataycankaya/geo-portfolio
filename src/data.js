/**
 * SITE CONTENT
 * Career and education entries, each tied to a place on the map.
 * Sourced from the main portfolio's CV data (ergin-portfolio/src/data.js).
 */

export const profile = {
  name: 'Ergin C. Cankaya',
  role: 'Geospatial Data Scientist & Precision Forestry Researcher',
  blurb: 'A GIS-focused portfolio of education and experience. Click any marker or entry to explore details.',
  email: 'ergin@ualberta.ca',
  /** Back link to the main site — update if the custom domain differs. */
  homeUrl: 'https://ergin-portfolio.vercel.app',
  links: {
    linkedin: 'https://www.linkedin.com/in/ergincagataycankaya/',
    github: 'https://github.com/ergincagataycankaya',
    orcid: 'https://orcid.org/0000-0003-2553-8707',
  },
};

/** Marker and badge colours, keyed by entry category. */
export const categoryColors = {
  education: '#e8b93f',
  experience: '#4d9fec',
};

export const entries = [
  {
    id: 'uofa-phd-research',
    category: 'experience',
    title: 'Ph.D. Candidate & Researcher',
    org: 'University of Alberta',
    mono: 'UA',
    place: 'Edmonton, AB, Canada',
    country: 'Canada',
    meta: 'Jan 2023 – Present',
    body: 'Processing 10 TB+ LiDAR archives with distributed computing; building automated Python/deep-learning workflows for object-based classification and canopy dynamics monitoring.',
    lat: 53.5232,
    lon: -113.5263,
  },
  {
    id: 'ogm-gis-analyst',
    category: 'experience',
    title: 'GIS Analyst',
    org: 'General Directorate of Forestry',
    mono: 'OGM',
    place: 'Ankara, Türkiye',
    country: 'Türkiye',
    meta: 'Jan 2021 – Dec 2023',
    body: 'Post-fire damage assessment after the 2021 Mediterranean and Aegean wildfires — Landsat thermal, SWIR and NDVI change detection; operational GIS support for aerial firefighting; authored the national GIS manual and departmental regulations.',
    lat: 39.9334,
    lon: 32.8597,
  },
  {
    id: 'ogm-geospatial-analyst',
    category: 'experience',
    title: 'Geospatial Data Analyst',
    org: 'General Directorate of Forestry',
    mono: 'OGM',
    place: 'Ankara, Türkiye',
    country: 'Türkiye',
    meta: 'May 2018 – Dec 2020',
    body: 'Designed and ran the National Forest Inventory enterprise geodatabase (PostgreSQL/PostGIS) with QA/QC and data governance; FME and Python/R ETL pipelines, plus an R Shiny inventory application serving 100+ users.',
    lat: 39.9334,
    lon: 32.8597,
  },
  {
    id: 'ogm-remote-sensing-analyst',
    category: 'experience',
    title: 'Remote Sensing Analyst',
    org: 'General Directorate of Forestry',
    mono: 'OGM',
    place: 'Ankara, Türkiye',
    country: 'Türkiye',
    meta: 'Nov 2012 – Apr 2018',
    body: 'Spatial analysis of forest road networks and fire incidence; national inventory QA/QC and web-GIS development for precision forestry planning.',
    lat: 39.9334,
    lon: 32.8597,
  },
  {
    id: 'unfccc-carbon-expert',
    category: 'experience',
    title: 'Forest Carbon Technical Expert',
    org: 'UNFCCC',
    mono: 'UN',
    place: 'Bonn, Germany',
    country: 'Germany',
    meta: 'Dec 2019 – May 2024',
    body: 'Technical assessment of forest reference emission levels for REDD+ activities; review of GHG inventories and National Communications.',
    lat: 50.7374,
    lon: 7.0982,
  },
  {
    id: 'usfs-forest-engineer',
    category: 'experience',
    title: 'Forest Engineer',
    org: 'USDA Forest Service',
    mono: 'FS',
    place: 'Utah, USA',
    country: 'USA',
    meta: 'Apr 2019 – Sep 2019',
    body: 'Biomass sampling and field measurement campaigns across Utah, Arizona and Nevada.',
    lat: 39.323,
    lon: -111.6737,
  },
  {
    id: 'uofa-phd-education',
    category: 'education',
    title: 'Ph.D. in Renewable Resources',
    org: 'University of Alberta',
    mono: 'UA',
    place: 'Edmonton, AB, Canada',
    country: 'Canada',
    meta: '2023 – Present',
    body: 'Thesis: Advancing precision forestry with proximal sensing. Advisor: Dr. Robert E. Froese. Honours standing, GPA 4.0.',
    lat: 53.5232,
    lon: -113.5263,
  },
  {
    id: 'vt-msc',
    category: 'education',
    title: 'M.Sc. in Forestry',
    org: 'Virginia Tech',
    mono: 'VT',
    place: 'Blacksburg, VA, USA',
    country: 'USA',
    meta: '2016 – 2018',
    body: 'Thesis: Testing methods for calibrating Forest Vegetation Simulator diameter growth predictions. Advisor: Dr. Harold Burkhart. Honours degree, GPA 3.67.',
    lat: 37.2296,
    lon: -80.4139,
  },
  {
    id: 'ksu-bsc-forestry',
    category: 'education',
    title: 'B.Sc. in Forest Engineering',
    org: 'Kahramanmaraş Sütçü İmam University',
    mono: 'KSU',
    place: 'Kahramanmaraş, Türkiye',
    country: 'Türkiye',
    meta: '2008 – 2012',
    body: 'Thesis: Open and green areas of the historical urban park (Stadtpark), Vienna, Austria.',
    lat: 37.5858,
    lon: 36.9371,
  },
  {
    id: 'anadolu-bsc-ir',
    category: 'education',
    title: 'B.Sc. in International Relations',
    org: 'Anadolu University',
    mono: 'AU',
    place: 'Eskişehir, Türkiye',
    country: 'Türkiye',
    meta: '2009 – 2013',
    body: 'Double major, taken alongside the forest engineering degree.',
    lat: 39.7767,
    lon: 30.5206,
  },
];

/** Grouped by coordinate so the map shows one marker per location, not one per role. */
export const places = Object.values(
  entries.reduce((acc, e) => {
    const key = `${e.lat},${e.lon}`;
    if (!acc[key]) acc[key] = { key, lat: e.lat, lon: e.lon, place: e.place, entries: [] };
    acc[key].entries.push(e);
    return acc;
  }, {}),
);

export const countryCount = new Set(entries.map((e) => e.country)).size;
