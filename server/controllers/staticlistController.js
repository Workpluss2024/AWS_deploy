// Fetch the static list of genders
export function getGenderList(req, res) {
  const genders = [
    { id: 'GENDER_001', name: 'Male' },
    { id: 'GENDER_002', name: 'Female' },
    { id: 'GENDER_003', name: 'Prefer not to say' }
  ];
  res.status(200).json(genders);
}

// Fetch the static list of languages
export function getLanguageList(req, res) {
  const languages = [
    { id: 'LANG_001', name: 'English' },
    { id: 'LANG_002', name: 'Hindi' },
    { id: 'LANG_003', name: 'Marathi' }
  ];
  res.status(200).json(languages);
}

// Fetch the static list of job durations
export function getDurationList(req, res) {
  const durations = [
    { id: 'DURATION_001', name: 'Flexible (Daily Jobs)' },
    { id: 'DURATION_002', name: 'Steady (Long term Jobs)' }
  ];
  res.status(200).json(durations);
}
