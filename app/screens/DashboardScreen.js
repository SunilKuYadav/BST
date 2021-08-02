import React, { useState } from 'react';

import getData from "../api/getLocCoordinate";
import Sid from '../components/dashbord/Sid'
import Map from '../components/dashbord/Map'


const DasboardScreen = () => {
  const [msi, setMsi] = useState(false)
  const [data, setData] = useState({})
  const registerApi = useApi(getData.getLocCoordinate);
  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);
    setData( result.data.data[0]);
    const activeState = result.data.status == 0 ? false : true
    setMsi(activeState)
    // if (!result.ok) {
    //   if (result.data) setError(result.data.message);
    //   else {
    //     setError("An unexpected error occurred.");
    //     console.log(result);
    //   }
    //   return;
    // } else{
    //   Alert.alert(
    //     "Account",
    //     "Your account register successfully",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ],
    //     { cancelable: false }
    //   );
    // }
  };

  return (
     msi ? <Map data={data} /> : <Sid handleSubmit = {handleSubmit}/>
  )
}
export default DasboardScreen;
