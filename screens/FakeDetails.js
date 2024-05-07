import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { GRAPH } from '../assests';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import fetcher from '../utils/api';

export default function FakeDetails({ route }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await fetcher('/fetchHistoricalData', {
                method: 'POST',
                body: {
                    region_name: 'San Jose',
                    api_name: route.params.paramKey.toLowerCase(),
                },
            });
            setData(response);
        };
        getData();
    }, []);

    const formatXAxisTick = (tick) => {
        const date = new Date(tick);
        return date.toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        });
      };

    const locations = ['San Jose, CA'];
    const getData = () => {
        if (route.params.paramKey == 'Temperature' || route.params.paramKey == 'Humidity' || route.params.paramKey == 'Wind') {
            return (
                <VictoryChart theme={VictoryTheme.grayscale}>
                    <VictoryLine data={data} x="timestamp" y="data" />
                    <VictoryAxis dependentAxis/>
                    <VictoryAxis tickCount={4} tickFormat={formatXAxisTick} />
                </VictoryChart>
            );
        } else if (
            route.params.paramKey == 'Fire' ||
            route.params.paramKey == 'Flood' ||
            route.params.paramKey == 'Earthquake'
        ) {
            return (
                <Text className="font-medium text-center">
                    No data in the recent past
                </Text>
            );
        }
    };

    const getGrapgh = () => {
        if (route.params.paramKey == 'UV Index') {
            return <Image source={GRAPH} />;
        }
        return;
    };

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
                <View className="mb-4 w-full px-4 flex flex-row justify-start items-center mt-4">
                    <Entypo
                        name="location-pin"
                        size={28}
                        color="black"
                        className=""
                    />
                    <Text className="font-bold mr-4 ml-2">{locations[0]}</Text>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                </View>
                <Text className="text-center mt-4 font-semibold text-xl">
                    {route.params.paramKey}
                </Text>
                <Text className="px-4">{getData()}</Text>
                <View className="w-full flex flex-row justify-center items-center">
                    {getGrapgh()}
                </View>
                {/* flex flex-row justify-center items-center */}
            </SafeAreaView>
        </ScrollView>
    );
}
