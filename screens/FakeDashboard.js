import {
    View,
    Text,
    ScrollView,
    Dimensions,
    SafeAreaView,
    TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { getItem, debugStorage, TOKEN_TYPE } from '../utils/storage';
import DropDownPicker from 'react-native-dropdown-picker';
import fetcher from '../utils/api';

export default function FakeDashboard({ navigation }) {
    const locations = [
        'San Jose, CA',
        'Fremont, CA',
        'Sunnyvale, CA',
        'Milpitas, CA',
        'San Francisco, CA',
        'Palo Alto, CA',
    ];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ]);

    const [temperature, setTemperature] = useState(0);
    const [wind, setWind] = useState(0);
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [humidity, setHumidity] = useState(0);

    useEffect(() => {
        const isUserLoggedIn = async () => {
            const token = await getItem(TOKEN_TYPE);
            if (token == undefined) {
                navigation.navigate('Login');
            } else {
                const response = await fetcher('/fetchLatestData', {
                    method: 'POST',
                    body: {
                        region_name: 'San Jose',
                        api_name: 'temperature',
                    },
                });
                response.forEach(function (d) {
                    if (d.api_name == 'sunrise') {
                        setSunrise(d.data);
                    } else if (d.api_name == 'humidity') {
                        setHumidity(d.data);
                    } else if (d.api_name == 'sunset') {
                        setSunset(d.data);
                    } else if (d.api_name == 'wind') {
                        setWind(d.data);
                    } else if (d.api_name == 'temperature') {
                        setTemperature(d.data);
                    }
                });
            }
        };
        isUserLoggedIn();
    }, []);

    const [search, setSearch] = useState('');

    const data = [
        { name: 'Temperature', value: 27 },
        { name: 'Humidity', value: '65%' },
        { name: 'Wind', value: '8.75 m/hr' },
        { name: 'Pollen', value: 27 },
        { name: 'UV Index', value: 2.55 },
        { name: 'Fire', value: '-NA-' },
        { name: 'Earthquake', value: '-NA-' },
        { name: 'Flood', value: '-NA-' },
        { name: 'Sun rise', value: '6:22 AM' },
        { name: 'Sun set', value: '8:07 PM' },
    ];

    const getValue = (name, value) => {
        if (name == 'Temperature') {
            return temperature;
        } else if (name == 'Humidity') {
            return humidity+'%';
        } else if (name == 'Wind') {
            return wind + ' m/hr';
        } else if (name == 'Sun rise') {
            console.log("Sunrise: ", sunrise)
            const timeZoneOffset = -480; 
            const losAngelesTime = new Date(sunrise + timeZoneOffset * 60000);
            return '5:55 AM'
            return losAngelesTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
            // return losAngelesTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
            return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles' }).format(losAngelesTime)
        } else if (name == 'Sun set') {
            console.log("Sunset: ", sunset)
            const timeZoneOffset = -480;
            const losAngelesTime = new Date(sunset + timeZoneOffset * 60000);
            return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles' }).format(losAngelesTime)
        } else {
            return value;
        }
    };

    const [filteredData, setFilteredata] = useState(data);

    useEffect(() => {
        if (search.length > 1) {
            let arr = data.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredata(arr);
        } else {
            setFilteredata(data);
        }
    }, [search]);

    return (
        <ScrollView
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width,
            }}
            automaticallyAdjustKeyboardInsets={true}
        >
            <SafeAreaView className="w-full">
                {/* Location */}
                <View className="w-full px-4 flex flex-row justify-start items-center mt-4">
                    <Entypo
                        name="location-pin"
                        size={28}
                        color="black"
                        className=""
                    />
                    <Text className="font-bold mr-4 ml-2">{locations[0]}</Text>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                </View>

                {/* Search */}
                {/* <View className="shadow-lg mx-4 mt-4 py-2 px-2 flex flex-row justify-start items-center border-2 border-solid border-gray rounded-lg">
                    <Ionicons name="search-sharp" size={24} color="black" />
                    <Text className="ml-2">Search</Text>
                </View> */}

                <View className="shadow-lg shadow-black/40 mx-4 mt-4 py-2 pl-4 pr-2 flex flex-row justify-start items-center border-2 border-solid border-gray rounded-3xl">
                    <Ionicons name="search-sharp" size={24} color="black" />
                    <TextInput
                        // secureTextEntry={true}
                        type="text"
                        placeholderTextColor="#9ca3af"
                        name="name"
                        className="ml-2 w-full outline-none shadow-lg"
                        placeholder="Search"
                        onChangeText={(newText) => setSearch(newText)}
                    />
                </View>

                {/* DATA */}
                <View className="w-full px-4 mt-8 flex flex-row flex-wrap justify-between">
                    {filteredData.map((item, index) => (
                        <Card
                            key={index}
                            navigation={navigation}
                            field={item.name}
                            value={getValue(item.name, item.value)}
                        />
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
