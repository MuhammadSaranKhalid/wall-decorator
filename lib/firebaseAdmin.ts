// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// const serviceAccount: ServiceAccount = JSON.parse(
//   // process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string

// );

const app =
  getApps().length === 0
    ? initializeApp({
      credential: cert(
        //   {
        //   "type": "service_account",
        //   "project_id": "walldecorator-b4f3d",
        //   "private_key_id": "e5d59aad50667eb92aca33364b128fe1c6de3b8e",
        //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbep4SYtptUNuA\nCfMkFId03Sz9bWqdZLE/gSQ5iTeReK7QJYfPL5GdPt9bCE6+apbw1aoaHjnMWIFf\nJspMvw98Zvg5cu6hg/IT6HIkUn4VNgoWa3cXMVC9BZoyBvzfsghiFLWgURzgNm9g\nCT3twi5f3rauXIDlzZQNvcZCrKqpTin4bX3yREGBE1/za1VV6XAoocu1NKxqbJ5t\naL8C1hVeljtj5ERoy1DPukPhbjM2NUd7MAz1Y+3ytd598bvrwZFIgBfp5rB/2fz1\nBXfe2lQc4iqzPQdzTbDOw6FSPi0J+B3t5tdCXe2fnzcwFgtdfDRaW0Rz2EMa43pJ\n3jljV8R3AgMBAAECggEACLfwg0Ft1DFzjZOBQeWwztnUOwXWs6rA0bnRKTTLm+mz\ni9J+8hxNww6Sgc1OdRkPC8Q/fKVzQkU4Q/it4W3ZVXWEt9v9C6uVeI5RUD4b+d6E\n5Er0a6WFTIQy6FlB9t1J4Q4ePTYvM1d6GV2LTnjUFuYrQk3HoJtNkROyOWzrSQEV\nq8r8lNpBZ0y5oVGnV70p1T5W8Da9bAf5t8tp1dZcRbrcB77s8lNQSlmQuuf+7QP/\nMfSJdGwroDI0k02iUUe44k8Kv/2fNNWwWQRW/nUy0FuHlfaLpDI0gHywqnBW7gCL\nwOeYyAaL5uINSYzoqZqo0MyRObhpIuutY1PVnlhp2QKBgQDSEbKkcqSwV70UY0ov\nLU6xBfTm0kkw6BfLqhhpB7WD9A5GZXEr9bxtHKigFHD0uoKwrpMaFjJJO+E/oYF1\nkj2pSIxUZeA4ooCDAyMfV7vGHINXQmrtNMJ3ZHMJai0BS9ZMYACBxB5cdUgSCqul\nwIzoN86Stk1zHM4ervLSa0FbFQKBgQC9eVFtm0olbbvvDTgFZCDfJpB1z14q/41V\nvVBclMiCpFbu5DDe0sCwLLR/wPUJMU5nS2mmhwfYGP45MSFgaI8cLELS1q+E2/av\nmnuYxK9to/o9tRQHPsN1+J3V5RJCf2e0Vd5qI4dAifyTTlyouroMS2nLAcO8C/Vu\nnzkTpLPUWwKBgDZJ/poDSs6MDkB7nItusRyMxor0o5exE50920shg+aTJzFIPCQ5\nQLYOJwIf5kVJAkd5BmlCfUJx6DeSnKtu3OKn7iRNo9HfJUk2gVgzS0La0ZK2hn3B\nGdTTL+up9fGU0NAyK09eCN6qLLME8PFIPuIwsgE2ffOW6SoC2pxIvb41AoGASDj3\nPfVkhPHYIh4CzaNGGGllxVJfDbrNj/ISsMeRyqKD9JmMu1LQWhcgUlYl0PQ3c44+\nXli4N7oHJZvBojMY4d9JNX7Z9qW12WfkVu4aBIvtthnQ4ZYeAVjcKQ0hMbHIwOe+\nWOzkAEjYuvmyvio3Arq4P8aTapmQWzNcGU29smMCgYBWaP9x6Kp0ahlp5+DJkm9g\no2TSJic3yXysvDza5gLFGo7RARRJwFD4Q25SGh02Ky/Tb1ToU8Bk/wn48fIxtOyD\ngtKOxWvnvhErG2086AdGOxgPkEXdqcbr6Au616IMPddX3LwOqPZ69sS3Knr9LVnD\nKkmt+9OQT5KL/yQuLi35cg==\n-----END PRIVATE KEY-----\n",
        //   "client_email": "firebase-adminsdk-fbsvc@walldecorator-b4f3d.iam.gserviceaccount.com",
        //   "client_id": "113843662456703572044",
        //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        //   "token_uri": "https://oauth2.googleapis.com/token",
        //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        //   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40walldecorator-b4f3d.iam.gserviceaccount.com",
        //   "universe_domain": "googleapis.com"
        // }
        {
          "projectId": "walldecorator-b4f3d",
          "clientEmail": "firebase-adminsdk-fbsvc@walldecorator-b4f3d.iam.gserviceaccount.com",
          "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCbep4SYtptUNuA\nCfMkFId03Sz9bWqdZLE/gSQ5iTeReK7QJYfPL5GdPt9bCE6+apbw1aoaHjnMWIFf\nJspMvw98Zvg5cu6hg/IT6HIkUn4VNgoWa3cXMVC9BZoyBvzfsghiFLWgURzgNm9g\nCT3twi5f3rauXIDlzZQNvcZCrKqpTin4bX3yREGBE1/za1VV6XAoocu1NKxqbJ5t\naL8C1hVeljtj5ERoy1DPukPhbjM2NUd7MAz1Y+3ytd598bvrwZFIgBfp5rB/2fz1\nBXfe2lQc4iqzPQdzTbDOw6FSPi0J+B3t5tdCXe2fnzcwFgtdfDRaW0Rz2EMa43pJ\n3jljV8R3AgMBAAECggEACLfwg0Ft1DFzjZOBQeWwztnUOwXWs6rA0bnRKTTLm+mz\ni9J+8hxNww6Sgc1OdRkPC8Q/fKVzQkU4Q/it4W3ZVXWEt9v9C6uVeI5RUD4b+d6E\n5Er0a6WFTIQy6FlB9t1J4Q4ePTYvM1d6GV2LTnjUFuYrQk3HoJtNkROyOWzrSQEV\nq8r8lNpBZ0y5oVGnV70p1T5W8Da9bAf5t8tp1dZcRbrcB77s8lNQSlmQuuf+7QP/\nMfSJdGwroDI0k02iUUe44k8Kv/2fNNWwWQRW/nUy0FuHlfaLpDI0gHywqnBW7gCL\nwOeYyAaL5uINSYzoqZqo0MyRObhpIuutY1PVnlhp2QKBgQDSEbKkcqSwV70UY0ov\nLU6xBfTm0kkw6BfLqhhpB7WD9A5GZXEr9bxtHKigFHD0uoKwrpMaFjJJO+E/oYF1\nkj2pSIxUZeA4ooCDAyMfV7vGHINXQmrtNMJ3ZHMJai0BS9ZMYACBxB5cdUgSCqul\nwIzoN86Stk1zHM4ervLSa0FbFQKBgQC9eVFtm0olbbvvDTgFZCDfJpB1z14q/41V\nvVBclMiCpFbu5DDe0sCwLLR/wPUJMU5nS2mmhwfYGP45MSFgaI8cLELS1q+E2/av\nmnuYxK9to/o9tRQHPsN1+J3V5RJCf2e0Vd5qI4dAifyTTlyouroMS2nLAcO8C/Vu\nnzkTpLPUWwKBgDZJ/poDSs6MDkB7nItusRyMxor0o5exE50920shg+aTJzFIPCQ5\nQLYOJwIf5kVJAkd5BmlCfUJx6DeSnKtu3OKn7iRNo9HfJUk2gVgzS0La0ZK2hn3B\nGdTTL+up9fGU0NAyK09eCN6qLLME8PFIPuIwsgE2ffOW6SoC2pxIvb41AoGASDj3\nPfVkhPHYIh4CzaNGGGllxVJfDbrNj/ISsMeRyqKD9JmMu1LQWhcgUlYl0PQ3c44+\nXli4N7oHJZvBojMY4d9JNX7Z9qW12WfkVu4aBIvtthnQ4ZYeAVjcKQ0hMbHIwOe+\nWOzkAEjYuvmyvio3Arq4P8aTapmQWzNcGU29smMCgYBWaP9x6Kp0ahlp5+DJkm9g\no2TSJic3yXysvDza5gLFGo7RARRJwFD4Q25SGh02Ky/Tb1ToU8Bk/wn48fIxtOyD\ngtKOxWvnvhErG2086AdGOxgPkEXdqcbr6Au616IMPddX3LwOqPZ69sS3Knr9LVnD\nKkmt+9OQT5KL/yQuLi35cg==\n-----END PRIVATE KEY-----\n",
        }
      ),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    })
    : getApps()[0];

export const bucket = getStorage(app).bucket();
