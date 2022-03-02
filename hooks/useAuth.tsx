import { useEffect, useReducer, useState } from 'react';
import { getUserData } from '../lib/magic-api';

interface InitialState {
  loading: boolean;
  userEmail: string | null;
}

const initialState: InitialState = {
  loading: true,
  userEmail: null,
};

interface AuthAction {
  type: 'FETCH_START' | 'FETCH_END';
  payload: string | null;
}

const reducer = (state: InitialState, action: AuthAction) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        loading: true,
        userEmail: null,
      };
    case 'FETCH_END':
      return {
        loading: false,
        userEmail: action.payload,
      };
    default:
      return state;
  }
};

const useAuth = () => {
  // const [loading, setLoading] = useState(true);

  // const [userEmail, setUserEmail] = useState<string | null>(null);
  const [{ loading, userEmail }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    dispatch({ type: 'FETCH_START', payload: null });
    try {
      const email = await getUserData();
      dispatch({ type: 'FETCH_END', payload: email });
      // setLoading(false);

      // setUserEmail(email);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'FETCH_END', payload: null });
      // setLoading(false);

      // setUserEmail(null);
    }
  };

  return { loading, userEmail };
};

export default useAuth;
