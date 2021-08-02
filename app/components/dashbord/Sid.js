import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../forms";
import Screen from "../Screen";




const Sid = ({handleSubmit}) => {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ sid:""}}
        onSubmit={(value)=>handleSubmit(JSON.stringify(value))}
        // validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          name="sid"
          placeholder="SID Number"
          textContentType="none"
        />
        <SubmitButton title="Submit" />
      </Form>
    </Screen>

  )
}

const styles = StyleSheet.create({
  map:{
    flex:1,
    // width:"100%",
    // height:'100%',
  },
})
export default Sid;
