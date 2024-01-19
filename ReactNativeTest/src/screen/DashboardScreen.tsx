import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAnsStore } from '../store/answer.store';
import { IAnswerResult } from '../interfaces/questionair.interface';
import { useUserStore } from '../store/user.store';

const DashboardScreen = ({ navigation }): React.JSX.Element => {
    const { ans, addAnsData } = useAnsStore();
    const { user, addUser } = useUserStore()
    const [totalPoint, setTotalPoint ] = useState<number>(0);
    const calCulatePoint = async () => {
        await ans?.forEach((x: IAnswerResult, i: number) => {
            if (x.userAns.isCorrect === x.correctAns.isCorrect) {
                setTotalPoint((t: number) => t += 1)
            }
        })
    }
    const handlerOk = async () => {
        await setTotalPoint(0)
        await addAnsData(null)
        await addUser(null)
        await navigation.navigate("Home")
    }
    useEffect(() => {
        setTotalPoint(0)
        calCulatePoint()
    }, [])
    return (
        <SafeAreaView>
            <View className="border flex flex-col justify-start items-start mx-4 my-3 p-2 rounded-md h-auto bg-white shadow-2xl">
                <View className="flex flex-row gap-4">
                    <Text className="font-bold text-black">Profile Name : </Text>
                    <Text>{user?.profileName}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <Text className="font-bold text-black">First Name : </Text>
                    <Text>{user?.firstName}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <Text className="font-bold text-black">Last Name : </Text>
                    <Text>{user?.lastName}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <Text className="font-bold text-black">Score : </Text>
                    <Text>{totalPoint}</Text>
                </View>
            </View>
            <View>
                <Button
                    title='OK'
                    onPress={() => handlerOk()}
                />
            </View>
        </SafeAreaView>
    )
}

export default DashboardScreen
