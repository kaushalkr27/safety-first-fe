import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistedReducer from './persistantReducer';
import { persistStore } from 'redux-persist';

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
