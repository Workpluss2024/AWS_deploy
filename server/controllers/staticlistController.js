import { v4 as uuidv4 } from 'uuid';

// Fetch the static list of genders
export function getGenderList(req, res) {
  const genders = [
    { uuid: uuidv4(), name: 'Male' },
    { uuid: uuidv4(), name: 'Female' },
    { uuid: uuidv4(), name: 'Prefer not to say' }
  ];
  res.status(200).json(genders);
}

// Fetch the static list of languages
export function getLanguageList(req, res) {
  const languages = [
    { uuid: uuidv4(), name: 'English' },
    { uuid: uuidv4(), name: 'Hindi' },
    { uuid: uuidv4(), name: 'Marathi' }
  ];
  res.status(200).json(languages);
}

// Fetch the static list of duration(jobs)
export function getDurationList(req, res) {
    const durations = [
        { uuid: uuidv4(), name: 'Flexible (Daily Jobs)'},
        { uuid: uuidv4(), name: 'Steady (Long term Jobs)'}
    ];
    res.status(200).json(durations);
}
