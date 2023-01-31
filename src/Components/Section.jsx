import { useDogs } from "./DogsProvider";

//! Get rid of all props except 'children' and 'label'
export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
  const {
    dogs,
    onClickFavorited,
    onClickUnfavorited,
    onClickCreateDog,
    showComponent,
  } = useDogs();
  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);
  const unfavoriteDogCount = unfavorited.length;
  const favoriteDogCount = favorited.length;
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              showComponent === "favorite-dogs" && "active"
            }`}
            onClick={onClickFavorited}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              showComponent === "unfavorite-dogs" && "active"
            }`}
            onClick={onClickUnfavorited}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              showComponent === "create-dog-form" && "active"
            }`}
            onClick={onClickCreateDog}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
