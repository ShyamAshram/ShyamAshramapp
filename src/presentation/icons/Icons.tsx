import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MateriaCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Book = () => <Ionicons name="book" color={'#FFF'} size={15} />;
export const Notification = () => <Ionicons name='notifications' color={'#FFF'} size={15} />;
export const Calendario = () => <Ionicons name='calendar' color={'#544444'} size={15} />;
export const Setting = () => <Ionicons name='settings' color={'#544444'} size={15} />;
export const List = () => <Ionicons name='list' color={'#544444'} size={15} />;
export const Add = () => <Ionicons name='add-circle' color={'#D9A404'} size={30} style={{ padding: 10 }} />;
export const Add2 = () => <Ionicons name='add-circle' color={'#fff'} size={20} style={{ padding: 10 }} />;
export const Googleicon = () => <Ionicons name='logo-google' color={'white'} size={30} />
export const Set = ({ color = '#FFF'}) => (<Ionicons name='log-in-outline' color={color} size={30} />);
export const Facebook = () => <Ionicons name='logo-facebook' color={'#3b5998'} size={30} />
export const Instagram = () => <Ionicons name='logo-instagram' color={'#bc2a8d'} size={30} />
export const Menu = () => <Ionicons name="menu-outline" color={'#33AB91'} size={30} />
export const WhatsApp = () => <Ionicons name="logo-whatsapp" color={'#fff'} size={20} />
export const Email = ( { color = '#FFF'}) => <Ionicons name="mail-outline" color={color} size={20} />
export const Download = () => <Ionicons name="download-outline" color={'#fff'} size={20} />
export const Person = () => <FontAwesome name='user-plus' color={'#11688C'} size={29} />
export const Form = ({color='#11688C', size=30}) => <MateriaCommunityIcons name='form-select' color={color} size={size}/>
export const ListForm = () => <MateriaCommunityIcons name='list-status' color={'#11688C'} size={30}/>
export const Profesores = () => <MateriaCommunityIcons name='calendar-account' color={'#11688C'} size={30}/>
export const Clock =() => <MateriaCommunityIcons name='clock-check-outline' color={'#D9A404'} size={25}/>