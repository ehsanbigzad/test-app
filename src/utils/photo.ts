import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ROOT_PATH = 'images';

export async function uploadPhoto(photoPath: string, uid: string) {
  const fileName = uuid.v4();
  const fileExtension = photoPath.split('.').reverse()[0];

  const referenceName = `${ROOT_PATH}/${fileName}.${fileExtension}`;
  const reference = storage().ref(referenceName);

  await reference.putFile(photoPath);

  const photoCollection = firestore().collection('Photo');
  const photoDocuments = await photoCollection.where('uid', '==', uid).get();

  if (photoDocuments.empty) {
    await photoCollection.add({
      uid: uid,
      photo: referenceName,
    });
  } else {
    const photoDocumentId = photoDocuments.docs[0].id;
    await photoCollection.doc(photoDocumentId).update({
      photo: referenceName,
    });
  }

  const url = await reference.getDownloadURL();
  return url;
}

export async function getPhoto(uid: string) {
  const photoCollection = firestore().collection('Photo');
  const photoDocuments = await photoCollection.where('uid', '==', uid).get();

  if (!photoDocuments.empty) {
    const referenceName = photoDocuments.docs[0].get('photo')?.toString();
    const reference = storage().ref(referenceName);

    const url = await reference.getDownloadURL();
    return url;
  }
}

export async function deletePhoto(uid: string) {
  try {
    const photoCollection = firestore().collection('Photo');
    const photoDocuments = await photoCollection.where('uid', '==', uid).get();

    if (!photoDocuments.empty) {
      const referenceName = photoDocuments.docs[0].get('photo')?.toString();

      const reference = storage().ref(referenceName);
      await reference.delete();

      const photoDocumentId = photoDocuments.docs[0].id;
      await photoCollection.doc(photoDocumentId).delete();

      return true;
    }
  } catch (error) {
    return false;
  }
}
