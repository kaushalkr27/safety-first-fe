import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { LOGO } from '../assests';
import fetcher from '../utils/api';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setIsLoading(true);
        // setTimeout(() => {
        //     setIsLoading(false)
        //     navigation.navigate('Login')
        // }, '2000')
        const response = await fetcher('/register', {
            method: 'POST',
            body: {
                email: email,
                password: password,
                full_name: fullName
            },
        });
        setIsLoading(false)
        console.log("SignUp Res: ", response)
        if(response.message == 'User Already Exist. Please Login!' || response.message == 'User added!'){
            navigation.navigate('Login')
        }
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
            {isLoading ? (
                <SafeAreaView className='h-full w-full flex justify-center items-center'>
                    <Text>Loading...</Text>
                </SafeAreaView>
            ) : (
                <View className="mt-24 shadow-2xl px-6 py-12 flex items-center justify-center w-11/12 border-0 border-solid border-gray rounded-lg">
                    <Image source={LOGO} style={{ width: 140, height: 100 }} />
                    <Text className="text-xl mt-8">Welcome!</Text>
                    <Text className="text-lg">Please enter your details</Text>
                    <View className="mt-2 py-2 mx-auto w-full">
                        <Text className="text-gray-500 text-sm mb-1">
                            Email:
                        </Text>
                        <View className="flex flex-col justify-center items-start">
                            <TextInput
                                type="text"
                                name="name"
                                className="border border-gray rounded py-2 px-2 w-full outline-none text-sm shadow-lg"
                                placeholderTextColor="#9ca3af"
                                placeholder="Enter your email"
                                onChangeText={(newText) => setEmail(newText.toLowerCase())}
                            />
                        </View>
                    </View>
                    <View className="py-2 mx-auto w-full">
                        <Text className="text-gray-500 text-sm mb-1">
                            Full Name:
                        </Text>
                        <View className="flex flex-col justify-center items-start">
                            <TextInput
                                type="text"
                                name="name"
                                className="border border-gray rounded py-2 px-2 w-full outline-none text-sm shadow-lg"
                                placeholderTextColor="#9ca3af"
                                placeholder="Enter your full name"
                                onChangeText={(newText) => setFullName(newText)}
                            />
                        </View>
                    </View>
                    <View className="py-2 mx-auto w-full">
                        <Text className="text-gray-500 text-sm mb-1">
                            Password:
                        </Text>
                        <View className="flex flex-col justify-center items-start">
                            <TextInput
                                secureTextEntry={true}
                                type="password"
                                name="name"
                                placeholderTextColor="#9ca3af"
                                className="border border-solid border-gray rounded py-2 px-2 w-full outline-none text-sm shadow-lg"
                                placeholder="Enter your password"
                                onChangeText={(newText) => setPassword(newText)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        className="mt-4 bg-purple w-full py-2 rounded text-white font-medium flex justify-center items-center"
                    >
                        <Text className="text-white font-medium text-lg">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View className="w-full flex justify-end items-center mt-4">
                        <Text className="mt-2">
                            Joined before?{' '}
                            <Text
                                className="text-purple font-bold"
                                onPress={() => navigation.navigate('Login')}
                            >
                                Login
                            </Text>
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}
