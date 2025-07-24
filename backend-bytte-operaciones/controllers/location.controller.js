import colombia from '../data/colombia.json' assert { type: 'json' };

export const getColombiaLocations = (req, res) => {
  res.json(colombia);
};
