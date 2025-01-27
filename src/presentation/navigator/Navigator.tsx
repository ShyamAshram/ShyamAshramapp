import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/landing/Landing";
import { Signin } from "../screens/singin/Singin";
import { Login } from "../screens/login/Login";
import { HomeScreen } from "../screens/home/Home";
import { Class } from "../screens/class/Class";
import { AdminScreen } from "../screens/admin/Admin"
import Asignacion from "../components/ui/Asignacion";
import ActiveU from "../components/ui/ActiveU";
import { Alerts } from "../screens/notifications/Notification";
import Plan3 from "../screens/plans/Plan3";
import Plan2 from "../screens/plans/Plan2";
import Plans from "../screens/plans/Plans";
import { Profile } from "../screens/profile/Profile";
import Lunes1 from "../screens/horario/Lunes";
import Martes1 from "../screens/horario/Martes";
import Miercoles1 from "../screens/horario/Miercoles";
import Jueves1 from "../screens/horario/Jueves";
import Viernes1 from "../screens/horario/Viernes";
import Sabado1 from "../screens/horario/Sabado";
import { Sub } from "../screens/sub/Sub";
import { Dates } from "../screens/calendar/Calendar";
import Profe from "../screens/profe/Profe";

const Stack = createStackNavigator();

function Navigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="Asignacion" component={Asignacion} />
            <Stack.Screen name="Activación" component={ActiveU} />
            <Stack.Screen name='Class' component={Class} />
            <Stack.Screen name='Alerts' component={Alerts} />
            <Stack.Screen name='Plan3' component={Plan3} />
            <Stack.Screen name='Plan2' component={Plan2} />
            <Stack.Screen name='Plans' component={Plans} />
            <Stack.Screen name='Sub' component={Sub} />
            <Stack.Screen name="Calendar" component={Dates} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name='Lunes1' component={Lunes1} />
            <Stack.Screen name='Martes1' component={Martes1} />
            <Stack.Screen name='Miercoles1' component={Miercoles1} />
            <Stack.Screen name='Jueves1' component={Jueves1} />
            <Stack.Screen name='Viernes1' component={Viernes1} />
            <Stack.Screen name='Sabado1' component={Sabado1} />
            <Stack.Screen name='Prof' component={Profe} />

        </Stack.Navigator>
    )
}

export default Navigator;