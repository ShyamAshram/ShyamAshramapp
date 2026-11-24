import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/landing/Landing';
import { Login } from '../screens/login/Login';
import { Signin } from '../screens/signin/Signin';
import { HomeScreen } from "../screens/home/Home";
import { Class } from '../screens/class/Class';
import Lunes1 from '../screens/horario/Lunes';
import Martes1 from '../screens/horario/Martes';
import Miercoles1 from '../screens/horario/Miercoles';
import Jueves1 from '../screens/horario/Jueves';
import Viernes1 from '../screens/horario/Viernes';
import Sabado1 from '../screens/horario/Sabado';
import Plan3 from '../screens/plans/Plan3';
import Plans from '../screens/plans/Plans';

import Plan2 from '../screens/plans/Plan2';
import Plan4 from '../screens/plans/Plan4';
import Plan5 from '../screens/plans/Plan5';
import Plan6 from '../screens/plans/Plan6';
import { Alerts } from '../screens/notifications/Notification';
import Profe from '../screens/profe/Profe';
import { AdminScreen } from '../screens/admin/Admin';
import Asignacion from '../components/ui/Asignacion';
import ActiveU from '../components/ui/ActiveU.web';
import AttendanceListScreen from '../components/ui/Asistencia';
import {Profesores} from '../components/ui/Profesores';
import Role from '../components/ui/Role';
import Excel from '../components/ui/Excel.web';
import CheckLogin from '../components/CheckLogin';
import RecuperarContrasena from '../components/RecuperarContrasena';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ animation: 'none', gestureEnabled: false, headerShown: false }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="CheckLogin" component={CheckLogin} />
      <Stack.Screen name="RecuperarContrasena" component={RecuperarContrasena} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Asignacion" component={Asignacion} />
      <Stack.Screen name="Activación" component={ActiveU} />
      <Stack.Screen name="Role" component={Role} />
      <Stack.Screen name='Class' component={Class} />
      <Stack.Screen name='Lunes1' component={Lunes1} />
      <Stack.Screen name='Martes1' component={Martes1} />
      <Stack.Screen name='Miercoles1' component={Miercoles1} />
      <Stack.Screen name='Jueves1' component={Jueves1} />
      <Stack.Screen name='Viernes1' component={Viernes1} />
      <Stack.Screen name='Sabado1' component={Sabado1} />
      <Stack.Screen name='Alerts' component={Alerts} />
      <Stack.Screen name='Plan3' component={Plan3} />
      <Stack.Screen name='Plans' component={Plans} />
      <Stack.Screen name='Plan2' component={Plan2} />
      <Stack.Screen name='Plan4' component={Plan4} />
      <Stack.Screen name='Plan5' component={Plan5} /> 
      <Stack.Screen name='Plan6' component={Plan6} /> 
      <Stack.Screen name='Prof' component={Profe} />
      <Stack.Screen name="AttendanceListScreen" component={AttendanceListScreen} />
      <Stack.Screen name="Profesores" component={Profesores} />
      <Stack.Screen name="Excel" component={Excel} />


    </Stack.Navigator>
  );
}