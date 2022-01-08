import { useEffect, useState } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { Duration } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { Reminder as ReminderProps } from '../App';

const onPress = () => {};

export default function Reminder(props: ReminderProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: 'black'}}
      style={{
        margin: 5,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
      }}
    >
      <Text style={{color: 'white', fontSize: 20}}>{props.title}</Text>
      <View style={{margin: 2, flex: 1, flexDirection: 'row'}}>
        <FontAwesomeIcon icon={faHistory} style={{color: 'white', marginRight: 5}}/>
        <Text style={{color: 'white'}}>{Duration.fromObject(props.interval).as('days') + ' days'}</Text>
      </View>
    </Pressable>
  )
}
