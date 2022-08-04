-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS cemeteries;
DROP TABLE IF EXISTS signs;
DROP TABLE IF EXISTS shows;

CREATE TABLE destinations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL
);

INSERT INTO
  destinations (name, type, city, state)

VALUES
  (
    'Palace Playland',
    'Amusement Park',
    'Old Orchard Beach',
    'Maine'
  ),
  (
    'Vicki''s Diner',
    'Restaurant',
    'Westfield',
    'New Jersey'
  ),
  (
    'Revolution Hotel',
    'Hotel',
    'Boston',
    'Massachusetts'
  ),
  (
    'Railroad Park Resort',
    'Hotel',
    'Dunsmuir',
    'California'
  ),
  (
    'Camp 18',
    'Restaurant',
    'Elsie',
    'Oregon'
  ),
  (
    'Washington Park',
    'Park',
    'Portland',
    'Oregon'
  );

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  rating VARCHAR NOT NULL
);

INSERT INTO
  restaurants (name, location, rating)

VALUES
  (
    'Dot''s Cafe',
    'SE Clinton St, Portland',
    '8/10'
  ),
  (
    'Skyline Restaurant',
    'NW Skyline Blvd, Portland',
    '7/10'
  ),
  (
    'Hungry Tiger',
    'SE 12th Ave, Portland',
    '9/10'
  ),
  (
    'Creepy''s',
    'SE Morrison St, Portland',
    '6/10'
  ),
  (
    'Columbian Cafe',
    'Marine Dr, Astoria',
    '5/10'
  ),
  (
    'Canard',
    'E Burnside, Portland',
    '9/10'
  );

CREATE TABLE cemeteries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  established INT NOT NULL
);

INSERT INTO
  cemeteries (name, city, state, established)

VALUES
  (
    'Lone Fir Cemetery',
    'Portland',
    'Oregon',
    1855
  ),
  (
    'Mt. Calvary Catholic Cemetery',
    'Portland',
    'Oregon',
    1888
  ),
  (
    'Rosehill Cemetery',
    'Chicago',
    'Illinois',
    1859
  ),
  (
    'Delight Cemetery',
    'Lind',
    'Washington',
    1890
  ),
  (
    'Oysterville Cemetery',
    'Oysterville',
    'Washington',
    1858
  ),
  (
    'Hollywood Memorial Park and Cemetery',
    'Union',
    'New Jersey',
    1909
  );

CREATE TABLE signs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  symbol VARCHAR NOT NULL,
  element VARCHAR NOT NULL,
  ruling_planet VARCHAR NOT NULL,
  modality VARCHAR NOT NULL,
  dates VARCHAR NOT NULL
);

INSERT INTO
  signs (name, symbol, element, ruling_planet, modality, dates)

VALUES
  (
    'Aries',
    'The Ram',
    'Fire',
    'Mars',
    'Cardinal',
    'March 21 to April 19'
  ),
  (
    'Taurus',
    'The Bull',
    'Earth',
    'Venus',
    'Fixed',
    'April 20 to May 20'
  ),
  (
    'Gemini',
    'The Twins',
    'Air',
    'Mercury',
    'Mutable',
    'May 21 to June 20'
  ),
  (
    'Cancer',
    'The Crab',
    'Water',
    'Moon',
    'Cardinal',
    'June 21 to July 22'
  ),
  (
    'Leo',
    'The Lion',
    'Fire',
    'Sun',
    'Fixed',
    'July 23 to August 22'
  ),
  (
    'Virgo',
    'The Virgin',
    'Earth',
    'Mercury',
    'Mutable',
    'August 23 to September 22'
  ),
  (
    'Libra',
    'The Scales',
    'Air',
    'Venus',
    'Cardinal',
    'September 23 to October 22'
  ),
  (
    'Scorpio',
    'The Scorpion',
    'Water',
    'Pluto and Mars',
    'Fixed',
    'October 23 to November 21'
  ),
  (
    'Sagittarius',
    'The Archer',
    'Fire',
    'Jupiter',
    'Mutable',
    'November 22 to December 21'
  ),
  (
    'Capricorn',
    'The Goat',
    'Fire',
    'Mars',
    'Cardinal',
    'December 22 to January 19'
  ),
  (
    'Aquarius',
    'The Water Bearer',
    'Air',
    'Uranus',
    'Fixed',
    'January 20 to February 18'
  ),
  (
    'Pisces',
    'The Fish',
    'Fire',
    'Mars',
    'Cardinal',
    'February 19 to March 20'
  );
  
CREATE TABLE shows (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  streaming VARCHAR NOT NULL,
  favorite_episode VARCHAR NOT NULL,
  year INT NOT NULL
);

INSERT INTO
  shows (title, streaming, favorite_episode, year)

VALUES
  (
    'The Office',
    'Peacock',
    'Weight Loss',
    2005
  ),
  (
    'New Girl',
    'Netflix',
    'Virgins',
    2011
  ),
  (
    'It''s Always Sunny in Philadelphia',
    'Hulu',
    'Who Got Dee Pregnant?',
    2005
  ),
  (
    'Bob''s Burgers',
    'Hulu',
    'The Hauntening',
    2011
  ),
  (
    'Adventure Time',
    'Hulu',
    'Wizard',
    2010
  ),
  (
    'Stranger Things',
    'Netflix',
    'The Mall Rats',
    2016
  );