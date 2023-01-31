import { CreateDogForm } from "./CreateDogForm";
import { Dogs } from "./Dogs";
import { useDogs } from "./DogsProvider";

export function ContentHub() {
  const { showComponent } = useDogs();

  return (
    <>
      {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
        showComponent
      ) && <Dogs label={"All Dogs"} />}
      {showComponent === "create-dog-form" && <CreateDogForm />}
    </>
  );
}
