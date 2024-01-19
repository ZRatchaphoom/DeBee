import React, { useMemo, useState } from 'react'
import { Alert, Button, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MasterFunction from '../functions/master.function'
import { IAnswerResult, IQAnswer, IQuestion } from '../interfaces/questionair.interface'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { NativeConfig } from 'react-native-config'
import { useUserStore } from '../store/user.store'
import { useAnsStore } from '../store/answer.store'

const QuestionScreen = ({ navigation }): React.JSX.Element => {
    const { user } = useUserStore()
    const {ans,addAnsData} = useAnsStore();
    const questionData = useMemo<IQuestion[]>(() => MasterFunction.randomQuestion(), [])
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [ansSelected, setAnsSelected] = useState<IAnswerResult[]>([])

    const handlerSubmitAnswer = async() => {
        if(ansSelected.length !== 0){
            await addAnsData(ansSelected)
            await navigation.navigate('Dashboard')
        }else{
            Alert.alert('Please answer questionair')
        }

    }

    return (
        <SafeAreaView>
            <ScrollView importantForAccessibility='auto'>
                {
                    questionData?.map((x: IQuestion, i: number) => {
                        let index = i
                        let id = i += 1;
                        return <View key={index} className="border flex flex-col justify-start items-start mx-4 my-3 p-2 rounded-md h-auto bg-white shadow-2xl">
                            <View className="flex flex-row gap-2 mb-2">
                                <Text className="pr-2 text-black">{id}</Text>
                                <Text className="text-black">{x.question}</Text>
                            </View>

                            <View>
                                <RadioGroup
                                    key={index}
                                    layout='column'
                                    containerStyle={{
                                        alignItems: "flex-start"
                                    }}
                                    radioButtons={x.answer?.map((xd: IQAnswer) => ({ id: xd.id, label: xd.answerText, value: xd.id })) as any}
                                    onPress={(xx) => {
                                        setSelectedId((s) => [...s, xx])
                                        const da: IAnswerResult = {
                                            id: x.id,
                                            question: x.question,
                                            userAns: x?.answer?.filter((z: IQAnswer) => z.id === Number(xx))[0] as IQAnswer,
                                            correctAns: x?.answer?.filter((z: IQAnswer) => z.isCorrect === true)[0] as IQAnswer,
                                            userProfile: user,
                                            isActive: true
                                        }

                                        setAnsSelected((f) => [...f, da])
                                    }}
                                    selectedId={ansSelected?.filter((zd) => zd.id === x.id)[0]?.userAns?.id as any}
                                    color={"#444"}
                                />
                            </View>

                        </View>
                    })
                }
                <View>
                    <Button
                        title='ส่งคำตอบ'
                        onPress={() => {
                            handlerSubmitAnswer()
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default QuestionScreen
