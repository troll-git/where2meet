import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getPlaceCoords } from "./API";
import { matchSorter } from "match-sorter";
import { Button } from "@material-ui/core";

const AddressSearch = (props) => {
  //let timer = null;
  const [placesList, setPlacesList] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  //const [value, setValue] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchValue) console.log("no text");
      else {
        console.log(searchValue);
        console.log("fetching data");
        getPlaceCoords(searchValue, logRes);
      }

      // Send Axios request here
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);
  const logRes = (data) => {
    let places = [];
    for (const obj of data.features) {
      places.push(obj);
    }
    console.log(places);
    setPlacesList(places);
  };

  const filterOptions = (options, { inputValue }) => options;

  return (
    <div>
<Autocomplete
      onChange={(event, value) => props.update(value)}
      id="combo-box-demo"
      options={placesList}
      getOptionLabel={(placesList) => placesList.properties.display_name} //{(option) => option.title}
      style={{ width: 300 }}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find place"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
          //onChange={(t) => getPlaceCoords(t.target.value, logRes)}
        />
        
      )}
    />
    </div>
    
  );
};

export default AddressSearch;
