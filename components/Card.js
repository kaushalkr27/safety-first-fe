import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';

export default function Card({ navigation, field, value }) {

    useEffect(() => {
        console.log(field + ": "+value)
    }, []);

    const getIcon = () => {
        if (field == 'Temperature') {
            return (
                <FontAwesome5
                    name="temperature-high"
                    size={24}
                    color="#7C54D5"
                />
            );
        } else if (field == 'Wind') {
            return <Feather name="wind" size={24} color="#7C54D5" />;
        } else if (field == 'Humidity' || field == 'Flood') {
            return <FontAwesome5 name="water" size={24} color="#7C54D5" />;
        } else if (field == 'Fire') {
            return <FontAwesome5 name="fire-alt" size={24} color="#7C54D5" />;
        } else if (field == 'Pollen') {
            return (
                <MaterialCommunityIcons
                    name="flower-pollen"
                    size={24}
                    color="#7C54D5"
                />
            );
        } else if (field == 'Earthquake') {
            return <Ionicons name="earth" size={24} color="#7C54D5" />;
        } else if (field == 'UV Index') {
            return <Feather name="sun" size={24} color="#7C54D5" />;
        } else if (field == 'Sun rise') {
            return <Feather name="sunrise" size={24} color="#7C54D5" />;
        } else if (field == 'Sun set') {
            return <Feather name="sunset" size={24} color="#7C54D5" />;
        }
    };

    const getValue = () => {
        if (field == 'Temperature') {
            return <Text className="text-2xl font-medium">{value} &deg;F</Text>;
        } else if (field == 'Wind') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Humidity' || field == 'Flood') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Fire') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Pollen') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Earthquake') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'UV Index') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Sun rise') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        } else if (field == 'Sun set') {
            return <Text className="text-2xl font-medium">{value}</Text>;
        }
    };

    const handlePress = () => {
        navigation.navigate('FakeDetails', {
            paramKey: field,
        });
    };

    return (
        <TouchableOpacity className="w-1/2 p-1 my-2" onPress={handlePress}>
            <View className="p-2 py-4 w-full border-2 border-solid border-gray rounded-md">
                <View className="flex flex-row justify-start items-center">
                    <View>{getIcon()}</View>
                    <Text className="ml-2 font-semibold">{field}</Text>
                </View>
                <View className="flex flex-row justify-start mt-2">
                    {getValue()}
                </View>
            </View>
        </TouchableOpacity>
    );
}
