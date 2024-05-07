import { AsyncStorage } from 'react-native';

export const TOKEN_TYPE = 'token'
export const EMAIL_TYPE = 'email'

export const setItem = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, value);
        return true;
    } catch (error) {
        return undefined;
    }
};

export const getItem = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        return undefined;
    }
};

export const debugStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
            });
        });
    });
};
