export async function getData() {
  const res = await fetch(
    "https://www.fhi.no/api/chartdata/excel/series/96079"
  );
  //   .then((res) => (data = res));
  // console.log("data", data);
  const data = await res.json();
  return data;
}

export const getCustomSelectStyles = (
  canTravel,
  chosenCountry,
  canTravelToSomeButNotAll
) => {
  let inputColor = "white";
  if (!chosenCountry) {
    inputColor = "white";
  } else if (chosenCountry && canTravelToSomeButNotAll) {
    inputColor = "rgb(223, 206, 144)";
  } else if (chosenCountry && !canTravelToSomeButNotAll && canTravel) {
    inputColor = "rgb(206, 227, 208)";
  } else {
    inputColor = "rgb(223, 144, 144)";
  }
  return {
    control: (provided) => ({
      ...provided,
      borderColor: "#000",
      borderRadius: "0",
      borderWidth: "2px",
      height: "60px",
      fontSize: "40px",
      backgroundColor: inputColor,
      boxShadow: "none",
      cursor: "url('../assets/KJRT-typeindicator.svg') 0 14, auto",

      "&:hover": {
        borderColor: "#000",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "200",
      color: "rgb(149, 136, 136)",
      maxWidth: "100%",
      textTransform: "capitalize",
      "@media (min-width: 769px)": {
        transform: "translateY(-58%)",
      },
      "@media (max-width: 768px)": {
        transform: "translateY(-57%)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontWeight: "200",
      backgroundColor: "none",
      border: "unset",
      marginTop: "0",
      marginBottom: "0",
      boxShadow: "none",
      top: "0",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
    }),
    option: (provided) => ({
      ...provided,
      height: "60px",
      fontSize: "40px",
      backgroundColor: "none",
      color: "rgb(149, 136, 136)",
      padding: "4px 12px 12px",
      textTransform: "capitalize",
    }),
    input: (provided) => ({
      ...provided,
      zIndex: "100000",
      caretColor: "black",
      margin: "0 2px 10px",
      // margin: "0",
      padding: "0",
      height: "45px",
      // transform: "translate(2px, -2px)",
      "& input": {
        fontFamily: "Argent CF italic !important",
        fontSize: "40px !important",
        color: "black !important",
        //backgroundColor: "white !important",
        textTransform: "capitalize",
      },
      "& div div": {
        fontFamily: "Agent CF italic",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
      transform: "translateY(-58%)",
      maxWidth: "80%",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      display: "none",
    }),
    // singleValue: (provided) => ({
    //   ...provided,
    //   left: !chosenCountry ? "8px" : "50%",
    //   transform: "translate(-50%, -50%)",
    //   transition: "left 0.4s ease-in-out",
    // }),
  };
};

export const getRandomCountrySuggestion = (countries) => {
  const index = Math.floor(Math.random() * (countries.length + 1));
  return (
    countries &&
    countries.length > 1 &&
    countries[0].value &&
    countries[index] &&
    countries[index].label
  );
};
export const makeCountryList = (data) => {
  let tmpArr = [];
  let foundEngland = false;
  data.map((country) => {
    tmpArr.push({
      value: country.name,
      label: country.name.toLowerCase() + "?",
    });
  });

  tmpArr = tmpArr.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t.value === country.value)
  );
  tmpArr.forEach((newCountry) => {
    if (newCountry.value === "England") {
      foundEngland = true;
    }
    data.forEach((dataCountry) => {
      if (dataCountry.name === newCountry.value) {
        if (!newCountry.data) {
          newCountry.data = [];
        }
        newCountry.data.push(dataCountry);
      }
    });
  });
  //   just to copy the list from console to getStaticPaths
  //   tmpArr.forEach((country) => {
  //     console.log(`"/${country.value}"`);
  //     console.log(`"/${country.value.toLowerCase()}"`);
  //   });
  if (!foundEngland) {
    // let newArr = Object.assign([], tmpArr);
    tmpArr.forEach((country) => {
      if (country.value === "Storbritannia") {
        let england = Object.assign({}, country);
        let skottland = Object.assign({}, country);
        let nordIrland = Object.assign({}, country);
        let wales = Object.assign({}, country);
        england.label = "England?";
        skottland.label = "Skottland?";
        nordIrland.label = "Nord-Irland?";
        wales.label = "Wales?";
        tmpArr.push(england, skottland, nordIrland, wales);
        return;
      }
    });
  }
  return tmpArr;
};

export const makeCategories = (dataClasses) => {
  let tmpObj = {};
  dataClasses.forEach((dataClass) => {
    tmpObj[dataClass.from] = dataClass;
  });
  return tmpObj;
};

export const getCountryRegionColors = (data) => {
  return ["grønn", "oransje", "rød"];
};

//returns a date object days days from the current date.
export const getDateXDaysFromNow = (days) => {
  var result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};
