import { findLastIndex } from "lodash";

export async function getData() {
  const res = await fetch(
    "https://www.fhi.no/api/chartdata/excel/series/96079"
  );
  //   .then((res) => (data = res));
  // console.log("data", data);
  const data = await res.json();
  return data;
}

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

      "&:hover": {
        borderColor: "#000",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      // color: "#000",
      // "&:hover": {
      //   color: "#000",
      // },
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: "200",
      "@media (min-width: 769px)": {
        transform: "translateY(-58%)",
      },
      "@media (max-width: 768px)": {
        transform: "translateY(-64%)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontWeight: "200",
      backgroundColor: "none",
      border: "unset",
      marginTop: "0",
      marginBottom: "0",
      // display: "none",
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
      // border: "2px solid black",
      fontSize: "40px",
      backgroundColor: "none",
      color: "#958888",
      // paddingBottom: "10px",
      // paddingTop: "6px",
      // padding: '10px 12px',
      // transform: "translate(0,-2px)",
    }),
    input: (provided) => ({
      ...provided,
      zIndex: "100000",
      // height: "60px !important",
      "& input": {
        fontFamily: "Argent CF italic !important",
        // fontStyle: "italic",
        fontSize: "40px !important",
        color: "black !important",
        //backgroundColor: "white !important",
        textTransform: "capitalize",
        // "@media (min-width: 769px)": {
        //   transform: "translateY(-4px)",
        // },
        // "@media (max-width: 768px)": {
        //   transform: "translateY(-6px)",
        // },
      },
      "& div div": {
        fontFamily: "Agent CF italic",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      // width: "100%",
      // position: "absolute",
      // left: chosenCountry ? "50%" : "0",
      // transform: chosenCountry ? "translateX(-50%)" : "0",
      // transition: "left 0.3s ease-in-out, translateX 0.3s ease-in-out",
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
  return (
    countries &&
    countries.length > 1 &&
    countries[0].value &&
    countries[Math.round(Math.random() * countries.length - 1)].value
  );
};
export const makeCountryList = (data) => {
  let tmpArr = [];
  data.map((country) => {
    tmpArr.push({ value: country.name, label: country.name });
  });

  tmpArr = tmpArr.filter(
    (country, index, self) =>
      index === self.findIndex((t) => t.value === country.value)
  );
  tmpArr.forEach((newCountry) => {
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
  return tmpArr;
};

export const makeCategories = (dataClasses) => {
  let tmpObj = {};
  dataClasses.forEach((dataClass) => {
    tmpObj[dataClass.from] = dataClass;
  });
  return tmpObj;
};
