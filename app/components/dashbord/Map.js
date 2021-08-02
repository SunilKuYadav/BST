import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { AntDesign } from '@expo/vector-icons';



const Map = (data) => {
  console.log(data.data.bus_no)
  console.log(data.data.current_lat,data.data.current_long,parseFloat(data.data.current_lat))
  const [stops, setStops] = useState({CuS:data.data.current_stop, NeS:data.data.next_stop,Bus:data.data.bus_no})
  const cl = {
      id: "jhjokj",
      latitude: parseFloat(data.data.current_lat),
      longitude: parseFloat(data.data.current_long),
      location: 'SRGI',
  }
  const [directtion, setDirection] = useState([
    {
      latitude: 27.006719665904495,
      longitude: 80.92166692829929,
    },
    {
      latitude: 26.765891235202886,
      longitude: 80.87527269372143,
    },
  ])

  const waypoint = [
    {
      id: "jhjokj",
      latitude: 27.006719665904495,
      longitude: 80.92166692829929,
      location: 'SRGI',
    },
    {
      id: "jhbjbkn",
      latitude: 26.897412450837013,
      longitude: 80.93737746789613,
      location: 'ALIGANJ',
    },
    {
      id: "jbjbjb",
      latitude: 26.765891235202886,
      longitude: 80.87527269372143,
      location: 'AIRPORT',
    },
  ]

  const [region, setRegion] = useState({
    latitude: parseFloat(data.data.current_lat),
    longitude: parseFloat(data.data.current_long),
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
    location: 'AIRPORT',
  })
  return (
    <>
    <View style={{position:'absolute',top:10, zIndex:1,backgroundColor:"skyblue"}}>
      <Text>Current Stop {stops.CuS}</Text>
      <Text>Next Stop {stops.NeS}</Text>
      <Text>Bus No {stops.Bus}</Text>
    </View>
    <View style={{
      flex:1,
    }}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <MapViewDirections
          origin={directtion[0]}
          destination={directtion[1]}
          apikey={'AIzaSyDykgvZI7AID9W6DcbjOjyh8-2fQY9bL1M'}
          strokeWidth={4}
          waypoints={waypoint}
          strokeColor="red"
          mode="DRIVING"
        />
        <Marker coordinate={ cl} />
        <Marker coordinate={ waypoint[0] } />
        <Marker coordinate={ waypoint[1] } />
        <Marker coordinate={ waypoint[2] } />
      </MapView>
      </View>
      </>
  )
}

const styles = StyleSheet.create({
  map:{
    flex:1,
    // width:"100%",
    // height:'100%',
  },
})
export default Map;
