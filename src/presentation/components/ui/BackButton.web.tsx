
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow } from '../../icons/Icons';

interface Props {
  fallback?: string;
  label?: string;
  color?: string;
}

export default function BackButton({
  fallback = 'HomeScreen',
  label = 'Volver',
  color = '#5a215e',
}: Props) {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(fallback);
    }
  };

  return (
    <Pressable
      onPress={handleBack}
      style={({ hovered, pressed }:any) => ({
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingLeft: 14,
        borderRadius: 10,
        backgroundColor: pressed
          ? '#e9dce9'
          : hovered
          ? '#f3eaf3'
          : 'transparent',
        cursor: 'pointer',
      })}
    >
      <Arrow color={color} />

      <Text
        style={{
          color: '#5a215e',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
