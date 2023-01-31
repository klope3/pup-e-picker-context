import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

const DogsContext = createContext({});

export function useDogs() {
  const { dogs, setDogs, showComponent, setShowComponent } =
    useContext(DogsContext);

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs(setDogs);
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs(setDogs));
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs(setDogs)
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() =>
      refetchDogs(setDogs)
    );
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  return {
    dogs,
    showComponent,
    onClickFavorited,
    onClickUnfavorited,
    onClickCreateDog,
    addDog,
    deleteDog,
    favoriteDog,
    unfavoriteDog,
  };
}

const refetchDogs = (setDogs) => {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then(setDogs);
};

export function DogsProvider({ children }) {
  const [dogs, setDogs] = useState([]);
  const [showComponent, setShowComponent] = useState("all-dogs");

  useEffect(() => {
    refetchDogs(setDogs);
  }, []);

  return (
    <DogsContext.Provider
      value={{ dogs, setDogs, showComponent, setShowComponent }}
    >
      {children}
    </DogsContext.Provider>
  );
}
