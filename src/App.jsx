import React, { useEffect, useState } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { addDogToDb } from "./fetch/add-dog";
import { updateFavoriteForDog } from "./fetch/update-favorite";
import { deleteDogFromDb } from "./fetch/delete-dog-from-db";
import { ContentHub } from "./Components/ContentHub";
import { DogsProvider } from "./Components/DogsProvider";

function App() {
  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <DogsProvider>
        <Section label={"Dogs: "}>
          <ContentHub />
        </Section>
      </DogsProvider>
    </div>
  );
}

export default App;
