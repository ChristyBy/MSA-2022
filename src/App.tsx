import axios from "axios";
import { Beewax} from "beeswax-client";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [Beewax, setBeewax] = useState("");
  const [BeewaxInfo, setBeewaxInfo] = useState<null | undefined | Beewax>(
    undefined
  );
  const BEEWAX_BASE_API_URL = "https://docs.beeswax.com/";
  return (
    <div>
      <div className="search-field">
        <h1>Beewax client</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={Beewax}
            onChange={(prop) => {
              setBeewax(prop.target.value);
            }}
            label="Beewax..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "green" }} />
            Search
          </Button>
        </div>
      </div>

      {BeewaxInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="beewax-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: getBackColor(BeewaxInfo) }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {BeewaxInfo === undefined || BeewaxInfo === null ? (
                    <h1> not found</h1>
                  ) : (
                    <div>
                      <h1>
                        {BeewaxInfo.name.charAt(0).toUpperCase() +
                          BeewaxInfo.name.slice(1)}
                      </h1>
                      <p>
                        ID: {BeewaxInfo.id}
                        <br />
                        Height: {BeewaxInfo.height * 10} cm
                        <br />
                        Weight: {BeewaxInfo.weight / 10} kg
                        <br />
                        Types: {getTypes()?.toString()}
                        <br />
                        Abilities: {getAbilities()?.toString()}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {BeewaxInfo?.sprites.other.dream_world.front_default ? (
                    <img
                      height="300px"
                      width="300px"
                      alt={BeewaxInfo.name}
                      src={BeewaxInfo.sprites.other.dream_world.front_default}
                    ></img>
                  ) : (
                    <Skeleton width={300} height={300} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

 
  function getBackColor(bee: Beewax | undefined | null) {
    let backColor = "#EEE8AA";
    if (bee === undefined || bee === null) {
      return backColor;
    }
    const beeTypes = bee.types.map((i: { type: { name: any; }; }) => i.type.name);
    if (beeTypes.includes("fire")) {
      backColor = "#FEC5BB";
    } else if (beeTypes.includes("grass")) {
      backColor = "#80FFDB";
    } else if (beeTypes.includes("flower")) {
      backColor = "#DFE7FD";
    } else if (beeTypes.includes("tree")) {
      backColor = "#B0DEA3";
    } else if (beeTypes.includes("normal")) {
      backColor = "#E0FFFF";
    } else if (beeTypes.includes("forest")) {
      backColor = "#D8E2DC";
    } else if (beeTypes.includes("wild")) {
      backColor = "#FAD2E1";
    } else if (beeTypes.includes("fairy")) {
      backColor = "#FFF1E6";
    } else if (beeTypes.includes("plants")) {
      backColor = "#F8EDEB";
    } else if (beeTypes.includes("fighting")) {
      backColor = "#F1FAEE";
    } else if (beeTypes.includes("mix")) {
      backColor = "#A8DADC";
    }
    return backColor;
  }

  function search() {
    console.log(Beewax);
    if (Beewax === undefined || Beewax === "") {
      return;
    }

    axios
      .get(BEEWAX_BASE_API_URL + "/beewax/" + Beewax?.toLowerCase())
      .then((res) => {
        setBeewaxInfo(res.data);
      })
      .catch(() => {
        setBeewaxInfo(null);
      });
  }

  function getTypes() {
    if (BeewaxInfo !== undefined && BeewaxInfo !== null) {
      return BeewaxInfo.types.map((item: { type: { name: any; }; }) => item.type.name);
    }
  }

  function getAbilities() {
    if (BeewaxInfo !== undefined && BeewaxInfo !== null) {
      return BeewaxInfo.abilities.map((ability: { ability: { name: any; }; }) => ability.ability.name);
    }
  }
}

export default App;
