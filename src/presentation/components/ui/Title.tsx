import { Text, View } from "react-native";
import { colors, globalStyles } from "../../../config/theme/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {
    text: string;
    safe?: boolean;
    white?: boolean;
}

export const Title = ({ text, safe = false, white = false }: Props) => {
    const { top } = useSafeAreaInsets();
    return (
        <Text style={{
            ...globalStyles.title,
            marginTop: safe ? top : 0,
            marginBottom: 20,
            marginLeft: 15,
            color: white ? 'white' : colors.text,

        }}>{text}</Text>
    )

}

export const SubTitle = ({ text, safe = false, white = false }: Props) => {
    const { top } = useSafeAreaInsets();
    return (
        <Text style={{
            ...globalStyles.subTitle,
            marginTop: safe ? top : 30,
            marginBottom: 0,
            color: white ? 'white' : colors.text,
            alignItems: 'center',
            textAlign: 'center'


        }}>

            {text}</Text>
    )



}