import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

import { ref, set } from "firebase/database";

import { db } from "./Config";

const App = () => {

  const [accX, setAccX] = useState([])
  const [accY, setAccY] = useState([])
  const [accZ, setAccZ] = useState([])

  const [gyroX, setGyroX] = useState([])
  const [gyroY, setGyroY] = useState([])
  const [gyroZ, setGyroZ] = useState([])

  const [doneAcc, setDoneAcc] = useState(false)
  const [doneGyro, setDoneGyro] = useState(false)

  const [isRunningAcc, setIsRunningAcc] = useState(false);
  const [isRunningGyro, setIsRunningGyro] = useState(false);

  useEffect(() => {
    let timerId;

    const getAccValues = () => {
      setUpdateIntervalForType(SensorTypes.accelerometer, 2000);

      const acc_sub = accelerometer.subscribe(({ x, y, z }) => {
        setAccX(accX => [...accX, x]);
        setAccY(accY => [...accY, y]);
        setAccZ(accZ => [...accZ, z]);
      });

      timerId = setTimeout(() => {
        setIsRunningAcc(false);
        acc_sub.unsubscribe();
        setDoneAcc(true)
      }, 5000);
    };

    if (isRunningAcc) {
      getAccValues();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isRunningAcc]);

  useEffect(() => {
    let timerId;

    const getGyroValues = () => {
      setUpdateIntervalForType(SensorTypes.gyroscope, 2000);

      const gyro_sub = gyroscope.subscribe(({ x, y, z }) => {
        setGyroX(gyroX => [...gyroX, x]);
        setGyroY(gyroY => [...gyroY, y]);
        setGyroZ(gyroZ => [...gyroZ, z]);
      });

      timerId = setTimeout(() => {
        setIsRunningGyro(false);
        gyro_sub.unsubscribe();
        setDoneGyro(true)
      }, 5000);
    };

    if (isRunningGyro) {
      getGyroValues();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isRunningGyro]);

  const handleAccValues = () => {
    setIsRunningAcc(true)
  }

  const handleGyroValues = () => {
    setIsRunningGyro(true)
  }

  const handleDatabase = () => {
    set(ref(db, 'sensors/' + "accelerometer"), {
      x: accX,
      y: accY,
      z: accZ,
    });

    set(ref(db, 'sensors/' + "gyroscope"), {
      x: gyroX,
      y: gyroY,
      z: gyroZ,
    });
  }

  return (
    <>
      <Text variant="displaySmall" theme={{ colors: { primary: 'white' } }}>Gait Analyser</Text>
      <Button mode="contained" onPress={handleAccValues} > Get Accelerometer Values </Button>
      <Button mode="contained" onPress={handleGyroValues}> Get Gyroscope Values </Button>
      {doneAcc && doneGyro ? <Button onPress={handleDatabase}> Send Data to Firebase </Button> : null }
    </>

  )
};

export default App;