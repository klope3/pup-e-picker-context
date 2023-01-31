import { DogCard } from "./DogCard";
import { useDogs } from "./DogsProvider";

// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogs, favoriteDog, unfavoriteDog, deleteDog, showComponent } =
    useDogs();
  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => deleteDog(dog.id)}
          onHeartClick={() => unfavoriteDog(dog.id)}
          onEmptyHeartClick={() => favoriteDog(dog.id)}
        />
      ))}
    </>
  );
};
