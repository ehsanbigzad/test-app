import useAuthUser from 'hooks/auth-user';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

import {colors} from 'styles';
import Button from 'ui/button';
import {mScale} from 'styles/mixins';
import {deletePhoto, getPhoto, uploadPhoto} from 'utils/photo';

export default function PhotoScreen() {
  const {user} = useAuthUser();
  const {width} = useWindowDimensions();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [source, setSource] = useState<'camera' | 'gallery'>('camera');

  const onMount = useCallback(async () => {
    if (user?.uid) {
      const url = await getPhoto(user.uid);
      if (url) {
        setPhoto(url);
      }
    }
  }, [user?.uid]);

  useEffect(() => {
    onMount();
  }, [onMount]);

  const onDelete = useCallback(async () => {
    setDeleteLoading(true);
    try {
      await deletePhoto(user?.uid!);
      setPhoto(null);
    } catch (error) {
      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
    }

    setDeleteLoading(false);
  }, [user?.uid]);

  const uploadPhotoFile = async (image: ImageOrVideo) => {
    setLoading(true);
    try {
      setPhoto(image.path);

      const url = await uploadPhoto(image.path, user?.uid!);
      if (url) {
        setPhoto(url);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);

      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const onPickCamera = () => {
    setSource('camera');
    ImageCropPicker.openCamera({
      width: 512,
      height: 412,
      cropping: true,
    }).then(uploadPhotoFile);
  };

  const onPickGallery = () => {
    setSource('gallery');
    ImageCropPicker.openPicker({
      width: 512,
      height: 412,
      cropping: true,
    }).then(uploadPhotoFile);
  };

  const renderPhoto = useMemo(() => {
    return (
      <View style={[styles.imageWrapper, {height: width * 0.8}]}>
        {photo ? (
          <Image
            resizeMode="cover"
            source={{uri: photo}}
            style={[
              styles.photo,
              {height: width * 0.8, width: width - mScale(50)},
            ]}
          />
        ) : (
          <Image
            resizeMode="cover"
            source={require('@assets/images/placeholder.jpg')}
            style={[
              styles.photo,
              {height: width * 0.8, width: width - mScale(50)},
            ]}
          />
        )}
      </View>
    );
  }, [photo, width]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderPhoto}
      <View>
        <Button
          onPress={onPickCamera}
          label="Take from Camera"
          containerStyle={styles.button}
          loading={loading && source === 'camera'}
        />
        <Button
          onPress={onPickGallery}
          label="Choose from Gallery"
          containerStyle={styles.button}
          loading={loading && source === 'gallery'}
        />
        <Button
          type="outline"
          label="Delete"
          loading={deleteLoading}
          onPress={onDelete}
          containerStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mScale(25),
  },
  imageWrapper: {
    backgroundColor: 'red',
    overflow: 'hidden',
    marginBottom: mScale(30),
    borderRadius: mScale(25),
  },
  photo: {
    backgroundColor: colors.gray.s200,
  },
  button: {
    marginBottom: mScale(10),
  },
});
