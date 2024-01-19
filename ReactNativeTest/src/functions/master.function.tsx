import { QuestionNairData } from "../data/questionair.data";
import { IQuestion } from "../interfaces/questionair.interface";
import * as _ from 'lodash';

class MasterFunction {
    public static randomQuestion=():IQuestion[]=>{
        try {
            const qt:IQuestion[] = _.shuffle(QuestionNairData)
            return qt
        } catch (error) {
            throw new Error
        }
    }
}


export default MasterFunction;