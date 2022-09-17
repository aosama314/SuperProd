import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync, selectUsers } from "./store/reducers/user";

const App = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  console.log(users);

  useEffect(() => {
    const usersPromise = dispatch(getUsersAsync());

    return () => {
      usersPromise.abort();
    };
  }, [dispatch]);

  return <div>App</div>;
};

export default App;
