import React from "react";
import { use } from "react";
import { useState } from "react";
import LoadingLogo from "./assets/Loading.svg";
function App() {
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  return (
    <>
      <div
        className={
          loading ? "loadingScreen active" : "loadingScreen"
        }
      >
        <img className="loadingIcon" src={LoadingLogo} alt="" /><br></br>
        <p>Please Wait</p>
      </div>
      <div className="container_1">
        <div className="container_1_1">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="CITY NAME"
          />
          <button
            onClick={() => {
              setLoading(!loading)
            }}
            className="button"
          >
            SEARCH
          </button>
        </div>
        <div className="container_1_2">
          <div className="container_1_2_1"></div>
        </div>
      </div>
    </>
  );
}

export default App;
