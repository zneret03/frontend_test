export const fetchUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed fetch data");
    }

    return response.json();
  } catch (error) {
    const newError = error as Error;
    throw new Error(newError.message);
  }
};
