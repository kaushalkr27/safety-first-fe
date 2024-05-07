import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';

// Define your reducers here
const rootReducer = combineReducers({
  reducer
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    // Optionally, whitelist or blacklist keys to persist
  },
  rootReducer
);

export default persistedReducer;
