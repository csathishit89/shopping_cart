import React, { createContext, useState, useMemo, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	Linking,
	Alert,
} from 'react-native';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from '../../screens/general-styles/general-styles';
import Code from '../../constants/ColorCodes';

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
	const dispatch = useDispatch();
	const [showLoading, setShowLoading] = useState(false); // Add showLoading state

	const openSettings = (alertVal) => {
		Alert.alert(
			'Aavin',
			alertVal,
			[
				{
					text: 'Cancel'
				},
				{
					text: 'Open Settings', onPress: () => Linking.openSettings()
				}
			],
			{ cancelable: true }
		);
	}
	
	const updateGeoLocation = async (loginData) => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status === 'granted') {
			const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true, accuracy: Location.Accuracy.High });
			if (location?.coords?.latitude && location?.coords?.latitude && loginData) {
				const postData = {
					databaseName: loginData.databaseName,
					companyID: loginData.companyID,
					userID: loginData.userID,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				}
				dispatch(updateGPSLocationStart(postData));

				dispatch(userCurrentLocationInfo({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				}));
			}
		} else {
			openSettings('In order to use the GPS, you must give permission for Aavin to access the Location. You can grant this permission in the App Setting.');
		}
	};

	const values = useMemo(
		() => ({
			updateGeoLocation,
			setShowLoading,
		}),
		[
			showLoading,
		],
	);

	return (
		<AppContext.Provider value={values}>
			{children}
			{showLoading && <Spinner
				visible
				textContent="Loading..."
				textStyle={styles.loadingText}
				color={Code.primary_medium}
				animation="slide" />}
		</AppContext.Provider>
	);
};

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppContext;