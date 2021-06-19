export const countries = [
  { value: "Sverige", label: "Sverige", result: "jaokda" },
  { value: "Danmark", label: "Danmark", result: "kanskje? hadde vært fett" },
  { value: "Tyskland", label: "Tyskland", result: "ja" },
  { value: "Frankrike", label: "Frankrike", result: "ja" },
  { value: "India", label: "India", result: "Ikke faen" },
];

export const travelCodes = {
  1: {
    quarantine: false,
    response: "Gul - Du må ikke i karantene ved innreise til Norge",
  },
  2: {
    quarantine: true,
    response: "Rød - Du må i karantene ved innreise til Norge",
  },
  4: { quarantine: true, response: "Grå - Ikke vurdert" },
  5: {
    quarantine: false,
    response: "Grønn - Du må ikke i karantene ved innreise til Norge",
  },
};

export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#000",
    borderRadius: "5px",
    "&:hover": {
      borderColor: "hsl(0, 0%, 50%)",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#000",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "200",
  }),
  menu: (provided) => ({
    ...provided,
    fontWeight: "200",
  }),
};

export const makeCountryList = (data) => {
  console.log(data);
  let tmpArr = [];
  data.map((country) => {
    tmpArr.push({ value: country.name, label: country.name });
  });
  let newTmpArr = [];
  newTmpArr = tmpArr.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t.value === country.value)
  );
  return newTmpArr;
};

export const makeCategories = (dataClasses) => {
  let tmpObj = {};
  dataClasses.forEach((dataClass) => {
    tmpObj[dataClass.from] = dataClass;
  });
  return tmpObj;
};
