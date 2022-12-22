import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import Button from 'ui/button';
import TextBox from 'ui/text-box';
import {mScale} from 'styles/mixins';
import useAuthUser from 'hooks/auth-user';
import KeyboardShift from 'components/keyboard-shift';

interface MemoFormData {
  memo: string;
}

export default function MemoScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useAuthUser();

  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<MemoFormData>();

  const onMount = useCallback(async () => {
    if (user?.uid) {
      const memoCollection = firestore().collection('Memo');
      const memoObjects = await memoCollection
        .where('uid', '==', user?.uid)
        .get();

      if (!memoObjects.empty) {
        setValue('memo', memoObjects.docs[0].get('note'));
      }
    }
  }, [setValue, user?.uid]);

  useEffect(() => {
    onMount();
  }, [onMount]);

  const onSubmit = handleSubmit(async payload => {
    setLoading(true);

    const memoCollection = firestore().collection('Memo');
    const memoObjects = await memoCollection
      .where('uid', '==', user?.uid)
      .get();

    try {
      // Create new record
      if (memoObjects.empty) {
        await memoCollection.add({uid: user?.uid, note: payload.memo});
        ToastAndroid.show('Note saved successfully.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }

      // Update record
      const documentId = memoObjects.docs[0].id;
      await memoCollection.doc(documentId).update({
        note: payload.memo,
      });

      ToastAndroid.show('Note updated successfully.', ToastAndroid.SHORT);
      setLoading(false);
    } catch (_) {
      ToastAndroid.show('Something went wrong, try later.', ToastAndroid.SHORT);
    }

    setLoading(false);
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardShift>
        <Controller
          name="memo"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Enter a memo.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextBox
              label="Note"
              value={value}
              onBlur={onBlur}
              autoComplete="off"
              keyboardType="default"
              onChangeText={onChange}
              returnKeyType="default"
              autoCapitalize="sentences"
              error={errors.memo?.message}
              description="This note will be persisted in firestore database"
            />
          )}
        />
        <Button
          label="Save"
          onPress={onSubmit}
          loading={loading}
          containerStyle={styles.button}
        />
      </KeyboardShift>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: mScale(25),
  },
  button: {
    marginTop: mScale(15),
  },
});
