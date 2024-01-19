import React, { useEffect } from 'react'
import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IUser } from '../interfaces/user.interface';
import { useUserStore } from '../store/user.store';

const HomeScreen = ({ navigation }): React.JSX.Element => {
    const {user,addUser} = useUserStore()
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            id: 0,
            profileName: '',
            firstName: '',
            lastName: '',
            isActive: true
        }
    });

    useEffect(()=>{
        if(user)
            navigation.navigate("Question")
    },[user])

    const handlerRegister: SubmitHandler<IUser> = async(data) => {
        await addUser(data)
        navigation.navigate("Question")
    }

    return (
        <SafeAreaView >
            {/* <ScrollView contentInsetAdjustmentBehavior="automatic">
            
        </ScrollView> */}
            <View className=" flex flex-col justify-center h-full  ">



                <View className="border-[1px] border-slate-500 rounded-md m-4 px-4 py-10 shadow-lg bg-white">
                    <View>
                        <Text className="font-bold mb-2 text-black">ชื่อโปรไฟล์</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} className="border rounded-md pl-3 border-slate-500" style={{
                                        height: 40
                                    }} />
                                )
                            }
                            name='profileName'
                        />

                    </View>
                    <View className="mt-2">
                        <Text className="font-bold mb-2 text-black">ชื่อ</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} className="border rounded-md pl-3 border-slate-500" style={{
                                        height: 40
                                    }} />
                                )
                            }
                            name='firstName'
                        />
                    </View>
                    <View className="mt-2">
                        <Text className="font-bold mb-2 text-black">นามสกุล</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} className="border rounded-md pl-3 border-slate-500" style={{
                                        height: 40
                                    }} />
                                )
                            }
                            name='lastName'
                        />
                    </View>
                    <View className="mt-5">
                        <Button title='บันทึก' className="rounded-md" onPress={handleSubmit(handlerRegister) } />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
