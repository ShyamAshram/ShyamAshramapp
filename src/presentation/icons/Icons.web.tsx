
import React from 'react';
import { View } from 'react-native';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
} from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
  padding?: number;
}

interface FrameProps extends IconProps {
  children: React.ReactNode;
}

const IconFrame = ({
  children,
  color = '#11688C',
  size = 24,
  padding = 0,
}: FrameProps) => (
  <View
    style={{
      width: size + padding * 2,
      height: size + padding * 2,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {children}
    </Svg>
  </View>
);

const stroke = (color: string, width = 1.8) => ({
  stroke: color,
  strokeWidth: width,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

// Libro
export const Book = ({ color = '#FFF' }: IconProps) => (
  <IconFrame color={color} size={20}>
    <Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" {...stroke(color)} />
    <Path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5A2.5 2.5 0 0 1 20 22V5.5Z" {...stroke(color)} />
  </IconFrame>
);

// Notificaciones
export const Notification = ({ color = '#FFF', size = 20 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" {...stroke(color)} />
    <Path d="M10 21h4" {...stroke(color)} />
  </IconFrame>
);

// Calendario
export const Calendario = ({ color = '#544444', size = 22 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Rect x="3" y="5" width="18" height="16" rx="2" {...stroke(color)} />
    <Path d="M16 3v4M8 3v4M3 10h18" {...stroke(color)} />
    <Path d="M8 14h2M14 14h2M8 17h2" {...stroke(color)} />
  </IconFrame>
);

// Configuración
export const Setting = ({ color = '#544444', size = 24 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Circle cx="12" cy="12" r="3" {...stroke(color)} />
    <Path
      d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3H3.8a1.8 1.8 0 0 1 0-3.6H4a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6H20a1.8 1.8 0 0 0-.6 3Z"
      {...stroke(color)}
    />
  </IconFrame>
);

// Lista
export const List = ({ color = '#544444', size = 24 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M8 6h13M8 12h13M8 18h13" {...stroke(color)} />
    <Circle cx="3.5" cy="6" r=".8" fill={color} />
    <Circle cx="3.5" cy="12" r=".8" fill={color} />
    <Circle cx="3.5" cy="18" r=".8" fill={color} />
  </IconFrame>
);

// Agregar
export const Add = ({ color = '#D9A404', size = 30, padding = 10 }: IconProps) => (
  <IconFrame color={color} size={size} padding={padding}>
    <Circle cx="12" cy="12" r="9" {...stroke(color)} />
    <Path d="M12 7v10M7 12h10" {...stroke(color, 2)} />
  </IconFrame>
);

export const Add2 = ({ color = '#FFF', size = 20, padding = 10 }: IconProps) => (
  <IconFrame color={color} size={size} padding={padding}>
    <Circle cx="12" cy="12" r="9" {...stroke(color)} />
    <Path d="M12 7v10M7 12h10" {...stroke(color, 2)} />
  </IconFrame>
);

// Google
export const Googleicon = ({ size = 30 }: IconProps) => (
  <IconFrame size={size} color="#4285F4">
    <Path
      d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.9h5a4.3 4.3 0 0 1-1.9 2.8v2.5h3.1c1.8-1.7 2.8-4.2 2.8-7.2Z"
      fill="#4285F4"
    />
    <Path
      d="M12 21c2.5 0 4.6-.8 6.2-2.1l-3.1-2.5c-.9.6-1.9 1-3.1 1a6 6 0 0 1-5.7-4.2H3.1v2.6A9 9 0 0 0 12 21Z"
      fill="#34A853"
    />
    <Path
      d="M6.3 13.2a5.5 5.5 0 0 1 0-3.4V7.2H3.1a9 9 0 0 0 0 8.6l3.2-2.6Z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.6c1.4 0 2.7.5 3.7 1.5l2.7-2.7A9 9 0 0 0 3.1 7.2l3.2 2.6A6 6 0 0 1 12 5.6Z"
      fill="#EA4335"
    />
  </IconFrame>
);

// Salir
export const Set = ({ color = '#FFF', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M10 17l5-5-5-5M15 12H3" {...stroke(color, 2)} />
    <Path d="M12 4h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" {...stroke(color)} />
  </IconFrame>
);

// Facebook
export const Facebook = ({ size = 30 }: IconProps) => (
  <IconFrame color="#1877F2" size={size}>
    <Path
      d="M14 21v-8h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5H18V3.8c-.8-.1-1.7-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6V10H8v3h2.8v8H14Z"
      fill="#1877F2"
    />
  </IconFrame>
);

// Instagram
export const Instagram = ({ size = 30 }: IconProps) => (
  <IconFrame color="#BC2A8D" size={size}>
    <Rect x="3" y="3" width="18" height="18" rx="5" {...stroke('#BC2A8D', 2)} />
    <Circle cx="12" cy="12" r="4" {...stroke('#BC2A8D', 2)} />
    <Circle cx="17.5" cy="6.5" r="1" fill="#BC2A8D" />
  </IconFrame>
);

// Menú
export const Menu = ({ color = '#33AB91', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M3 6h18M3 12h18M3 18h18" {...stroke(color, 2)} />
  </IconFrame>
);

// WhatsApp
export const WhatsApp = ({ color = '#FFF', size = 20 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M5 19l1-3a8 8 0 1 1 3 3l-4 1Z" {...stroke(color, 1.8)} />
    <Path d="M9 8c-.5 1 .5 3 2 4.5s3.5 2.5 4.5 1.5l-1.5-2-1.5 1-2.5-2.5 1-1.5L9 8Z" {...stroke(color, 1.5)} />
  </IconFrame>
);

// Correo
export const Email = ({ color = '#FFF', size = 20 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Rect x="3" y="5" width="18" height="14" rx="2" {...stroke(color)} />
    <Path d="m4 7 8 6 8-6" {...stroke(color)} />
  </IconFrame>
);

// Descargar
export const Download = ({ color = '#FFF', size = 20 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3" {...stroke(color, 2)} />
  </IconFrame>
);

// Persona
export const Person = ({ color = '#11688C', size = 29 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Circle cx="12" cy="8" r="4" {...stroke(color)} />
    <Path d="M4 21a8 8 0 0 1 16 0" {...stroke(color)} />
  </IconFrame>
);

// Formulario
export const Form = ({ color = '#11688C', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Rect x="5" y="2.5" width="14" height="19" rx="2" {...stroke(color)} />
    <Path d="M8 7h8M8 11h8M8 15h5" {...stroke(color)} />
  </IconFrame>
);

// Lista de formularios
export const ListForm = ({ color = '#11688C', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M8 5h13M8 12h13M8 19h13" {...stroke(color)} />
    <Rect x="2" y="3" width="3" height="4" rx="1" {...stroke(color)} />
    <Rect x="2" y="10" width="3" height="4" rx="1" {...stroke(color)} />
    <Rect x="2" y="17" width="3" height="4" rx="1" {...stroke(color)} />
  </IconFrame>
);

// Profesores
export const Profesores = ({ color = '#11688C', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Circle cx="9" cy="8" r="3" {...stroke(color)} />
    <Circle cx="17" cy="9" r="2.5" {...stroke(color)} />
    <Path d="M2 20a7 7 0 0 1 14 0M15 15a5 5 0 0 1 7 5" {...stroke(color)} />
  </IconFrame>
);

// Reloj
export const Clock = ({ color = '#D9A404', size = 25 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Circle cx="12" cy="12" r="9" {...stroke(color)} />
    <Path d="M12 7v5l3 2" {...stroke(color, 2)} />
  </IconFrame>
);

// Llave
export const Key = ({ color = '#11688C', size = 25 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Circle cx="8" cy="12" r="5" {...stroke(color)} />
    <Path d="m12 12 9 0m-3 0v3m-3-3v2" {...stroke(color, 2)} />
  </IconFrame>
);

// Tarjeta
export const Card = ({ color = '#D9A404', size = 25 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Rect x="2" y="5" width="20" height="14" rx="2" {...stroke(color)} />
    <Path d="M2 10h20" {...stroke(color)} />
    <Path d="M6 15h4" {...stroke(color)} />
  </IconFrame>
);

// Dinero
export const Cash = ({ color = '#00A653', size = 25 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Rect x="2" y="5" width="20" height="14" rx="2" {...stroke(color)} />
    <Circle cx="12" cy="12" r="3" {...stroke(color)} />
    <Path d="M5 8h1M18 16h1" {...stroke(color)} />
  </IconFrame>
);

// Confirmación
export const Check = ({ color = '#00A653', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="m4 12 5 5L20 6" {...stroke(color, 2.5)} />
  </IconFrame>
);

// Cerrar
export const Close = ({ color = '#CC1818', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="m6 6 12 12M18 6 6 18" {...stroke(color, 2.5)} />
  </IconFrame>
);

// Flecha
export const Arrow = ({ color = '#11688C', size = 30 }: IconProps) => (
  <IconFrame color={color} size={size}>
    <Path d="M19 12H5m7-7-7 7 7 7" {...stroke(color, 2)} />
  </IconFrame>
);
